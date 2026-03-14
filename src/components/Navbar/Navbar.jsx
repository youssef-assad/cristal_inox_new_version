import { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import './Navbar.css';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <nav className={`navbar ${scrolled ? 'navbar--scrolled' : ''}`}>
      <NavLink to="/" className="navbar__logo">
        <span className="navbar__logo-icon">◆</span> Cristal Inox
      </NavLink>

      <button className="navbar__burger" onClick={() => setMenuOpen(!menuOpen)} aria-label="menu">
        <span /><span /><span />
      </button>

      <ul className={`navbar__links ${menuOpen ? 'navbar__links--open' : ''}`}>
        {[['/', 'Accueil'], ['/about', 'À propos'], ['/catalogue', 'Catalogue'], ['/contact', 'Contact']].map(([to, label]) => (
          <li key={to}>
            <NavLink
              to={to}
              end={to === '/'}
              className={({ isActive }) => isActive ? 'navbar__link navbar__link--active' : 'navbar__link'}
              onClick={() => setMenuOpen(false)}
            >
              {label}
            </NavLink>
          </li>
        ))}
        <li>
          <NavLink to="/contact" className="navbar__cta" onClick={() => setMenuOpen(false)}>
            Devis gratuit
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}