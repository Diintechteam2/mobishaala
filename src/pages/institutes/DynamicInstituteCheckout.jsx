import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import DynamicInstituteNavbar from './DynamicInstituteNavbar';
import DynamicInstituteFooter from './DynamicInstituteFooter';

const API_BASE = import.meta.env.VITE_API_BASE_URL || 'https://mobishaala-backend-zcxm.onrender.com';

const DynamicInstituteCheckout = () => {
  const { instituteId, courseId } = useParams();

  const [institute, setInstitute] = useState(null);
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [formError, setFormError] = useState('');

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    city: '',
    notes: '',
    mode: 'Online'
  });
  const [isPaytmEnabled, setIsPaytmEnabled] = useState(false);
  const [processingPayment, setProcessingPayment] = useState(false);
  const [transactionStatus, setTransactionStatus] = useState('');
  const paytmReady = isPaytmEnabled && Number(course?.price || 0) > 0;

  useEffect(() => {
    fetchData();
  }, [instituteId, courseId]);

  const fetchData = async () => {
    try {
      // Fetch institute details
      const instituteRes = await fetch(`${API_BASE}/api/institutes/public/${instituteId}`);
      if (instituteRes.ok) {
        const instituteData = await instituteRes.json();
        if (instituteData.success) {
          setInstitute(instituteData.data);
          setIsPaytmEnabled(Boolean(instituteData.data.paymentSettings?.paytmEnabled));
        }
      }

      // Fetch content and course
      const contentRes = await fetch(`${API_BASE}/api/institute-content/public/${instituteId}`);
      if (contentRes.ok) {
        const contentData = await contentRes.json();
        console.log('🛒 Public Checkout - Fetched data:', contentData);
        if (contentData.success && contentData.data) {
          // Find course and ensure all fields are numbers
          const courses = (contentData.data.courses?.courses || []).map(c => ({
            ...c,
            price: Number(c.price) || 0,
            originalPrice: Number(c.originalPrice) || 0,
            discount: Number(c.discount) || 0
          }));
          const foundCourse = courses.find((c) => c.id === courseId);
          console.log('🎯 Found course for checkout:', foundCourse);
          
          if (foundCourse) {
            setCourse(foundCourse);
          } else {
            // Default course if not found
            setCourse({
              id: courseId,
              title: 'Course Not Found',
              description: 'This course may have been removed or is unavailable.',
              category: '',
              phase: '',
              price: 0,
              originalPrice: 0,
              discount: 0,
              image: 'https://images.unsplash.com/photo-1523580846011-d3a5bc25702b?w=800'
            });
          }
        }
      }
    } catch (err) {
      console.error('Error fetching data:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const submitLeadOnly = async () => {
    const response = await fetch(`${API_BASE}/api/leads/course-purchase`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        instituteId,
        courseId: course?.id,
        courseTitle: course?.title,
        price: course?.price,
        originalPrice: course?.originalPrice,
        name: formData.fullName,
        email: formData.email,
        phone: formData.phone,
        city: formData.city,
        mode: formData.mode,
        notes: formData.notes,
      }),
    });

    const data = await response.json();
    if (!response.ok || !data.success) {
      throw new Error(data.message || 'Unable to submit request');
    }
    setSubmitted(true);
  };

  const waitForPaytmSdk = () =>
    new Promise((resolve, reject) => {
      let attempts = 0;
      const maxAttempts = 20;
      const interval = 200;

      const check = () => {
        if (window.Paytm?.CheckoutJS?.init) {
          resolve();
          return;
        }
        attempts += 1;
        if (attempts > maxAttempts) {
          reject(new Error('Paytm SDK unavailable'));
          return;
        }
        setTimeout(check, interval);
      };

      check();
    });

  const loadPaytmScript = (mid, env) =>
    new Promise((resolve, reject) => {
      const scriptId = 'paytm-checkout';
      const existing = document.getElementById(scriptId);
      const host = env === 'production' ? 'https://securegw.paytm.in' : 'https://securegw-stage.paytm.in';

      const ensureReady = async () => {
        try {
          await waitForPaytmSdk();
          resolve();
        } catch (sdkError) {
          reject(sdkError);
        }
      };

      if (existing) {
        if (existing.dataset.mid === mid && existing.dataset.env === env) {
          ensureReady();
          return;
        }
        existing.remove();
      }

      const script = document.createElement('script');
      script.id = scriptId;
      script.dataset.mid = mid;
      script.dataset.env = env;
      script.src = `${host}/merchantpgpui/checkoutjs/merchants/${mid}.js`;
      script.onload = ensureReady;
      script.onerror = () => reject(new Error('Unable to load Paytm SDK'));
      document.body.appendChild(script);
    });

  const handlePaytmInitiate = async () => {
    const response = await fetch(`${API_BASE}/api/payments/order`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        instituteId,
        courseId: course?.id,
        courseTitle: course?.title,
        amount: course?.price || 0,
        student: {
          fullName: formData.fullName,
          email: formData.email,
          phone: formData.phone,
          city: formData.city,
          notes: formData.notes,
        },
      }),
    });

    const data = await response.json();
    if (!response.ok || !data.success) {
      throw new Error(data.message || 'Unable to start payment');
    }

    await loadPaytmScript(data.data.mid, data.data.environment);

    const orderId = data.data.orderId;

    const handleTransactionStatus = (paytmData) => {
      pollPaymentStatus(orderId)
        .catch((error) => console.error('Paytm transaction status poll error:', error));
    };

    const handleNotifyMerchant = (eventName, paytmData) => {
      console.log('Paytm notifyMerchant event:', eventName, paytmData);
      if (eventName === 'APP_CLOSED') {
        setProcessingPayment(false);
      }
    };

    const config = {
      root: '',
      flow: 'DEFAULT',
      data: {
        orderId,
        token: data.data.txnToken,
        tokenType: 'TXN_TOKEN',
        amount: data.data.amount,
      },
      handler: {
        transactionStatus: handleTransactionStatus,
        notifyMerchant: handleNotifyMerchant,
      },
    };

    setProcessingPayment(true);
    try {
      await window.Paytm?.CheckoutJS?.init(config);
      await window.Paytm?.CheckoutJS?.invoke();
    } catch (error) {
      setProcessingPayment(false);
      throw error;
    }
  };

  const pollPaymentStatus = async (orderId) => {
    try {
      const response = await fetch(`${API_BASE}/api/payments/order/${orderId}`);
      const data = await response.json();
    if (data.success) {
      setTransactionStatus(data.data.status);
      setSubmitted(true);
    }
    } catch (error) {
      console.error('Payment status check error:', error);
    } finally {
      setProcessingPayment(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormError('');
    setSubmitting(true);

    try {
      if (!paytmReady) {
        await submitLeadOnly();
        if (isPaytmEnabled && Number(course?.price || 0) <= 0) {
          setTransactionStatus('price_missing');
        }
        return;
      }

      await handlePaytmInitiate();
    } catch (err) {
      console.error('Checkout submission error:', err);

      if (paytmReady) {
        try {
          await submitLeadOnly();
          setTransactionStatus('gateway_unavailable');
          return;
        } catch (leadError) {
          console.error('Lead fallback error:', leadError);
          const primaryMessage = err?.message || 'Something went wrong while starting the payment.';
          const fallbackMessage = leadError?.message || 'We could not save your details. Please try again.';
          setFormError(`${primaryMessage} ${fallbackMessage}`);
        }
      } else {
        setFormError(err?.message || 'Something went wrong. Please try again.');
      }
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
          <p className="mt-4 text-gray-600">Loading checkout...</p>
        </div>
      </div>
    );
  }

  if (submitted) {
    return (
      <div className="min-h-screen bg-white">
        <DynamicInstituteNavbar institute={institute} />
        <main className="pt-24 pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <div className="max-w-lg mx-auto text-center">
            <div className="bg-green-50 rounded-3xl p-12">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h1 className="text-2xl font-bold text-gray-900 mb-4">
                {transactionStatus === 'paid'
                  ? 'Payment received 🎉'
                  : transactionStatus === 'gateway_unavailable'
                  ? 'We have your request'
                  : transactionStatus === 'price_missing'
                  ? 'Course not payment-ready'
                  : `Thank you ${formData.fullName || 'aspirant'}!`}
              </h1>
              <p className="text-gray-600 mb-8">
                {paytmReady ? (
                  transactionStatus === 'paid' ? (
                    <>
                      Your payment for <strong>{course?.title}</strong> is confirmed. Our team will activate access and
                      reach out shortly.
                    </>
                  ) : transactionStatus === 'pending' ? (
                    <>
                      Your payment session was opened but is still pending. We have logged your details and will help you
                      complete the payment.
                    </>
                  ) : transactionStatus === 'gateway_unavailable' ? (
                    <>
                      Paytm is temporarily unavailable, but we&apos;ve safely saved your request for{' '}
                      <strong>{course?.title}</strong>. A counselor will share a fresh payment link shortly.
                    </>
                  ) : transactionStatus === 'price_missing' ? (
                    <>
                      This course isn&apos;t configured with a payable amount yet, so we captured your request as a lead.
                      Our team will share the right plan and payment link shortly.
                    </>
                  ) : (
                    <>
                      The payment attempt didn&apos;t complete. A counselor will contact you with the next steps or a
                      fresh link.
                    </>
                  )
                ) : (
                  <>
                    We will share the secure payment link for <strong>{course?.title}</strong> on your email/phone
                    shortly.
                  </>
                )}
              </p>
              <Link
                to={`/institutes/${instituteId}`}
                className="inline-block bg-primary text-white font-semibold px-8 py-3 rounded-xl hover:bg-primary-dark transition"
              >
                Back to {institute?.businessName || 'Institute'}
              </Link>
            </div>
          </div>
        </main>
        <DynamicInstituteFooter institute={institute} />
      </div>
    );
  }

  return (
    <div className="bg-white min-h-screen">
      <DynamicInstituteNavbar institute={institute} />
      <main className="pt-24 pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-5 gap-10">
          {/* Left Side - Course Summary */}
          <div className="lg:col-span-2 bg-gray-50 border border-gray-200 rounded-3xl p-6">
            <p className="text-xs uppercase tracking-[0.3em] text-primary font-semibold">Checkout</p>
            <h1 className="text-3xl font-black text-gray-900 mt-2">{course?.title || 'Course'}</h1>
            <img 
              src={course?.image || 'https://images.unsplash.com/photo-1523580846011-d3a5bc25702b?w=800'} 
              alt={course?.title} 
              className="w-full h-56 object-cover rounded-2xl mt-6" 
            />
            <div className="mt-6 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-500">{course?.category || 'Course'}</span>
                {course?.phase && (
                  <span className="text-xs bg-primary/10 text-primary font-semibold px-2 py-1 rounded-full">
                    {course.phase}
                  </span>
                )}
              </div>
              <div className="flex items-center gap-3">
                <span className="text-3xl font-black text-gray-900">
                  ₹{Number(course?.price || 0).toLocaleString('en-IN')}
                </span>
                {course?.originalPrice > 0 && (
                  <span className="text-sm text-gray-400 line-through">
                    ₹{Number(course.originalPrice).toLocaleString('en-IN')}
                  </span>
                )}
                {course?.discount > 0 && (
                  <span className="text-xs bg-green-100 text-green-700 font-semibold px-2 py-1 rounded-full">
                    {course.discount}% OFF
                  </span>
                )}
              </div>
              <p className="text-sm text-gray-600">{course?.description}</p>
              <ul className="text-sm text-gray-700 list-disc list-inside space-y-1 pt-3 border-t border-gray-200">
                <li>Mobishaala secure payment gateway</li>
                <li>Instant course activation after payment</li>
                <li>EMI & UPI options available</li>
              </ul>
            </div>
          </div>

          {/* Right Side - Form */}
          <div className="lg:col-span-3 bg-white border border-gray-200 rounded-3xl shadow-sm p-8">
            <p className="text-sm font-semibold uppercase text-primary">Enter details</p>
            <h2 className="text-2xl font-black text-gray-900 mt-2">Reserve your seat</h2>
            <form className="mt-6 grid grid-cols-1 gap-5" onSubmit={handleSubmit}>
              {formError && (
                <div className="text-sm text-red-600 bg-red-50 border border-red-100 rounded-xl px-3 py-2">
                  {formError}
                </div>
              )}
              {isPaytmEnabled && Number(course?.price || 0) <= 0 && (
                <div className="text-sm text-amber-700 bg-amber-50 border border-amber-100 rounded-xl px-3 py-2">
                  This course doesn&apos;t have a price configured yet. We will treat your submission as an inquiry until
                  pricing is added.
                </div>
              )}
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-700">Full Name</label>
                  <input
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    required
                    className="mt-2 w-full border border-gray-200 rounded-xl px-4 py-3 text-gray-900 focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700">Phone</label>
                  <input
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    className="mt-2 w-full border border-gray-200 rounded-xl px-4 py-3 text-gray-900 focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
                    placeholder="+91"
                  />
                </div>
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-700">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="mt-2 w-full border border-gray-200 rounded-xl px-4 py-3 text-gray-900 focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
                    placeholder="you@email.com"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700">City / State</label>
                  <input
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    className="mt-2 w-full border border-gray-200 rounded-xl px-4 py-3 text-gray-900 focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
                    placeholder="Delhi, Bihar..."
                  />
                </div>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700">Preferred Mode</label>
                <select
                  name="mode"
                  value={formData.mode}
                  onChange={handleChange}
                  className="mt-2 w-full border border-gray-200 rounded-xl px-4 py-3 text-gray-900 focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
                >
                  <option>Online</option>
                  <option>Offline</option>
                  <option>Hybrid</option>
                </select>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700">Notes for mentor</label>
                <textarea
                  name="notes"
                  value={formData.notes}
                  onChange={handleChange}
                  rows={4}
                  className="mt-2 w-full border border-gray-200 rounded-xl px-4 py-3 text-gray-900 focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
                  placeholder="Share your attempt, timeline or doubts"
                />
              </div>
              <button
                type="submit"
                disabled={submitting || processingPayment}
                className="w-full bg-primary text-white font-semibold py-3 rounded-xl hover:bg-primary-dark transition shadow disabled:opacity-60"
              >
                {processingPayment
                  ? 'Opening Paytm...'
                  : submitting
                  ? 'Submitting...'
                  : paytmReady
                  ? 'Pay with Paytm'
                  : 'Continue to Secure Payment'}
              </button>
              <p className="text-xs text-gray-500 text-center">
                You will receive a payment gateway link powered by Mobishaala to complete the purchase.
              </p>
            </form>
          </div>
        </div>
      </main>
      <DynamicInstituteFooter institute={institute} />
    </div>
  );
};

export default DynamicInstituteCheckout;
