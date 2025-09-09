import { useRef, useState, useEffect } from "react";
import { motion, AnimatePresence, LayoutGroup } from "framer-motion";
import { FaBars, FaTimes, FaMoon, FaSun } from "react-icons/fa";

const NAV_ITEMS = [
  { label: "Home", id: "home" },
  { label: "Skills", id: "skills" },
  { label: "Projects", id: "projects" },
  { label: "Certifications", id: "certifications" },
  { label: "Participations", id: "participations" },
  { label: "Contact", id: "contact" },
];

function Navbar() {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [hoveredSection, setHoveredSection] = useState(null);
  const [isDarkMode, setDarkMode] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isClickScrolling, setIsClickScrolling] = useState(false);

  const observerRef = useRef(null);
  const scrollTimeoutRef = useRef(null);

  useEffect(() => {
    const storedTheme = localStorage.getItem("theme");
    const initialDark = storedTheme
      ? storedTheme === "dark"
      : window.matchMedia("(prefers-color-scheme: dark)").matches;
    setDarkMode(initialDark);
  }, []);
  useEffect(() => {
    document.documentElement.classList.toggle("dark", isDarkMode);
    localStorage.setItem("theme", isDarkMode ? "dark" : "light");
  }, [isDarkMode]);

  useEffect(() => {
    const handleScroll = () => {
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      setScrollProgress(docHeight > 0 ? (window.scrollY / docHeight) * 100 : 0);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const sections = NAV_ITEMS.map((item) => document.getElementById(item.id)).filter(Boolean);
    if (!sections.length) return;

    if (observerRef.current) observerRef.current.disconnect();

    observerRef.current = new IntersectionObserver(
      (entries) => {
        if (isClickScrolling) return;
        const intersectingEntry = entries.find((entry) => entry.isIntersecting);
        if (intersectingEntry) setActiveSection(intersectingEntry.target.id);
      },
      { rootMargin: "-40% 0px -60% 0px", threshold: 0 }
    );

    sections.forEach((el) => observerRef.current.observe(el));
    return () => observerRef.current?.disconnect();
  }, [isClickScrolling]);

  const handleScrollTo = (id) => (e) => {
    e.preventDefault();
    setActiveSection(id);
    setIsClickScrolling(true);

    const target = document.getElementById(id);
    if (target) {
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    } else if (id === "home") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }

    if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);
    scrollTimeoutRef.current = setTimeout(() => setIsClickScrolling(false), 1000);

    setMobileMenuOpen(false);
  };

  const currentActive = hoveredSection || activeSection;

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <motion.div
        className="fixed top-0 left-0 h-1 w-full origin-left bg-gradient-to-r from-blue-500 to-indigo-500 dark:from-amber-400 dark:to-orange-500 z-50"
        style={{ scaleX: scrollProgress / 100 }}
      />

      <div className="relative w-full flex justify-center px-2 sm:px-4 top-0 left-0 right-0">
        <motion.nav
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ type: "spring", stiffness: 200, damping: 20, delay: 0.2 }}
          className="mt-3 w-full max-w-6xl relative"
        >
          <div className="relative flex items-center justify-between rounded-full border backdrop-blur-lg transition-shadow duration-300 bg-white/70 dark:bg-gray-900/70 shadow-lg border-gray-200/50 dark:border-gray-700/50 px-3 sm:px-6 py-2">
            <button
              onClick={handleScrollTo("home")}
              className="relative px-2 sm:px-4 py-2 text-lg font-extrabold text-gray-800 dark:text-gray-100 hover:scale-105 transition-transform"
            >
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-amber-300 dark:to-orange-400">
                RISHABH
              </span>
            </button>
            <LayoutGroup id="nav">
              <div
                className="hidden md:flex items-center gap-1 relative"
                onMouseLeave={() => setHoveredSection(null)}
              >
                {NAV_ITEMS.map((item) => (
                  <div key={item.id} className="relative">
                    <button
                      onClick={handleScrollTo(item.id)}
                      onMouseEnter={() => setHoveredSection(item.id)}
                      className="relative rounded-full px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300"
                    >
                      {currentActive === item.id && (
                        <motion.div
                          layoutId="nav-pill"
                          className="absolute inset-0 rounded-full bg-blue-100 dark:bg-gray-800"
                          transition={{ type: "spring", stiffness: 300, damping: 30 }}
                        />
                      )}
                      <span className="relative z-10">{item.label}</span>
                    </button>
                  </div>
                ))}
              </div>
            </LayoutGroup>
            <div className="flex items-center gap-2">
              <motion.button
                onClick={() => setDarkMode((d) => !d)}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                aria-label="Toggle theme"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-200/80 dark:border-gray-700/80 bg-white/50 dark:bg-gray-800/50"
              >
                <AnimatePresence mode="wait" initial={false}>
                  <motion.div
                    key={isDarkMode ? "sun" : "moon"}
                    initial={{ opacity: 0, rotate: -90 }}
                    animate={{ opacity: 1, rotate: 0 }}
                    exit={{ opacity: 0, rotate: 90 }}
                    transition={{ duration: 0.3 }}
                  >
                    {isDarkMode ? (
                      <FaSun className="text-yellow-400 text-lg" />
                    ) : (
                      <FaMoon className="text-blue-700 text-lg" />
                    )}
                  </motion.div>
                </AnimatePresence>
              </motion.button>

              <div className="md:hidden">
                <motion.button
                  onClick={() => setMobileMenuOpen((o) => !o)}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  aria-label="Toggle navigation menu"
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-200/80 dark:border-gray-700/80 bg-white/50 dark:bg-gray-800/50"
                >
                  {isMobileMenuOpen ? <FaTimes /> : <FaBars />}
                </motion.button>
              </div>
            </div>
          </div>
          <AnimatePresence>
            {isMobileMenuOpen && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.25 }}
                className="md:hidden mt-2 rounded-2xl border border-gray-200 dark:border-gray-700 bg-white/90 dark:bg-gray-900/90 backdrop-blur-lg shadow-xl relative"
              >
                <ul className="flex flex-col p-2 space-y-1">
                  {NAV_ITEMS.map((item) => (
                    <li key={item.id}>
                      <button
                        onClick={handleScrollTo(item.id)}
                        className={`w-full text-left rounded-lg px-4 py-3 text-base font-medium transition-colors ${
                          activeSection === item.id
                            ? "bg-blue-100 text-blue-600 dark:bg-gray-800 dark:text-amber-300"
                            : "text-gray-800 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-800/70"
                        }`}
                      >
                        {item.label}
                      </button>
                    </li>
                  ))}
                </ul>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.nav>
      </div>
    </header>
  );
}

export default Navbar;