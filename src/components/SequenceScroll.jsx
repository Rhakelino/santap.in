"use client";

import { useScroll, useTransform, motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

const frameCount = 192;

export default function SequenceScroll({ onLoad, onProgress }) {
    const containerRef = useRef(null);
    const canvasRef = useRef(null);
    const [images, setImages] = useState([]);
    const [isLoaded, setIsLoaded] = useState(false);

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"],
    });

    const currentIndex = useTransform(scrollYProgress, [0, 1], [1, frameCount]);

    useEffect(() => {
        const loadImages = async () => {
            const promises = [];
            for (let i = 1; i <= frameCount; i++) {
                const img = new Image();
                img.src = `/cookies/ezgif-frame-${i.toString().padStart(3, "0")}.jpg`;
                const promise = new Promise((resolve) => {
                    img.onload = () => resolve(img);
                    img.onerror = () => resolve(null); // Return null on error
                });
                promises.push(promise);
            }

            const results = await Promise.all(promises);
            const validImages = results.filter(img => img !== null);

            setImages(validImages);
            setIsLoaded(true);
            if (onLoad) onLoad();
        };

        loadImages();
    }, [onLoad]);

    useEffect(() => {
        if (!isLoaded || !canvasRef.current) return;

        const canvas = canvasRef.current;
        const context = canvas.getContext("2d");

        const renderFrame = (index) => {
            const imgIndex = Math.min(
                frameCount - 1,
                Math.max(0, Math.floor(index) - 1)
            );
            const img = images[imgIndex];

            if (img) {
                // Draw image covering the canvas (object-fit: cover equivalent)
                const hRatio = canvas.width / img.width;
                const vRatio = canvas.height / img.height;
                const ratio = Math.max(hRatio, vRatio);

                const centerShift_x = (canvas.width - img.width * ratio) / 2;
                const centerShift_y = (canvas.height - img.height * ratio) / 2;

                context.clearRect(0, 0, canvas.width, canvas.height);
                context.drawImage(
                    img,
                    0,
                    0,
                    img.width,
                    img.height,
                    centerShift_x,
                    centerShift_y,
                    img.width * ratio,
                    img.height * ratio
                );
            }
        };

        // Set canvas size to window size (or use a fixed aspect ratio)
        const resizeCanvas = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            renderFrame(1); // Re-render initial frame
        };

        window.addEventListener('resize', resizeCanvas);
        resizeCanvas();

        const unsubscribe = currentIndex.on("change", (latest) => {
            requestAnimationFrame(() => renderFrame(latest));
        });

        return () => {
            window.removeEventListener('resize', resizeCanvas);
            unsubscribe();
        }
    }, [isLoaded, currentIndex, images]);

    return (
        <div ref={containerRef} className="h-[400vh] relative z-0">
            <div className="sticky top-0 h-screen w-full overflow-hidden">
                <canvas
                    ref={canvasRef}
                    className="w-full h-full object-cover"
                />
                {/* Text Overlays managed by parent or internal logic */}
                <TextOverlay scrollYProgress={scrollYProgress} />
            </div>
        </div>
    );
}

function TextOverlay({ scrollYProgress }) {
    // Helper to control opacity based on scroll ranges
    const useOpacity = (start, peak, end) => useTransform(scrollYProgress,
        [start, peak, end],
        [0, 1, 0]
    );

    const opacity1 = useOpacity(0, 0.05, 0.15);
    const opacity2 = useOpacity(0.2, 0.3, 0.4);
    const opacity3 = useOpacity(0.5, 0.6, 0.7);
    const opacity4 = useOpacity(0.8, 0.9, 1.0); // Stays visible at the end? Or fades? Request said "Fade in/out", last one might stay.

    return (
        <div className="absolute inset-0 pointer-events-none flex flex-col justify-center items-center z-10 mix-blend-difference text-white">
            {/* Title */}
            <motion.div style={{ opacity: opacity1 }} className="absolute text-center">
                <h1 className="text-6xl md:text-9xl font-bold tracking-tighter uppercase font-outfit">Santap.in</h1>
                <p className="text-xl md:text-2xl mt-4 tracking-widest uppercase">Cookies, Brownies & Drinks</p>
            </motion.div>

            {/* Slogan Left */}
            <motion.div style={{ opacity: opacity2 }} className="absolute left-10 md:left-24 max-w-md">
                <h2 className="text-4xl md:text-6xl font-semibold leading-tight font-outfit">
                    Baked with<br />Passion
                </h2>
            </motion.div>

            {/* Slogan Right */}
            <motion.div style={{ opacity: opacity3 }} className="absolute right-10 md:right-24 text-right max-w-md">
                <h2 className="text-4xl md:text-6xl font-semibold leading-tight font-outfit">
                    Taste of<br />Happiness
                </h2>
            </motion.div>

            {/* CTA */}
            <motion.div style={{ opacity: opacity4 }} className="absolute text-center pointer-events-auto">
                <h2 className="text-5xl md:text-7xl font-bold mb-8 font-outfit">Ready to Indulge?</h2>
                <MagneticButton>Order Now</MagneticButton>
            </motion.div>
        </div>
    )
}

function MagneticButton({ children }) {
    return (
        <button className="px-10 py-5 bg-white text-black rounded-full text-xl font-bold hover:scale-105 transition-transform duration-300">
            {children}
        </button>
    )
}
