"use client";

import Image from "next/image";
import { useState, useRef, useEffect } from "react";
import { getSvgPath } from "figma-squircle";
import { motion } from "framer-motion";
import { useRouter, usePathname } from "next/navigation";

// Animation Timing Constants
const slideDuration = 800; // Duration of the slide animation (in ms)
const whimsicalDelay = 300; // Delay before whimsical text starts (in ms)
const shrinkDuration = 500; // Duration of whimsical text shrinking animation (in ms)
const totalDelay = slideDuration + whimsicalDelay + shrinkDuration; // Total delay for openURL action (in ms)

// Animation Spring Parameters
const slideStiffness = 120;
const slideDamping = 12;
const shrinkStiffness = 150;
const shrinkDamping = 15;

// Whimsical Shrink Animation
const whimsicalShrinkInitial = { opacity: 1, scale: 2, rotate: 0 };
const whimsicalShrinkAnimate = { opacity: 0, scale: 0.3, rotate: 20 };

const debounceDelay = 630; //

const svgPath = getSvgPath({
  width: 52,
  height: 52,
  cornerRadius: 12,
  cornerSmoothing: 0.7,
});

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
  const [translate, setTranslate] = useState(0);
  const router = useRouter();
  const pathname = usePathname();
  const [prevPathname, setPrevPathname] = useState(pathname);
  const [startShrink, setStartShrink] = useState(false); // Tracks when to start shrinking

  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const hoverTimeoutRef = useRef<NodeJS.Timeout | null>(null); // Track hover timeout
  const { debounce, cancel } = useDebounce(
    () => setCurrentImageIndex(0),
    debounceDelay
  );

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

  const handleMouseEnter = (index: number) => {
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current); // Cancel any pending timeout
      hoverTimeoutRef.current = null; // Reset the ref
    }
    cancel(); // Cancel any pending debounce reset
    setHoveredIndex(index); // Set hovered index immediately
    setCurrentImageIndex(index); // Show the corresponding image
  };

  const handleMouseLeave = () => {
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current); // Clear any existing timeout
    }
    hoverTimeoutRef.current = setTimeout(() => {
      setHoveredIndex(null); // Clear hover state after delay
      debounce(); // Trigger the debounce effect
    }, debounceDelay);
  };

  const handleLinkClick = (url: string) => {
    setTranslate(-100); // Trigger slide animation
    setTimeout(() => {
      setStartShrink(true); // Trigger whimsical shrink animation
    }, slideDuration + whimsicalDelay); // Add delay before shrinking starts
    setTimeout(() => {
      router.push(url); // Navigate after animations complete
    }, totalDelay);
  };

  useEffect(() => {
    if (pathname !== prevPathname) {
      // Reset animation states when the user navigates back
      setTranslate(0);
      setStartShrink(false);
      setPrevPathname(pathname); // Update the tracked pathname
    }
  }, [pathname, prevPathname]);

  return (
    <div className="relative w-screen h-screen overflow-hidden">
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
        {/* Home Content Section */}
        <div className="w-screen h-screen overflow-hidden">
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
                    onClick={() => handleLinkClick("https://numbies.com")}
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
                  (or SIP for short) - a growing collection of my favorite
                  features and interactions that I've come across while
                  exploring other iOS apps.
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
        </div>

        {/* Whimsical Text Section */}
        <div className="w-screen h-screen flex items-center justify-center">
          <motion.div
            initial={whimsicalShrinkInitial}
            animate={
              startShrink ? whimsicalShrinkAnimate : whimsicalShrinkInitial
            } // Trigger shrink animation
            transition={{
              type: "spring",
              stiffness: shrinkStiffness,
              damping: shrinkDamping,
              duration: shrinkDuration / 1000, // Shrink duration
            }}
            className="text-center"
          >
            <p>Pce</p>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}
