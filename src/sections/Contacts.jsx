import { useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import { FaEnvelope, FaPaperPlane, FaGithub, FaLinkedin, FaMapMarkerAlt, FaPhoneAlt } from "react-icons/fa";
import { FiCheckCircle, FiAlertCircle } from "react-icons/fi";
import { motion, AnimatePresence, useInView } from "framer-motion";

const InputField = ({ name, type, label }) => (
    <div className="relative z-0">
      <input
        type={type}
        name={name}
        required
        className="peer block w-full appearance-none border-0 border-b-2 border-gray-300 bg-transparent py-2.5 px-0 text-sm text-gray-900 focus:border-blue-600 focus:outline-none focus:ring-0 dark:border-gray-600 dark:text-white dark:focus:border-amber-400"
        placeholder=" "
      />
      <label
        className="absolute top-3 -z-10 origin-[0] -translate-y-6 scale-75 transform text-sm text-gray-500 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:left-0 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:text-blue-600 dark:text-gray-400 dark:peer-focus:text-amber-400"
      >
        {label}
      </label>
    </div>
);

const TextareaField = ({ name, label }) => (
    <div className="relative z-0">
        <textarea
            rows="4"
            name={name}
            required
            className="peer block w-full appearance-none border-0 border-b-2 border-gray-300 bg-transparent py-2.5 px-0 text-sm text-gray-900 focus:border-blue-600 focus:outline-none focus:ring-0 dark:border-gray-600 dark:text-white dark:focus:border-amber-400"
            placeholder=" "
        ></textarea>
        <label
            className="absolute top-3 -z-10 origin-[0] -translate-y-6 scale-75 transform text-sm text-gray-500 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:left-0 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:text-blue-600 dark:text-gray-400 dark:peer-focus:text-amber-400"
        >
            {label}
        </label>
    </div>
);


function Contact() {
  const form = useRef();
  const [toast, setToast] = useState({ show: false, message: '', type: '' });
  const [isSending, setIsSending] = useState(false);
  
  const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
  const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
  const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

  const sendEmail = (e) => {
    e.preventDefault();
    setIsSending(true);

    emailjs.sendForm(serviceId, templateId, form.current, publicKey)
      .then(() => {
          setToast({ show: true, message: 'Message sent successfully!', type: 'success' });
          form.current.reset();
        },
        (error) => {
          console.error("EmailJS Error:", error);
          setToast({ show: true, message: 'Something went wrong.', type: 'error' });
        }
      )
      .finally(() => {
        setIsSending(false);
        setTimeout(() => setToast({ show: false, message: '', type: '' }), 5000);
      });
  };

  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px 0px" });

  return (
    <>
      <section ref={ref} id="contact" className="relative py-24 px-4 sm:px-6 lg:px-8 bg-gray-50 dark:bg-gray-950 scroll-mt-20 overflow-hidden">
       {isInView && (
        <motion.div initial={{opacity: 0}} animate={{opacity: 1}} transition={{duration: 0.5}}>
            <div className="max-w-6xl mx-auto relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: -50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, type: "spring" }}
                    className="text-center mb-16"
                >
                    <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gray-900 dark:text-white">
                        Get In <span className="text-blue-600 dark:text-amber-300">Touch</span>
                    </h2>
                    <p className="mt-4 text-lg text-gray-600 dark:text-gray-400">
                        Have a question or want to work together? I’d love to hear from you.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 bg-white/60 dark:bg-gray-800/60 backdrop-blur-xl p-8 rounded-2xl shadow-2xl border border-gray-200/50 dark:border-gray-700/50">
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, ease: 'easeOut' }}
                        className="flex flex-col justify-between"
                    >
                        <div>
                            <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">Contact Information</h3>
                            <div className="space-y-4 text-gray-700 dark:text-gray-300">
                                <a href="mailto:rishabhgiri054@gmail.com" className="flex items-center gap-4 group">
                                    <FaEnvelope className="text-blue-600 dark:text-amber-300 text-xl"/>
                                    <span className="group-hover:underline">rishabhgiri054@gmail.com</span>
                                </a>
                                <div className="flex items-center gap-4">
                                    <FaPhoneAlt className="text-blue-600 dark:text-amber-300 text-xl" />
                                    <span>+91 9654839097</span>
                                </div>
                                <div className="flex items-center gap-4">
                                    <FaMapMarkerAlt className="text-blue-600 dark:text-amber-300 text-xl" />
                                    <span>Faridabad, Haryana, India</span>
                                </div>
                            </div>
                        </div>
                        <div className="mt-8">
                            <h4 className="font-bold text-gray-800 dark:text-white mb-4">Follow Me</h4>
                            <div className="flex gap-6">
                                <motion.a href="https://github.com/rishabbh-024" target="_blank" rel="noopener noreferrer" whileHover={{ y: -4, scale: 1.1 }} className="text-3xl text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-amber-300"><FaGithub /></motion.a>
                                <motion.a href="https://www.linkedin.com/in/rishabh-giri-rg024/" target="_blank" rel="noopener noreferrer" whileHover={{ y: -4, scale: 1.1 }} className="text-3xl text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-amber-300"><FaLinkedin /></motion.a>
                            </div>
                        </div>
                    </motion.div>
                    
                    <motion.form
                        ref={form}
                        onSubmit={sendEmail}
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, ease: 'easeOut' }}
                        className="space-y-8"
                    >
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                            <InputField name="from_name" type="text" label="Your Name" />
                            <InputField name="from_email" type="email" label="Your Email" />
                        </div>
                        <InputField name="subject" type="text" label="Subject" />
                        <TextareaField name="message" label="Your Message" />
                        <motion.button
                            type="submit" disabled={isSending}
                            className="w-full inline-flex items-center justify-center gap-3 bg-blue-600 text-white px-8 py-3 rounded-full font-bold shadow-lg hover:bg-blue-700 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed dark:bg-amber-400 dark:text-gray-900 dark:hover:bg-amber-500"
                            whileHover={{ scale: 1.05, y: -2 }} whileTap={{ scale: 0.95 }}
                        >
                            {isSending ? (
                                <>
                                    <div className="w-5 h-5 border-2 border-white/50 border-t-white rounded-full animate-spin"></div>
                                    <span>Sending...</span>
                                </>
                            ) : (
                                <>
                                    <FaPaperPlane />
                                    <span>Send Message</span>
                                </>
                            )}
                        </motion.button>
                    </motion.form>
                </div>
            </div>
        </motion.div>
       )}
      </section>

      <AnimatePresence>
        {toast.show && (
          <motion.div
            initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 20 }}
            className="fixed bottom-5 right-5 w-full max-w-sm p-4 rounded-xl shadow-lg text-white z-[9999]"
            style={{ backgroundColor: toast.type === 'success' ? '#22c55e' : '#ef4444' }}
          >
            <div className="flex items-center gap-3">
              {toast.type === 'success' ? <FiCheckCircle className="text-2xl"/> : <FiAlertCircle className="text-2xl"/>}
              <span>{toast.message}</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default Contact;