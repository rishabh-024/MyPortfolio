import { useState, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { FaExternalLinkAlt, FaChevronDown } from "react-icons/fa";

function Certifications() {
  const certificateList = [
    {
      title: "Cisco Python Essentials I",
      issuer: "Cisco Networking Academy",
      description:
        "Successfully completed Cisco's Python Essentials I course, demonstrating proficiency in foundational Python programming concepts, including data types, I/O, and control flow.",
      year: "2025",
      view: "https://www.credly.com/badges/fa93b779-046b-47c6-8fe2-dd9c99ea3f79/public_url",
    },
    {
      title: "Cisco Python Essentials II",
      issuer: "Cisco Networking Academy",
      description:
        "Mastered advanced Python concepts, including modules, packages, object-oriented programming, and file processing, by completing the second course in the Cisco Python series.",
      year: "2025",
      view: "https://www.credly.com/badges/4ae1c2db-49b6-4157-b4f8-991c31e47abd/public_url",
    },
    {
      title: "MongoDB Basics",
      issuer: "MongoDB University",
      description:
        "Acquired essential skills in NoSQL database operations, data modeling, and the Aggregation Framework through hands-on training with MongoDB.",
      year: "2025",
      view: "https://www.credly.com/badges/5fb92a17-01db-4507-8922-4f690ef8960a/public_url",
    },
    {
      title: "Analyze Sentiment with Natural Language API",
      issuer: "Google Cloud",
      description:
        "Earned a skill badge for using Google Cloud's NLP tools in machine learning projects, demonstrating strong team collaboration and delivering high-impact results.",
      year: "2025",
      view: "https://www.credly.com/badges/c866c600-75c9-4a7f-8362-86097d9ac2fb/public_url",
    },
  ];

  const [activeIndex, setActiveIndex] = useState(0);
  const [expandedMobile, setExpandedMobile] = useState(null);

  const displayCardVariants = {
    hidden: { opacity: 0, y: 20, scale: 0.98 },
    visible: { opacity: 1, y: 0, scale: 1, transition: { type: 'spring', duration: 0.6, bounce: 0.2 } },
    exit: { opacity: 0, y: -20, scale: 0.98, transition: { duration: 0.2 } },
  };

  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px 0px" });

  return (
    <section
      ref={ref}
      id="certifications"
      className="relative px-4 sm:px-6 lg:px-8 bg-gray-50 dark:bg-gray-950 scroll-mt-20 overflow-hidden py-16"
    >
      {isInView && (
        <motion.div initial={{opacity: 0}} animate={{opacity: 1}} transition={{duration: 0.5}}>
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, type: "spring" }}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gray-900 dark:text-white">
              Credentials & <span className="text-blue-600 dark:text-amber-300">Certifications</span>
            </h2>
            <p className="mt-4 text-lg text-gray-600 dark:text-gray-400">
              A collection of my validated skills and learning achievements from recognized institutions.
            </p>
          </motion.div>

          <div className="max-w-6xl mx-auto">
            <div className="hidden md:flex gap-10 items-start">
              <div className="w-2/5 space-y-4">
                {certificateList.map((item, idx) => (
                  <motion.button
                    key={idx}
                    onMouseEnter={() => setActiveIndex(idx)}
                    onClick={() => setActiveIndex(idx)}
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: idx * 0.1 }}
                    className={`w-full text-left p-4 rounded-lg transition-all duration-300 border-l-4 ${
                      activeIndex === idx
                        ? 'bg-white dark:bg-gray-800 shadow-lg border-blue-600 dark:border-amber-300 scale-105'
                        : 'bg-transparent dark:bg-transparent border-gray-200 dark:border-gray-700 hover:bg-gray-200/50 dark:hover:bg-gray-800/50'
                    }`}
                  >
                    <h3 className="font-bold text-gray-800 dark:text-gray-100">{item.title}</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{item.issuer}</p>
                  </motion.button>
                ))}
              </div>

              <div className="w-3/5 sticky top-28">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeIndex}
                    variants={displayCardVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    className="relative bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-2xl border border-gray-200/50 dark:border-gray-700/50"
                  >
                    <div className="absolute -inset-4 bg-blue-300/20 dark:bg-amber-400/20 blur-2xl rounded-full -z-10"></div>
                    <span className="text-sm font-semibold text-gray-500 dark:text-gray-400 mb-2 block">{certificateList[activeIndex].year}</span>
                    <h3 className="text-2xl font-bold text-blue-600 dark:text-amber-300 mb-4">{certificateList[activeIndex].title}</h3>
                    <p className="text-gray-700 dark:text-gray-300 mb-6">{certificateList[activeIndex].description}</p>
                    <a href={certificateList[activeIndex].view} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-sm font-semibold text-blue-600 dark:text-amber-300 group">
                      View Credential <FaExternalLinkAlt className="transition-transform group-hover:translate-x-1"/>
                    </a>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>

            <div className="md:hidden space-y-4">
               {certificateList.map((item, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden"
                >
                  <button onClick={() => setExpandedMobile(expandedMobile === idx ? null : idx)} className="w-full flex justify-between items-center p-4 bg-white/80 dark:bg-gray-800/80">
                    <div className="text-left">
                        <h3 className="font-bold text-gray-800 dark:text-gray-100">{item.title}</h3>
                        <p className="text-sm text-gray-500 dark:text-gray-400">{item.issuer}</p>
                    </div>
                    <FaChevronDown className={`transition-transform duration-300 ${expandedMobile === idx ? 'rotate-180' : ''}`} />
                  </button>
                  <AnimatePresence>
                    {expandedMobile === idx && (
                      <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.4, ease: "easeInOut" }} className="bg-white dark:bg-gray-800">
                        <div className="p-4 border-t border-gray-200 dark:border-gray-700">
                          <p className="text-sm text-gray-700 dark:text-gray-300 mb-4">{item.description}</p>
                          <a href={item.view} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-sm font-semibold text-blue-600 dark:text-amber-300">
                           <FaExternalLinkAlt /> View Credential
                          </a>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      )}
    </section>
  );
}

export default Certifications;