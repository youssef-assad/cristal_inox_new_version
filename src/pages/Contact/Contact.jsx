import { useState, useEffect, useRef } from 'react';
import {
  RiMailLine, RiPhoneLine, RiMapPinLine, RiTimeLine,
  RiSendPlaneLine, RiCheckLine, RiArrowRightLine,
  RiFacebookFill, RiInstagramLine, RiWhatsappLine,
} from 'react-icons/ri';
import './Contact.css';

const CONTACT_ITEMS = [
  { icon: RiMailLine,   href: 'mailto:contact@artmetal.ma', text: 'contact@artmetal.ma' },
  { icon: RiPhoneLine,  href: 'tel:+212661236987',          text: '+212 661 236 987' },
  { icon: RiMapPinLine, href: '#map',                        text: 'HH42+M3 Titt Mellilen, Casablanca' },
  { icon: RiTimeLine,   href: null,                          text: 'Lun – Sam : 8h – 18h' },
];

const SOCIALS = [
  { icon: RiFacebookFill, href: '#', label: 'Facebook' },
  { icon: RiInstagramLine, href: '#', label: 'Instagram' },
  { icon: RiWhatsappLine, href: '#', label: 'WhatsApp' },
];

/* ── Hooks ── */
function useScrollReveal() {
  useEffect(() => {
    const io = new IntersectionObserver(
      e => e.forEach(x => { if (x.isIntersecting) { x.target.classList.add('revealed'); io.unobserve(x.target); } }),
      { threshold: 0.1 }
    );
    document.querySelectorAll('.reveal').forEach(el => io.observe(el));
    return () => io.disconnect();
  }, []);
}

function useParallaxHero() {
  useEffect(() => {
    const hero = document.querySelector('.contact__hero');
    if (!hero) return;
    const fn = () => hero.style.setProperty('--py', `${window.scrollY * 0.3}px`);
    window.addEventListener('scroll', fn, { passive: true });
    return () => window.removeEventListener('scroll', fn);
  }, []);
}

function useMagneticBtn(ref) {
  useEffect(() => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
    const btn = ref.current;
    if (!btn) return;
    const move = e => {
      const r = btn.getBoundingClientRect();
      btn.style.transform = `translate(${(e.clientX - r.left - r.width/2) * 0.22}px,${(e.clientY - r.top - r.height/2) * 0.3}px)`;
    };
    const leave = () => { btn.style.transform = ''; };
    btn.addEventListener('mousemove', move);
    btn.addEventListener('mouseleave', leave);
    return () => { btn.removeEventListener('mousemove', move); btn.removeEventListener('mouseleave', leave); };
  }, [ref]);
}

/* ── Animated character counter for textarea ── */
function CharCounter({ value, max }) {
  const pct = value.length / max;
  const color = pct > 0.9 ? '#e05555' : pct > 0.7 ? '#C9A84C' : '#555';
  return (
    <span className="char-counter" style={{ color }}>
      {value.length}/{max}
    </span>
  );
}

