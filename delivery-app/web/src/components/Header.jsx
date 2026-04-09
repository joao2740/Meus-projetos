import React, { useState } from 'react';
import './Header.css';

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="header">
      <div className="header-inner">
        <div className="logo">
          <span className="logo-icon">🛵</span>
          <span className="logo-text">QuickFood</span>
        </div>

        <nav className={`nav ${menuOpen ? 'nav-open' : ''}`}>
          <a href="#hero" className="nav-link">Início</a>
          <a href="#how" className="nav-link">Como funciona</a>
          <a href="#restaurants" className="nav-link">Restaurantes</a>
        </nav>

        <div className="header-actions">
          <button className="btn-ghost">Entrar</button>
          <button className="btn-primary">Cadastrar</button>
        </div>

        <button className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? '✕' : '☰'}
        </button>
      </div>
    </header>
  );
}
