import { Link } from 'react-router-dom';
import './Home.css';

const services = [
  { icon: '✏️', title: 'Conception & Conseil', desc: "Conseils techniques et esthétiques dès la conception pour garantir une solution inox optimale, adaptée à chaque projet décoratif ou industriel." },
  { icon: '⚙️', title: 'Fabrication sur mesure', desc: "Production sur commande d'éléments en acier inoxydable, avec précision artisanale et contrôles qualité rigoureux à chaque étape." },
  { icon: '🚚', title: 'Livraison & Installation', desc: "Transport sécurisé jusqu'au site client, avec installation sur place par nos experts pour un rendu final impeccable." },
];

const stats = [
  { value: '500+', label: 'Projets réalisés' },
  { value: '12+', label: "Années d'expérience" },
  { value: '100%', label: 'Satisfaction client' },
  { value: '4', label: 'Secteurs couverts' },
];

const highlights = [
  { cat: 'Décoration intérieure', title: "Escaliers en acier inoxydable sur mesure", img: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600' },
  { cat: 'Tuyauterie', title: "Solutions de tuyauterie industrielle de haute qualité", img: 'https://images.unsplash.com/photo-1581094271901-8022df4466f9?w=600' },
  { cat: 'Métallerie', title: "Un intérieur somptueux mêlant finitions dorées et mobilier élégant", img: 'https://images.unsplash.com/photo-1556909172-54557c7e4fb7?w=600' },
];

export default function Home() {
  return (
    <div className="home">
      {/* HERO */}
      <section className="home__hero">
        <div className="home__hero-overlay" />
        <div className="home__hero-content animate-fade-up">
          <span className="home__hero-tag">Experts en Acier Inoxydable — Casablanca</span>
          <h1>L'Inox <span className="gold-text">Réinventé</span> pour Votre Espace</h1>
          <p>Conception, fabrication et installation de structures en acier inoxydable pour la décoration, l'industrie, le médical et l'alimentaire.</p>
          <div className="home__hero-btns">
            <Link to="/catalogue" className="btn-gold">Voir le catalogue</Link>
            <Link to="/contact" className="btn-outline">Demander un devis</Link>
          </div>
        </div>
        <div className="home__hero-scroll">
          <span>↓</span>
        </div>
      </section>

      {/* STATS */}
      <section className="home__stats">
        {stats.map((s, i) => (
          <div className="home__stat" key={i}>
            <span className="home__stat-value gold-text">{s.value}</span>
            <span className="home__stat-label">{s.label}</span>
          </div>
        ))}
      </section>

      {/* SERVICES */}
      <section className="home__services">
        <p className="section-subtitle">Ce que nous faisons</p>
        <h2 className="section-title">Nos <span className="gold-text">Services</span></h2>
        <span className="gold-underline" />
        <div className="home__services-grid">
          {services.map((s, i) => (
            <div className="home__service-card" key={i} style={{ animationDelay: `${i * 0.15}s` }}>
              <div className="home__service-icon">{s.icon}</div>
              <h3>{s.title}</h3>
              <p>{s.desc}</p>
              <Link to="/catalogue" className="home__service-link">En savoir plus →</Link>
            </div>
          ))}
        </div>
      </section>

      {/* WHY US */}
      <section className="home__why">
        <div className="home__why-text animate-fade-up">
          <span className="home__why-badge">Pourquoi nous choisir ?</span>
          <h2>L'Excellence de l'Inox, <span className="gold-text">Artisanalement</span></h2>
          <p>Chez Cristal Inox, chaque pièce est pensée pour offrir une résistance optimale, une finition irréprochable et une intégration parfaite dans son environnement. Nous combinons design contemporain et savoir-faire artisanal pour donner vie à vos projets.</p>
          <ul className="home__why-list">
            <li>✔ Matériaux certifiés normes internationales</li>
            <li>✔ Délais respectés et suivi personnalisé</li>
            <li>✔ Équipe technique qualifiée et expérimentée</li>
            <li>✔ Solutions sur mesure pour tous budgets</li>
          </ul>
          <Link to="/about" className="btn-gold" style={{ marginTop: '24px' }}>En savoir plus sur nous</Link>
        </div>
        <div className="home__why-image">
          <img src="https://images.unsplash.com/photo-1565183997392-2f6f122e5912?w=700" alt="Atelier Cristal Inox" />
          <div className="home__why-badge-float">
            <span>⭐</span>
            <div><strong>Qualité premium</strong><small>Certifiée & garantie</small></div>
          </div>
        </div>
      </section>

      {/* HIGHLIGHTS */}
      <section className="home__highlights">
        <p className="section-subtitle">Découvrez ces destinations INCROYABLES !</p>
        <h2 className="section-title">Nos <span className="gold-text">Réalisations</span></h2>
        <span className="gold-underline" />
        <div className="home__highlights-grid">
          {highlights.map((h, i) => (
            <div className="home__highlight-card" key={i}>
              <img src={h.img} alt={h.title} />
              <div className="home__highlight-body">
                <span className="home__highlight-cat">{h.cat}</span>
                <p>{h.title}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA BANNER */}
      <section className="home__cta-banner">
        <div>
          <h2>Prêt à démarrer votre projet ?</h2>
          <p>Contactez-nous aujourd'hui pour un devis gratuit et personnalisé.</p>
        </div>
        <Link to="/contact" className="btn-gold">Contactez-nous</Link>
      </section>
    </div>
  );
}