import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <header
      className={`
      fixed top-0 left-0 right-0 z-50
      flex justify-between items-center p-4 mx-8 my-4 md:mx-8
      transition-all duration-300
      ${
        isScrolled
          ? "bg-[#05252C66] backdrop-blur-md rounded-2xl shadow-lg"
          : "border border-[#197686] rounded-2xl"
      }
    `}
    >
      <Link to="/" className="logo">
        <img src="/tiez-logo.svg" alt="Tiez Logo" className="h-10" />
      </Link>
      <nav className="hidden md:flex">
        <Link
          to="/"
          className="mx-4 text-gray-100 hover:text-teal-400 transition-colors"
        >
          Events
        </Link>
        <Link
          to="/my-tickets"
          className="mx-4 text-gray-100 hover:text-teal-400 transition-colors"
        >
          My Tickets
        </Link>
        <a
          href="#"
          className="mx-4 text-gray-100 hover:text-teal-400 transition-colors"
        >
          About Project
        </a>
      </nav>
      <button
        onClick={() => navigate("/my-tickets")}
        className="border border-teal-500 bg-white text-black hover:bg-teal-500 hover:text-gray-900 py-2 px-4 rounded-lg font-medium transition-all"
      >
        MY TICKETS →
      </button>
    </header>
  );
};

export default Header;
