import React from "react";

const Footer = () => (
  <footer className="bg-dark text-white mt-5 p-4 text-center footer">
    <div className="container">
      Copyright &copy; {new Date().getFullYear()} DevSocial
    </div>
  </footer>
);

export default Footer;
