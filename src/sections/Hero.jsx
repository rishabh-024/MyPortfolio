import mypic from "../assets/mypic.webp";
import { motion } from "framer-motion";
import { FaDownload, FaPaperPlane } from "react-icons/fa";
import { useState, useEffect } from "react";

const useThemeDetector = () => {

    const [isDark, setIsDark] = useState(() => 
        typeof window !== 'undefined' ? document.documentElement.classList.contains('dark') : false
    );

    useEffect(() => {
        const observer = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
              if (mutation.attributeName === "class") setIsDark(mutation.target.classList.contains('dark'));
            });
        });
        observer.observe(document.documentElement, { attributes: true });
        return () => observer.disconnect();
    }, []);

    return isDark;
};

const SharedWaveAnimation = ({ type = 'hero' }) => {
  const isDark = useThemeDetector();
  const waveColors = isDark 
    ? { c1: 'rgba(30, 41, 59, 0.7)', c2: 'rgba(51, 65, 85, 0.5)', c3: 'rgba(71, 85, 105, 0.3)', c4: 'rgb(15 23 42)' }
    : { c1: 'rgba(255,255,255,0.7)', c2: 'rgba(255,255,255,0.5)', c3: 'rgba(255,255,255,0.3)', c4: '#3b82f6' };

  const waveConfig = {
    hero: {
      className: "hero-diagonal-waves",
      styles: `
        .hero-diagonal-waves { position: absolute; bottom: 0; left: -50%; width: 200%; height: 200%; transform: rotate(-15deg); transform-origin: bottom left; }
        .hero-parallax > use { animation: move-forever-hero 25s linear infinite; }
        @keyframes move-forever-hero { 0% { transform: translate3d(-90px,0,0); } 100% { transform: translate3d(85px,0,0); } }
      `
    },
    footer: {
      className: "footer-diagonal-waves",
      styles: `
        .footer-diagonal-waves { position: absolute; top: 0; left: -50%; width: 200%; height: 200%; transform: rotate(15deg) scaleY(-1); transform-origin: top left; }
        .footer-parallax > use { animation: move-forever-footer 25s linear infinite; }
        @keyframes move-forever-footer { 0% { transform: translate3d(-90px,0,0); } 100% { transform: translate3d(85px,0,0); } }
      `
    }
  };
  
  const currentConfig = waveConfig[type];

  const waveStyles = `
    ${currentConfig.styles}
    .${type}-use-1 { animation-delay: -2s; animation-duration: 8s; fill: ${waveColors.c1}; }
    .${type}-use-2 { animation-delay: -3s; animation-duration: 12s; fill: ${waveColors.c2}; }
    .${type}-use-3 { animation-delay: -4s; animation-duration: 15s; fill: ${waveColors.c3}; }
    .${type}-use-4 { animation-delay: -5s; animation-duration: 22s; fill: ${waveColors.c4}; }
  `;

  return (
    <div className="absolute inset-0 overflow-hidden">
      <style>
        {waveStyles}
      </style>
      <svg className={currentConfig.className} xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink"
        viewBox="0 24 150 28" preserveAspectRatio="none" shapeRendering="auto">
        <defs>
          <path id={`gentle-wave-${type}`} d="M-160 44c30 0 58-18 88-18s 58 18 88 18 58-18 88-18 58 18 88 18 v44h-352z" />
        </defs>
        <g className={`${type}-parallax`}>
          <use className={`${type}-use-1`} xlinkHref={`#gentle-wave-${type}`} x="48" y="0" />
          <use className={`${type}-use-2`} xlinkHref={`#gentle-wave-${type}`} x="48" y="3" />
          <use className={`${type}-use-3`} xlinkHref={`#gentle-wave-${type}`} x="48" y="5" />
          <use className={`${type}-use-4`} xlinkHref={`#gentle-wave-${type}`} x="48" y="7" />
        </g>
      </svg>
    </div>
  );
};


function Hero() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.2, delayChildren: 0.3 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: { opacity: 1, x: 0, transition: { type: 'spring', stiffness: 100 } },
  };

  return (
    <section 
      id="home"
      className="relative w-full py-24 flex items-center bg-gradient-to-br from-blue-100 via-blue-500 to-blue-600 dark:from-gray-800 dark:via-gray-900 dark:to-gray-950 text-white overflow-hidden"
    >
      <SharedWaveAnimation type="hero" />

      <div className="relative z-10 max-w-7xl mx-auto w-full flex flex-col-reverse lg:flex-row items-center justify-center lg:justify-between gap-12 px-6 py-20 pt-24 lg:pt-20">
        
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="flex flex-col items-center lg:items-start text-center lg:text-left gap-4"
        >
          <motion.h1 variants={itemVariants} className="text-4xl sm:text-6xl font-extrabold leading-tight tracking-tight text-gray-900 dark:text-white">
            Hi, I'm{' '}
            <span className="text-blue-700 dark:text-amber-300 drop-shadow-[0_2px_4px_rgba(252,211,77,0.3)]">
              Rishabh
            </span>
          </motion.h1>
          
          <motion.p variants={itemVariants} className="text-lg sm:text-xl font-medium text-gray-800 dark:text-white/90">
            Web Development &middot;{' '}
            <span className="text-blue-700 dark:text-amber-300">
              AI Agents' Development
            </span>
          </motion.p>
          
          <motion.p variants={itemVariants} className="max-w-xl text-md text-gray-700 dark:text-white/80 mt-2 leading-relaxed">
            Final-year B.Tech student specializing in Artificial Intelligence and Machine Learning with hands-on experience in Python,
            Scikit-learn, and TensorFlow.
          </motion.p>

          <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-4 mt-6">
            <motion.a
              href="/resume.pdf"
              download="Rishabh-Giri-Resume.pdf"
              className="inline-flex items-center justify-center gap-2 bg-gray-900 text-white dark:bg-amber-300 dark:text-gray-900 px-8 py-3 rounded-full font-bold shadow-lg"
              whileHover={{ scale: 1.05, y: -5, boxShadow: '0 10px 20px rgba(0,0,0,0.2)' }}
              whileTap={{ scale: 0.95 }}
            >
              <FaDownload />
              Download Resume
            </motion.a>
            
            <motion.a
              href="#contact"
              className="inline-flex items-center justify-center gap-2 border-2 border-gray-900 text-gray-900 dark:border-white/80 dark:text-white px-8 py-3 rounded-full font-bold
                         hover:bg-gray-900 hover:text-white dark:hover:bg-white dark:hover:text-gray-900 transition-colors duration-300"
              whileHover={{ scale: 1.05, y: -5 }}
              whileTap={{ scale: 0.95 }}
            >
              <FaPaperPlane />
              Contact Me
            </motion.a>
          </motion.div>
        </motion.div>

        <div className="flex justify-center items-center">
          <motion.div
            className="relative z-10"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 1.0, ease: 'easeOut' }}
          >
            <motion.img
              src={mypic}
              alt="Rishabh's profile"
              className="relative z-10 h-60 w-60 md:h-72 md:w-72 object-cover rounded-full 
                         shadow-[0_0_40px_rgba(0,0,0,0.2)] dark:shadow-[0_0_50px_rgba(252,211,77,0.3)] border-4 border-white/30"
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;