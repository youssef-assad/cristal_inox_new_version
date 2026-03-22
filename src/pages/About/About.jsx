import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import './About.css';

const values = [
  { icon: '🏆', title: 'Excellence',   desc: 'Chaque pièce passe par des contrôles qualité stricts avant livraison.' },
  { icon: '🔬', title: 'Précision',    desc: 'Fabrication artisanale avec des outils de haute technologie.' },
  { icon: '🌿', title: 'Durabilité',   desc: "L'inox : anti-corrosion, hygiénique, durable sur 50+ ans." },
  { icon: '🤝', title: 'Engagement',   desc: 'Devis transparent, délais respectés, service après-vente réactif.' },
];

const team = [
  { name: 'Équipe Conception',   role: 'Design & Architecture', icon: '✏️' },
  { name: 'Équipe Fabrication',  role: 'Production & CNC',      icon: '⚙️' },
  { name: 'Équipe Installation', role: 'Pose & Finitions',       icon: '🔧' },
  { name: 'Service Client',      role: 'Conseil & Suivi',        icon: '📞' },
];

const sectors = [
  { label: 'Décoration intérieure', img: 'https://images.unsplash.com/photo-1556909172-54557c7e4fb7?w=500', desc: "Mobilier, escaliers, portes, bibliothèques — chaque pièce est une œuvre d'art." },
  { label: 'Industrie',             img: 'https://images.unsplash.com/photo-1581094271901-8022df4466f9?w=500', desc: "Tuyauterie, structures et équipements pour les secteurs industriels exigeants." },
  { label: 'Médical',               img: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=500', desc: "Mobilier médical certifié, facile à désinfecter et résistant à la corrosion." },
  { label: 'Alimentaire',           img: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=500', desc: "Équipements de cuisine professionnelle conformes aux normes sanitaires." },
];

/* ── Scroll reveal ── */
function useScrollReveal() {
  useEffect(() => {
    const els = document.querySelectorAll('.reveal');
    const io = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('revealed'); io.unobserve(e.target); } }),
      { threshold: 0.1 }
    );
    els.forEach(el => io.observe(el));
    return () => io.disconnect();
  }, []);
}

