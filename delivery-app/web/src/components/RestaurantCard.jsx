import React from 'react';
import './RestaurantCard.css';

export default function RestaurantCard({ restaurant, onClick }) {
  return (
    <div className="r-card" onClick={onClick}>
      <div className="r-card-img-wrap">
        <img src={restaurant.image} alt={restaurant.name} className="r-card-img" />
        <span className="r-card-category">{restaurant.category}</span>
      </div>
      <div className="r-card-body">
        <div className="r-card-top">
          <h3 className="r-card-name">{restaurant.name}</h3>
          <span className="r-card-rating">⭐ {restaurant.rating}</span>
        </div>
        <p className="r-card-desc">{restaurant.description}</p>
        <div className="r-card-tags">
          {restaurant.tags.map((tag) => (
            <span key={tag} className="r-card-tag">{tag}</span>
          ))}
        </div>
        <div className="r-card-meta">
          <span>🕐 {restaurant.deliveryTime}</span>
          <span>
            {restaurant.deliveryFee === 0
              ? '🟢 Frete grátis'
              : `🛵 R$ ${restaurant.deliveryFee.toFixed(2)}`}
          </span>
          <span>📦 Mín. R$ {restaurant.minOrder}</span>
        </div>
      </div>
    </div>
  );
}
