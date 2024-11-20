"use client";

import Image from "next/image";
import { useState } from "react";

export default function Home() {
  const [activeImage, setActiveImage] = useState(0);

  const images = Array.from({ length: 8 }, (_, i) => `/images/${i}raffi.jpg`);

  return (
    <div className="max-w-[600px] mx-auto px-6 py-16">
      <main className="flex flex-col items-center">
        <div className="w-[80px] h-[80px] relative rounded-full overflow-hidden mb-8">
          <div
            className="flex transition-transform duration-300 ease-in-out"
            style={{ transform: `translateX(-${activeImage * 80}px)` }}
          >
            {images.map((src, index) => (
              <Image
                key={src}
                src={src}
                alt={`Avatar ${index}`}
                width={80}
                height={80}
                className="flex-shrink-0"
                priority
              />
            ))}
          </div>
        </div>

        <div className="space-y-4 text-[15px] leading-relaxed text-left w-full">
          <p>
            I'm a designer, project manager, and AI-assisted junior developer
            living in Chicago, IL.
          </p>

          <p>
            I'm currently working at{" "}
            <a
              href="#"
              className="text-blue-600 hover:underline"
              onMouseEnter={() => setActiveImage(1)}
              onMouseLeave={() => setActiveImage(0)}
            >
              Shopify
            </a>{" "}
            on the Shop app.
          </p>

          <p>
            Before Shopify I founded{" "}
            <a
              href="#"
              className="text-blue-600 hover:underline"
              onMouseEnter={() => setActiveImage(2)}
              onMouseLeave={() => setActiveImage(0)}
            >
              Light Nudge
            </a>{" "}
            where I built three health & fitness iOS apps with friends I met on
            the internet. Together, we shipped:
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
