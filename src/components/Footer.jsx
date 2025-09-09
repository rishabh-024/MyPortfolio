import { FaLinkedin, FaGithub, FaEnvelope, FaArrowUp } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
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
      <style>{waveStyles}</style>
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

function Footer() {
  const currentYear = new Date().getFullYear();
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => {
    if (window.pageYOffset > 300) setIsVisible(true);
    else setIsVisible(false);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  useEffect(() => {
    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  return (
    <footer 
      className="relative bg-gradient-to-br from-blue-100 via-blue-500 to-blue-600 dark:from-gray-800 dark:via-gray-900 dark:to-gray-950
                 py-20 overflow-hidden"
    >
      <SharedWaveAnimation type="footer" />

      <div className="relative z-10 max-w-7xl mx-auto flex flex-col items-center gap-10 text-center px-6">
        
        <h3 className="text-4xl font-bold tracking-wide text-gray-900 dark:text-white">
          Let's <span className="text-blue-600 dark:text-amber-300">Connect</span>
        </h3>
        
        <div className="flex gap-8 text-4xl text-gray-800 dark:text-gray-300">
          <motion.a
            href="https://www.linkedin.com/in/rishabh-giri-rg024/"
            target="_blank" rel="noopener noreferrer"
            whileHover={{ y: -5, scale: 1.1 }} whileTap={{ scale: 0.95 }}
            className="hover:text-blue-600 transition-colors duration-300 dark:hover:text-amber-400"
            aria-label="Connect on LinkedIn"
          ><FaLinkedin /></motion.a>
          
          <motion.a
            href="https://github.com/rishabbh-024"
            target="_blank" rel="noopener noreferrer"
            whileHover={{ y: -5, scale: 1.1 }} whileTap={{ scale: 0.95 }}
            className="hover:text-blue-600 transition-colors duration-300 dark:hover:text-amber-400"
            aria-label="View GitHub profile"
          ><FaGithub /></motion.a>
          
          <motion.a
            href="mailto:rishabhgiri054@gmail.com"
            whileHover={{ y: -5, scale: 1.1 }} whileTap={{ scale: 0.95 }}
            className="hover:text-blue-600 transition-colors duration-300 dark:hover:text-amber-400"
            aria-label="Send an email"
          ><FaEnvelope /></motion.a>
        </div>

        <div className="mt-6 border-t border-gray-600/20 dark:border-white/20 w-full max-w-lg pt-6">
          <p className="text-sm text-gray-700 dark:text-white/80">
            &copy; {currentYear} Rishabh Giri. All Rights Reserved.
          </p>
        </div>
      </div>

      <AnimatePresence>
        {isVisible && (
          <motion.button
            onClick={scrollToTop}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            className="fixed bottom-8 right-8 bg-gray-900 text-white p-4 rounded-full 
                       shadow-xl z-50 hover:scale-110 active:scale-95 transition-transform 
                       dark:bg-amber-400 dark:text-gray-900"
            aria-label="Scroll to top"
          >
            <FaArrowUp className="text-xl" />
          </motion.button>
        )}
      </AnimatePresence>
    </footer>
  );
};

export default Footer;