// Catalogue.jsx
import { useState } from 'react';
import { Link } from 'react-router-dom';
import SEO from '../../components/SEO';
import data from '../../data/products_json.json';
import './Catalogue.css';

export default function Catalogue() {
  const [search, setSearch] = useState('');

  const filtered = data.categories.map(cat => ({
    ...cat,
    subcategories: cat.subcategories.filter(sub =>
      sub.label.toLowerCase().includes(search.toLowerCase())
    )
  })).filter(cat => cat.subcategories.length > 0);

  return (
    <div className="catalogue">
      <SEO
        title="Catalogue Inox — Mobilier, Décoration, Industrie & Médical"
        description="Découvrez le catalogue Artmetal : mobilier en acier inoxydable, décoration inox sur mesure, escaliers, portails, équipements industriels et médicaux. Fabrication à Casablanca, livraison Had Soualem et tout le Maroc."
        canonical="https://artmetal.ma/catalogue"
      />

      <div className="catalogue__hero">
        <div className="catalogue__hero-overlay" />
        <div className="catalogue__hero-content animate-fade-up">
          <h1>Catalogue <span className="gold-text">Acier Inoxydable</span></h1>
          <p>Découvrez toutes nos collections en inox fabriquées sur mesure à Casablanca — décoration, industrie, médical et alimentaire</p>
        </div>
      </div>

      <div className="catalogue__body">
        {/* SIDEBAR */}
        <aside className="catalogue__sidebar">
          <h3>Rechercher vos besoins en inox</h3>
          <input
            className="catalogue__search"
            placeholder="Rechercher une sous-catégorie..."
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
          <div className="catalogue__sidebar-cats">
            {data.categories.map(cat => (
              <div key={cat.id} className="catalogue__sidebar-cat">
                <strong>{cat.label}</strong>
                <ul>
                  {cat.subcategories.map(sub => (
                    <li key={sub.id}>
                      <Link to={`/catalogue/${cat.id}/${sub.id}`}>{sub.label}</Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </aside>

        {/* MAIN */}
        <main className="catalogue__main">
          {filtered.map(cat => (
            <section key={cat.id} className="catalogue__section">
              <div className="catalogue__section-header">
                <h2>{cat.label}</h2>
              </div>
              <div className="catalogue__grid">
                {cat.subcategories.map(sub => (
                  <Link
                    to={`/catalogue/${cat.id}/${sub.id}`}
                    key={sub.id}
                    className="catalogue__card"
                  >
                    <div className="catalogue__card-img-wrap">
                      <img src={sub.image} alt={`${sub.label} en acier inoxydable — Artmetal Casablanca`} loading="lazy" />
                      <div className="catalogue__card-overlay">
                        <span>Voir les produits →</span>
                      </div>
                    </div>
                    <div className="catalogue__card-body">
                      <h3>{sub.label}</h3>
                      <span>{sub.products.length} produit{sub.products.length > 1 ? 's' : ''}</span>
                    </div>
                  </Link>
                ))}
              </div>
            </section>
          ))}

          {filtered.length === 0 && (
            <div className="catalogue__empty">
              <p>Aucun résultat pour "<em>{search}</em>"</p>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
