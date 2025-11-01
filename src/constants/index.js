const navLinks = [
    {
        name: "About",
        link: "#about",
    },
    {
        name: "Projects",
        link: "#projects",
    },
    {
        name: "Experience",
        link: "#experience",
    },
    {
        name: "Skills",
        link: "#skills",
    },

];

const words = [
    { text: "Ideas", imgPath: "/images/ideas.svg" },
    { text: "Concepts", imgPath: "/images/concepts.svg" },
    { text: "Designs", imgPath: "/images/designs.svg" },
    { text: "Code", imgPath: "/images/code.svg" },
    { text: "Ideas", imgPath: "/images/ideas.svg" },
    { text: "Concepts", imgPath: "/images/concepts.svg" },
    { text: "Designs", imgPath: "/images/designs.svg" },
    { text: "Code", imgPath: "/images/code.svg" },
];


const expCards = [
    {
        logoPath: "/images/logo4.png",
        title: "Cyber Security Intern",
        date: "March 2025 - April 2025",
        responsibilities: [
            "Built offline centralized logging system using ELK Stack + Wazuh on Rocky Linux.",
            "Configured Logstash, Elasticsearch, Kibana, and Wazuh for log management and monitoring.",
            "Conducted system analysis and optimized monitoring workflows.",
        ],
    },

    {
        logoPath: "/images/logo1.jpeg",
        title: "Social Media Team Lead (Intern)",
        date: "Dec 2024 – May 2025",
        responsibilities: [
            "Managed and coordinated a 56-member team to deliver consistent, high-quality content across multiple social media platforms.",
            "Developed creative content strategies and managed Instagram growth.",
            "Boosted engagement by 20 percent and significantly increased followers and reach for the organization’s official pages.",
        ],
    },

    {
        logoPath: "/images/logo2.jpeg",
        title: "Graphics Head",
        date: "July 2023 - August 2024",
        responsibilities: [
            "Led the design and creative direction for event and annual fest posters, social media content, and promotional materials, maintaining a consistent brand identity.",
            "Managed a team delegating tasks and ensuring timely delivery of all posters and visuals were ready on time for college events.",
        ],
    },

    {
        logoPath: "/images/logo2.jpeg",
        title: "Elected Student Representative",
        date: "July 2022 - June 2023",
        responsibilities: [
            "Acted as a liaison between students and faculty to address academic issues and administrative issues.",
            "Coordinated college fest activities, ensuring smooth event execution and participation."
        ]
    },
];

const Projects = [
    {
        title: "Juno: A pregnancy journal",
        desc:
            "Juno is a personalized pregnancy tracker app that helps users track milestones, view fetal updates, and manage appointments. Built with React Native, Firebase, and JavaScript.",
        icon: "/images/juno.jpeg",
        source_code_link: "https://github.com/ashanteaa/juno-pregnancy-journal",
    },
    {
        title: "TrackFit",
        desc:
            "A web-based application that allows users " +
            "to input their health parameters to predict relevant fitness metrics such as calories burned.",
        icon: "/images/trackfit.png",
        source_code_link: "https://github.com/ashanteaa/Implementation-of-Personal-Fitness-Tracker-using-Py",
    },
];

const socialImgs = [
    {
        name: "github",
        imgPath: "/images/github.png",
        link: "https://github.com/ashanteaa"
    },

    {
        name: "linkedin",
        imgPath: "/images/linkedin.png",
        link: "https://www.linkedin.com/in/ashantea/"
    },
];

export {
    words,
    expCards,
    Projects,
    socialImgs,
    navLinks,
};