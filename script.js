"use client";
import { useEffect } from "react";
import Head from "next/head";

export default function ProductPage({ product }) {
  useEffect(() => {
    // IntersectionObserver for animations
    const revealOnScroll = (selector, className = "visible") => {
      const elements = document.querySelectorAll(selector);
      const observer = new IntersectionObserver(
        entries => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              entry.target.classList.add(className);
            }
          });
        },
        { threshold: 0.2 }
      );
      elements.forEach(el => observer.observe(el));
    };

    revealOnScroll(".feature");
    revealOnScroll(".founder-card");
    revealOnScroll(".fade-in");

    // Product slider (drag scroll)
    const slider = document.querySelector(".product-slider");
    if (slider) {
      let isDown = false;
      let startX, scrollLeft;

      const mouseDown = e => {
        isDown = true;
        slider.classList.add("active");
        startX = e.pageX - slider.offsetLeft;
        scrollLeft = slider.scrollLeft;
      };
      const mouseLeave = () => {
        isDown = false;
        slider.classList.remove("active");
      };
      const mouseUp = () => {
        isDown = false;
        slider.classList.remove("active");
      };
      const mouseMove = e => {
        if (!isDown) return;
        e.preventDefault();
        const x = e.pageX - slider.offsetLeft;
        const walk = (x - startX) * 2;
        slider.scrollLeft = scrollLeft - walk;
      };

      slider.addEventListener("mousedown", mouseDown);
      slider.addEventListener("mouseleave", mouseLeave);
      slider.addEventListener("mouseup", mouseUp);
      slider.addEventListener("mousemove", mouseMove);

      return () => {
        slider.removeEventListener("mousedown", mouseDown);
        slider.removeEventListener("mouseleave", mouseLeave);
        slider.removeEventListener("mouseup", mouseUp);
        slider.removeEventListener("mousemove", mouseMove);
      };
    }
  }, []);

  return (
    <>
      <Head>
        <title>{product.name} | NPHere</title>
        <meta
          name="description"
          content={product.shortDescription || "Eco-friendly handmade candles"}
        />
        <meta
          name="keywords"
          content="candles, eco-friendly, handmade, reusable, NPHere"
        />
        <meta name="robots" content="index, follow" />
      </Head>

      {/* Hero Section */}
      <section className="hero py-24 bg-gradient-to-r from-pink-200 via-yellow-100 to-purple-200 text-center relative overflow-hidden">
        <h1 className="text-5xl font-extrabold mb-6 fade-in drop-shadow-lg text-gray-800">
          🌸 Eco-Friendly Candles for Every Mood 🌸
        </h1>
        <p className="text-lg mb-8 text-gray-600 fade-in delay-200">
          Handmade, plant-based, reusable jars, and customizable.
        </p>
        <a
          href="/products"
          className="px-10 py-4 bg-pink-500 text-white font-semibold rounded-full shadow-lg hover:bg-pink-600 transition transform hover:scale-105"
        >
          ✨ Browse Products ✨
        </a>

        {/* Floating hearts animation */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="floating-shape top-10 left-20 bg-pink-400"></div>
          <div className="floating-shape top-40 right-24 bg-yellow-400"></div>
          <div className="floating-shape bottom-16 left-32 bg-purple-400"></div>
        </div>
      </section>

      {/* Product Images */}
      <div className="product-images px-6 py-12 grid grid-cols-1 md:grid-cols-2 gap-6">
        {product.images.map((img, index) => (
          <img
            key={index}
            src={img.url}
            alt={img.alt || `Image of ${product.name}`}
            loading="lazy"
            className="w-full h-auto object-cover rounded-2xl shadow-lg transform transition duration-500 hover:scale-105 hover:rotate-1 fade-in"
          />
        ))}
      </div>
    </>
  );
}
