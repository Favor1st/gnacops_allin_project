import { Link, useLocation } from "react-router-dom";

const navLinks = [
  { title: "Home", url: "/" },
  { title: "About", url: "/about" },
  { title: "Contact", url: "/contact" },
  { title: "FAQ", url: "/faq" },
  { title: "Login", url: "/login" },
  { title: "Register", url: "/register" },
];

export function PublicNavigation() {
  const location = useLocation();
  return (
    <nav className="w-full bg-white border-b px-4 py-3 flex items-center justify-between">
      <div className="flex items-center space-x-4">
        <span className="font-bold text-lg text-foreground">GNACOPS</span>
        {navLinks.map((link) => (
          <Link
            key={link.url}
            to={link.url}
            className={`ml-4 text-sm font-medium ${location.pathname === link.url ? "text-ghana-gold" : "text-muted-foreground"}`}
          >
            {link.title}
          </Link>
        ))}
      </div>
    </nav>
  );
} 