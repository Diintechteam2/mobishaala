import React, { useState } from 'react';

const ShashiKarnaHero = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    focus: 'BPSC Foundation'
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Thanks ${formData.name || 'aspirant'}! Team Shashi Karna Classes will connect within 24 hours.`);
    setFormData({ name: '', email: '', phone: '', focus: 'BPSC Foundation' });
  };

  return (
    <section className="pt-32 pb-16 bg-gradient-to-b from-[#fef6f2] via-white to-white relative overflow-hidden">
      <div className="absolute inset-0 opacity-30" style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=1600)', backgroundSize: 'cover', backgroundPosition: 'center' }} />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-10 items-start">
          <div>
            <span className="inline-flex px-4 py-1.5 bg-white rounded-full text-sm font-semibold text-primary mb-6">
              Shashi Karna Classes • BPSC, JPSC & State PCS
            </span>
            <h1 className="text-4xl md:text-5xl font-black text-gray-900 leading-tight">
              Bihar’s most trusted PCS & UPSC hybrid academy
            </h1>
            <p className="text-lg text-gray-600 mt-5 max-w-xl">
              Finish the entire BPSC + UPSC foundation under Shashi sir’s supervision with bilingual notes,
              Patna-based test labs and Mobishaala powered trackers.
            </p>
            <div className="grid grid-cols-2 gap-4 mt-10">
              <div className="bg-white rounded-3xl p-5 shadow border border-primary/10">
                <p className="text-xs text-primary font-semibold uppercase">Selections 2023</p>
                <p className="text-3xl font-black text-gray-900 mt-2">57</p>
                <p className="text-sm text-gray-500">BPSC + JPSC toppers</p>
              </div>
              <div className="bg-white rounded-3xl p-5 shadow border border-primary/10">
                <p className="text-xs text-primary font-semibold uppercase">Weekly mocks</p>
                <p className="text-3xl font-black text-gray-900 mt-2">3</p>
                <p className="text-sm text-gray-500">Answer writing marathons</p>
              </div>
            </div>
          </div>
          <div id="shashi-karna-form" className="bg-white rounded-3xl shadow-2xl border border-gray-100 p-8">
            <p className="text-sm font-semibold text-primary uppercase">Request free counselling</p>
            <h3 className="text-2xl font-bold text-gray-900 mt-2">Speak with Shashi sir’s desk</h3>
            <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
              <div>
                <label className="text-sm font-medium text-gray-700">Full Name</label>
                <input
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="mt-2 w-full rounded-xl border border-gray-200 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="Your name"
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
                <label className="text-sm font-medium text-gray-700">Target Exam</label>
                <select
                  name="focus"
                  value={formData.focus}
                  onChange={handleChange}
                  className="mt-2 w-full rounded-xl border border-gray-200 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  <option>BPSC Foundation</option>
                  <option>BPSC Prelims Booster</option>
                  <option>JPSC Integrated</option>
                  <option>UPSC + BPSC Combo</option>
                </select>
              </div>
              <button className="w-full bg-primary text-white font-semibold py-3 rounded-xl hover:bg-primary-dark transition" type="submit">
                Schedule Call
              </button>
              <p className="text-xs text-gray-500 text-center">We’ll also send session links via WhatsApp.</p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ShashiKarnaHero;

