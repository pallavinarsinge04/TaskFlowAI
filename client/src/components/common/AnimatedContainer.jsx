import { motion } from "framer-motion";

function AnimatedContainer({
  children,
  delay = 0,
  duration = 0.5,
  y = 30,
  x = 0,
  scale = 1,
  className = "",
}) {
  return (
    <motion.div
      className={className}
      initial={{
        opacity: 0,
        y,
        x,
        scale,
      }}
      whileInView={{
        opacity: 1,
        y: 0,
        x: 0,
        scale: 1,
      }}
      viewport={{
        once: true,
        amount: 0.2,
      }}
      transition={{
        duration,
        delay,
        ease: "easeOut",
      }}
    >
      {children}
    </motion.div>
  );
}

export default AnimatedContainer;