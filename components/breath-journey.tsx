"use client";

import { motion, useScroll, useSpring } from "motion/react";
import { useRef } from "react";

import { careSettings } from "@/lib/site";

export function BreathJourney() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start 85%", "end 45%"],
  });
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 110,
    damping: 24,
    mass: 0.4,
  });

  return (
    <div className="journey" ref={sectionRef}>
      <div className="journey-track" aria-hidden="true">
        <motion.span style={{ scaleX }} />
      </div>
      <div className="journey-steps">
        {careSettings.map((setting, index) => (
          <motion.article
            key={setting.title}
            className="journey-step"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{
              delay: index * 0.12,
              duration: 0.55,
              ease: [0.16, 1, 0.3, 1],
            }}
          >
            <span className="journey-node" aria-hidden="true" />
            <h3>{setting.title}</h3>
            <p>{setting.description}</p>
          </motion.article>
        ))}
      </div>
    </div>
  );
}
