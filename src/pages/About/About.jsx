// About.jsx
import { Link } from 'react-router-dom';
import './About.css';

const values = [
  { icon: '🏆', title: 'Excellence', desc: 'Chaque pièce passe par des contrôles qualité stricts avant livraison.' },
  { icon: '🔬', title: 'Précision', desc: 'Fabrication artisanale avec des outils de haute technologie.' },
  { icon: '🌿', title: 'Durabilité', desc: "L'inox : anti-corrosion, hygiénique, durable sur 50+ ans." },
  { icon: '🤝', title: 'Engagement', desc: 'Devis transparent, délais respectés, service après-vente réactif.' },
];

const team = [
  { name: 'Équipe Conception', role: 'Design & Architecture', icon: '✏️' },
  { name: 'Équipe Fabrication', role: 'Production & CNC', icon: '⚙️' },
  { name: 'Équipe Installation', role: 'Pose & Finitions', icon: '🔧' },
  { name: 'Service Client', role: 'Conseil & Suivi', icon: '📞' },
];

export default function About() {
  return (
    <div className="about">
      {/* HERO */}
      <section className="about__hero">
        <div className="about__hero-overlay" />
        <div className="about__hero-content animate-fade-up">
          <span className="about__hero-tag">À PROPOS DE NOUS</span>
          <h1>Experts en Acier Inoxydable<br /><span className="gold-text">à Casablanca</span></h1>
          <p>Design & Industrie — depuis plus de 12 ans</p>
        </div>
      </section>

      {/* INTRO */}
      <section className="about__intro">
        <div className="about__intro-text animate-fade-up">
          <h2>Votre Partenaire <span className="gold-text">en Inox</span></h2>
          <span className="gold-underline" />
          <p>Chez <strong>artmetal</strong>, basé à Casablanca, nous sommes spécialisés dans la conception et fabrication de structures en acier inoxydable pour la décoration, l'industrie, le médical et le secteur alimentaire. Nous combinons design contemporain, robustesse et savoir-faire artisanal pour donner vie à vos projets sur mesure.</p>
          <p>Nos réalisations respectent les normes les plus strictes. Chaque pièce est pensée pour offrir une <strong style={{color:'var(--gold)'}}>résistance optimale</strong>, une <strong style={{color:'var(--gold)'}}>finition irréprochable</strong>, et une <strong style={{color:'var(--gold)'}}>intégration parfaite</strong> dans son environnement, qu'il soit décoratif ou industriel.</p>
          <Link to="/catalogue" className="btn-gold" style={{ marginTop: '24px' }}>Découvrir nos services</Link>
        </div>
        <div className="about__intro-img">
          <img src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=700" alt="artmetal atelier" />
        </div>
      </section>

      {/* VALUES */}
      <section className="about__values">
        <h2 className="section-title">Nos <span className="gold-text">Valeurs</span></h2>
        <span className="gold-underline" />
        <div className="about__values-grid">
          {values.map((v, i) => (
            <div className="about__value-card" key={i} style={{ animationDelay: `${i*0.1}s` }}>
              <span className="about__value-icon">{v.icon}</span>
              <h3>{v.title}</h3>
              <p>{v.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* SECTORS */}
      <section className="about__sectors">
        <h2 className="section-title">Secteurs <span className="gold-text">d'Activité</span></h2>
        <span className="gold-underline" />
        <div className="about__sectors-grid">
          {[
            { label: 'Décoration intérieure', img: 'https://images.unsplash.com/photo-1556909172-54557c7e4fb7?w=500', desc: "Mobilier, escaliers, portes, bibliothèques — chaque pièce est une œuvre d'art." },
            { label: 'Industrie', img: 'https://images.unsplash.com/photo-1581094271901-8022df4466f9?w=500', desc: "Tuyauterie, structures et équipements pour les secteurs industriels exigeants." },
            { label: 'Médical', img: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=500', desc: "Mobilier médical certifié, facile à désinfecter et résistant à la corrosion." },
            { label: 'Alimentaire', img: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=500', desc: "Équipements de cuisine professionnelle conformes aux normes sanitaires." },
          ].map((s, i) => (
            <div className="about__sector-card" key={i}>
              <img src={s.img} alt={s.label} />
              <div className="about__sector-body">
                <h3>{s.label}</h3>
                <p>{s.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* TEAM */}
      <section className="about__team">
        <h2 className="section-title">Notre <span className="gold-text">Équipe</span></h2>
        <span className="gold-underline" />
        <div className="about__team-grid">
          {team.map((t, i) => (
            <div className="about__team-card" key={i}>
              <div className="about__team-icon">{t.icon}</div>
              <h3>{t.name}</h3>
              <p>{t.role}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}