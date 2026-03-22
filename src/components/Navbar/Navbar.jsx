import { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import {
  HiOutlineHome,
  HiOutlineInformationCircle,
  HiOutlineViewGrid,
  HiOutlineMail,
  HiOutlineMenuAlt3,
  HiOutlineX,
  HiOutlineSparkles,
} from 'react-icons/hi';
import './Navbar.css';

const NAV_LINKS = [
  { to: '/',          label: 'Accueil',   icon: HiOutlineHome },
  { to: '/about',     label: 'À propos',  icon: HiOutlineInformationCircle },
  { to: '/catalogue', label: 'Catalogue', icon: HiOutlineViewGrid },
  { to: '/contact',   label: 'Contact',   icon: HiOutlineMail },
];

export default function Navbar() {
  const [scrolled,  setScrolled]  = useState(false);
  const [menuOpen,  setMenuOpen]  = useState(false);

  /* ── scroll listener ── */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  /* ── lock body scroll when drawer open ── */
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  const close = () => setMenuOpen(false);

  return (
    <>
      {/* ── Overlay ── */}
      <div
        className={`navbar__overlay ${menuOpen ? 'navbar__overlay--visible' : ''}`}
        onClick={close}
        aria-hidden="true"
      />

      <nav className={`navbar ${scrolled ? 'navbar--scrolled' : ''}`}>

        {/* ── Logo ── */}
        <NavLink to="/" className="navbar__logo" onClick={close}>
          <span className="navbar__logo-img-wrap">
            <img src="./logos/logo.png" alt="Art Metal logo" />
          </span>
          <span className="navbar__logo-text">
            Art<span className="navbar__logo-accent">Metal</span>
          </span>
        </NavLink>

        {/* ── Desktop links ── */}
        <ul className="navbar__links">
          {NAV_LINKS.map(({ to, label, icon: Icon }) => (
            <li key={to}>
              <NavLink
                to={to}
                end={to === '/'}
                className={({ isActive }) =>
                  `navbar__link${isActive ? ' navbar__link--active' : ''}`
                }
              >
                <Icon className="navbar__link-icon" />
                {label}
              </NavLink>
            </li>
          ))}
          <li>
            <NavLink to="/contact" className="navbar__cta">
              <HiOutlineSparkles />
              Devis gratuit
            </NavLink>
          </li>
        </ul>

        {/* ── Burger ── */}
        <button
          className={`navbar__burger ${menuOpen ? 'navbar__burger--open' : ''}`}
          onClick={() => setMenuOpen(v => !v)}
          aria-label={menuOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
          aria-expanded={menuOpen}
        >
          {menuOpen ? <HiOutlineX /> : <HiOutlineMenuAlt3 />}
        </button>

      </nav>

      {/* ── Mobile Drawer ── */}
      <aside className={`navbar__drawer ${menuOpen ? 'navbar__drawer--open' : ''}`}>
        <div className="navbar__drawer-header">
          <span className="navbar__drawer-brand">
            Art<span className="navbar__logo-accent">Metal</span>
          </span>
        </div>

        <ul className="navbar__drawer-links">
          {NAV_LINKS.map(({ to, label, icon: Icon }, i) => (
            <li key={to} style={{ '--i': i }}>
              <NavLink
                to={to}
                end={to === '/'}
                className={({ isActive }) =>
                  `navbar__drawer-link${isActive ? ' navbar__drawer-link--active' : ''}`
                }
                onClick={close}
              >
                <span className="navbar__drawer-link-icon"><Icon /></span>
                {label}
              </NavLink>
            </li>
          ))}
        </ul>

        <div className="navbar__drawer-footer">
          <NavLink to="/contact" className="btn btn-primary navbar__drawer-cta" onClick={close}>
            <HiOutlineSparkles />
            Devis gratuit
          </NavLink>
        </div>
      </aside>
    </>
  );
}