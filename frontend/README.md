# 🍰 Sweet Stop - Frontend

Modern, responsive React + TypeScript frontend for Sweet Stop dessert shop.

## 📁 Project Structure

```
sweet-stop-frontend/
├── public/
│   ├── images/              # All product images, logos, banners
│   └── fonts/               # Custom fonts (Core Sans AR)
├── src/
│   ├── api/                 # API layer (axios + endpoints)
│   │   ├── axios.ts         # Axios instance with interceptors
│   │   ├── auth.ts          # Auth endpoints
│   │   ├── products.ts      # Product endpoints
│   │   ├── cart.ts          # Cart endpoints
│   │   ├── orders.ts        # Order endpoints
│   │   ├── gallery.ts       # Gallery endpoints
│   │   └── contact.ts       # Contact form endpoint
│   │
│   ├── components/          # React components
│   │   ├── common/          # Shared components
│   │   │   └── IconBtn.tsx
│   │   ├── layout/          # Layout components
│   │   │   ├── HeaderBar.tsx    # Shared navbar (all pages)
│   │   │   ├── CartSidebar.tsx  # Cart drawer
│   │   │   └── Footer.tsx       # Shared footer
│   │   ├── home/            # Home page sections
│   │   │   ├── Hero.tsx
│   │   │   ├── Features.tsx
│   │   │   └── Treats.tsx
│   │   ├── menu/            # Menu page sections
│   │   │   ├── MenuHero.tsx
│   │   │   └── CategorySection.tsx
│   │   ├── about/           # About page sections
│   │   │   ├── AboutHero.tsx
│   │   │   ├── EveryTreat.tsx
│   │   │   └── ProductsSection.tsx
│   │   ├── gallery/         # Gallery page
│   │   │   └── GalleryContent.tsx
│   │   └── contact/         # Contact page
│   │       └── ContactForm.tsx
│   │
│   ├── contexts/            # React Contexts
│   │   ├── ThemeContext.tsx # Dark/light mode
│   │   └── CartContext.tsx  # Cart state management
│   │
│   ├── data/                # Static data
│   │   └── menuData.ts      # All menu categories & products
│   │
│   ├── hooks/               # Custom React hooks
│   │   ├── useTheme.ts      # Theme hook
│   │   └── useWindowSize.ts # Responsive hook
│   │
│   ├── pages/               # Page components (routes)
│   │   ├── Home.tsx
│   │   ├── Menu.tsx
│   │   ├── About.tsx
│   │   ├── Gallery.tsx
│   │   └── Contact.tsx
│   │
│   ├── types/               # TypeScript types/interfaces
│   │   └── index.ts
│   │
│   ├── utils/               # Utility functions
│   │   ├── constants.ts     # Colors, breakpoints, nav items
│   │   └── helpers.ts       # Formatting, clipboard, etc.
│   │
│   ├── App.tsx              # Main app with routes
│   ├── main.tsx             # Entry point
│   └── index.css            # Global styles
│
├── .env.example             # Environment variables template
├── index.html
├── package.json
├── tsconfig.json
├── tsconfig.node.json
├── vite.config.ts
└── README.md
```

## 🚀 Getting Started

### 1. Install dependencies
```bash
npm install
```

### 2. Set up environment variables
```bash
cp .env.example .env
# Edit .env and set your backend URL
```

### 3. Start development server
```bash
npm run dev
```

### 4. Build for production
```bash
npm run build
```

## 🔗 Backend Integration

The frontend is ready to connect to the Sweet Stop backend. Just set `VITE_API_URL` in your `.env` file:

```env
VITE_API_URL=http://localhost:3001/api
```

For production:
```env
VITE_API_URL=https://your-backend-url.onrender.com/api
```

## 🎨 Features

- **Responsive Design** - Mobile, tablet, desktop optimized
- **Dark Mode** - Toggle between light/dark themes
- **Cart System** - Add items, update quantities, remove items
- **Search** - Search menu items in real-time
- **Contact Form** - Send messages to the shop
- **API Ready** - All endpoints prepared for backend connection
- **TypeScript** - Full type safety
- **Modular Architecture** - Clean, maintainable code

## 📄 Pages

| Page | Route | Description |
|------|-------|-------------|
| Home | `/` | Hero, features, treats showcase |
| Menu | `/menu` | Full menu with categories, search, cart |
| About | `/about` | About Sweet Stop, products showcase |
| Gallery | `/gallery` | Customer photo gallery invitation |
| Contact | `/contact` | Contact form |

## 🛠 Tech Stack

- React 18 + TypeScript
- Vite (build tool)
- React Router DOM
- Axios (API calls)
- Lucide React (icons)
- CSS-in-JS (inline styles)

---
Made with ♡ for Sweet Stop
