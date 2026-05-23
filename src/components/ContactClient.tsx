"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, Mail, MapPin, Phone, Send, Check, MessageSquare, Building2, Package } from "lucide-react";
import Navbar from "./Navbar";
import Footer from "./Footer";

const inquiryTypes = [
  { id: "wholesale", label: "Wholesale Inquiry", icon: Building2 },
  { id: "custom", label: "Custom Engraving", icon: MessageSquare },
  { id: "bulk", label: "Bulk Order (1000+)", icon: Package },
  { id: "other", label: "Other", icon: Mail },
];

export default function ContactClient() {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    company: "",
    type: "wholesale",
    quantity: "",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In production, this would send to an API endpoint
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />

      <div className="pt-28 pb-8 px-6 md:px-12 max-w-7xl mx-auto">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-gray-500 hover:text-white transition-colors text-sm mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Home
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Left: Info */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-orange-500 tracking-widest uppercase text-sm font-semibold mb-3">
              Get In Touch
            </p>
            <h1 className="text-4xl md:text-5xl font-serif text-white mb-6">
              Let&apos;s Build Together
            </h1>
            <p className="text-gray-400 leading-relaxed mb-10 max-w-md">
              Whether you are looking for wholesale pricing, custom laser engraving,
              or a bulk order partnership, our B2B team is ready to shield your business.
            </p>

            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center flex-shrink-0">
                  <Mail className="w-5 h-5 text-orange-500" />
                </div>
                <div>
                  <h3 className="text-white font-medium mb-1">Email</h3>
                  <a
                    href="mailto:b2b@standingshield.com"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    b2b@standingshield.com
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center flex-shrink-0">
                  <Phone className="w-5 h-5 text-orange-500" />
                </div>
                <div>
                  <h3 className="text-white font-medium mb-1">Phone</h3>
                  <a
                    href="tel:+18001234567"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    +1 (800) 123-4567
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-5 h-5 text-orange-500" />
                </div>
                <div>
                  <h3 className="text-white font-medium mb-1">Headquarters</h3>
                  <p className="text-gray-400">
                    123 Industrial Park<br />
                    Manufacturing District<br />
                    Global Hub
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right: Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            {submitted ? (
              <div className="bg-white/[0.02] rounded-2xl border border-white/5 p-12 text-center">
                <div className="w-16 h-16 rounded-full bg-green-500/10 flex items-center justify-center mx-auto mb-6">
                  <Check className="w-8 h-8 text-green-500" />
                </div>
                <h2 className="text-2xl font-serif text-white mb-3">
                  Message Sent
                </h2>
                <p className="text-gray-400 mb-8">
                  Thank you for reaching out. Our B2B team will get back to you within 24 hours.
                </p>
                <button
                  onClick={() => {
                    setSubmitted(false);
                    setForm({
                      name: "",
                      email: "",
                      company: "",
                      type: "wholesale",
                      quantity: "",
                      message: "",
                    });
                  }}
                  className="px-6 py-3 bg-white text-black rounded-full font-medium hover:bg-gray-100 transition-colors text-sm"
                >
                  Send Another
                </button>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="bg-white/[0.02] rounded-2xl border border-white/5 p-8 md:p-10 space-y-6"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm text-gray-400 mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      required
                      value={form.name}
                      onChange={handleChange}
                      className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-orange-500/50 transition-colors"
                      placeholder="John Doe"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-400 mb-2">
                      Email *
                    </label>
                    <input
                      type="email"
                      name="email"
                      required
                      value={form.email}
                      onChange={handleChange}
                      className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-orange-500/50 transition-colors"
                      placeholder="john@company.com"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm text-gray-400 mb-2">
                      Company
                    </label>
                    <input
                      type="text"
                      name="company"
                      value={form.company}
                      onChange={handleChange}
                      className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-orange-500/50 transition-colors"
                      placeholder="Acme Inc."
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-400 mb-2">
                      Estimated Quantity
                    </label>
                    <input
                      type="text"
                      name="quantity"
                      value={form.quantity}
                      onChange={handleChange}
                      className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-orange-500/50 transition-colors"
                      placeholder="e.g. 500 units"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm text-gray-400 mb-3">
                    Inquiry Type
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {inquiryTypes.map((type) => (
                      <button
                        key={type.id}
                        type="button"
                        onClick={() =>
                          setForm((prev) => ({ ...prev, type: type.id }))
                        }
                        className={`flex items-center gap-2 px-4 py-3 rounded-lg border text-sm transition-all ${
                          form.type === type.id
                            ? "border-orange-500 bg-orange-500/10 text-white"
                            : "border-white/10 text-gray-400 hover:border-white/20"
                        }`}
                      >
                        <type.icon className="w-4 h-4 flex-shrink-0" />
                        {type.label}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm text-gray-400 mb-2">
                    Message *
                  </label>
                  <textarea
                    name="message"
                    required
                    rows={5}
                    value={form.message}
                    onChange={handleChange}
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-orange-500/50 transition-colors resize-none"
                    placeholder="Tell us about your project, timeline, and any specific requirements..."
                  />
                </div>

                <button
                  type="submit"
                  className="w-full flex items-center justify-center gap-2 px-8 py-4 bg-white text-black rounded-full font-medium hover:bg-gray-100 transition-colors"
                >
                  <Send className="w-4 h-4" />
                  Send Inquiry
                </button>

                <p className="text-xs text-gray-600 text-center">
                  We respect your privacy. Your information will never be shared.
                </p>
              </form>
            )}
          </motion.div>
        </div>
      </div>

      <div className="mt-auto">
        <Footer />
      </div>
    </div>
  );
}
