import Hero from './sections/hero.jsx';
import Navbar from './sections/navbar.jsx';
import Projects from './sections/projects.jsx';
import About from './sections/about.jsx';
import Experience from './sections/experience.jsx';
import TechStack from './sections/TechStack.jsx';
import Contact from "./sections/contact.jsx";
import Footer from "./sections/footer.jsx";


const App = () => {
    return (
        <>
            <Navbar />
                <Hero />
                <About />
                <Projects />
                <Experience />
                <TechStack />
                <Contact />
                <Footer />

        </>
    );
};

export default App;
