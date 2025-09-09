import { useState, useEffect } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import starSaber from "../assets/Star_Saber.webp";
import darkStarSaber from "../assets/Dark_Star_Saber.webp";

function AdvancedCursor() {
  const [isHovering, setIsHovering] = useState(false);
  const [isText, setIsText] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  const [isDark, setIsDark] = useState(
    typeof window !== "undefined"
      ? document.documentElement.classList.contains("dark")
      : false
  );

  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);
  const rotate = useMotionValue(120); // will swing based on direction

  const springConfig = { damping: 25, stiffness: 300 };
  const x = useSpring(mouseX, springConfig);
  const y = useSpring(mouseY, springConfig);
  const r = useSpring(rotate, springConfig);

  useEffect(() => {
    const hasTouch =
      "ontouchstart" in window || navigator.maxTouchPoints > 0;
    setIsTouchDevice(hasTouch);
    if (hasTouch) return;

    // detect theme changes
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.attributeName === "class") {
          setIsDark(mutation.target.classList.contains("dark"));
        }
      });
    });
    observer.observe(document.documentElement, { attributes: true });

    const style = document.createElement("style");
    style.innerHTML = `* { cursor: none !important; }`;
    document.head.appendChild(style);

    let lastX = 0;
    let lastY = 0;

    const moveCursor = (e) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);

      // Calculate swing angle based on movement direction
      const deltaX = e.clientX - lastX;
      const deltaY = e.clientY - lastY;
      const angle = Math.atan2(deltaY, deltaX) * (180 / Math.PI);

      rotate.set(angle + 90); // +90 so blade points "forward"
      lastX = e.clientX;
      lastY = e.clientY;
    };

    const handleMouseEnter = (e) => {
      if (["INPUT", "TEXTAREA"].includes(e.target.tagName)) {
        setIsText(true);
      } else {
        setIsHovering(true);
      }
    };

    const handleMouseLeave = () => {
      setIsHovering(false);
      setIsText(false);
    };

    window.addEventListener("mousemove", moveCursor);
    document.body.addEventListener("mouseenter", handleMouseEnter, true);
    document.body.addEventListener("mouseleave", handleMouseLeave, true);

    return () => {
      observer.disconnect();
      document.head.removeChild(style);
      window.removeEventListener("mousemove", moveCursor);
      document.body.removeEventListener("mouseenter", handleMouseEnter, true);
      document.body.removeEventListener("mouseleave", handleMouseLeave, true);
    };
  }, [mouseX, mouseY, rotate]);

  if (isTouchDevice) return null;

  const swordImg = isDark ? darkStarSaber : starSaber;

  return (
    <div className="fixed inset-0 pointer-events-none z-[9999]">
      {/* Aura Pulse */}
      <motion.div
        style={{ translateX: x, translateY: y, rotate: r }}
        animate={
          isText
            ? { scale: 0, opacity: 0 }
            : {
                scale: [1, 1.6, 1],
                opacity: [0.4, 0.15, 0.4],
              }
        }
        transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-0 left-0 w-16 h-32 -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan-400 blur-2xl dark:bg-purple-700"
      />

      {/* Sword Image */}
      <motion.img
        src={swordImg}
        alt="Star Saber Cursor"
        style={{ translateX: x, translateY: y, rotate: r }}
        animate={
          isText
            ? { scale: 0, opacity: 0 }
            : isHovering
            ? { scale: 1.1, opacity: 1 }
            : { scale: 0.95, opacity: 1 }
        }
        transition={{ type: "spring", stiffness: 400, damping: 25 }}
        className="absolute top-0 left-0 w-8 h-20 -translate-x-1/2 -translate-y-1/2 select-none drop-shadow-[0_0_15px_cyan]"
      />
    </div>
  );
}

export default AdvancedCursor;
