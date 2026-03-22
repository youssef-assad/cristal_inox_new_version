import { Link } from 'react-router-dom';
import { useEffect, useRef } from 'react';
import './Home.css';

const services = [
  { icon: '✏️', title: 'Conception & Conseil', desc: "Conseils techniques et esthétiques dès la conception pour garantir une solution inox optimale, adaptée à chaque projet décoratif ou industriel." },
  { icon: '⚙️', title: 'Fabrication sur mesure', desc: "Production sur commande d'éléments en acier inoxydable, avec précision artisanale et contrôles qualité rigoureux à chaque étape." },
  { icon: '🚚', title: 'Livraison & Installation', desc: "Transport sécurisé jusqu'au site client, avec installation sur place par nos experts pour un rendu final impeccable." },
];

const stats = [
  { value: 500, suffix: '+', label: 'Projets réalisés' },
  { value: 12,  suffix: '+', label: "Années d'expérience" },
  { value: 100, suffix: '%', label: 'Satisfaction client' },
  { value: 4,   suffix: '',  label: 'Secteurs couverts' },
];

const highlights = [
  { cat: 'Décoration intérieure', title: "Escaliers en acier inoxydable sur mesure", img: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600' },
  { cat: 'Tuyauterie', title: "Solutions de tuyauterie industrielle de haute qualité", img: 'https://images.unsplash.com/photo-1581094271901-8022df4466f9?w=600' },
  { cat: 'Métallerie', title: "Un intérieur mêlant finitions dorées et mobilier élégant", img: 'https://images.unsplash.com/photo-1556909172-54557c7e4fb7?w=600' },
];

/* ── Hooks ── */
function useScrollReveal() {
  useEffect(() => {
    const els = document.querySelectorAll('.reveal');
    const io = new IntersectionObserver(
      (entries) => entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('revealed'); io.unobserve(e.target); } }),
      { threshold: 0.12 }
    );
    els.forEach(el => io.observe(el));
    return () => io.disconnect();
  }, []);
}

function useCountUp() {
  useEffect(() => {
    const bars = document.querySelectorAll('.home__stat-value[data-target]');
    if (!bars.length) return;
    const io = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (!e.isIntersecting) return;
        const el = e.target;
        const target = +el.dataset.target;
        const suffix = el.dataset.suffix || '';
        const duration = 1400;
        const step = 16;
        const increment = target / (duration / step);
        let current = 0;
        const timer = setInterval(() => {
          current = Math.min(current + increment, target);
          el.textContent = Math.round(current) + suffix;
          if (current >= target) clearInterval(timer);
        }, step);
        io.unobserve(el);
      });
    }, { threshold: 0.5 });
    bars.forEach(el => io.observe(el));
    return () => io.disconnect();
  }, []);
}

function useParallaxHero() {
  useEffect(() => {
    const hero = document.querySelector('.home__hero');
    if (!hero) return;
    const onMove = (e) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 18;
      const y = (e.clientY / window.innerHeight - 0.5) * 10;
      hero.style.setProperty('--px', `${50 + x}%`);
      hero.style.setProperty('--py', `${50 + y}%`);
    };
    hero.addEventListener('mousemove', onMove);
    return () => hero.removeEventListener('mousemove', onMove);
  }, []);
}

function useMagneticButtons() {
  useEffect(() => {
    const btns = document.querySelectorAll('.btn-gold, .btn-outline');
    const handlers = [];
    btns.forEach(btn => {
      const enter = (e) => {
        const r = btn.getBoundingClientRect();
        const x = e.clientX - r.left - r.width / 2;
        const y = e.clientY - r.top - r.height / 2;
        btn.style.transform = `translate(${x * 0.25}px, ${y * 0.35}px)`;
      };
      const leave = () => { btn.style.transform = ''; };
      btn.addEventListener('mousemove', enter);
      btn.addEventListener('mouseleave', leave);
      handlers.push({ btn, enter, leave });
    });
    return () => handlers.forEach(({ btn, enter, leave }) => {
      btn.removeEventListener('mousemove', enter);
      btn.removeEventListener('mouseleave', leave);
    });
  }, []);
}

function useCursorSpotlight() {
  useEffect(() => {
    const el = document.createElement('div');
    el.className = 'cursor-spotlight';
    document.body.appendChild(el);
    const move = (e) => {
      el.style.left = e.clientX + 'px';
      el.style.top  = e.clientY + 'px';
    };
    window.addEventListener('mousemove', move);
    return () => { window.removeEventListener('mousemove', move); el.remove(); };
  }, []);
}

