// Contact.jsx
import { useState } from 'react';
import './Contact.css';

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', subject: '', message: '' });
  const [sent, setSent] = useState(false);

  const handle = e => setForm({ ...form, [e.target.name]: e.target.value });

  const submit = e => {
    e.preventDefault();
    // In production, connect to your backend / EmailJS / etc.
    setSent(true);
    setForm({ name: '', email: '', phone: '', subject: '', message: '' });
    setTimeout(() => setSent(false), 5000);
  };

  return (
    <div className="contact">
      {/* Hero */}
      <div className="contact__hero">
        <div className="contact__hero-overlay" />
        <div className="contact__hero-content animate-fade-up">
          <h1>Besoin d'aide <span className="gold-text">?</span></h1>
          <p>Notre équipe vous accueille avec le sourire 😊</p>
        </div>
      </div>

      <div className="contact__body">
        {/* Info card */}
        <div className="contact__info animate-fade-up">
          <img
            src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=600"
            alt="Service client artmetal"
            className="contact__info-img"
          />
          <div className="contact__info-text">
            <h2>Contactez nous !</h2>
            <p>Service client est à votre écoute !</p>
            <div className="contact__details">
              <a href="mailto:contact@artmetal.ma" className="contact__detail-item">
                <span>📧</span><span>contact@artmetal.ma</span>
              </a>
              <a href="tel:+212661236987" className="contact__detail-item">
                <span>📞</span><span>+212 661 236 987</span>
              </a>
            </div>
            <div className="contact__visit">
              <p>📍 Venez nous rendre visite !</p>
              <strong>Adresse de notre boutique :</strong>
              <ul>
                <li>📌 HH42+M3 Titt Mellilen - Maroc</li>
                <li>📅 Du Lundi au samedi</li>
                <li>🕐 De 8h à 18h</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Form */}
        <div className="contact__form-wrap animate-fade-up">
          <h2>Envoyez-nous <span className="gold-text">un message</span></h2>
          <p className="contact__form-sub">Réponse sous 24h ouvrables</p>

          {sent && (
            <div className="contact__success">
              ✅ Message envoyé avec succès ! Nous vous répondrons bientôt.
            </div>
          )}

          <form className="contact__form" onSubmit={submit}>
            <div className="contact__form-row">
              <div className="contact__field">
                <label>Nom complet *</label>
                <input name="name" value={form.name} onChange={handle} placeholder="Votre nom" required />
              </div>
              <div className="contact__field">
                <label>Email *</label>
                <input type="email" name="email" value={form.email} onChange={handle} placeholder="votre@email.com" required />
              </div>
            </div>
            <div className="contact__form-row">
              <div className="contact__field">
                <label>Téléphone</label>
                <input name="phone" value={form.phone} onChange={handle} placeholder="+212 6XX XXX XXX" />
              </div>
              <div className="contact__field">
                <label>Sujet *</label>
                <select name="subject" value={form.subject} onChange={handle} required>
                  <option value="">Choisir un sujet...</option>
                  <option>Demande de devis</option>
                  <option>Renseignement produit</option>
                  <option>Service après-vente</option>
                  <option>Partenariat</option>
                  <option>Autre</option>
                </select>
              </div>
            </div>
            <div className="contact__field">
              <label>Message *</label>
              <textarea name="message" value={form.message} onChange={handle} rows={5} placeholder="Décrivez votre projet ou votre demande..." required />
            </div>
            <button type="submit" className="btn-gold contact__submit">Envoyer le message →</button>
          </form>
        </div>
      </div>

      {/* Map placeholder */}
      <div className="contact__map">
        <iframe
          title="artmetal Location"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3323.8!2d-7.6!3d33.5!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzPCsDMwJzAwLjAiTiA3wrAzNicwMC4wIlc!5e0!3m2!1sfr!2sma!4v1234567890"
          allowFullScreen="" loading="lazy"
        />
      </div>
    </div>
  );
}