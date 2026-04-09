import React, { useState } from 'react';
import RestaurantCard from '../components/RestaurantCard';
import { restaurants, categories } from '../data/mockData';
import './HomePage.css';

export default function HomePage() {
  const [search, setSearch] = useState('');
  const [selectedCat, setSelectedCat] = useState('');

  const filtered = restaurants.filter((r) => {
    const matchSearch = r.name.toLowerCase().includes(search.toLowerCase());
    const matchCat = selectedCat ? r.category === selectedCat : true;
    return matchSearch && matchCat;
  });

  const handleCardClick = (restaurant) => {
    alert(`Abrindo detalhes de: ${restaurant.name}\n\nEm produção, esta ação navegaria para a tela de detalhes.`);
  };

  return (
    <main>
      {/* Hero */}
      <section className="hero" id="hero">
        <div className="hero-content">
          <div className="hero-badge">🔥 Mais de 100 restaurantes parceiros</div>
          <h1 className="hero-title">
            Seu pedido favorito,<br />
            <span className="hero-highlight">entregue em minutos</span>
          </h1>
          <p className="hero-subtitle">
            Escolha entre dezenas de restaurantes e receba no conforto da sua casa.
            Rápido, fácil e seguro.
          </p>
          <div className="hero-search">
            <span className="hero-search-icon">📍</span>
            <input
              type="text"
              placeholder="Digite seu endereço para começar..."
              className="hero-search-input"
            />
            <button className="hero-search-btn">Buscar</button>
          </div>
          <div className="hero-stats">
            <div className="hero-stat">
              <span className="hero-stat-value">30min</span>
              <span className="hero-stat-label">Entrega média</span>
            </div>
            <div className="hero-stat-divider" />
            <div className="hero-stat">
              <span className="hero-stat-value">100+</span>
              <span className="hero-stat-label">Restaurantes</span>
            </div>
            <div className="hero-stat-divider" />
            <div className="hero-stat">
              <span className="hero-stat-value">4.8⭐</span>
              <span className="hero-stat-label">Avaliação</span>
            </div>
          </div>
        </div>
        <div className="hero-visual">
          <div className="hero-phone">
            <div className="hero-phone-screen">
              <div className="phone-header">
                <span>🛵 QuickFood</span>
              </div>
              <div className="phone-order">
                <div className="phone-order-img">🍕</div>
                <div>
                  <div className="phone-order-name">Pizza Margherita</div>
                  <div className="phone-order-status">🟢 A caminho — 12 min</div>
                </div>
              </div>
              <div className="phone-map">
                <span className="phone-map-pin">📍</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="how" id="how">
        <div className="section-inner">
          <h2 className="section-title">Como funciona</h2>
          <p className="section-subtitle">Em 3 passos simples, seu pedido chega na sua porta</p>
          <div className="how-steps">
            {[
              { step: '01', emoji: '📍', title: 'Escolha o endereço', desc: 'Informe onde deseja receber seu pedido.' },
              { step: '02', emoji: '🍔', title: 'Escolha o restaurante', desc: 'Navegue por categorias e encontre o que quiser.' },
              { step: '03', emoji: '🛵', title: 'Receba em casa', desc: 'Acompanhe em tempo real a entrega do seu pedido.' },
            ].map((s) => (
              <div key={s.step} className="how-step">
                <div className="how-step-num">{s.step}</div>
                <div className="how-step-emoji">{s.emoji}</div>
                <h3 className="how-step-title">{s.title}</h3>
                <p className="how-step-desc">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Restaurants */}
      <section className="restaurants" id="restaurants">
        <div className="section-inner">
          <h2 className="section-title">Restaurantes disponíveis</h2>

          {/* Filters */}
          <div className="filters">
            <div className="filter-search">
              <span>🔍</span>
              <input
                type="text"
                placeholder="Buscar restaurantes..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="filter-input"
              />
            </div>
            <div className="filter-cats">
              <button
                className={`filter-cat ${selectedCat === '' ? 'active' : ''}`}
                onClick={() => setSelectedCat('')}
              >
                🍽️ Todos
              </button>
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  className={`filter-cat ${selectedCat === cat.name ? 'active' : ''}`}
                  onClick={() => setSelectedCat(selectedCat === cat.name ? '' : cat.name)}
                >
                  {cat.emoji} {cat.name}
                </button>
              ))}
            </div>
          </div>

          {/* Grid */}
          <div className="r-grid">
            {filtered.map((r) => (
              <RestaurantCard key={r.id} restaurant={r} onClick={() => handleCardClick(r)} />
            ))}
          </div>
          {filtered.length === 0 && (
            <div className="empty-state">
              <span className="empty-emoji">🔍</span>
              <p>Nenhum restaurante encontrado.</p>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
