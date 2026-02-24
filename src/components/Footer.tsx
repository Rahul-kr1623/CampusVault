import { BookOpen, Github, Twitter, Linkedin, Mail, Heart } from "lucide-react";
import { Link } from "react-router-dom";

const footerLinks = {
  Platform: [
    { label: "Browse Library", href: "/dashboard" },
    { label: "Upload Notes", href: "/dashboard?upload=true" },
    { label: "Leaderboard", href: "/dashboard" },
    { label: "How It Works", href: "/" },
  ],
  Resources: [
    { label: "CAT Papers", href: "/dashboard" },
    { label: "FAT Papers", href: "/dashboard" },
    { label: "Lab Manuals", href: "/dashboard" },
    { label: "Assignments", href: "/dashboard" },
  ],
  Support: [
    { label: "FAQ", href: "/" },
    { label: "Contact Us", href: "/" },
    { label: "Report an Issue", href: "/" },
    { label: "Privacy Policy", href: "/" },
  ],
};

const socialLinks = [
  { icon: Github, href: "#", label: "GitHub" },
  { icon: Twitter, href: "#", label: "Twitter" },
  { icon: Linkedin, href: "#", label: "LinkedIn" },
  { icon: Mail, href: "#", label: "Email" },
];

const Footer = () => {
  return (
    <footer className="border-t border-border bg-card/50">
      <div className="container mx-auto px-4 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-10">
          {/* About */}
          <div className="md:col-span-2">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10">
                <BookOpen className="h-4 w-4 text-primary" />
              </div>
              <span className="text-lg font-bold text-foreground">CampusVault</span>
            </Link>
            <p className="text-sm text-muted-foreground leading-relaxed max-w-sm">
              A community-driven academic barter system built by students, for students. 
              Upload your notes, earn credits, and access a growing library of study materials.
            </p>
            <div className="flex items-center gap-3 mt-6">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  className="flex h-9 w-9 items-center justify-center rounded-lg bg-secondary text-muted-foreground hover:text-primary hover:bg-primary/10 transition-colors"
                >
                  <social.icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h3 className="text-sm font-semibold text-foreground mb-4">{title}</h3>
              <ul className="space-y-2.5">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link
                      to={link.href}
                      className="text-sm text-muted-foreground hover:text-primary transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-6 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} CampusVault. All rights reserved.
          </p>
          <p className="text-xs text-muted-foreground flex items-center gap-1">
            Made with <Heart className="h-3 w-3 text-destructive" /> by students
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
