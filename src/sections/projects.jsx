import React, { useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { Projects } from "/src/constants/index.js";

// Styles
const styles = {
    paddingX: "sm:px-16 px-6",
    paddingY: "sm:py-16 py-6",
    padding: "sm:px-16 px-6 sm:py-16 py-10",
    heroHeadText:
        "font-black text-white lg:text-[80px] sm:text-[60px] xs:text-[50px] text-[40px] lg:leading-[98px] mt-2",
    heroSubText:
        "text-[#dfd9ff] font-medium lg:text-[30px] sm:text-[26px] xs:text-[20px] text-[16px] lg:leading-[40px]",
    sectionHeadText:
        "text-white font-black md:text-[60px] sm:text-[50px] xs:text-[40px] text-[30px]",
    sectionSubText:
        "sm:text-[18px] text-[14px] text-secondary uppercase tracking-wider",
};

// Motion variants
const textVariant = (delay) => {
    return {
        hidden: {
            y: -50,
            opacity: 0,
        },
        show: {
            y: 0,
            opacity: 1,
            transition: {
                type: "spring",
                duration: 1.25,
                delay: delay,
            },
        },
    };
};

const fadeIn = (direction, type, delay, duration) => {
    return {
        hidden: {
            x: direction === "left" ? 100 : direction === "right" ? -100 : 0,
            y: direction === "up" ? 100 : direction === "down" ? -100 : 0,
            opacity: 0,
        },
        show: {
            x: 0,
            y: 0,
            opacity: 1,
            transition: {
                type: type,
                delay: delay,
                duration: duration,
                ease: "easeOut",
            },
        },
    };
};

const staggerContainer = (staggerChildren, delayChildren) => {
    return {
        hidden: {},
        show: {
            transition: {
                staggerChildren: staggerChildren,
                delayChildren: delayChildren || 0,
            },
        },
    };
};

// Section Wrapper HOC
const SectionWrapper = (Component, idName) =>
    function HOC() {
        return (
            <motion.section
                variants={staggerContainer()}
                initial='hidden'
                whileInView='show'
                viewport={{ once: false, amount: 0.25 }}
                className={`${styles.padding} max-w-7xl mx-auto relative z-0`}
            >
                <span className='hash-span' id={idName}>
                    &nbsp;
                </span>
                <Component />
            </motion.section>
        );
    };



// Custom Tilt Component using Framer Motion
const TiltCard = ({ children, index }) => {
    const ref = useRef(null);

    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const mouseXSpring = useSpring(x, { stiffness: 300, damping: 30 });
    const mouseYSpring = useSpring(y, { stiffness: 300, damping: 30 });

    const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["17.5deg", "-17.5deg"]);
    const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-17.5deg", "17.5deg"]);

    const handleMouseMove = (e) => {
        if (!ref.current) return;

        const rect = ref.current.getBoundingClientRect();
        const width = rect.width;
        const height = rect.height;
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;

        const xPct = mouseX / width - 0.5;
        const yPct = mouseY / height - 0.5;

        x.set(xPct);
        y.set(yPct);
    };

    const handleMouseLeave = () => {
        x.set(0);
        y.set(0);
    };

    return (
        <motion.div
            ref={ref}
            variants={fadeIn("up", "spring", index * 0.5, 0.75)}
            style={{
                rotateX,
                rotateY,
                transformStyle: "preserve-3d",
            }}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
        >
            {children}
        </motion.div>
    );
};

// Project Card Component
const ProjectCard = ({ index, title, desc, icon, source_code_link }) => (
    <TiltCard index={index}>
        <div
            onClick={() => window.open(source_code_link, "_blank")}
            className='bg-tertiary p-5 rounded-2xl sm:w-[360px] w-full cursor-pointer'
            style={{ transform: "translateZ(50px)" }}
        >
            <div className='relative w-full h-[230px]'>
                <img
                    src={icon}
                    alt={title}
                    className='w-full h-full object-cover rounded-2xl'
                    style={{ transform: "translateZ(75px)" }}
                />
                <div className='absolute inset-0 flex justify-end m-3 card-img_hover'>
                    <div
                        className='black-gradient w-10 h-10 rounded-full flex justify-center items-center'
                        style={{ transform: "translateZ(100px)" }}
                    >
                        <img
                            src="/images/github.png"
                            alt='github'
                            className='w-1/2 h-1/2 object-contain'
                        />
                    </div>
                </div>
            </div>
            <div className='mt-5' style={{ transform: "translateZ(50px)" }}>
                <h3 className='text-white font-bold text-[24px]'>{title}</h3>
                <p className='mt-2 text-secondary text-[14px]'>{desc}</p>
            </div>
        </div>
    </TiltCard>
);

// Main Works Component
const Works = () => {
    return (
        <div id="projects" className="flex flex-col items-center">
            <motion.div variants={textVariant()}>
                <h2 className={styles.sectionHeadText}>Projects.</h2>
            </motion.div>

            <div className='w-full flex justify-center'>
                <motion.p
                    variants={fadeIn("", "", 0.1, 1)}
                    className='mt-3 text-secondary text-[17px] max-w-3xl leading-[30px] text-center'
                >
                    Following projects showcases my skills and experience through
                    real-world examples of my work. Each project is briefly described with
                    links to code repositories.
                </motion.p>
            </div>

            <div className='mt-20 flex flex-row flex-wrap gap-7 justify-center'>
                {Projects.map((project, index) => (
                    <ProjectCard key={`project-${index}`} index={index} {...project} />
                ))}
            </div>
        </div>
    );
};

// Export wrapped component
export default SectionWrapper(Works, "projects");