"use client";

import { motion } from "framer-motion";

export default function CTA() {
    return (
        <section className="h-[80vh] flex flex-col items-center justify-center bg-[#0a0a0a] text-white relative overflow-hidden font-outfit">
            {/* Animated Background Blob */}
            <motion.div
                animate={{
                    scale: [1, 1.2, 1],
                    rotate: [0, 90, 0],
                }}
                transition={{
                    duration: 10,
                    repeat: Infinity,
                    ease: "linear"
                }}
                className="absolute w-[500px] h-[500px] bg-[#d2b48c] rounded-full blur-[150px] opacity-20 pointer-events-none"
            />

            <div className="relative z-10 text-center">
                <h2 className="text-6xl md:text-9xl font-black mb-8 tracking-tighter uppercase">
                    Taste the<br />Magic
                </h2>
                <button className="px-12 py-6 bg-white text-black text-2xl font-bold rounded-full hover:scale-105 transition-transform duration-300">
                    Order Now
                </button>
            </div>
        </section>
    )
}
