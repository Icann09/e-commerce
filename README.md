# 🛒 E-Commerce Platform (Next.js)

A modern full-stack e-commerce application built with Next.js, featuring authentication, cart management, wishlists, and a scalable database design.


## 🔗 Live Demo
https://your-vercel-link.vercel.app


## 📦 Repository
https://github.com/Icann09/e-commerce


## 📸 Screenshots
<p align="center">
  <img src="./assets/homepage.webp" width="45%" alt="Home"/>
  <img src="./assets/productspage.webp" width="45%" alt="Products"/>
</p>
<p align="center">
  <img src="./assets/productidpage.webp" width="45%" alt="Product Id"/>
  <img src="./assets/cartpage.webp" width="45%" alt="Carts"/>
</p>
<p align="center">
  <img src="./assets/orderspage.webp" width="45%" alt="Orders"/>
  <img src="./assets/favoritespage.webp" width="45%" alt="Favorites"/>
</p>


## ✨ Features

- User authentication with secure session handling
- Product variants (color & size) with dynamic availability
- Cart system with persistent storage (Zustand + localStorage)
- Wishlist (Favorites) per authenticated user
- Responsive mobile-first UI
- Optimized image handling using Next.js Image
- Type-safe database access with Drizzle ORM


## 🛠 Tech Stack

### Frontend
- Next.js (App Router)
- React
- Tailwind CSS
- Zustand (state management)

### Backend
- Next.js Server Actions
- Drizzle ORM
- PostgreSQL

### Auth & Storage
- Authentication with secure cookies
- Persistent cart via localStorage

### Deployment
- Vercel


## 🧠 Architecture & Key Decisions

- Server Actions are used instead of REST APIs to reduce client-server boilerplate
- Database queries are centralized to keep UI components clean
- Variant selection logic resets when color changes to prevent invalid state
- Wishlist logic is server-side to ensure user-specific data isolation


## 🚧 Challenges & Learnings

- Handling product variants without duplicating state across components
- Fixing TypeScript strict-null errors for authenticated users
- Managing persistent cart state while keeping UI reactive
- Ensuring mobile responsiveness across complex layouts


## 🚀 Getting Started

### 1. Clone the repo
```bash
git clone https://github.com/Icann09/e-commerce.git
cd e-commerce

### 2. Install Dependencies
npm install

### 3. Setup Environment Variables
DATABASE_URL=
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
NEXTAUTH_URL=
BETTER_AUTH_SECRET=
BETTER_AUTH_URL=

### 4. Run Locally
npm run dev



---
## 📂 Folder Structure
app/        → Next.js routes  
components/ → Reusable UI components  
lib/        → Database & server logic  
store/      → Zustand stores  



## 👨‍💻 About Me

I'm Muhammad Kaisan Farasdag, a front-end developer transitioning into full-stack development.
I focus on building scalable, user-focused web applications using modern JavaScript frameworks.

- GitHub: https://github.com/Icann09
- LinkedIn: https://www.linkedin.com/in/muhammad-kaisan-35a103211
