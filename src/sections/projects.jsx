import React, { useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { Projects } from "/src/constants/index.js";

const styles = {
    sectionHeadText: "text-white font-black md:text-[60px] sm:text-[50px] xs:text-[40px] text-[30px]",
};

const textVariant = (delay) => ({
    hidden: { y: -50, opacity: 0 },
    show: {
        y: 0,
        opacity: 1,
        transition: { type: "spring", duration: 1.25, delay },
    },
});

const fadeIn = (direction, type, delay, duration) => ({
    hidden: {
        x: direction === "left" ? 100 : direction === "right" ? -100 : 0,
        y: direction === "up" ? 100 : direction === "down" ? -100 : 0,
        opacity: 0,
    },
    show: {
        x: 0,
        y: 0,
        opacity: 1,
        transition: { type, delay, duration, ease: "easeOut" },
    },
});

const staggerContainer = (staggerChildren, delayChildren) => ({
    hidden: {},
    show: {
        transition: { staggerChildren, delayChildren: delayChildren || 0 },
    },
});

const SectionWrapper = (Component, idName) =>
    function HOC() {
        return (
            <motion.section
                variants={staggerContainer()}
                initial='hidden'
                whileInView='show'
                viewport={{ once: false, amount: 0.25 }}
                className='sm:px-16 px-6 sm:py-16 py-10 max-w-7xl mx-auto relative z-0'
            >
                <span className='hash-span' id={idName}>&nbsp;</span>
                <Component />
            </motion.section>
        );
    };

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
        const xPct = (e.clientX - rect.left) / rect.width - 0.5;
        const yPct = (e.clientY - rect.top) / rect.height - 0.5;
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
            style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
        >
            {children}
        </motion.div>
    );
};

const ProjectCard = ({ index, title, desc, icon, source_code_link }) => (
    <TiltCard index={index}>
        <div onClick={() => window.open(source_code_link, "_blank")} className='bg-tertiary p-5 rounded-2xl sm:w-[360px] w-full cursor-pointer'>
            <div className='relative w-full h-[230px]'>
                <img src={icon} alt={title} className='w-full h-full object-cover rounded-2xl' />
                <div className='absolute inset-0 flex justify-end m-3 card-img_hover'>
                    <div className='black-gradient w-10 h-10 rounded-full flex justify-center items-center'>
                        <img src="/images/github.png" alt='github' className='w-1/2 h-1/2 object-contain' />
                    </div>
                </div>
            </div>
            <div className='mt-5'>
                <h3 className='text-white font-bold text-[24px]'>{title}</h3>
                <p className='mt-2 text-secondary text-[14px]'>{desc}</p>
            </div>
        </div>
    </TiltCard>
);

const Works = () => (
    <div id="projects" className="flex flex-col items-center">
        <motion.div variants={textVariant()}>
            <h2 className={styles.sectionHeadText}>Projects.</h2>
        </motion.div>

        <div className='w-full flex justify-center'>
            <motion.p
                variants={fadeIn("", "", 0.1, 1)}
                className='mt-3 text-secondary text-[17px] max-w-3xl leading-[30px] text-center'
            >
                Following projects showcases my skills and experience through real-world examples of my work. Each project is briefly described with links to code repositories.
            </motion.p>
        </div>

        <div className='mt-20 flex flex-row flex-wrap gap-7 justify-center'>
            {Projects.map((project, index) => (
                <ProjectCard key={`project-${index}`} index={index} {...project} />
            ))}
        </div>
    </div>
);

export default SectionWrapper(Works, "projects");