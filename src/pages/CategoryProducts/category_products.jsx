// CategoryProducts.jsx
import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import SEO from '../../components/SEO';
import data from '../../data/products_json.json';
import './category_products.css';

export default function CategoryProducts() {
  const { categoryId, subcategoryId } = useParams();
  const [search, setSearch] = useState('');

  const cat = data.categories.find(c => c.id === categoryId);
  const sub = cat?.subcategories.find(s => s.id === subcategoryId);

  if (!sub) return <div className="cp__notfound">Catégorie introuvable.</div>;

  const products = sub.products.filter(p =>
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="cp">
      <SEO
        title={`${sub.label} en Acier Inoxydable — ${cat.label}`}
        description={`${sub.label} en acier inoxydable par Artmetal Casablanca. ${sub.products.length} produits disponibles. Fabrication inox sur mesure, livraison Casablanca et Had Soualem. Demandez votre devis gratuit.`}
        canonical={`https://artmetal.ma/catalogue/${categoryId}/${subcategoryId}`}
      />

      <div className="cp__header">
        <div className="cp__header-overlay" />
        <div className="cp__header-content animate-fade-up">
          <Link to="/catalogue" className="cp__back">← Retour au catalogue</Link>
          <h1>{sub.label} <span className="gold-text">en Acier Inoxydable</span></h1>
          <p>{cat.label} — Fabrication sur mesure à Casablanca</p>
        </div>
      </div>

      <div className="cp__body">
        {/* Sidebar */}
        <aside className="cp__sidebar">
          <h3>Rechercher un produit inox</h3>
          <input
            className="cp__search"
            placeholder="Rechercher un produit..."
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
          <div className="cp__sidebar-info">
            <p><span className="gold-text">{sub.products.length}</span> produits disponibles</p>
          </div>
          <div className="cp__sidebar-contact">
            <p>Besoin d'un devis pour vos {sub.label.toLowerCase()} en inox ?</p>
            <Link to="/contact" className="btn-gold" style={{width:'100%',textAlign:'center',marginTop:'10px',display:'block'}}>
              Nous contacter
            </Link>
          </div>
        </aside>

        {/* Products grid */}
        <main className="cp__main">
          <div className="cp__top-bar">
            <span>{products.length} produit{products.length !== 1 ? 's' : ''} trouvé{products.length !== 1 ? 's' : ''}</span>
          </div>
          <div className="cp__grid">
            {products.map((p, i) => (
              <Link
                to={`/catalogue/${categoryId}/${subcategoryId}/${p.id}`}
                key={p.id}
                className="cp__card animate-fade-up"
                style={{ animationDelay: `${i * 0.06}s` }}
              >
                <div className="cp__card-img">
                  <img src={p.image} alt={`${p.name} — fabrication inox Artmetal Casablanca`} loading="lazy" />
                  <div className="cp__card-overlay"><span>Voir le détail →</span></div>
                </div>
                <div className="cp__card-body">
                  <h3>{p.name}</h3>
                  <p>{p.description}</p>
                </div>
              </Link>
            ))}
          </div>
          {products.length === 0 && (
            <p className="cp__empty">Aucun produit pour "<em>{search}</em>"</p>
          )}
        </main>
      </div>
    </div>
  );
}
