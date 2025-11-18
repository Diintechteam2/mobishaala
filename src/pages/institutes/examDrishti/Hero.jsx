import React, { useState } from 'react';

const ExamDrishtiHero = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    focus: 'All India Combo'
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Thanks ${formData.name || 'aspirant'}! ExamDrishti advisors will reach out soon.`);
    setFormData({ name: '', email: '', phone: '', focus: 'All India Combo' });
  };

  return (
    <section className="pt-32 pb-16 bg-gradient-to-b from-[#f4f5ff] via-white to-white relative overflow-hidden">
      <div className="absolute inset-0 opacity-30" style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1523580846011-d3a5bc25702b?w=1600)', backgroundSize: 'cover', backgroundPosition: 'center' }} />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-10">
          <div>
            <span className="inline-flex px-4 py-1.5 bg-white rounded-full text-sm font-semibold text-primary mb-6">
              ExamDrishti • Govt exam super app
            </span>
            <h1 className="text-4xl md:text-5xl font-black text-gray-900 leading-tight">
              Integrated UPSC + State PCS engine for ambitious aspirants
            </h1>
            <p className="text-lg text-gray-600 mt-5">
              Multi-state notes, cloud recordings, mentors-on-demand and AI revision dashboards — accessible on any device.
            </p>
            <div className="grid grid-cols-2 gap-4 mt-10">
              <div className="bg-white rounded-3xl p-5 shadow border border-primary/10">
                <p className="text-xs text-primary font-semibold uppercase">Live learners</p>
                <p className="text-3xl font-black text-gray-900 mt-2">9,500+</p>
              </div>
              <div className="bg-white rounded-3xl p-5 shadow border border-primary/10">
                <p className="text-xs text-primary font-semibold uppercase">States covered</p>
                <p className="text-3xl font-black text-gray-900 mt-2">12</p>
              </div>
            </div>
          </div>
          <div id="examdrishti-form" className="bg-white rounded-3xl shadow-2xl border border-gray-100 p-8">
            <p className="text-sm font-semibold text-primary uppercase">Join the next demo</p>
            <h3 className="text-2xl font-bold text-gray-900 mt-2">Unlock ExamDrishti Pro</h3>
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
                  <option>All India Combo</option>
                  <option>UPSC Integrated</option>
                  <option>MPPSC + UPPCS</option>
                  <option>SSC + Banking</option>
                </select>
              </div>
              <button className="w-full bg-primary text-white font-semibold py-3 rounded-xl hover:bg-primary-dark transition" type="submit">
                Get Access Link
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ExamDrishtiHero;

