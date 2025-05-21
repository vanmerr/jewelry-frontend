# Desires Jewelry Brand - Frontend

A luxurious, modern, and responsive jewelry e-commerce web application built with ReactJS, Vite, and TailwindCSS.

## ✨ Project Overview
This project is the frontend for a high-end jewelry brand, designed to deliver a premium shopping experience. It features beautiful animations, responsive layouts, and a focus on luxury UI/UX. Users can browse collections, view product details, manage their cart, and enjoy a seamless checkout experience.

## 🚀 Features
- Home page with animated hero, featured collections, and luxury services
- Explore page with filtering, sorting, and animated transitions
- Collection details with product filtering and sorting
- Product detail page with gallery, color/size selection, related products, and animated sections
- Shopping bag/cart with sticky order summary and smooth transitions
- Global intersection observer animations for all main sections
- Mobile-first responsive design
- Modern UI with gradients, glassmorphism, and luxury effects
- Context-based cart management (add, update, remove, persist)
- Scroll-to-top on route change
- Accessibility and keyboard navigation

## 🛠️ Tech Stack
- **ReactJS** (with hooks & context)
- **Vite** (fast dev/build)
- **TailwindCSS** (utility-first styling)
- **@uidotdev/usehooks** (intersection observer, etc.)
- **MUI Icons** (luxury iconography)
- **Lucide-react** (cart icons)

## 📁 Folder Structure
```
frontend/
├── public/                # Static assets
├── src/
│   ├── assets/            # Images, banners
│   ├── components/        # Reusable UI components
│   ├── contexts/          # React context (CartContext, ...)
│   ├── pages/             # Main pages (Home, Explore, ProductDetail, ...)
│   ├── services/          # Static data (products, collections)
│   ├── App.jsx            # Main app entry
│   └── main.jsx           # Vite entry
├── tailwind.config.js     # Tailwind config
├── vite.config.js         # Vite config
├── package.json           # Dependencies
└── README.md              # This file
```

## ⚡ Getting Started
### 1. Clone the repository
```bash
git clone <your-repo-url>
cd jewelry-brand/frontend
```

### 2. Install dependencies
```bash
npm install
```

### 3. Start the development server
```bash
npm run dev
```
- The app will be available at `http://localhost:5173` (default Vite port).

### 4. Build for production
```bash
npm run build
```
- Output will be in the `dist/` folder.

### 5. Lint & Format
```bash
npm run lint
```

## 🧩 Customization
- **Data:** Edit `src/services/products.js` and `src/services/collections.js` for demo data.
- **Branding:** Change images in `src/assets/` and update banners/brand colors in Tailwind config.
- **UI:** Tweak Tailwind classes in components for your own luxury style.

## 🤝 Contributing
Pull requests are welcome! Please open an issue first to discuss major changes.

## 📄 License
This project is for educational/demo purposes. For commercial use, please contact the author.

---
**Desires Jewelry Brand** – Where Timeless Elegance Meets Modern Luxury.
