import { socialImgs } from "/src/constants/index.js";

const Footer = () => {
    const handleSocialClick = (link) => {
        window.open(link, "_blank");
    };

    return (
        <footer className="footer">
            <div className="footer-container">
                <div className="flex flex-col justify-center">
                    <p>Terms & Conditions</p>
                </div>
                <div className="socials">
                    {socialImgs.map((socialImg, index) => (
                        <div
                            key={index}
                            className="icon cursor-pointer hover:opacity-80 transition-opacity"
                            onClick={() => handleSocialClick(socialImg.link)}
                        >
                            <img src={socialImg.imgPath} alt="social icon" />
                        </div>
                    ))}
                </div>
                <div className="flex flex-col justify-center">
                    <p className="text-center md:text-end">
                        © {new Date().getFullYear()} Shanti Mhatre. All rights reserved.
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;