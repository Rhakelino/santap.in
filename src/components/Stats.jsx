"use client";

import { useInView, useMotionValue, useSpring } from "framer-motion";
import { useEffect, useRef } from "react";

const stats = [
    { label: "Treats Sold", value: 150000 },
    { label: "Happy Customers", value: 350 },
    { label: "Locations", value: 12 },
    { label: "Happiness", value: 100 },
];

function Counter({ value }) {
    const ref = useRef(null);
    const motionValue = useMotionValue(0);
    const springValue = useSpring(motionValue, { duration: 3000 });
    const isInView = useInView(ref, { once: true });

    useEffect(() => {
        if (isInView) {
            motionValue.set(value);
        }
    }, [isInView, value, motionValue]);

    useEffect(() => {
        springValue.on("change", (latest) => {
            if (ref.current) {
                ref.current.textContent = Math.floor(latest).toLocaleString() + (value === 100 ? "%" : "+");
            }
        });
    }, [springValue, value]);

    return <span ref={ref} />;
}

export default function Stats() {
    return (
        <section className="py-32 bg-[#0a0a0a] text-white font-outfit">
            <div className="container mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-12 text-center">
                {stats.map((stat, i) => (
                    <div key={i} className="flex flex-col items-center">
                        <div className="text-5xl md:text-7xl font-bold text-[#d2b48c] mb-2">
                            <Counter value={stat.value} />
                        </div>
                        <div className="text-lg md:text-xl uppercase tracking-widest text-gray-400">
                            {stat.label}
                        </div>
                    </div>
                ))}
            </div>
        </section>
    )
}
