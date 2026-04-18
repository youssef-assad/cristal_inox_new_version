import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  RiMailLine, RiPhoneLine, RiMapPinLine, RiTimeLine,
  RiFacebookFill, RiInstagramLine, RiLinkedinFill, RiYoutubeLine,
  RiArrowRightLine, RiShieldCheckLine, RiMedalLine,
  RiTruckLine, RiVerifiedBadgeLine,
} from 'react-icons/ri';
import './Footer.css';

/* ── Data ── */
const NAV_LINKS = [
  { to: '/',          label: 'Accueil' },
  { to: '/about',     label: 'À propos' },
  { to: '/catalogue', label: 'Catalogue' },
  { to: '/realisations', label: 'Réalisations' },
  { to: '/contact',   label: 'Contact' },
];

const SERVICES = [
  'Chaudronnerie inox',
  'Fabrication inox 316L sur mesure',
  'Garde-corps & rampes en inox',
  'Portails & clôtures inox',
  'Décoration acier inoxydable',
  'Livraison & installation Casablanca',
];

const CONTACT = [
  { icon: RiMailLine,    text: 'contact@artmetal.ma' },
  { icon: RiPhoneLine,   text: '+212 661 267 456' },
  { icon: RiMapPinLine,  text: 'HH42+M3 Titt Mellilen, Casablanca' },
  { icon: RiTimeLine,    text: 'Lun – Sam : 8h – 18h' },
];

const SOCIALS = [
  { icon: RiFacebookFill,  label: 'Facebook',  href: '#' },
  { icon: RiInstagramLine, label: 'Instagram', href: '#' },
  { icon: RiLinkedinFill,  label: 'LinkedIn',  href: '#' },
  { icon: RiYoutubeLine,   label: 'YouTube',   href: '#' },
];

const BADGES = [
  { icon: RiShieldCheckLine,   label: 'Inox 316L certifié' },
  { icon: RiMedalLine,         label: '+500 projets réalisés' },
  { icon: RiTruckLine,         label: 'Livraison Maroc entier' },
  { icon: RiVerifiedBadgeLine, label: 'Garantie 10 ans' },
];

/* ── Component ── */
export default function Footer() {
  const [email, setEmail]       = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!email) return;
    setSubscribed(true);
    setEmail('');
    setTimeout(() => setSubscribed(false), 4000);
  };

  return (
    <footer className="footer">
      {/* top gold line */}
      <div className="footer__line" />

      {/* ── Newsletter ── */}
      <div className="footer__newsletter">
        <div className="footer__newsletter-text">
          <h3>Restez informé de nos réalisations</h3>
          <p>Nouveaux projets, conseils techniques et offres exclusives.</p>
        </div>
        {subscribed ? (
          <p className="footer__newsletter-success">
            ✓ Merci ! Vous êtes bien inscrit.
          </p>
        ) : (
          <form className="footer__newsletter-form" onSubmit={handleSubscribe}>
            <input
              type="email"
              placeholder="votre@email.com"
              value={email}
              onChange={e => setEmail(e.target.value)}
              aria-label="Adresse email"
            />
            <button type="submit">
              S'abonner <RiArrowRightLine />
            </button>
          </form>
        )}
      </div>

      {/* ── Main columns ── */}
      <div className="footer__top">

        {/* Brand */}
        <div className="footer__brand">
          <Link to="/" className="footer__logo">
            <img src="./logos/logo.png" alt="artmetal" className='footer__logo-diamond'/>
            <span className="footer__logo-name">artmetal</span>
          </Link>
          <p>Artmetal — experts en chaudronnerie et acier inoxydable à Casablanca et Had Soualem. Fabrication sur mesure, décoration inox, industrie, médical et alimentaire depuis plus de 12 ans.</p>
          <div className="footer__socials">
            {SOCIALS.map(({ icon: Icon, label, href }) => (
              <a key={label} href={href} className="footer__social-btn" aria-label={label} target="_blank" rel="noopener noreferrer">
                <Icon />
              </a>
            ))}
          </div>
        </div>

        {/* Navigation */}
        <div className="footer__col">
          <h4 className="footer__col-title">Navigation</h4>
          <ul>
            {NAV_LINKS.map(({ to, label }) => (
              <li key={to}>
                <Link to={to} className="footer__link">
                  <span>{label}</span>
                  <RiArrowRightLine className="footer__link-arrow" />
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Services */}
        <div className="footer__col">
          <h4 className="footer__col-title">Services</h4>
          <ul>
            {SERVICES.map(s => (
              <li key={s}>
                <span className="footer__service-item">
                  <span className="footer__service-dot" />
                  {s}
                </span>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div className="footer__col">
          <h4 className="footer__col-title">Contact</h4>
          <ul className="footer__contact-list">
            {CONTACT.map(({ icon: Icon, text }) => (
              <li key={text} className="footer__contact-item">
                <span className="footer__contact-icon">
                  <Icon />
                </span>
                <span>{text}</span>
              </li>
            ))}
          </ul>
          <Link to="/contact" className="footer__cta-btn">
            Demander un devis <RiArrowRightLine />
          </Link>
        </div>
      </div>

      {/* ── Trust badges ── */}
      <div className="footer__badges">
        {BADGES.map(({ icon: Icon, label }) => (
          <div key={label} className="footer__badge">
            <Icon />
            <span>{label}</span>
          </div>
        ))}
      </div>

      {/* ── Bottom bar ── */}
      <div className="footer__bottom">
        <span className="footer__bottom-copy">
          © {new Date().getFullYear()} Artmetal — Chaudronnerie & acier inoxydable à Casablanca · Tous droits réservés
        </span>
        <div className="footer__bottom-links">
          <Link to="/privacy">Politique de confidentialité</Link>
          <Link to="/legal">Mentions légales</Link>
          <Link to="/cgv">CGV</Link>
        </div>
      </div>

      {/* bottom gold line */}
      <div className="footer__line" />
    </footer>
  );
}