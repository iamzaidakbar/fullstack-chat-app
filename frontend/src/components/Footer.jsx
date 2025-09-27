import { Heart, Github, Linkedin, Mail } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-base-200 border-t border-base-300 py-6 mt-auto">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Brand */}
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded bg-gradient-to-br from-primary to-primary/70 flex items-center justify-center">
              <span className="text-white text-xs font-bold">ZA</span>
            </div>
            <div>
              <p className="text-sm font-semibold text-base-content">ZA Chat</p>
              <p className="text-xs text-base-content/60">by Zaid Akbar</p>
            </div>
          </div>

          {/* Social Links */}
          <div className="flex items-center gap-4">
            <a
              href="https://github.com/iamzaidakbar"
              target="_blank"
              rel="noopener noreferrer"
              className="text-base-content/60 hover:text-primary transition-colors"
              aria-label="GitHub"
            >
              <Github className="w-5 h-5" />
            </a>
            <a
              href="https://linkedin.com/in/zaidakbar"
              target="_blank"
              rel="noopener noreferrer"
              className="text-base-content/60 hover:text-primary transition-colors"
              aria-label="LinkedIn"
            >
              <Linkedin className="w-5 h-5" />
            </a>
            <a
              href="https://iamzaidakbar@gmail.com"
              className="text-base-content/60 hover:text-primary transition-colors"
              aria-label="Email"
            >
              <Mail className="w-5 h-5" />
            </a>
          </div>

          {/* Copyright */}
          <div className="text-center md:text-right">
            <p className="text-xs text-base-content/50 flex items-center gap-1">
              Made with <Heart className="w-3 h-3 text-red-500" /> by Zaid Akbar
            </p>
            <p className="text-xs text-base-content/40 mt-1">
              © 2024 ZA Chat. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
