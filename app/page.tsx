"use client";

import Image from "next/image";
import { useState } from "react";

const AVATAR_SIZE = 52;

export default function Home() {
  const [activeImage, setActiveImage] = useState(0);

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
        <div className="w-[52px] h-[52px] relative rounded-[15px] mb-8 overflow-hidden border border-[#EDEDED]">
          <div
            className="absolute inset-0 flex"
            style={{
              transform: `translateX(-${activeImage * AVATAR_SIZE}px)`,
              transition: "transform 300ms ease-in-out",
              width: `${images.length * AVATAR_SIZE}px`,
              height: AVATAR_SIZE,
            }}
          >
            {images.map((src, index) => (
              <div
                key={src}
                className="relative"
                style={{ width: AVATAR_SIZE, height: AVATAR_SIZE }}
              >
                <Image
                  src={src}
                  alt={`Avatar ${index}`}
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-4 text-[15px] leading-relaxed text-left w-full">
          <p>
            I'm a designer living in Chicago and currently working at{" "}
            <a
              href="#"
              className="text-blue-600 hover:underline"
              onMouseEnter={() => setActiveImage(1)}
              onMouseLeave={() => setActiveImage(0)}
            >
              Shop
            </a>
            .
          </p>

          <p>
            Before, I founded{" "}
            <a
              href="#"
              className="text-blue-600 hover:underline"
              onMouseEnter={() => setActiveImage(2)}
              onMouseLeave={() => setActiveImage(0)}
            >
              Light Nudge
            </a>{" "}
            and built three health & fitness iOS apps with friends I met on the
            internet. Together, we shipped:
          </p>

          <p>
            <a
              href="#"
              className="text-blue-600 hover:underline"
              onMouseEnter={() => setActiveImage(3)}
              onMouseLeave={() => setActiveImage(0)}
            >
              Steddy
            </a>{" "}
            - a weekly routine planner
            <br />
            <a
              href="#"
              className="text-blue-600 hover:underline"
              onMouseEnter={() => setActiveImage(4)}
              onMouseLeave={() => setActiveImage(0)}
            >
              Empty
            </a>{" "}
            - a simple but powerful fasting tracker
            <br />
            <a
              href="#"
              className="text-blue-600 hover:underline"
              onMouseEnter={() => setActiveImage(5)}
              onMouseLeave={() => setActiveImage(0)}
            >
              Numbles
            </a>{" "}
            - a realtime social workout app
          </p>

          <p>
            I also curate{" "}
            <a
              href="#"
              className="text-blue-600 hover:underline"
              onMouseEnter={() => setActiveImage(6)}
              onMouseLeave={() => setActiveImage(0)}
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
              onMouseEnter={() => setActiveImage(7)}
              onMouseLeave={() => setActiveImage(0)}
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
