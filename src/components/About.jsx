"use client";

import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Image from "next/image";
import programmer from "@/app/assets/programmer.gif";

const About = () => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, amount: 0.2 });

    const imageVariants = {
        hidden: { opacity: 0, x: -50 },
        visible: { opacity: 1, x: 0, transition: { duration: 0.7, delay: 0.2 } },
    };

    const textContainerVariants = {
        hidden: { opacity: 0, x: 50 },
        visible: {
            opacity: 1,
            x: 0,
            transition: { duration: 0.7, delay: 0.2, staggerChildren: 0.15 },
        },
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
    };

    return (
        <motion.div
            ref={ref}
            className="mx-auto mt-20 bg-gradient-to-l from-[#632EE3]/30 to-orange-900/10 md:py-16 py-6"
        >
            <div className="grid max-w-7xl mx-auto md:grid-cols-2 gap-10 items-center md:px-10 px-4">
                {/* Image Side */}
                <motion.div
                    variants={imageVariants}
                    initial="hidden"
                    animate={isInView ? "visible" : "hidden"}
                >
                    <div className="relative w-full h-[300px] md:h-[400px] rounded-2xl shadow-lg overflow-hidden">
                       <Image src={programmer}  alt="Banner 2" className="w-full"  />
                    </div>

                </motion.div>

                {/* Text Side */}
                <motion.div
                    className="space-y-6 max-sm:text-center"
                    variants={textContainerVariants}
                    initial="hidden"
                    animate={isInView ? "visible" : "hidden"}
                >
                    <motion.h2
                        className="title text-3xl md:text-4xl font-bold"
                        variants={itemVariants}
                    >
                        About the Platform
                    </motion.h2>

                    <motion.p
                        className="text-gray-400 dark:text-gray-400 leading-relaxed"
                        variants={itemVariants}
                    >
                        Welcome to <span className="font-semibold">JobConnect</span> — a modern job
                        platform where you can create, manage, and accept tasks effortlessly. We
                        connect passionate developers, designers, and professionals with real-world
                        opportunities.
                    </motion.p>

                    <motion.p
                        className="text-gray-400 dark:text-gray-400 leading-relaxed"
                        variants={itemVariants}
                    >
                        Post your job today or explore hundreds of listings to find your next
                        project. Whether you are an employer or freelancer, our platform ensures
                        trust, transparency, and speed.
                    </motion.p>

                    <motion.div
                        variants={itemVariants}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="transition duration-300"
                    >

                    </motion.div>
                </motion.div>
            </div>
        </motion.div>
    );
};

export default About;
