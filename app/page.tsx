"use client";

import Image from "next/image";
import { useState, useRef, useEffect } from "react";
import { getSvgPath } from "figma-squircle";
import { motion } from "framer-motion";
import { useRouter, usePathname } from "next/navigation";

// CONSTANTS

const messages = [
  "Pce",
  "Have fun",
  "It's been real",
  "Miss u",
  "Bye bye",
  "l8r",
  "Ciao",
];

const slideDuration = 480;
const shrinkDelay = 480;
const shrinkDuration = 480;

const slideStiffness = 250;
const slideDamping = 25;
const shrinkStiffness = 150;
const shrinkDamping = 15;

const shrinkInitial = { opacity: 1, scale: 2, rotate: 0 };
const shrinkAnimate = { opacity: 0, scale: 0.3, rotate: 20 };

const debounceDelay = 630;

const svgPath = getSvgPath({
  width: 52,
  height: 52,
  cornerRadius: 12,
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

const useDebounce = <T extends (...args: any[]) => void>(
  callback: T,
  delay: number
) => {
  const timeoutRef = useRef<number | null>(null);

  const debounce = (...args: Parameters<T>) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    timeoutRef.current = window.setTimeout(() => {
      callback(...args); // Pass the arguments correctly
    }, delay);
  };

  const cancel = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  };

  return { debounce, cancel };
};

export default function Home() {
  const router = useRouter();

  // STATE
  const [initialLoad, setInitialLoad] = useState(true);
  const [translate, setTranslate] = useState(0);
  const [startShrink, setStartShrink] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [shrinkMessage, setShrinkMessage] = useState("Pce"); // Default message

  // POINTER HANDLERS
  const hoverTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const { debounce, cancel } = useDebounce(
    () => setCurrentImageIndex(0),
    debounceDelay
  );
  const handleMouseEnter = (index: number) => {
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
      hoverTimeoutRef.current = null;
    }
    cancel();
    setHoveredIndex(index);
    setCurrentImageIndex(index);
  };
  const handleMouseLeave = () => {
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
    }
    hoverTimeoutRef.current = setTimeout(() => {
      setHoveredIndex(null);
      debounce();
    }, debounceDelay);
  };

  // HANDLE CLICK

  const handleLinkClick = async (url: string) => {
    const randomMessage = messages[Math.floor(Math.random() * messages.length)];
    setShrinkMessage(randomMessage);

    console.log("[handleLinkClick] Clicked URL:", url);
    console.log("[handleLinkClick] Random Message Selected:", randomMessage);

    try {
      // Step 1: Slide the home content out
      console.log("[handleLinkClick] Starting slide animation...");
      setTranslate(-100);
      await new Promise((resolve) =>
        setTimeout(() => {
          console.log("[handleLinkClick] Slide animation completed.");
          resolve(true);
        }, slideDuration + shrinkDelay)
      );

      // Step 2: Trigger whimsical shrink animation
      console.log("[handleLinkClick] Starting shrink animation...");
      setStartShrink(true);
      await new Promise((resolve) =>
        setTimeout(() => {
          console.log("[handleLinkClick] Shrink animation completed.");
          resolve(true);
        }, shrinkDuration + shrinkDelay)
      );

      // Step 3: Perform Navigation
      console.log("[handleLinkClick] Navigating to URL:", url);
      window.location.href = url; // Use native browser navigation for reliability

      // Step 4: Reset State Immediately After Navigation Trigger
      setTimeout(() => {
        console.log("[handleLinkClick] Resetting state...");
        setTranslate(0); // Reset slide position
        setStartShrink(false); // Reset shrink animation
        setShrinkMessage("Pce"); // Reset message
        console.log("[handleLinkClick] State reset completed.");
      }, 0); // Immediately after navigation trigger
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
            onAnimationComplete={() => setInitialLoad(false)} // Clear the initial load state after animation
          >
            <div className="max-w-[600px] mx-auto px-6 py-16">
              <main className="flex flex-col">
                <div
                  style={{
                    clipPath: `path('${svgPath}')`,
                  }}
                  className="w-[52px] h-[52px] mb-6"
                >
                  <div className="relative w-full h-full overflow-hidden">
                    <Image
                      src={
                        hoveredIndex !== null
                          ? images[currentImageIndex]
                          : images[0]
                      }
                      alt={`Avatar ${currentImageIndex}`}
                      fill
                      className="object-cover"
                      priority
                    />
                  </div>
                </div>
                <div className="space-y-4 text-[15px] leading-relaxed text-left w-full">
                  <p className="opacity-50">November 21st, 2024</p>
                  <p>
                    I'm a designer currently living in Chicago and working at{" "}
                    <a
                      href="#"
                      className="text-blue-600 hover:opacity-70"
                      onClick={() => handleLinkClick("https://shop.app")}
                      onMouseEnter={() => handleMouseEnter(1)}
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
                      className="text-blue-600 hover:opacity-70"
                      onClick={() => handleLinkClick("https://lightnudge.com")}
                      onMouseEnter={() => handleMouseEnter(2)}
                      onMouseLeave={handleMouseLeave}
                    >
                      Light Nudge
                    </a>{" "}
                    and built fitness apps with friends from the internet.
                    Together we launched:
                  </p>
                  <p>
                    <a
                      href="#"
                      className="text-blue-600 hover:opacity-70"
                      onClick={() =>
                        handleLinkClick(
                          "https://apps.apple.com/us/app/steddy-stay-consistent/id1579825538?platform=iphone"
                        )
                      }
                      onMouseEnter={() => handleMouseEnter(3)}
                      onMouseLeave={handleMouseLeave}
                    >
                      Steddy
                    </a>{" "}
                    - a weekly exercise planner & streak tracker
                    <br />
                    <a
                      href="#"
                      className="text-blue-600 hover:opacity-70"
                      onClick={() =>
                        handleLinkClick(
                          "https://apps.apple.com/us/app/empty-fasting/id6475213946"
                        )
                      }
                      onMouseEnter={() => handleMouseEnter(4)}
                      onMouseLeave={handleMouseLeave}
                    >
                      Empty
                    </a>{" "}
                    - a simple but powerful fasting tracker
                    <br />
                    <a
                      href="#"
                      className="text-blue-600 hover:opacity-70"
                      onClick={() =>
                        handleLinkClick(
                          "https://apps.apple.com/us/app/numbies-work-out-with-friends/id6448198083"
                        )
                      }
                      onMouseEnter={() => handleMouseEnter(5)}
                      onMouseLeave={handleMouseLeave}
                    >
                      Numbies
                    </a>{" "}
                    - a realtime social workout app
                  </p>
                  <p>
                    I also curate{" "}
                    <a
                      href="#"
                      className="text-blue-600 hover:opacity-70"
                      onClick={() =>
                        handleLinkClick("https://x.com/spottedinprod")
                      }
                      onMouseEnter={() => handleMouseEnter(6)}
                      onMouseLeave={handleMouseLeave}
                    >
                      Spotted in Prod
                    </a>{" "}
                    - a growing collection of my favorite features and
                    interactions that I've come across while exploring other iOS
                    apps.
                  </p>
                  <p>
                    I enjoy talking to people about products they are building,
                    especially if they are building for themselves.
                  </p>
                  <p>
                    Feel free to{" "}
                    <a
                      href="mailto:your@email.com"
                      className="text-blue-600 hover:opacity-70"
                      onMouseEnter={() => handleMouseEnter(7)}
                      onMouseLeave={handleMouseLeave}
                    >
                      get in touch
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
