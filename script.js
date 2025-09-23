"use client";
import { useEffect } from "react";
import Head from "next/head";

export default function ProductPage({ product }) {
  useEffect(() => {
    // Scroll animation for features
    const features = document.querySelectorAll(".feature");
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          }
        });
      },
      { threshold: 0.2 }
    );
    features.forEach(f => observer.observe(f));

    // Animate founders on scroll
    const founders = document.querySelectorAll(".founder-card");
    const founderObserver = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          }
        });
      },
      { threshold: 0.2 }
    );
    founders.forEach(f => founderObserver.observe(f));

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
      <section className="hero py-20 bg-gray-100 text-center">
        <h1 className="text-4xl font-bold mb-6">
          Eco-Friendly Candles for Every Mood
        </h1>
        <p className="text-lg mb-8">
          Handmade, plant-based, reusable jars, and customizable.
        </p>
        <a
          href="/products"
          className="px-8 py-4 bg-yellow-500 text-white font-semibold rounded-lg hover:bg-yellow-600 transition"
        >
          Browse Products
        </a>
      </section>

      {/* Product Images */}
      <div className="product-images">
        {product.images.map((img, index) => (
          <img
            key={index}
            src={img.url}
            alt={img.alt || `Image of ${product.name}`}
            loading="lazy"
            className="w-full h-auto object-cover mb-4 rounded-lg"
          />
        ))}
      </div>
    </>
  );
}
