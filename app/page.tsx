"use client";

import Image from "next/image";
import { useState } from "react";

const AVATAR_SIZE = 52;

export default function Home() {
  const [currentImage, setCurrentImage] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const handleImageChange = (newIndex: number) => {
    setIsAnimating(true);
    setTimeout(() => {
      setCurrentImage(newIndex);
      setIsAnimating(false);
    }, 120);
  };

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

  return (
    <div className="max-w-[600px] mx-auto px-6 py-16">
      <main className="flex flex-col">
        <div className="w-[52px] h-[52px] relative mb-8 rounded-[12.5px] overflow-hidden">
          <div
            className="absolute inset-0 transition-all duration-120"
            style={{ opacity: isAnimating ? 0 : 1 }}
          >
            <Image
              src={images[currentImage]}
              alt={`Avatar ${currentImage}`}
              fill
              className="object-cover"
              priority
            />
          </div>
        </div>
        <div className="space-y-4 text-[15px] leading-relaxed text-left w-full">
          <p>
            I'm a designer living in Chicago and currently working at{" "}
            <a
              href="#"
              className="text-blue-600 hover:underline"
              onMouseEnter={() => handleImageChange(1)}
            >
              Shop
            </a>{" "}
            .
          </p>

          <p>
            Before, I founded{" "}
            <a
              href="#"
              className="text-blue-600 hover:underline"
              onMouseEnter={() => handleImageChange(2)}
            >
              Light Nudge
            </a>{" "}
            where I built fitness apps with friends I met on the internet.
            Together, we shipped:
          </p>

          <p>
            <a
              href="#"
              className="text-blue-600 hover:underline"
              onMouseEnter={() => handleImageChange(3)}
            >
              Steddy
            </a>{" "}
            - a weekly routine planner
            <br />
            <a
              href="#"
              className="text-blue-600 hover:underline"
              onMouseEnter={() => handleImageChange(4)}
            >
              Empty
            </a>{" "}
            - a simple but powerful fasting tracker
            <br />
            <a
              href="#"
              className="text-blue-600 hover:underline"
              onMouseEnter={() => handleImageChange(5)}
            >
              Numbies
            </a>{" "}
            - a realtime social workout app
          </p>

          <p>
            I also curate{" "}
            <a
              href="#"
              className="text-blue-600 hover:underline"
              onMouseEnter={() => handleImageChange(6)}
            >
              Spotted in Prod
            </a>{" "}
            (or SIP for short) - a collection of features and interactions that
            I've bumped into while exploring other iOS apps.
          </p>

          <p>
            I love talking to people about products they are building,
            especially if they are building for themselves.
          </p>

          <p>
            Feel free to{" "}
            <a
              href="mailto:your@email.com"
              className="text-blue-600 hover:underline"
              onMouseEnter={() => handleImageChange(7)}
            >
              shoot me an email
            </a>
            .
          </p>
        </div>
      </main>
    </div>
  );
}
