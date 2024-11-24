"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { getSvgPath } from "figma-squircle";

interface TooltipProps {
  imageSrc: string; // The image to display in the tooltip
  position: { x: number; y: number }; // Tooltip position (relative to the pointer)
}

const Tooltip: React.FC<TooltipProps> = ({ imageSrc, position }) => {
  const size = 48;

  const svgClipPath = getSvgPath({
    width: size,
    height: size,
    cornerRadius: size / 4.1,
    cornerSmoothing: 0.9,
  });

  return (
    <motion.div
      style={{
        clipPath: `path('${svgClipPath}')`,
        top: position.y + 10,
        left: position.x + 10,
      }}
      className="fixed w-[48px] h-[48px] overflow-hidden bg-gray-100 z-50"
      initial={{ opacity: 0, filter: "blur(20px)", scale: 0.1 }}
      animate={{ opacity: 1, filter: "blur(0px)", scale: 1 }}
      exit={{ opacity: 0, filter: "blur(20px)", scale: 0.1 }}
      transition={{
        type: "spring",
        stiffness: 75,
        damping: 11,
        duration: 0.3,
      }}
    >
      <Image src={imageSrc} alt="Tooltip Badge" fill className="object-cover" />
    </motion.div>
  );
};

export default Tooltip;
