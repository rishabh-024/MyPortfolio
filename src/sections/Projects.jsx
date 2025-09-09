import { useState, useRef } from "react";
import { FaGithub } from "react-icons/fa";
import { motion, AnimatePresence, useInView } from "framer-motion";

function Projects() {
  const projectData = [
    {
      title: "DeepWave",
      description:
        "Developed a sound therapy web application to help users manage stress, anxiety, and depression through personalized calming audio experiences.",
      tech: ["React.jsx", "TailwindCSS", "APIs", "Node.js", "MongoDB", "Express.js","VS Code"],
      github: "https://github.com/rishabh-024/DeepWave",
    },
    {
      title: "Portfolio Website",
      description:
        "My personal portfolio, designed and built to showcase my skills and projects using modern frontend technologies.",
      tech: ["React.jsx", "TailwindCSS", "Framer Motion"],
      github: "https://github.com/rishabh-024/MyPortfolio",
    },
    {
      title: "Tumor Detector",
      description:
        "A deep learning model to detect brain tumors from MRI scans using a custom CNN-based architecture.",
      tech: ["Python", "TensorFlow", "Keras", "Matplotlib","Goolge Colab"],
      github: "https://github.com/rishabh-024/DeepDetect",
    },
    {
      title: "EduNest",
      description:
        "A modern eCommerce web app for stationery products, designed with a clean interface and smooth navigation to make online shopping simple, stylish, and user-friendly.",
        tech: ["HTML", "CSS", "JavaScript"],
      github: "https://github.com/rishabh-024/Online_Stationary",
    },
    {
      title: "Emotion Detector",
      description:
        "An emotion detection system that captures live facial expressions and classifies human emotions in real-time.",
      tech: ["Python", "MobileNet", "OpenCV"],
      github: "https://github.com/rishabh-024/Emotion-Detector",
    },
    {
      title: "Cosmic Explorer",
      description:
        "A fully interactive educational web application that brings the solar system to life for students.",
      tech: ["React.jsx", "TailwindCSS", "JavaScript"],
      github: "https://github.com/rishabh-024/Cosmic-Explorer",
    },
  ];

  const [activeFilter, setActiveFilter] = useState("All");
  const filters = ["All", ...new Set(projectData.flatMap(p => p.tech))];
  const filteredProjects = activeFilter === "All"
    ? projectData
    : projectData.filter(project => project.tech.includes(activeFilter));

  const cardVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.5 } },
    exit: { y: -30, opacity: 0, transition: { duration: 0.3 } }
  };

  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px 0px" });

  return (
    <section
      ref={ref}
      id="projects"
      className="relative py-24 px-4 sm:px-6 lg:px-8 bg-gray-50 dark:bg-gray-950 scroll-mt-20 overflow-hidden min-h-screen"
    >
      {isInView && (
        <motion.div initial={{opacity: 0}} animate={{opacity: 1}} transition={{duration: 0.5}}>
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, type: "spring" }}
            className="text-center max-w-3xl mx-auto mb-12"
          >
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gray-900 dark:text-white">
              Featured <span className="text-blue-600 dark:text-amber-300">Creations</span>
            </h2>
            <p className="mt-4 text-lg text-gray-600 dark:text-gray-400">
              A curated selection of my work. Use the filters to explore projects by technology.
            </p>
          </motion.div>

          <div className="flex flex-wrap justify-center gap-2 sm:gap-4 mb-12">
            {filters.map((filter) => (
              <motion.button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`relative px-4 py-2 text-sm sm:text-base font-semibold rounded-full transition-colors duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500 dark:focus-visible:ring-offset-gray-950 dark:focus-visible:ring-amber-400
                ${activeFilter === filter ? 'text-white' : 'text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-800'}`}
              >
                {activeFilter === filter && (
                  <motion.div
                    layoutId="activeFilter"
                    className="absolute inset-0 bg-blue-600 dark:bg-amber-400 rounded-full"
                    transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                  />
                )}
                <span className="relative z-10">{filter}</span>
              </motion.button>
            ))}
          </div>

          <motion.div
            layout
            className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 max-w-7xl mx-auto"
          >
            <AnimatePresence>
              {filteredProjects.map((project) => (
                <motion.div
                  key={project.title}
                  layout
                  variants={cardVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  className="group relative flex flex-col justify-between bg-white dark:bg-gray-800/80 rounded-2xl shadow-lg border border-gray-200/50 dark:border-gray-700/50 overflow-hidden"
                >
                  <div className="absolute inset-0 border-2 border-transparent rounded-2xl group-hover:border-blue-400 dark:group-hover:border-amber-400 transition-all duration-300 -z-10 scale-95 group-hover:scale-100 opacity-0 group-hover:opacity-100 blur-sm"></div>
                  <div className="p-6 flex-grow">
                    <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-2">{project.title}</h3>
                    <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">{project.description}</p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.tech.map((tech) => (
                        <span key={tech} className="text-xs bg-blue-100 text-blue-800 px-3 py-1 rounded-full font-medium dark:bg-gray-700 dark:text-amber-200">{tech}</span>
                      ))}
                    </div>
                  </div>
                  <div className="p-6 pt-0">
                    {project.github && (
                      <a href={project.github} target="_blank" rel="noopener noreferrer" className="text-sm text-blue-600 dark:text-amber-300 hover:underline flex items-center gap-2 font-semibold">
                        <FaGithub className="text-lg" /> View on GitHub
                      </a>
                    )}
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </motion.div>
      )}
    </section>
  );
}

export default Projects;