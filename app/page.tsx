"use client";

import Image from "next/image";
import { useState, useRef } from "react";
import { getSvgPath } from "figma-squircle";
import { motion } from "framer-motion";

import Tooltip from "./tooltip";

// CONSTANTS

const messages = ["Pce", "Bye bye", "Bye", "l8r", "Ciao"];

const slideDuration = 480;
const shrinkDelay = 480;
const shrinkDuration = 100;

const slideStiffness = 250;
const slideDamping = 25;
const shrinkStiffness = 150;
const shrinkDamping = 15;

const shrinkInitial = { opacity: 1, scale: 1.8, rotate: 0 };
const shrinkAnimate = { opacity: 0, scale: 0.2, rotate: 20 };

const svgPath = getSvgPath({
  width: 52,
  height: 52,
  cornerRadius: 52,
  cornerSmoothing: 0.7,
});

const images = [
  "/images/0raffi.jpg",
  "/images/1shop.jpg",
  "/images/2lne.jpg",
  "/images/3steddy.jpg",
  "/images/4empty.jpg",
  "/images/5numbies.jpg",
  "/images/6sip.jpg",
  "/images/7mail.jpg",
];

export default function Home() {
  // STATE
  const [translate, setTranslate] = useState(0);
  const [startShrink, setStartShrink] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [shrinkMessage, setShrinkMessage] = useState("Pce"); // Default message
  const [pointerPosition, setPointerPosition] = useState({ x: 0, y: 0 });

  // POINTER HANDLERS
  const hoverTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // ENTER
  const handleMouseEnter = (index: number, event: React.MouseEvent) => {
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
      hoverTimeoutRef.current = null;
    }
    setHoveredIndex(index);
    setPointerPosition({ x: event.clientX, y: event.clientY });
  };

  const handleMouseMove = (event: React.MouseEvent) => {
    setPointerPosition({ x: event.clientX, y: event.clientY });
  };

  const handleMouseLeave = () => {
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
    }
    hoverTimeoutRef.current = setTimeout(() => {
      setHoveredIndex(null);
    }, 0);
  };

  // HANDLE CLICK

  const handleLinkClick = async (url: string) => {
    const randomMessage = messages[Math.floor(Math.random() * messages.length)];
    setShrinkMessage(randomMessage);

    console.log("[handleLinkClick] Clicked URL:", url);
    console.log("[handleLinkClick] Random Message Selected:", randomMessage);

    try {
      console.log("[handleLinkClick] Starting slide animation...");
      setTranslate(-100);
      await new Promise((resolve) =>
        setTimeout(() => {
          console.log("[handleLinkClick] Slide animation completed.");
          resolve(true);
        }, slideDuration + shrinkDelay)
      );

      console.log("[handleLinkClick] Starting shrink animation...");
      setStartShrink(true);
      await new Promise((resolve) =>
        setTimeout(() => {
          console.log("[handleLinkClick] Shrink animation completed.");
          resolve(true);
        }, shrinkDuration + shrinkDelay)
      );

      console.log("[handleLinkClick] Navigating to URL:", url);
      window.location.href = url;

      setTimeout(() => {
        console.log("[handleLinkClick] Resetting state...");
        setTranslate(0);
        setStartShrink(false);
        setShrinkMessage("Pce");
        console.log("[handleLinkClick] State reset completed.");
      }, 0);
    } catch (error) {
      console.error("[handleLinkClick] Error occurred:", error);
    }
  };

  return (
    <div className="relative w-screen h-screen overflow-hidden bg-white">
      <motion.div
        className="relative w-[200vw] h-screen flex overflow-hidden"
        animate={{ x: `${translate}vw` }}
        transition={{
          type: "spring",
          stiffness: slideStiffness,
          damping: slideDamping,
          duration: slideDuration / 1000,
        }}
      >
        {/* HOME CONTENT */}
        <div className="w-screen h-screen overflow-hidden">
          <motion.div
            initial={{ opacity: 0, y: 70, filter: "blur(20px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{
              y: { type: "spring", stiffness: 100, damping: 20 },
              opacity: { duration: 1.5, delay: 0.2 },
              filter: { duration: 0.5 },
            }}
          >
            <div className="max-w-[600px] mx-auto px-6 py-16">
              <main className="flex flex-col">
                {/* AVATAR */}
                <div className="w-[52px] h-[52px] mb-6 relative">
                  <div className="relative w-full h-full">
                    {/* HEADSHOT */}
                    <div
                      style={{
                        clipPath: `path('${svgPath}')`,
                      }}
                      className="w-full h-full overflow-hidden"
                    >
                      <Image
                        src={images[0]}
                        alt="Avatar"
                        fill
                        className="object-cover"
                        priority
                      />
                    </div>

                    {/* TOOLTIP */}
                    {hoveredIndex !== null && (
                      <Tooltip
                        imageSrc={images[hoveredIndex]} // Image to display in the tooltip
                        position={pointerPosition} // Tooltip position based on pointer
                        key={hoveredIndex} // Use key to ensure re-mount on index change
                      />
                    )}
                  </div>
                </div>

                {/* PARAGRAPH */}
                <div className="space-y-4 text-[15px] leading-relaxed text-left w-full">
                  <p className="opacity-35">Updated Nov 21st, 2024</p>
                  <p>
                    I&apos;m a designer currently living in Chicago and working
                    at{" "}
                    <a
                      href="#"
                      className="text-blue-600 hover:opacity-70 transition-opacity duration-120"
                      onClick={() => handleLinkClick("https://shop.app")}
                      onMouseEnter={(event) => handleMouseEnter(1, event)}
                      onMouseMove={handleMouseMove}
                      onMouseLeave={handleMouseLeave}
                    >
                      Shop
                    </a>
                    .
                  </p>
                  <p>
                    Before, I founded{" "}
                    <a
                      href="#"
                      className="text-blue-600 hover:opacity-70 transition-opacity duration-120"
                      onClick={() => handleLinkClick("https://lightnudge.com")}
                      onMouseEnter={(event) => handleMouseEnter(2, event)}
                      onMouseMove={handleMouseMove}
                      onMouseLeave={handleMouseLeave}
                    >
                      Light Nudge
                    </a>{" "}
                    and built fitness apps with friends from the internet.
                    Together we launched:
                  </p>

                  {/* LNE APPS */}
                  <div>
                    <a
                      href="#"
                      className="text-blue-600 hover:opacity-70 transition-opacity duration-120 inline-block"
                      style={{ margin: "-1px" }}
                      onClick={() =>
                        handleLinkClick(
                          "https://apps.apple.com/us/app/steddy-stay-consistent/id1579825538?platform=iphone"
                        )
                      }
                      onMouseEnter={(event) => handleMouseEnter(3, event)}
                      onMouseMove={handleMouseMove}
                      onMouseLeave={handleMouseLeave}
                    >
                      Steddy
                    </a>{" "}
                    - a weekly exercise planner & streak tracker
                    <br />
                    <a
                      href="#"
                      className="text-blue-600 hover:opacity-70 transition-opacity duration-120 inline-block"
                      style={{ margin: "-1px" }}
                      onClick={() =>
                        handleLinkClick(
                          "https://apps.apple.com/us/app/empty-fasting/id6475213946"
                        )
                      }
                      onMouseEnter={(event) => handleMouseEnter(4, event)}
                      onMouseMove={handleMouseMove}
                      onMouseLeave={handleMouseLeave}
                    >
                      Empty
                    </a>{" "}
                    - a simple but powerful fasting tracker
                    <br />
                    <a
                      href="#"
                      className="text-blue-600 hover:opacity-70 transition-opacity duration-120 inline-block"
                      style={{ margin: "-1px" }}
                      onClick={() =>
                        handleLinkClick(
                          "https://apps.apple.com/us/app/numbies/id6448198083"
                        )
                      }
                      onMouseEnter={(event) => handleMouseEnter(5, event)}
                      onMouseMove={handleMouseMove}
                      onMouseLeave={handleMouseLeave}
                    >
                      Numbies
                    </a>{" "}
                    - a realtime social workout app
                  </div>

                  {/* SIP */}
                  <p>
                    I also curate{" "}
                    <a
                      href="#"
                      className="text-blue-600 hover:opacity-70 transition-opacity duration-120"
                      onClick={() =>
                        handleLinkClick("https://x.com/spottedinprod")
                      }
                      onMouseEnter={(event) => handleMouseEnter(6, event)}
                      onMouseMove={handleMouseMove}
                      onMouseLeave={handleMouseLeave}
                    >
                      Spotted in Prod
                    </a>{" "}
                    - a growing collection of my favorite features and
                    interactions that I&apos;ve come across while exploring
                    other iOS apps.
                  </p>
                  <p>
                    I enjoy talking to people about products they are building,
                    especially if they are building for themselves.
                  </p>
                  <p>
                    Feel free to{" "}
                    <a
                      href="mailto:raffi.chilingaryan@gmail.com"
                      className="text-blue-600 hover:opacity-70 transition-opacity duration-120"
                      // Remove Tooltip-related event handlers for email
                    >
                      send me an email
                    </a>
                    .
                  </p>
                </div>
              </main>
            </div>
          </motion.div>
        </div>

        {/* TEXT */}
        <div className="w-screen h-screen flex items-center justify-center">
          <motion.div
            initial={shrinkInitial}
            animate={startShrink ? shrinkAnimate : shrinkInitial}
            transition={{
              type: "spring",
              stiffness: shrinkStiffness,
              damping: shrinkDamping,
              duration: shrinkDuration / 1000,
            }}
            className="text-center"
          >
            <p>{shrinkMessage}</p>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}
