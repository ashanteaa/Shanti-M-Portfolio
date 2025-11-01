import React, { useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

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

const services = [
    { title: "Web Developer", icon: "/images/website.png" },
    { title: "App Developer", icon: "/images/application.png" },
    { title: "Front end Developer", icon: "/images/frontend.png" },
    { title: "Data Analyst", icon: "/images/data.png" },
];

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
            variants={fadeIn("right", "spring", index * 0.5, 0.75)}
            style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className='w-60'
        >
            {children}
        </motion.div>
    );
};

const ServiceCard = ({ index, title, icon }) => (
    <TiltCard index={index}>
        <div className='w-full green-pink-gradient p-[1px] rounded-[20px] shadow-card'>
            <div className='bg-tertiary rounded-[20px] py-5 px-12 min-h-[280px] flex justify-evenly items-center flex-col'>
                <img src={icon} alt={title} className='w-16 h-16 object-contain' />
                <h3 className='text-white text-[20px] font-bold text-center'>{title}</h3>
            </div>
        </div>
    </TiltCard>
);

const About = () => {
    return (
        <div id="about" className="flex flex-col items-center">
            <motion.div variants={textVariant()}>
                <h2 className={styles.sectionHeadText}>Introduction.</h2>
            </motion.div>

            <motion.p
                variants={fadeIn("", "", 0.1, 1)}
                className='mt-4 text-secondary text-[17px] max-w-3xl leading-[30px] text-center'
            >
                I'm a Data Science graduate, passionate about combining UI/UX design, data analytics,
                and web & mobile development to create meaningful digital solutions. With hands-on experience in
                React Native, Firebase, Power BI, SQL, and Three.js, I build scalable, insightful,
                and user interactive projects. I love turning complex ideas into intuitive products that
                connect design, data, and functionality.
            </motion.p>

            <div className='mt-20 flex flex-wrap gap-10 justify-center'>
                {services.map((service, index) => (
                    <ServiceCard key={service.title} index={index} {...service} />
                ))}
            </div>
        </div>
    );
};

export default SectionWrapper(About, "about");