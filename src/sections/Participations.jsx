import { useRef } from "react";
import { motion, useScroll, useSpring, useInView } from "framer-motion";
import { FaCode, FaUsers, FaLaptopCode, FaTrophy, FaExternalLinkAlt } from "react-icons/fa";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.3, delayChildren: 0.2 },
  },
};

const cardVariants = (isLeft) => ({
  hidden: { opacity: 0, x: isLeft ? -150 : 150 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { type: "spring", stiffness: 100, damping: 20 },
  },
});

function Participation() {
    const events = [
        {
        title: "CODE HUSTLE",
        category: "Codeathon",
        description:
            "Actively performed in 24 hours Codeathon, Solving coding problems with like minded competitors",
        icon: <FaCode />,
        date: "14 JUNE 2024",
        view: "https://drive.google.com/file/d/10HZ7HvmwoLPvK_zo0GhpI3tHVM0tZlLv/view?usp=drive_link",
        },
        {
        title: "Code Blaze 2.0",
        category: "Codeathon",
        description:
            "Competed in a fast-paced coding sprint, solving algorithmic challenges and optimizing solutions under strict deadlines.",
        icon: <FaCode />,
        date: "11 APRIL 2025",
        view: "https://drive.google.com/file/d/1uTdf0QCum-CobYpa0v6ZPzo7H-Q3rq4Q/view?usp=drive_link",
        },
        {
        title: "DebateSphere Participation",
        category: "Debate",
        description:
            "Showcased strong critical thinking and persuasive communication skills in a formal debate on emerging tech ethics.",
        icon: <FaUsers />,
        date: "25 APRIL 2025",
        view: "https://drive.google.com/file/d/1N0tHwOLO3CP8Dx03MBz_KAuwFC1Y8--y/view?usp=sharing",
        },
        {
        title: "TRAILER MAKING COMPETITION BY NETFLIX | FICCI",
        category: "Competition",
        description:
            "Actively participated in Trailer Making Comprtition organised by Netflix and FICCI. Grateful to be part of the FICCI Trailer Making Competition at WAVES 2025",
        icon: <FaTrophy />,
        date: "30 April 2025",
        view:"https://www.verix.io/credential/64798734-cafe-4203-89b5-03fb0100f980/"
        },
        {
        title: "HackIndia Regional Finalist",
        category: "Hackathon",
        description:
            "Collaborated as a frontend developer to build 'PathPilot' – an AI-powered platform providing personalized career guidance and structured roadmaps for students.",
        icon: <FaLaptopCode />,
        date: "9 MAY 2025",
        view: "https://drive.google.com/file/d/1OPrDCcrtaauAct5y083WyaZTi1ETu1oS/view?usp=drive_link",
        },      
    ];

    const ref = useRef(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start end", "end start"],
    });

    const scaleY = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001,
    });

    const isInView = useInView(ref, { once: true, margin: "-100px 0px" });

    return(
        <section
            ref={ref}
            id="participations"
            className="relative bg-gray-50 dark:bg-gray-950 py-24 px-4 sm:px-6 lg:px-8 scroll-mt-20 min-h-screen"
        >
            {isInView && (
              <motion.div initial={{opacity: 0}} animate={{opacity: 1}} transition={{duration: 0.5}}>
                <motion.div
                  initial={{ opacity: 0, y: -50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, type: "spring" }}
                  className="text-center max-w-3xl mx-auto mb-20"
                >
                  <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gray-900 dark:text-white">
                    My Journey & <span className="text-blue-600 dark:text-amber-300">Achievements</span>
                  </h2>
                  <p className="mt-4 text-lg text-gray-600 dark:text-gray-400">
                    Timeline of Hackathons, Competitions & Key Events
                  </p>
                </motion.div>

                <motion.div
                  className="relative max-w-5xl mx-auto"
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                >
                  <motion.div
                    className="absolute left-4 md:left-1/2 w-1 -ml-0.5 h-full bg-blue-200 dark:bg-gray-700 origin-top"
                    style={{ scaleY }}
                  />

                  <div className="space-y-12">
                    {events.map((event, idx) => {
                      const isLeft = idx % 2 === 0;
                      return (
                        <motion.div
                          key={idx}
                          className="relative flex items-center w-full group"
                          variants={cardVariants(isLeft)}
                        >
                          <div className="absolute left-4 md:left-1/2 transform -translate-x-1/2 z-10">
                            <div className="flex items-center justify-center bg-gray-50 dark:bg-gray-950 w-14 h-14 rounded-full border-4 border-blue-600 dark:border-amber-300">
                               <span className="text-2xl text-blue-600 dark:text-amber-300">{event.icon}</span>
                            </div>
                          </div>

                          <div className={`w-full pl-20 md:pl-0 md:w-5/12 ${isLeft ? 'md:pr-12' : 'md:pl-12 md:ml-auto'}`}>
                            <motion.div
                               whileHover={{ scale: 1.03, rotate: isLeft ? 1 : -1, boxShadow: "0 10px 30px -5px rgba(0,0,0,0.2)" }}
                               transition={{ type: "spring", stiffness: 300, damping: 15 }}
                               className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-md rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden"
                            >
                              <div className="h-2 bg-blue-600 dark:bg-amber-300"></div>
                              <div className="p-6">
                                <div className="flex justify-between items-start mb-2">
                                   <span className="text-xs font-bold uppercase tracking-wider text-blue-700 dark:text-amber-400">{event.category}</span>
                                   <span className="text-xs font-semibold text-gray-500 dark:text-gray-400">{event.date}</span>
                                </div>
                                <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-2">{event.title}</h3>
                                <p className="text-sm text-gray-700 dark:text-gray-300 mb-4">{event.description}</p>
                                {event.view && (
                                  <a href={event.view} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-sm font-semibold text-blue-600 dark:text-amber-300 group-hover:underline">
                                    View Certificate <FaExternalLinkAlt className="transition-transform group-hover:translate-x-1"/>
                                  </a>
                                )}
                              </div>
                            </motion.div>
                          </div>
                        </motion.div>
                      );
                    })}
                  </div>
                </motion.div>
              </motion.div>
            )}
        </section>
    );
}

export default Participation;