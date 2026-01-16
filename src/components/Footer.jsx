import { Heart } from "lucide-react";
import { FaGithub, FaLinkedin } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gray-900 border-t border-gray-800 pt-10 pb-6">
      <div className="flex flex-col items-center justify-center gap-3 px-4 text-gray-300">
        <div className="flex flex-col md:flex-row items-center gap-2">
          <span>© 2024 DevTinder. Made with</span>
          <Heart size={16} className="text-red-500 fill-red-500" />
          <span>
            by <span className="font-semibold">@NirajkrDangi</span>
          </span>
        </div>

        <div className="flex items-center gap-4 mt-1">
          <a
            href="https://github.com/nirajkumardangi"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white transition"
          >
            <FaGithub size={20} />
          </a>

          <a
            href="https://www.linkedin.com/in/nirajkumardangi/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white transition"
          >
            <FaLinkedin size={20} />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
