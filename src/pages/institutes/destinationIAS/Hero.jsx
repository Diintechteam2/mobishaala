import React, { useState } from 'react';

const DestinationIASHero = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    focus: 'UPSC CSE Integrated'
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Thanks ${formData.name || 'Aspirant'}! Our Destination IAS counsellor will call you shortly.`);
    setFormData({ name: '', email: '', phone: '', focus: 'UPSC CSE Integrated' });
  };

  return (
    <section className="pt-32 pb-16 bg-gradient-to-b from-[#f0f5ff] via-white to-white relative overflow-hidden">
      <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=1600)', backgroundSize: 'cover', backgroundPosition: 'center' }} />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-10 items-start">
          <div>
            <div className="inline-flex items-center px-4 py-1.5 bg-white/80 rounded-full shadow text-sm font-semibold text-primary mb-5">
              Destination IAS • Mobishaala UPSC Network
            </div>
            <h1 className="text-4xl md:text-5xl font-black text-gray-900 leading-tight">
              Full Stack UPSC + PCS Mastery for <span className="text-primary">Serious Aspirants</span>
            </h1>
            <p className="text-lg text-gray-600 mt-5 max-w-xl">
              Access Delhi faculty, hybrid answer writing labs, personalised mentors and AI feedback dashboards. Build your attempt the right way within 9 months.
            </p>
            <div className="grid sm:grid-cols-2 gap-5 mt-10">
              <div className="bg-white rounded-3xl p-5 shadow border border-primary/10">
                <p className="text-xs font-semibold text-primary uppercase">Results 2024</p>
                <p className="text-3xl font-black text-gray-900 mt-2">37</p>
                <p className="text-sm text-gray-500">Selections in UPSC CSE & State PCS</p>
              </div>
              <div className="bg-white rounded-3xl p-5 shadow border border-primary/10">
                <p className="text-xs font-semibold text-primary uppercase">Live Cohorts</p>
                <p className="text-3xl font-black text-gray-900 mt-2">14</p>
                <p className="text-sm text-gray-500">Integrated + Optional</p>
              </div>
            </div>
          </div>
          <div id="destination-ias-form" className="bg-white rounded-3xl shadow-2xl border border-gray-100 p-8">
            <p className="text-sm font-semibold text-primary uppercase">Book a Counselling Call</p>
            <h3 className="text-2xl font-bold text-gray-900 mt-2">Plan your UPSC / PCS journey</h3>
            <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
              <div>
                <label className="text-sm font-medium text-gray-700">Full Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="mt-2 w-full rounded-xl border border-gray-200 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="e.g. Ananya Singh"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="mt-2 w-full rounded-xl border border-gray-200 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="you@email.com"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700">Phone</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  className="mt-2 w-full rounded-xl border border-gray-200 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="+91"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700">Focus Area</label>
                <select
                  name="focus"
                  value={formData.focus}
                  onChange={handleChange}
                  className="mt-2 w-full rounded-xl border border-gray-200 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  <option>UPSC CSE Integrated</option>
                  <option>UPSC Prelims Booster</option>
                  <option>UPSC Optional Mentorship</option>
                  <option>UPPCS Foundation</option>
                  <option>MPPSC Crash Course</option>
                </select>
              </div>
              <button
                type="submit"
                className="w-full bg-primary text-white font-semibold py-3 rounded-xl shadow-md hover:bg-primary-dark transition"
              >
                Request Callback
              </button>
              <p className="text-xs text-gray-500 text-center">
                By submitting, you agree to receive WhatsApp / Call updates from Destination IAS.
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DestinationIASHero;