function useTiltCards() {
  useEffect(() => {
    const cards = document.querySelectorAll('.home__service-card');
    const handlers = [];
    cards.forEach(card => {
      const move = (e) => {
        const r = card.getBoundingClientRect();
        const x = (e.clientX - r.left) / r.width  - 0.5;
        const y = (e.clientY - r.top)  / r.height - 0.5;
        card.style.transform = `perspective(600px) rotateY(${x * 12}deg) rotateX(${-y * 10}deg) translateY(-6px)`;
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

/* ── Component ── */
export default function Home() {
  useScrollReveal();
  useCountUp();
  useParallaxHero();
  useMagneticButtons();
  useCursorSpotlight();
  useTiltCards();

  return (
    <div className="home">

      {/* HERO */}
      <section className="home__hero">
        <div className="home__hero-overlay" />
        <div className="home__hero-content">
          <span className="home__hero-tag hero-anim-1">Experts en Acier Inoxydable — Casablanca</span>
          <h1 className="hero-anim-2">L'Inox <span className="gold-text">Réinventé</span> pour Votre Espace</h1>
          <p className="hero-anim-3">Conception, fabrication et installation de structures en acier inoxydable pour la décoration, l'industrie, le médical et l'alimentaire.</p>
          <div className="home__hero-btns hero-anim-4">
            <Link to="/catalogue" className="btn-gold">Voir le catalogue</Link>
            <Link to="/contact" className="btn-outline">Demander un devis</Link>
          </div>
        </div>
        <div className="home__hero-scroll"><span>↓</span></div>
      </section>

      {/* STATS */}
      <section className="home__stats">
        {stats.map((s, i) => (
          <div className="home__stat reveal reveal-up" key={i} style={{ '--delay': `${i * 0.1}s` }}>
            <span
              className="home__stat-value gold-text"
              data-target={s.value}
              data-suffix={s.suffix}
            >
              0{s.suffix}
            </span>
            <span className="home__stat-label">{s.label}</span>
          </div>
        ))}
      </section>

      {/* SERVICES */}
      <section className="home__services">
        <p className="section-subtitle reveal reveal-up">Ce que nous faisons</p>
        <h2 className="section-title reveal reveal-up" style={{ '--delay': '0.1s' }}>
          Nos <span className="gold-text">Services</span>
        </h2>
        <span className="gold-underline reveal reveal-line" style={{ '--delay': '0.2s' }} />
        <div className="home__services-grid">
          {services.map((s, i) => (
            <div className="home__service-card reveal reveal-up" key={i} style={{ '--delay': `${0.1 + i * 0.15}s` }}>
              <div className="home__service-icon">{s.icon}</div>
              <h3>{s.title}</h3>
              <p>{s.desc}</p>
              <Link to="/catalogue" className="home__service-link">En savoir plus →</Link>
              <div className="home__service-shimmer" />
            </div>
          ))}
        </div>
      </section>

      {/* WHY US */}
      <section className="home__why">
        <div className="home__why-text reveal reveal-left">
          <span className="home__why-badge">Pourquoi nous choisir ?</span>
          <h2>L'Excellence de l'Inox, <span className="gold-text">Artisanalement</span></h2>
          <p>Chez artmetal, chaque pièce est pensée pour offrir une résistance optimale, une finition irréprochable et une intégration parfaite dans son environnement.</p>
          <ul className="home__why-list">
            {['Matériaux certifiés normes internationales','Délais respectés et suivi personnalisé','Équipe technique qualifiée et expérimentée','Solutions sur mesure pour tous budgets'].map((item, i) => (
              <li key={i} className="reveal reveal-left" style={{ '--delay': `${0.1 + i * 0.1}s` }}>
                <span className="why-check">✔</span> {item}
              </li>
            ))}
          </ul>
          <Link to="/about" className="btn-gold" style={{ marginTop: '28px', display: 'inline-flex' }}>
            En savoir plus sur nous
          </Link>
        </div>
        <div className="home__why-image reveal reveal-right">
          <img src="https://images.unsplash.com/photo-1565183997392-2f6f122e5912?w=700" alt="Atelier artmetal" />
          <div className="home__why-badge-float">
            <span>⭐</span>
            <div><strong>Qualité premium</strong><small>Certifiée & garantie</small></div>
          </div>
        </div>
      </section>

      {/* HIGHLIGHTS */}
      <section className="home__highlights">
        <p className="section-subtitle reveal reveal-up">Nos travaux récents</p>
        <h2 className="section-title reveal reveal-up" style={{ '--delay': '0.1s' }}>
          Nos <span className="gold-text">Réalisations</span>
        </h2>
        <span className="gold-underline reveal reveal-line" style={{ '--delay': '0.2s' }} />
        <div className="home__highlights-grid">
          {highlights.map((h, i) => (
            <div className="home__highlight-card reveal reveal-up" key={i} style={{ '--delay': `${0.1 + i * 0.15}s` }}>
              <div className="home__highlight-img-wrap">
                <img src={h.img} alt={h.title} />
                <div className="home__highlight-overlay">
                  <Link to="/catalogue" className="highlight-overlay-btn">Voir le projet →</Link>
                </div>
              </div>
              <div className="home__highlight-body">
                <span className="home__highlight-cat">{h.cat}</span>
                <p>{h.title}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA BANNER */}
      <section className="home__cta-banner reveal reveal-up">
        <div className="home__cta-text">
          <h2>Prêt à démarrer votre projet ?</h2>
          <p>Contactez-nous aujourd'hui pour un devis gratuit et personnalisé.</p>
        </div>
        <Link to="/contact" className="btn-gold btn-gold--lg">Contactez-nous</Link>
      </section>

    </div>
  );
}