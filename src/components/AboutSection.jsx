"use client";

import { useScroll, useTransform, motion } from "framer-motion";
import { useRef } from "react";
import { cn } from "@/lib/utils";

export default function AboutSection() {
    const container = useRef(null);
    const { scrollYProgress } = useScroll({
        target: container,
        offset: ["start 0.9", "start 0.25"]
    })

    const text = "We bake not just for the taste, but for the joy it brings. Every bite tells a story of our passion for sweets.";
    const words = text.split(" ");

    return (
        <section ref={container} className="min-h-screen flex items-center justify-center bg-[#0a0a0a] text-[#ededed] py-20 px-4">
            <div className="max-w-4xl text-center">
                <p className="flex flex-wrap justify-center gap-x-3 text-4xl md:text-6xl font-medium leading-tight font-outfit">
                    {words.map((word, i) => {
                        const start = i / words.length;
                        const end = start + (1 / words.length);
                        return <Word key={i} progress={scrollYProgress} range={[start, end]}>{word}</Word>
                    })}
                </p>
            </div>
        </section>
    )
}

const Word = ({ children, progress, range }) => {
    const opacity = useTransform(progress, range, [0.1, 1]);
    return (
        <span className="relative">
            <span className="absolute opacity-10">{children}</span>
            <motion.span style={{ opacity }}>{children}</motion.span>
        </span>
    )
}
