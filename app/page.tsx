"use client";

import Image from "next/image";
import { useState, useRef } from "react";
import { getSvgPath } from "figma-squircle";

// Custom debounce hook
const useDebounce = (callback: () => void, delay: number) => {
  const timeoutRef = useRef<number | null>(null);

  const debounce = (...args: any[]) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    timeoutRef.current = window.setTimeout(() => {
      callback(...args);
    }, delay);
  };

  const cancel = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  };

  return { debounce, cancel };
};

// clippy
const svgPath = getSvgPath({
  width: 52,
  height: 52,
  cornerRadius: 12,
  cornerSmoothing: 0.7,
});

export default function Home() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const debounceDelay = 500; //
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
      clearTimeout(hoverTimeoutRef.current); // Clear any pending timeout
      hoverTimeoutRef.current = null; // Reset the ref
    }
    setHoveredIndex(index);
    setCurrentImageIndex(index);
    cancel(); // Cancel any pending debounce reset
  };

  const handleMouseLeave = () => {
    hoverTimeoutRef.current = setTimeout(() => {
      setHoveredIndex(null);
      debounce(); // Trigger the debounced reset
    }, debounceDelay);
  };

  return (
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
                hoveredIndex !== null ? images[currentImageIndex] : images[0]
              } // Default to /0raffi when hoveredIndex is null
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
              onMouseEnter={() => handleMouseEnter(2)}
              onMouseLeave={handleMouseLeave}
            >
              Light Nudge
            </a>{" "}
            and built fitness apps with friends from the internet. Together we
            launched:
          </p>

          <p>
            <a
              href="#"
              className="text-blue-600 hover:opacity-70"
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
              onMouseEnter={() => handleMouseEnter(6)}
              onMouseLeave={handleMouseLeave}
            >
              Spotted in Prod
            </a>{" "}
            (or SIP for short) - a growing collection of my favorite features
            and interactions that I've come across while exploring other iOS
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
  );
}
