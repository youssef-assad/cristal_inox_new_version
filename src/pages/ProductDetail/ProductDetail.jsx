// ProductDetail.jsx
import { Link, useParams } from 'react-router-dom';
import SEO from '../../components/SEO';
import data from '../../data/products_json.json';
import './ProductDetail.css';

export default function ProductDetail() {
  const { categoryId, subcategoryId, productId } = useParams();

  const cat = data.categories.find(c => c.id === categoryId);
  const sub = cat?.subcategories.find(s => s.id === subcategoryId);
  const product = sub?.products.find(p => p.id === productId);

  if (!product) return <div className="pd__notfound">Produit introuvable.</div>;

  // Related products (same subcategory, exclude current)
  const related = sub.products.filter(p => p.id !== productId).slice(0, 4);

  const productJsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": product.name,
    "description": product.description,
    "image": product.image,
    "brand": { "@type": "Brand", "name": "Artmetal" },
    "manufacturer": {
      "@type": "Organization",
      "name": "Artmetal",
      "address": { "@type": "PostalAddress", "addressLocality": "Casablanca", "addressCountry": "MA" }
    },
    "category": `${cat.label} > ${sub.label}`,
    "material": "Acier inoxydable"
  };

  return (
    <div className="pd">
      <SEO
        title={`${product.name} — ${sub.label} Inox Casablanca`}
        description={`${product.name} par Artmetal Casablanca. ${product.description} Fabrication en acier inoxydable sur mesure. Devis gratuit, livraison Casablanca et Had Soualem.`}
        canonical={`https://artmetal.ma/catalogue/${categoryId}/${subcategoryId}/${productId}`}
        jsonLd={productJsonLd}
      />

      {/* Breadcrumb */}
      <nav className="pd__breadcrumb" aria-label="Fil d'Ariane">
        <Link to="/catalogue">Catalogue</Link>
        <span>›</span>
        <Link to={`/catalogue/${categoryId}/${subcategoryId}`}>{sub.label}</Link>
        <span>›</span>
        <span className="pd__breadcrumb-current">{product.name}</span>
      </nav>

      {/* Back */}
      <div className="pd__back-wrap">
        <Link to={`/catalogue/${categoryId}/${subcategoryId}`} className="cp__back">← Retour aux {sub.label.toLowerCase()}</Link>
      </div>

      {/* Main card */}
      <div className="pd__main">
        <div className="pd__img-side">
          <img src={product.image} alt={`${product.name} — fabrication acier inoxydable Artmetal Casablanca`} />
        </div>
        <div className="pd__info-side animate-fade-up">
          <span className="pd__badge">{sub.label}</span>
          <h1>{product.name}</h1>
          <p className="pd__desc">{product.description}</p>

          <div className="pd__features">
            <h2>Caractéristiques</h2>
            <ul>
              <li>✔ Acier inoxydable de qualité supérieure (316L / 304)</li>
              <li>✔ Finition irréprochable et durable</li>
              <li>✔ Fabrication artisanale sur mesure à Casablanca</li>
              <li>✔ Résistant à la corrosion et à l'humidité</li>
              <li>✔ Livraison et installation incluses — Casablanca & Had Soualem</li>
            </ul>
          </div>

          <div className="pd__contact-box">
            <h3>Demandez votre devis gratuit</h3>
            <a href="tel:+212661267456" className="pd__contact-item">📞 Téléphone : +212 661-267456</a>
            <a href="mailto:contact@artmetal.ma" className="pd__contact-item">📧 Email : contact@artmetal.ma</a>
            <Link to="/contact" className="btn-gold" style={{marginTop:'14px',display:'inline-block'}}>
              Demander un devis
            </Link>
          </div>
        </div>
      </div>

      {/* Related */}
      {related.length > 0 && (
        <section className="pd__related">
          <h2>Produits <span className="gold-text">similaires</span> en acier inoxydable</h2>
          <span className="gold-underline" />
          <div className="pd__related-grid">
            {related.map(p => (
              <Link
                to={`/catalogue/${categoryId}/${subcategoryId}/${p.id}`}
                key={p.id}
                className="pd__related-card"
              >
                <img src={p.image} alt={`${p.name} — inox Artmetal Casablanca`} loading="lazy" />
                <span>{p.name}</span>
              </Link>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
