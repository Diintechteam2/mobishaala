import React, { useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
import ExamDrishtiNavbar from './Navbar';
import ExamDrishtiFooter from './Footer';
import { examDrishtiCourses } from './coursesData';

const ExamDrishtiCheckout = () => {
  const { courseId } = useParams();
  const course = useMemo(
    () => examDrishtiCourses.find((item) => item.id === courseId) || examDrishtiCourses[0],
    [courseId]
  );

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    state: '',
    target: course?.category || 'UPSC',
    notes: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Great ${formData.fullName || 'aspirant'}! Secure payment link for ${course.title} will be shared shortly.`);
    setFormData({ fullName: '', email: '', phone: '', state: '', target: course?.category || 'UPSC', notes: '' });
  };

  return (
    <div className="bg-white min-h-screen">
      <ExamDrishtiNavbar />
      <main className="pt-24 pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-5 gap-10">
          <div className="lg:col-span-2 bg-gray-50 border border-gray-200 rounded-3xl p-6">
            <p className="text-xs uppercase tracking-[0.3em] text-primary font-semibold">Checkout</p>
            <h1 className="text-3xl font-black text-gray-900 mt-2">{course.title}</h1>
            <img src={course.image} alt={course.title} className="w-full h-56 object-cover rounded-2xl mt-6" />
            <div className="mt-6 space-y-3">
              <div className="flex items-center gap-2 text-xs font-semibold text-gray-500">
                <span>{course.category}</span>
                <span>•</span>
                <span>{course.phase}</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-3xl font-black text-gray-900">₹{course.price.toLocaleString('en-IN')}</span>
                <span className="text-sm text-gray-400 line-through">₹{course.originalPrice.toLocaleString('en-IN')}</span>
                <span className="text-xs bg-primary/10 text-primary font-semibold px-2 py-1 rounded-full">{course.discount}% OFF</span>
              </div>
              <p className="text-sm text-gray-600">{course.description}</p>
              <ul className="text-sm text-gray-700 list-disc list-inside space-y-1">
                <li>Mobishaala payment gateway</li>
                <li>Instant login to ExamDrishti Pro</li>
                <li>EMI, UPI, cards supported</li>
              </ul>
            </div>
          </div>

          <div className="lg:col-span-3 bg-white border border-gray-200 rounded-3xl shadow-sm p-8">
            <p className="text-sm font-semibold uppercase text-primary">Complete your details</p>
            <h2 className="text-2xl font-black text-gray-900 mt-2">Reserve your subscription</h2>
            <form className="mt-6 grid grid-cols-1 gap-5" onSubmit={handleSubmit}>
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-700">Full Name</label>
                  <input
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    required
                    className="mt-2 w-full border border-gray-200 rounded-xl px-4 py-3"
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
                    className="mt-2 w-full border border-gray-200 rounded-xl px-4 py-3"
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
                    className="mt-2 w-full border border-gray-200 rounded-xl px-4 py-3"
                    placeholder="you@email.com"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700">State</label>
                  <input
                    name="state"
                    value={formData.state}
                    onChange={handleChange}
                    className="mt-2 w-full border border-gray-200 rounded-xl px-4 py-3"
                    placeholder="UP, MP, etc."
                  />
                </div>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700">Primary Exam Track</label>
                <select
                  name="target"
                  value={formData.target}
                  onChange={handleChange}
                  className="mt-2 w-full border border-gray-200 rounded-xl px-4 py-3"
                >
                  <option>UPSC</option>
                  <option>State PCS</option>
                  <option>SSC/Banking</option>
                  <option>Interview</option>
                </select>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700">Notes</label>
                <textarea
                  name="notes"
                  value={formData.notes}
                  onChange={handleChange}
                  rows={4}
                  className="mt-2 w-full border border-gray-200 rounded-xl px-4 py-3"
                  placeholder="Share attempts, timeline, doubts"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-primary text-white font-semibold py-3 rounded-xl hover:bg-primary-dark transition shadow"
              >
                Proceed to Payment
              </button>
              <p className="text-xs text-gray-500 text-center">
                Mobishaala will send a secure payment link via WhatsApp / Email to complete enrollment.
              </p>
            </form>
          </div>
        </div>
      </main>
      <ExamDrishtiFooter />
    </div>
  );
};

export default ExamDrishtiCheckout;

