import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface SponsorFormModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function SponsorFormModal({ isOpen, onClose }: SponsorFormModalProps) {
  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"
          />

          {/* Modal Container */}
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="w-full max-w-lg overflow-hidden rounded-2xl border border-ivory/10 bg-midnight/95 backdrop-blur-sm shadow-2xl pointer-events-auto transform-gpu"
            >
              {/* Header */}
              <div className="relative border-b border-ivory/10 bg-midnight-deep/50 px-6 py-5">
                <h2 className="font-display text-2xl text-ivory">Reach Out to Us</h2>
                <p className="mt-1 text-sm text-ivory/60">
                  Send your sponsorship inquiry directly to the organizing committee.
                </p>
                <button
                  onClick={onClose}
                  className="absolute right-4 top-4 rounded-full p-2 text-ivory/40 hover:bg-white/5 hover:text-ivory transition"
                  aria-label="Close modal"
                >
                  <svg
                    width="24"
                    height="24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M18 6L6 18M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {/* Form */}
              <div className="p-6">
                <form
                  action="https://formsubmit.co/ieeecomputersocietysrmist@gmail.com"
                  method="POST"
                  className="space-y-4"
                >
                  {/* FormSubmit Configuration */}
                  <input
                    type="hidden"
                    name="_subject"
                    value="New Sponsorship Inquiry - AICSSYC 2026"
                  />
                  <input type="hidden" name="_template" value="table" />
                  {/* Optional: Add a success redirect url here if needed */}
                  {/* <input type="hidden" name="_next" value="https://aicssyc.vercel.app/thanks" /> */}

                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div className="space-y-1.5">
                      <label
                        htmlFor="company"
                        className="text-xs font-medium text-ivory/80 uppercase tracking-wider"
                      >
                        Company / Org
                      </label>
                      <input
                        type="text"
                        name="Company"
                        id="company"
                        required
                        placeholder="Acme Corp"
                        className="w-full rounded-md border border-ivory/10 bg-midnight-deep/50 px-4 py-2.5 text-sm text-ivory placeholder:text-ivory/20 focus:border-gold/50 focus:outline-none focus:ring-1 focus:ring-gold/50 transition"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label
                        htmlFor="name"
                        className="text-xs font-medium text-ivory/80 uppercase tracking-wider"
                      >
                        Contact Person
                      </label>
                      <input
                        type="text"
                        name="Name"
                        id="name"
                        required
                        placeholder="Jane Doe"
                        className="w-full rounded-md border border-ivory/10 bg-midnight-deep/50 px-4 py-2.5 text-sm text-ivory placeholder:text-ivory/20 focus:border-gold/50 focus:outline-none focus:ring-1 focus:ring-gold/50 transition"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label
                      htmlFor="email"
                      className="text-xs font-medium text-ivory/80 uppercase tracking-wider"
                    >
                      Email Address
                    </label>
                    <input
                      type="email"
                      name="Email"
                      id="email"
                      required
                      placeholder="jane@example.com"
                      className="w-full rounded-md border border-ivory/10 bg-midnight-deep/50 px-4 py-2.5 text-sm text-ivory placeholder:text-ivory/20 focus:border-gold/50 focus:outline-none focus:ring-1 focus:ring-gold/50 transition"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label
                      htmlFor="tier"
                      className="text-xs font-medium text-ivory/80 uppercase tracking-wider"
                    >
                      Sponsorship Tier Interest
                    </label>
                    <select
                      name="Tier"
                      id="tier"
                      required
                      className="w-full rounded-md border border-ivory/10 bg-midnight-deep px-4 py-2.5 text-sm text-ivory focus:border-gold/50 focus:outline-none focus:ring-1 focus:ring-gold/50 transition appearance-none"
                    >
                      <option value="" disabled selected>
                        Select a package...
                      </option>
                      <option value="Title Sponsor (₹2,00,000)">Title Sponsor (₹2,00,000)</option>
                      <option value="Diamond Sponsor (₹1,50,000)">
                        Diamond Sponsor (₹1,50,000)
                      </option>
                      <option value="Gold Sponsor (₹1,00,000)">Gold Sponsor (₹1,00,000)</option>
                      <option value="Silver Sponsor (₹50,000)">Silver Sponsor (₹50,000)</option>
                      <option value="Customized Sponsor">Customized / In-Kind Partner</option>
                      <option value="Undecided / Let's Talk">Undecided / Let's Talk</option>
                    </select>
                  </div>

                  <div className="space-y-1.5">
                    <label
                      htmlFor="message"
                      className="text-xs font-medium text-ivory/80 uppercase tracking-wider"
                    >
                      Message
                    </label>
                    <textarea
                      name="Message"
                      id="message"
                      rows={4}
                      placeholder="Tell us a bit about how you'd like to collaborate..."
                      className="w-full resize-none rounded-md border border-ivory/10 bg-midnight-deep/50 px-4 py-2.5 text-sm text-ivory placeholder:text-ivory/20 focus:border-gold/50 focus:outline-none focus:ring-1 focus:ring-gold/50 transition"
                    />
                  </div>

                  <div className="pt-2">
                    <button
                      type="submit"
                      className="w-full rounded-sm bg-gold px-8 py-3.5 text-sm font-semibold text-midnight hover:bg-gold-soft transition shadow-[0_0_20px_rgba(212,166,60,0.2)]"
                    >
                      Send Inquiry
                    </button>
                    <p className="mt-3 text-center text-[10px] text-ivory/40">
                      By submitting, you agree to let our team contact you regarding AICSSYC 2026.
                    </p>
                  </div>
                </form>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
