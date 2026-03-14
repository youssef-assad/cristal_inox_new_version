// Footer.jsx
import { Link } from 'react-router-dom';
import './Footer.css';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer__top">
        <div className="footer__brand">
          <div className="footer__logo">◆ Cristal Inox</div>
          <p>Experts en acier inoxydable à Casablanca. Design, durabilité et savoir-faire artisanal pour chaque projet décoratif et industriel.</p>
        </div>
        <div className="footer__col">
          <h4>Navigation</h4>
          <ul>
            <li><Link to="/">Accueil</Link></li>
            <li><Link to="/about">À propos</Link></li>
            <li><Link to="/catalogue">Catalogue</Link></li>
            <li><Link to="/contact">Contact</Link></li>
          </ul>
        </div>
        <div className="footer__col">
          <h4>Services</h4>
          <ul>
            <li>Conception sur mesure</li>
            <li>Fabrication inox</li>
            <li>Livraison & installation</li>
            <li>Conseil technique</li>
          </ul>
        </div>
        <div className="footer__col">
          <h4>Contact</h4>
          <ul>
            <li>📧 contact@cristalinox.ma</li>
            <li>📞 +212 661 236 987</li>
            <li>📍 HH42+M3 Titt Mellilen, Maroc</li>
            <li>🕐 Lun–Sam : 8h–18h</li>
          </ul>
        </div>
      </div>
      <div className="footer__bottom">
        <span>© {new Date().getFullYear()} Cristal Inox — Tous droits réservés</span>
        <span>Fait avec ❤️ à Casablanca</span>
      </div>
    </footer>
  );
}

