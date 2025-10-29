import React, { useState } from 'react';
import { motion } from 'framer-motion';

const TABS = [
	{ id: 'software', label: 'Software' },
	{ id: 'sales', label: 'Sales' },
	{ id: 'marketing', label: 'Marketing' },
	{ id: 'support', label: 'Support' },
];

const CONTENT = {
	software: {
		title: 'Software',
		desc: 'Build, ship and manage your WhatsApp + Calling experiences reliably.',
		bullets: [
			{ title: 'Omnichannel APIs', desc: 'Send/receive WhatsApp, SMS and voice with a single platform.', icon: '🧩' },
			{ title: 'Automation', desc: 'Trigger workflows, webhooks and integrations without code.', icon: '⚙️' },
			{ title: 'Analytics', desc: 'Track funnels, response times and campaign ROI in one view.', icon: '📊' },
		],
		imageAlt: 'Software overview',
	},
	sales: {
		title: 'Sales',
		desc: 'Generate and close more leads with call + WhatsApp funnels.',
		bullets: [
			{ title: 'Click-to-WhatsApp Ads', desc: 'Capture high-intent leads with fewer drop‑offs.', icon: '📣' },
			{ title: 'Auto Dialer', desc: 'Call faster with dispositions and notes that sync back.', icon: '📞' },
			{ title: 'CRM Sync', desc: 'Sync leads and conversations to your CRM seamlessly.', icon: '🔗' },
		],
		imageAlt: 'Sales features',
	},
	marketing: {
		title: 'Marketing',
		desc: 'Reach, engage and convert customers more effectively at every step.',
		bullets: [
			{ title: 'WhatsApp Campaign', desc: 'Build a list and run regular broadcast campaigns.', icon: '💬' },
			{ title: 'Click‑to‑WhatsApp Ads', desc: 'Drive ad traffic straight to WhatsApp for less loss.', icon: '🪧' },
			{ title: 'WhatsApp QR Code', desc: 'Engage offline users via QR codes that start chats.', icon: '� QR' },
		],
		imageAlt: 'Marketing visuals',
	},
	support: {
		title: 'Support',
		desc: 'Delight customers with fast, contextual support over WhatsApp & calls.',
		bullets: [
			{ title: 'Shared Inbox', desc: 'Assign, tag and resolve conversations collaboratively.', icon: '📥' },
			{ title: 'Bots + Handover', desc: 'Automate FAQs with smooth agent takeover when needed.', icon: '🤖' },
			{ title: 'SLAs & Reports', desc: 'Track response times, CSAT and agent productivity.', icon: '⏱️' },
		],
		imageAlt: 'Support operations',
	},
};

const OneForAll = () => {
	const [active, setActive] = useState('software');
	const data = CONTENT[active];

	return (
		<section className="py-16 md:py-20 bg-white">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				{/* Section header */}
				<div className="text-center mb-8 md:mb-12">
					<h2 className="text-3xl md:text-4xl font-bold text-gray-900">One-for-all platform</h2>
					<p className="text-gray-600 mt-2">benefiting all your teams</p>
				</div>

				{/* Tabs */}
				<div className="bg-gray-100 rounded-xl p-2 mb-10 flex gap-2 w-full max-w-xl mx-auto">
					{TABS.map((t) => (
						<button
							key={t.id}
							onClick={() => setActive(t.id)}
							className={`relative flex-1 text-sm md:text-base font-semibold rounded-lg py-3 transition-colors ${
								active === t.id ? 'bg-white text-gray-900 shadow' : 'text-gray-600 hover:text-gray-900'
							}`}
						>
							{t.label}
							{active === t.id && (
								<motion.span layoutId="algbunkeTab" className="absolute inset-0 rounded-lg" style={{ background: 'transparent' }} />
							)}
						</button>
					))}
				</div>

				{/* Content */}
				<div className="grid md:grid-cols-2 gap-8 items-center">
					{/* Left visual placeholder (kept theme-light like Hero) */}
					<div className="bg-gray-50 border border-gray-200 rounded-3xl p-6 md:p-8">
						<div className="aspect-[4/3] w-full rounded-2xl bg-gradient-to-br from-primary/10 via-white to-primary/5 border border-gray-200 flex items-center justify-center">
							<span className="text-primary font-bold">{data.imageAlt}</span>
						</div>
					</div>

					{/* Right feature list */}
					<div>
						<h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-2">{data.title}</h3>
						<p className="text-gray-600 mb-6">{data.desc}</p>
						<div className="space-y-6">
							{data.bullets.map((b, i) => (
								<div key={i} className="flex gap-4 items-start">
									<div className="w-12 h-12 rounded-xl bg-white border border-gray-200 flex items-center justify-center text-xl">
										<span>{b.icon}</span>
									</div>
									<div className="flex-1 border-b border-gray-200 pb-6 last:border-b-0">
										<div className="font-semibold text-gray-900">{b.title}</div>
										<div className="text-gray-600 text-sm mt-1">{b.desc}</div>
									</div>
								</div>
							))}
						</div>
					</div>
				</div>
			</div>
		</section>
	);
};

export default OneForAll;


