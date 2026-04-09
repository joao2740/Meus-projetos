# 🛵 QuickFood — Aplicativo de Delivery Multiplataforma

> Projeto desenvolvido como atividade acadêmica de desenvolvimento front-end multiplataforma, contemplando versão Web (React) e Mobile (React Native com Expo).

---

## 📱 Proposta do App

O **QuickFood** é um aplicativo de delivery de comida que conecta usuários a restaurantes parceiros, permitindo navegar por categorias, visualizar cardápios e realizar pedidos de forma rápida e intuitiva.

### Funcionalidades implementadas

**Mobile (React Native)**
- Splash screen animada com transição automática
- Tela inicial com banner promocional, busca por nome e filtro por categoria
- Listagem de restaurantes com cards informativos
- Tela de detalhes do restaurante com cardápio e carrinho funcional

**Web (React)**
- Landing page com hero section, mockup de telefone animado e estatísticas
- Seção "Como funciona" com os 3 passos do processo
- Listagem responsiva de restaurantes com filtro por categoria e busca em tempo real
- Header fixo com navegação e Footer completo

---

## 🛠 Tecnologias utilizadas

| Camada | Tecnologia |
|--------|-----------|
| Mobile | React Native + Expo |
| Web | React + Vite |
| Navegação mobile | React Navigation v6 |
| Estilização mobile | StyleSheet (React Native) |
| Estilização web | CSS Modules |
| Dados | Mock API (dados estáticos em JS) |
| Versionamento | Git + GitHub |
| Editor | VS Code |

---

## 📁 Estrutura de pastas

```
delivery-app/
├── mobile/                        # Aplicação React Native (Expo)
│   ├── App.js                     # Entry point + Navegação
│   ├── package.json
│   └── src/
│       ├── screens/
│       │   ├── SplashScreen.js    # Tela de boas-vindas animada
│       │   ├── HomeScreen.js      # Listagem de restaurantes
│       │   └── DetailScreen.js    # Detalhes + cardápio + carrinho
│       ├── components/
│       │   ├── RestaurantCard.js  # Card reutilizável de restaurante
│       │   ├── CategoryChip.js    # Chip de filtro por categoria
│       │   └── ProductCard.js     # Card de produto com botão adicionar
│       └── data/
│           └── mockData.js        # Dados mockados (restaurantes, produtos)
│
└── web/                           # Aplicação React (Vite)
    ├── index.html
    ├── package.json
    ├── vite.config.js
    └── src/
        ├── App.jsx                # Componente raiz
        ├── App.css                # Reset e estilos globais
        ├── index.jsx              # Entry point React DOM
        ├── components/
        │   ├── Header.jsx         # Cabeçalho sticky com nav
        │   ├── Header.css
        │   ├── RestaurantCard.jsx # Card responsivo de restaurante
        │   ├── RestaurantCard.css
        │   ├── Footer.jsx         # Rodapé com links
        │   └── Footer.css
        ├── pages/
        │   ├── HomePage.jsx       # Hero + How it works + Listagem
        │   └── HomePage.css
        └── data/
            └── mockData.js        # Dados mockados
```

---

## 🚀 Instruções para execução

### Pré-requisitos

- Node.js 18+ instalado
- npm ou yarn
- Git

### Web (React + Vite)

```bash
# Entrar na pasta web
cd delivery-app/web

# Instalar dependências
npm install

# Iniciar servidor de desenvolvimento
npm run dev

# Acesse: http://localhost:5173
```

### Mobile (React Native + Expo)

```bash
# Entrar na pasta mobile
cd delivery-app/mobile

# Instalar dependências
npm install

# Iniciar o Expo
npm start

# Opções:
# Pressione 'a' para Android (emulador ou dispositivo)
# Pressione 'i' para iOS (apenas macOS)
# Escaneie o QR Code com o app Expo Go (Android/iOS)
```

> **Expo Go:** Instale o app [Expo Go](https://expo.dev/go) no seu celular e escaneie o QR Code que aparece no terminal para visualizar o app em tempo real.

---

## ✨ Diferenciais implementados

- [x] Mock API estruturada (pronta para substituição por API real)
- [x] UI/UX avançada com animações, hover states e transições
- [x] Layout responsivo na versão web (mobile-first)
- [x] Carrinho funcional no mobile com contador e total
- [x] Filtro por categoria + busca por nome em tempo real
- [x] Componentização reutilizável em ambas as plataformas
- [x] Estrutura de pastas preparada para integração com backend

---

## 🔮 Próximos passos (integração futura)

- [ ] Autenticação de usuários (JWT)
- [ ] Integração com API REST (Node.js / Express)
- [ ] Banco de dados (PostgreSQL ou MongoDB)
- [ ] Pagamento online (Stripe / MercadoPago)
- [ ] Rastreamento de pedido em tempo real (WebSocket)
- [ ] Push notifications (Expo Notifications)

---

## 👥 Equipe

| Nome | Função |
|------|--------|
| — | Desenvolvedor(a) Full Stack |

---

## 📄 Licença

Este projeto foi desenvolvido para fins acadêmicos.
