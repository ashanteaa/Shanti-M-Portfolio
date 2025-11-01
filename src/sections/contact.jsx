import { useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import TitleHeader from "/src/components/HeroModels/TitleHeader.jsx";
import ContactExperience from "/src/components/HeroModels/ContactExperience";
import GlowCard from "/src/components/HeroModels/GlowCard";

const Contact = () => {
    const formRef = useRef(null);
    const [loading, setLoading] = useState(false);
    const [form, setForm] = useState({ name: "", email: "", message: "" });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm({ ...form, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            await emailjs.sendForm(
                import.meta.env.VITE_APP_EMAILJS_SERVICE_ID,
                import.meta.env.VITE_APP_EMAILJS_TEMPLATE_ID,
                formRef.current,
                import.meta.env.VITE_APP_EMAILJS_PUBLIC_KEY
            );
            setForm({ name: "", email: "", message: "" });
        } catch (error) {
            console.error("EmailJS Error:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <section id="contact" className="flex-center section-padding">
            <div className="w-full max-w-7xl md:px-10 px-5">
                <TitleHeader title="Get in Touch – Let's Connect" />
                <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 mt-8">
                    <div className="xl:col-span-5">
                        <GlowCard card={{ review: "" }} index={0}>
                            <div className="rounded-xl p-3">
                                <form ref={formRef} onSubmit={handleSubmit} className="w-full flex flex-col gap-5">
                                    <div>
                                        <label htmlFor="name">Your name</label>
                                        <input
                                            type="text"
                                            id="name"
                                            name="name"
                                            value={form.name}
                                            onChange={handleChange}
                                            placeholder="What's your good name?"
                                            required
                                        />
                                    </div>

                                    <div>
                                        <label htmlFor="email">Your Email</label>
                                        <input
                                            type="email"
                                            id="email"
                                            name="email"
                                            value={form.email}
                                            onChange={handleChange}
                                            placeholder="What's your email address?"
                                            required
                                        />
                                    </div>

                                    <div>
                                        <label htmlFor="message">Your Message</label>
                                        <textarea
                                            id="message"
                                            name="message"
                                            value={form.message}
                                            onChange={handleChange}
                                            placeholder="How can I help you?"
                                            rows="5"
                                            required
                                        />
                                    </div>

                                    <button type="submit">
                                        <div className="cta-button group">
                                            <div className="bg-circle" />
                                            <p className="text">{loading ? "Sending..." : "Send Message"}</p>
                                            <div className="arrow-wrapper">
                                                <img src="/images/arrow-down.svg" alt="arrow" />
                                            </div>
                                        </div>
                                    </button>
                                </form>
                            </div>
                        </GlowCard>
                    </div>
                    <div className="xl:col-span-7 h-147">
                        <div className="bg-[#cd7c2e] w-full h-full rounded-3xl overflow-hidden hover:cursor-grab">
                            <ContactExperience />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Contact;