/* ── Component ── */
export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', subject: '', message: '' });
  const [errors, setErrors]   = useState({});
  const [sent, setSent]       = useState(false);
  const [sending, setSending] = useState(false);
  const [focused, setFocused] = useState(null);
  const submitRef = useRef(null);

  useScrollReveal();
  useParallaxHero();
  useMagneticBtn(submitRef);

  const handle = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
    if (errors[e.target.name]) setErrors({ ...errors, [e.target.name]: '' });
  };

  const validate = () => {
    const e = {};
    if (!form.name.trim())    e.name    = 'Nom requis';
    if (!form.email.trim())   e.email   = 'Email requis';
    else if (!/\S+@\S+\.\S+/.test(form.email)) e.email = 'Email invalide';
    if (!form.subject)        e.subject = 'Veuillez choisir un sujet';
    if (!form.message.trim()) e.message = 'Message requis';
    return e;
  };

  const submit = e => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setSending(true);
    setTimeout(() => {
      setSending(false);
      setSent(true);
      setForm({ name: '', email: '', phone: '', subject: '', message: '' });
      setTimeout(() => setSent(false), 6000);
    }, 1400);
  };

  return (
    <div className="contact">

      {/* ── HERO ── */}
      <section className="contact__hero">
        <div className="contact__hero-overlay" />
        <div className="contact__hero-content">
          <span className="contact__hero-tag hero-anim-1">Contactez-nous</span>
          <h1 className="hero-anim-2">
            Parlons de votre <span className="gold-text">projet</span>
          </h1>
          <p className="hero-anim-3">Notre équipe vous répond sous 24h ouvrables</p>
          <div className="contact__hero-chips hero-anim-4">
            <span className="hero-chip">Devis gratuit</span>
            <span className="hero-chip">Réponse rapide</span>
            <span className="hero-chip">Sans engagement</span>
          </div>
        </div>
      </section>

      {/* ── BODY ── */}
      <div className="contact__body">

        {/* ── Info panel ── */}
        <aside className="contact__info reveal reveal-left">
          <div className="contact__info-img-wrap">
            <img
              src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=700"
              alt="Service client artmetal"
            />
            <div className="contact__info-img-overlay" />
            <div className="contact__info-img-badge">
              <RiCheckLine />
              <span>Réponse garantie sous 24h</span>
            </div>
          </div>

          <div className="contact__info-text">
            <h2>On est là pour vous <span className="gold-text">aider</span></h2>
            <p>Notre équipe est disponible du lundi au samedi pour répondre à toutes vos questions et concevoir votre projet sur mesure.</p>

            <ul className="contact__detail-list">
              {CONTACT_ITEMS.map(({ icon: Icon, href, text }, i) => (
                <li key={i} className="contact__detail-item" style={{ '--i': i }}>
                  <span className="detail-icon"><Icon /></span>
                  {href ? <a href={href}>{text}</a> : <span>{text}</span>}
                </li>
              ))}
            </ul>

            <div className="contact__socials">
              {SOCIALS.map(({ icon: Icon, href, label }) => (
                <a key={label} href={href} className="contact__social-btn" aria-label={label}>
                  <Icon />
                </a>
              ))}
            </div>
          </div>
        </aside>

        {/* ── Form ── */}
        <div className="contact__form-wrap reveal reveal-right">
          <div className="contact__form-header">
            <h2>Envoyez-nous <span className="gold-text">un message</span></h2>
            <p>Remplissez le formulaire et nous vous recontactons rapidement.</p>
          </div>

          {sent && (
            <div className="contact__success">
              <RiCheckLine className="success-icon" />
              <div>
                <strong>Message envoyé !</strong>
                <span>Nous vous répondrons sous 24h ouvrables.</span>
              </div>
            </div>
          )}

          <form className="contact__form" onSubmit={submit} noValidate>
            <div className="contact__form-row">
              <Field label="Nom complet *" error={errors.name} focused={focused === 'name'}>
                <input
                  name="name" value={form.name} onChange={handle}
                  placeholder="Votre nom"
                  onFocus={() => setFocused('name')}
                  onBlur={() => setFocused(null)}
                />
              </Field>
              <Field label="Email *" error={errors.email} focused={focused === 'email'}>
                <input
                  type="email" name="email" value={form.email} onChange={handle}
                  placeholder="votre@email.com"
                  onFocus={() => setFocused('email')}
                  onBlur={() => setFocused(null)}
                />
              </Field>
            </div>

            <div className="contact__form-row">
              <Field label="Téléphone" focused={focused === 'phone'}>
                <input
                  name="phone" value={form.phone} onChange={handle}
                  placeholder="+212 6XX XXX XXX"
                  onFocus={() => setFocused('phone')}
                  onBlur={() => setFocused(null)}
                />
              </Field>
              <Field label="Sujet *" error={errors.subject} focused={focused === 'subject'}>
                <select
                  name="subject" value={form.subject} onChange={handle}
                  onFocus={() => setFocused('subject')}
                  onBlur={() => setFocused(null)}
                >
                  <option value="">Choisir un sujet…</option>
                  <option>Demande de devis</option>
                  <option>Renseignement produit</option>
                  <option>Service après-vente</option>
                  <option>Partenariat</option>
                  <option>Autre</option>
                </select>
              </Field>
            </div>

            <Field label="Message *" error={errors.message} focused={focused === 'message'}>
              <div style={{ position: 'relative' }}>
                <textarea
                  name="message" value={form.message} onChange={handle}
                  rows={5} maxLength={500}
                  placeholder="Décrivez votre projet ou votre demande…"
                  onFocus={() => setFocused('message')}
                  onBlur={() => setFocused(null)}
                />
                <CharCounter value={form.message} max={500} />
              </div>
            </Field>

            <button
              ref={submitRef}
              type="submit"
              className={`contact__submit btn-gold${sending ? ' sending' : ''}`}
              disabled={sending}
            >
              {sending ? (
                <><span className="spinner" /> Envoi en cours…</>
              ) : (
                <><RiSendPlaneLine /> Envoyer le message <RiArrowRightLine className="submit-arrow" /></>
              )}
            </button>
          </form>
        </div>
      </div>

      {/* ── Map ── */}
      <div className="contact__map reveal reveal-up" id="map">
        <div className="contact__map-label">
          <RiMapPinLine /> HH42+M3 Titt Mellilen, Casablanca
        </div>
        <iframe
          title="artmetal Location"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3323.8!2d-7.6!3d33.5!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzPCsDMwJzAwLjAiTiA3wrAzNicwMC4wIlc!5e0!3m2!1sfr!2sma!4v1234567890"
          allowFullScreen="" loading="lazy"
        />
      </div>
    </div>
  );
}

/* ── Field wrapper ── */
function Field({ label, error, focused, children }) {
  return (
    <div className={`contact__field${error ? ' has-error' : ''}${focused ? ' is-focused' : ''}`}>
      <label>{label}</label>
      {children}
      {error && <span className="field-error">{error}</span>}
    </div>
  );
}