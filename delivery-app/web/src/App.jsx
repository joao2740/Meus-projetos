import React from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import './App.css';

export default function App() {
  return (
    <div className="app">
      <Header />
      <HomePage />
      <Footer />
    </div>
  );
}
