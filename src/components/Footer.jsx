import { Code2, Github, Linkedin, Twitter } from "lucide-react";

function Footer() {
  return (
    <footer className="bg-slate-950 text-slate-400 py-8 border-t border-slate-900 pb-24 md:pb-8">
      <div className="mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center">
        <div className="mb-4 md:mb-0">
          <div className="flex items-center justify-center md:justify-start">
            <Code2 className="h-6 w-6 text-pink-600 mr-2" />
            <span className="text-lg font-bold text-white">DevTinder</span>
          </div>
          <p className="mt-2 text-sm">Match, Chat, Code.</p>
        </div>

        <div className="flex space-x-6">
          <Github className="hover:text-pink-500 cursor-pointer" size={20} />
          <Twitter className="hover:text-pink-500 cursor-pointer" size={20} />
          <Linkedin className="hover:text-pink-500 cursor-pointer" size={20} />
        </div>

        <div className="mt-4 md:mt-0 text-sm">&copy; 2024 DevTinder Inc.</div>
      </div>
    </footer>
  );
}

export default Footer;
