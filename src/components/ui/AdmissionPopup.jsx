import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, User, Phone, MapPin, CheckCircle2, Send, Loader2 } from 'lucide-react';
import scholarshipPoster from '../../assets/images/pop-up/pop-up-image.png';

const AdmissionPopup = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    contactNumber: '',
    area: '',
  });

  useEffect(() => {
    // Show popup automatically shortly after the website opens
    const timer = setTimeout(() => {
      const hasSeenPopup = sessionStorage.getItem('hasSeenScholarshipPopup');
      if (!hasSeenPopup) {
        setIsVisible(true);
        sessionStorage.setItem('hasSeenScholarshipPopup', 'true');
      }
    }, 1200);

    return () => clearTimeout(timer);
  }, []);

  const handleClose = () => {
    setIsVisible(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMessage('');

    try {
      const response = await fetch('/api/send-email-secure', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          type: 'scholarship_registration',
          data: formData,
        }),
      });

      if (response.ok) {
        setIsSubmitted(true);
      } else {
        const errorData = await response.json().catch(() => ({}));
        setErrorMessage(errorData.message || 'Failed to submit registration. Please try again.');
      }
    } catch (error) {
      console.error('Error submitting scholarship form:', error);
      setErrorMessage('Network connection error. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <div className="fixed inset-0 z-100 flex items-center justify-center p-2.5 sm:p-4 md:p-6 lg:p-8 bg-black/80 backdrop-blur-md font-sans">
          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            transition={{ duration: 0.3 }}
            className="relative w-full max-w-5xl lg:max-w-6xl max-h-[94vh] flex flex-col md:flex-row bg-[#0B1221] rounded-2xl md:rounded-3xl shadow-2xl border border-white/10 overflow-hidden"
          >
            {/* Ambient Glow Effects */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              <div className="absolute top-0 right-0 w-80 h-80 bg-yellow-400/15 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/3" />
              <div className="absolute bottom-0 left-0 w-80 h-80 bg-blue-500/15 rounded-full blur-[120px] translate-y-1/3 -translate-x-1/3" />
            </div>

            {/* Close Button */}
            <button
              onClick={handleClose}
              aria-label="Close popup"
              className="absolute top-3 right-3 md:top-4 md:right-4 z-30 text-gray-300 hover:text-white transition-colors p-2 bg-black/60 md:bg-white/5 rounded-full hover:bg-white/15 backdrop-blur-md border border-white/15 cursor-pointer"
            >
              <X size={20} />
            </button>

            {/* Scrollable Container for Mobile + Split Layout for Desktop */}
            <div className="relative z-10 flex flex-col md:flex-row w-full max-h-[94vh] overflow-y-auto md:overflow-hidden">
              
              {/* LEFT SIDE: Event Poster Image (Enlarged) */}
              <div className="w-full md:w-[52%] lg:w-[54%] bg-[#070C17] flex items-center justify-center p-3 sm:p-4 md:p-5 lg:p-6 border-b md:border-b-0 md:border-r border-white/10 shrink-0">
                <img
                  src={scholarshipPoster}
                  alt="District Level Merit Scholarship Examination 2026 - The Krisar Academy"
                  className="w-full h-auto max-h-[48vh] sm:max-h-[54vh] md:max-h-[82vh] lg:max-h-[86vh] object-contain rounded-xl sm:rounded-2xl shadow-xl"
                />
              </div>

              {/* RIGHT SIDE: 3-Field Registration Form */}
              <div className="w-full md:w-[48%] lg:w-[46%] p-6 sm:p-8 md:p-8 lg:p-10 flex flex-col justify-center md:overflow-y-auto">
                {!isSubmitted ? (
                  <>
                    {/* Event Badge */}
                    <div className="inline-flex items-center self-start bg-yellow-400/10 border border-yellow-400/30 text-yellow-400 font-bold py-1 px-3.5 rounded-full mb-3.5 sm:mb-4 uppercase tracking-wider text-[11px] sm:text-xs">
                      22 Nov 2026 • Grades V – X
                    </div>

                    {/* Heading */}
                    <h2 className="text-xl sm:text-2xl md:text-3xl font-black text-white leading-snug mb-2 sm:mb-2.5">
                      Register for{' '}
                      <span className="text-transparent bg-clip-text bg-linear-to-r from-yellow-300 to-yellow-500">
                        Scholarship Exam
                      </span>
                    </h2>
                    <p className="text-gray-400 text-xs sm:text-sm leading-relaxed mb-6 sm:mb-7">
                      Win up to 100% scholarship & cash prizes. Fill in your details below to reserve your seat.
                    </p>

                    {/* Form with 3 Required Fields */}
                    <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
                      {/* Field 1: Name */}
                      <div>
                        <label
                          htmlFor="student-name"
                          className="block text-xs font-semibold uppercase tracking-wider text-gray-300 mb-2"
                        >
                          Student Name <span className="text-red-400">*</span>
                        </label>
                        <div className="relative">
                          <User
                            size={18}
                            className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400"
                          />
                          <input
                            id="student-name"
                            type="text"
                            name="name"
                            required
                            value={formData.name}
                            onChange={handleChange}
                            placeholder="Enter student full name"
                            className="w-full pl-10.5 pr-4 py-2.5 sm:py-3 bg-white/5 border border-white/15 rounded-xl text-white placeholder-gray-500 text-sm focus:outline-none focus:border-yellow-400 focus:ring-1 focus:ring-yellow-400 transition"
                          />
                        </div>
                      </div>

                      {/* Field 2: Contact Number */}
                      <div>
                        <label
                          htmlFor="contact-number"
                          className="block text-xs font-semibold uppercase tracking-wider text-gray-300 mb-2"
                        >
                          Contact Number <span className="text-red-400">*</span>
                        </label>
                        <div className="relative">
                          <Phone
                            size={18}
                            className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400"
                          />
                          <input
                            id="contact-number"
                            type="tel"
                            name="contactNumber"
                            required
                            pattern="[0-9]{10}"
                            maxLength={10}
                            value={formData.contactNumber}
                            onChange={handleChange}
                            placeholder="10-digit mobile number"
                            className="w-full pl-10.5 pr-4 py-2.5 sm:py-3 bg-white/5 border border-white/15 rounded-xl text-white placeholder-gray-500 text-sm focus:outline-none focus:border-yellow-400 focus:ring-1 focus:ring-yellow-400 transition"
                          />
                        </div>
                      </div>

                      {/* Field 3: Area / Location */}
                      <div>
                        <label
                          htmlFor="student-area"
                          className="block text-xs font-semibold uppercase tracking-wider text-gray-300 mb-2"
                        >
                          Area / Location <span className="text-red-400">*</span>
                        </label>
                        <div className="relative">
                          <MapPin
                            size={18}
                            className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400"
                          />
                          <input
                            id="student-area"
                            type="text"
                            name="area"
                            required
                            value={formData.area}
                            onChange={handleChange}
                            placeholder="e.g., Timiri, Arcot, Ranipet..."
                            className="w-full pl-10.5 pr-4 py-2.5 sm:py-3 bg-white/5 border border-white/15 rounded-xl text-white placeholder-gray-500 text-sm focus:outline-none focus:border-yellow-400 focus:ring-1 focus:ring-yellow-400 transition"
                          />
                        </div>
                      </div>

                      {/* Error Message */}
                      {errorMessage && (
                        <div className="p-3 rounded-xl bg-red-500/15 border border-red-500/30 text-red-300 text-xs text-center">
                          {errorMessage}
                        </div>
                      )}

                      {/* Submit Button */}
                      <div className="pt-2 sm:pt-3">
                        <button
                          type="submit"
                          disabled={isSubmitting}
                          className="w-full flex items-center justify-center gap-2 px-6 py-3 sm:py-3.5 text-sm sm:text-base bg-yellow-400 hover:bg-yellow-500 text-[#0B1221] font-bold rounded-xl transition-all hover:scale-[1.01] active:scale-[0.99] shadow-[0_4px_24px_rgba(250,204,21,0.25)] disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer"
                        >
                          {isSubmitting ? (
                            <>
                              <Loader2 size={18} className="animate-spin" />
                              <span>Submitting...</span>
                            </>
                          ) : (
                            <>
                              <span>Register Now</span>
                              <Send size={17} />
                            </>
                          )}
                        </button>
                      </div>
                    </form>
                  </>
                ) : (
                  /* Confirmation State After Submission */
                  <div className="text-center py-6 sm:py-10 flex flex-col items-center">
                    <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-green-500/15 border border-green-500/30 flex items-center justify-center text-green-400 mb-4 sm:mb-5">
                      <CheckCircle2 size={32} />
                    </div>
                    <h3 className="text-xl sm:text-2xl font-bold text-white mb-2 sm:mb-3">
                      Registration Received!
                    </h3>
                    <p className="text-gray-300 text-xs sm:text-sm mb-6 sm:mb-8 max-w-xs sm:max-w-sm leading-relaxed">
                      Thank you, <span className="text-yellow-400 font-semibold">{formData.name}</span>. Our team will contact you shortly regarding the exam on <strong className="text-white">22 November 2026</strong>.
                    </p>
                    <button
                      onClick={handleClose}
                      className="px-6 py-2.5 sm:py-3 bg-white/10 hover:bg-white/15 text-white text-sm font-semibold rounded-xl border border-white/15 transition cursor-pointer"
                    >
                      Done
                    </button>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default AdmissionPopup;
