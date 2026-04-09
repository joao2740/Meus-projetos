import React from 'react';
import './Footer.css';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-inner">
        <div className="footer-brand">
          <div className="footer-logo">
            <span>🛵</span>
            <span className="footer-logo-text">QuickFood</span>
          </div>
          <p className="footer-tagline">Delivery rápido na sua porta.</p>
        </div>

        <div className="footer-links">
          <div className="footer-col">
            <h4>Empresa</h4>
            <a href="#">Sobre nós</a>
            <a href="#">Carreiras</a>
            <a href="#">Blog</a>
          </div>
          <div className="footer-col">
            <h4>Parceiros</h4>
            <a href="#">Cadastre seu restaurante</a>
            <a href="#">Seja entregador</a>
          </div>
          <div className="footer-col">
            <h4>Suporte</h4>
            <a href="#">Central de ajuda</a>
            <a href="#">Termos de uso</a>
            <a href="#">Privacidade</a>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <p>© 2025 QuickFood. Todos os direitos reservados.</p>
      </div>
    </footer>
  );
}