/* ── Parallax hero on scroll ── */
function useHeroParallax() {
  useEffect(() => {
    const hero = document.querySelector('.about__hero');
    if (!hero) return;
    const onScroll = () => {
      const y = window.scrollY;
      hero.style.setProperty('--parallax-y', `${y * 0.35}px`);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
}

/* ── Tilt cards ── */
function useTiltCards(selector) {
  useEffect(() => {
    const cards = document.querySelectorAll(selector);
    const handlers = [];
    cards.forEach(card => {
      const move = (e) => {
        const r = card.getBoundingClientRect();
        const x = (e.clientX - r.left) / r.width  - 0.5;
        const y = (e.clientY - r.top)  / r.height - 0.5;
        card.style.transform = `perspective(700px) rotateY(${x * 10}deg) rotateX(${-y * 8}deg) translateY(-6px)`;
      };
      const leave = () => { card.style.transform = ''; };
      card.addEventListener('mousemove', move);
      card.addEventListener('mouseleave', leave);
      handlers.push({ card, move, leave });
    });
    return () => handlers.forEach(({ card, move, leave }) => {
      card.removeEventListener('mousemove', move);
      card.removeEventListener('mouseleave', leave);
    });
  }, []);
}

/* ── Magnetic buttons ── */
function useMagneticButtons() {
  useEffect(() => {
    const btns = document.querySelectorAll('.btn-gold');
    const handlers = [];
    btns.forEach(btn => {
      const move = (e) => {
        const r = btn.getBoundingClientRect();
        const x = (e.clientX - r.left - r.width  / 2) * 0.25;
        const y = (e.clientY - r.top  - r.height / 2) * 0.35;
        btn.style.transform = `translate(${x}px, ${y}px)`;
      };
      const leave = () => { btn.style.transform = ''; };
      btn.addEventListener('mousemove', move);
      btn.addEventListener('mouseleave', leave);
      handlers.push({ btn, move, leave });
    });
    return () => handlers.forEach(({ btn, move, leave }) => {
      btn.removeEventListener('mousemove', move);
      btn.removeEventListener('mouseleave', leave);
    });
  }, []);
}

export default function About() {
  useScrollReveal();
  useHeroParallax();
  useTiltCards('.about__value-card');
  useTiltCards('.about__team-card');
  useMagneticButtons();

  return (
    <div className="about">

      {/* ── HERO ── */}
      <section className="about__hero">
        <div className="about__hero-overlay" />
        <div className="about__hero-content">
          <span className="about__hero-tag hero-anim-1">À propos de nous</span>
          <h1 className="hero-anim-2">
            Experts en Acier Inoxydable<br />
            <span className="gold-text">à Casablanca</span>
          </h1>
          <p className="hero-anim-3">Design & Industrie — depuis plus de 12 ans</p>
        </div>
        {/* floating stat chips */}
        <div className="about__hero-chips hero-anim-4">
          {['500+ projets', '12 ans d\'expérience', '100% satisfait'].map((c, i) => (
            <span key={i} className="hero-chip">{c}</span>
          ))}
        </div>
      </section>

      {/* ── INTRO ── */}
      <section className="about__intro">
        <div className="about__intro-text reveal reveal-left">
          <h2>Votre Partenaire <span className="gold-text">en Inox</span></h2>
          <span className="gold-underline" />
          <p>Chez <strong>artmetal</strong>, basé à Casablanca, nous sommes spécialisés dans la conception et fabrication de structures en acier inoxydable pour la décoration, l'industrie, le médical et le secteur alimentaire.</p>
          <p>Nous combinons design contemporain, robustesse et savoir-faire artisanal pour donner vie à vos projets sur mesure, en respectant les normes les plus strictes.</p>
          <div className="about__intro-pills reveal reveal-up" style={{ '--delay': '0.2s' }}>
            {['Inox 316L certifié', 'Sur mesure', 'Garantie 10 ans'].map(p => (
              <span key={p} className="intro-pill">{p}</span>
            ))}
          </div>
          <Link to="/catalogue" className="btn-gold" style={{ marginTop: '28px', display: 'inline-flex' }}>
            Découvrir nos services
          </Link>
        </div>
        <div className="about__intro-img reveal reveal-right">
          <img src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=700" alt="artmetal atelier" />
          <div className="about__intro-img-badge reveal reveal-up" style={{ '--delay': '0.4s' }}>
            <span className="img-badge-num gold-text">12+</span>
            <span className="img-badge-label">Années d'expertise</span>
          </div>
        </div>
      </section>

      {/* ── VALUES ── */}
      <section className="about__values">
        <p className="section-subtitle reveal reveal-up">Ce en quoi nous croyons</p>
        <h2 className="section-title reveal reveal-up" style={{ '--delay': '0.1s' }}>
          Nos <span className="gold-text">Valeurs</span>
        </h2>
        <span className="gold-underline reveal reveal-line" style={{ '--delay': '0.2s' }} />
        <div className="about__values-grid">
          {values.map((v, i) => (
            <div
              className="about__value-card reveal reveal-up"
              key={i}
              style={{ '--delay': `${0.1 + i * 0.12}s` }}
            >
              <span className="about__value-icon">{v.icon}</span>
              <h3>{v.title}</h3>
              <p>{v.desc}</p>
              <div className="value-card-line" />
            </div>
          ))}
        </div>
      </section>

      {/* ── SECTORS ── */}
      <section className="about__sectors">
        <p className="section-subtitle reveal reveal-up">Où nous intervenons</p>
        <h2 className="section-title reveal reveal-up" style={{ '--delay': '0.1s' }}>
          Secteurs <span className="gold-text">d'Activité</span>
        </h2>
        <span className="gold-underline reveal reveal-line" style={{ '--delay': '0.2s' }} />
        <div className="about__sectors-grid">
          {sectors.map((s, i) => (
            <div
              className="about__sector-card reveal reveal-up"
              key={i}
              style={{ '--delay': `${0.1 + i * 0.12}s` }}
            >
              <div className="about__sector-img-wrap">
                <img src={s.img} alt={s.label} />
                <div className="about__sector-overlay">
                  <span>{s.label}</span>
                </div>
              </div>
              <div className="about__sector-body">
                <h3>{s.label}</h3>
                <p>{s.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── TEAM ── */}
      <section className="about__team">
        <p className="section-subtitle reveal reveal-up">Les gens derrière artmetal</p>
        <h2 className="section-title reveal reveal-up" style={{ '--delay': '0.1s' }}>
          Notre <span className="gold-text">Équipe</span>
        </h2>
        <span className="gold-underline reveal reveal-line" style={{ '--delay': '0.2s' }} />
        <div className="about__team-grid">
          {team.map((t, i) => (
            <div
              className="about__team-card reveal reveal-up"
              key={i}
              style={{ '--delay': `${0.1 + i * 0.12}s` }}
            >
              <div className="about__team-icon-wrap">
                <span className="about__team-icon">{t.icon}</span>
                <div className="team-icon-ring" />
              </div>
              <h3>{t.name}</h3>
              <p>{t.role}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="about__cta reveal reveal-up">
        <div className="about__cta-inner">
          <h2>Prêt à travailler avec nous ?</h2>
          <p>Contactez notre équipe pour un devis personnalisé et gratuit.</p>
          <Link to="/contact" className="btn-gold btn-gold--lg">Contactez-nous</Link>
        </div>
      </section>

    </div>
  );
}