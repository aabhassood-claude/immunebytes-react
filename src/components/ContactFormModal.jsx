import { useState } from 'react';
import { LIcon } from './LIcon';

export function ContactFormModal({ open, onClose }) {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', phone: '', company: '', message: '' });

  if (!open) return null;

  const handleChange = (e) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const handleClose = () => {
    setSubmitted(false);
    setForm({ name: '', email: '', phone: '', company: '', message: '' });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[70] flex items-center justify-center" onClick={handleClose}>
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
      <div
        className="relative w-full max-w-[520px] mx-4 bg-white rounded-xl shadow-[0_30px_80px_-20px_rgba(0,0,0,0.5)] overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-7 py-5 border-b border-zinc-100">
          <h3 className="font-display font-semibold text-zinc-900 text-[20px] tracking-tight">
            {submitted ? 'Thank You!' : 'Talk to an Expert'}
          </h3>
          <button
            onClick={handleClose}
            className="text-zinc-400 hover:text-zinc-700 p-1 -mr-1 transition-colors"
            aria-label="Close"
          >
            <LIcon name="X" size={20} />
          </button>
        </div>

        {submitted ? (
          <div className="px-7 py-12 flex flex-col items-center text-center">
            <div className="h-16 w-16 rounded-full bg-immune-green/10 flex items-center justify-center mb-5">
              <LIcon name="CheckCircle" size={32} strokeWidth={1.75} className="text-immune-green" />
            </div>
            <h4 className="font-display font-semibold text-zinc-900 text-[22px] tracking-tight">
              Your query has been submitted!
            </h4>
            <p className="mt-3 text-zinc-500 text-[15px] leading-relaxed max-w-[380px]">
              Our team will review your message and get back to you within 24 hours at{' '}
              <span className="text-zinc-700 font-medium">sales@immunebytes.com</span>.
            </p>
            <button
              onClick={handleClose}
              className="mt-8 inline-flex items-center gap-2 h-11 px-6 rounded-full bg-immune-green text-black font-display font-semibold text-[14px] hover:bg-[#82d600] transition-colors"
            >
              Close
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="px-7 py-6 flex flex-col gap-4">
            <div>
              <label className="block font-mono text-[11px] uppercase tracking-[0.14em] text-zinc-500 mb-1.5">Name *</label>
              <input
                type="text"
                name="name"
                required
                value={form.name}
                onChange={handleChange}
                placeholder="Your full name"
                className="w-full h-11 px-4 rounded-md border border-zinc-200 bg-zinc-50 text-zinc-900 text-[14px] placeholder-zinc-400 focus:outline-none focus:border-immune-green focus:ring-1 focus:ring-immune-green/20 transition-colors"
              />
            </div>
            <div>
              <label className="block font-mono text-[11px] uppercase tracking-[0.14em] text-zinc-500 mb-1.5">Email *</label>
              <input
                type="email"
                name="email"
                required
                value={form.email}
                onChange={handleChange}
                placeholder="you@company.com"
                className="w-full h-11 px-4 rounded-md border border-zinc-200 bg-zinc-50 text-zinc-900 text-[14px] placeholder-zinc-400 focus:outline-none focus:border-immune-green focus:ring-1 focus:ring-immune-green/20 transition-colors"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block font-mono text-[11px] uppercase tracking-[0.14em] text-zinc-500 mb-1.5">Phone</label>
                <input
                  type="tel"
                  name="phone"
                  value={form.phone}
                  onChange={handleChange}
                  placeholder="+91 XXXXX XXXXX"
                  className="w-full h-11 px-4 rounded-md border border-zinc-200 bg-zinc-50 text-zinc-900 text-[14px] placeholder-zinc-400 focus:outline-none focus:border-immune-green focus:ring-1 focus:ring-immune-green/20 transition-colors"
                />
              </div>
              <div>
                <label className="block font-mono text-[11px] uppercase tracking-[0.14em] text-zinc-500 mb-1.5">Company</label>
                <input
                  type="text"
                  name="company"
                  value={form.company}
                  onChange={handleChange}
                  placeholder="Your company"
                  className="w-full h-11 px-4 rounded-md border border-zinc-200 bg-zinc-50 text-zinc-900 text-[14px] placeholder-zinc-400 focus:outline-none focus:border-immune-green focus:ring-1 focus:ring-immune-green/20 transition-colors"
                />
              </div>
            </div>
            <div>
              <label className="block font-mono text-[11px] uppercase tracking-[0.14em] text-zinc-500 mb-1.5">Message *</label>
              <textarea
                name="message"
                required
                value={form.message}
                onChange={handleChange}
                rows={4}
                placeholder="Tell us about your project and security needs..."
                className="w-full px-4 py-3 rounded-md border border-zinc-200 bg-zinc-50 text-zinc-900 text-[14px] placeholder-zinc-400 focus:outline-none focus:border-immune-green focus:ring-1 focus:ring-immune-green/20 transition-colors resize-none"
              />
            </div>
            <button
              type="submit"
              className="mt-2 w-full inline-flex items-center justify-center gap-2 h-12 rounded-full bg-immune-green text-black font-display font-semibold text-[15px] hover:bg-[#82d600] transition-colors"
            >
              Submit
              <LIcon name="ArrowRight" size={16} strokeWidth={2.25} />
            </button>
            <p className="text-center text-zinc-400 text-[12px] mt-1">
              Your query will be sent to <span className="text-zinc-600">sales@immunebytes.com</span>
            </p>
          </form>
        )}
      </div>
    </div>
  );
}
