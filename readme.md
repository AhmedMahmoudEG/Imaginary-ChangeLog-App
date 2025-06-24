# Imaginary ChangeLog App 🚀

An open-ended, work-in-progress Node.js project designed to track and manage changelogs for products. Built with Express and Prisma ORM.

---

## 📌 Overview

**Imaginary ChangeLog App** is a backend application that helps track changes, features, updates, and enhancements made to digital products — ideal for developers or product teams wanting a structured changelog system.

This project is still in development and will be updated daily.

---

## 🛠️ Tech Stack

- [Node.js](w)
- [Express](w)
- [Prisma ORM](w)
- [PostgreSQL](w) (via local Docker container or external DB)

---

## 📦 Current Database Models (via Prisma)

- `User`: Represents a system user
- `Product`: Represents a product being tracked
- `Update`: Represents an update made to a product
- `UpdatePoint`: Represents individual change points under an update

More models will be added and improved as the project evolves.

---

## 🗂 Project Status

✅ Initialized project with Node.js and Express  
✅ Set up Prisma and connected to PostgreSQL  
✅ Created and migrated initial models: User, Product, Update, UpdatePoint  

🛠 Upcoming Topics (from the Frontend Masters workshop):
- 🔁 Routes and Middleware
- 🔐 Authentication and Authorization
- ⚠️ Route and Error Handling
- ⚙️ Configuration, Performance, and Testing
- ☁️ Deployment (local & cloud)

🕐 Committing daily with updates and improvements

---

## 🧠 Goals

- Build a robust backend API for changelog tracking
- Integrate authentication (e.g., JWT)  
- Add full CRUD endpoints for all models  
- Explore frontend or API client in the future

---

## 🔄 Daily Commit Log

This repository will be updated daily with progress and code improvements.  
📅 *Started: [Your Start Date]*  
📌 *Today’s Work:* Created project, initialized Prisma, and added first 4 models.

---

## 📎 Getting Started

```bash
git clone https://github.com/your-username/imaginary-changelog-app
cd imaginary-changelog-app
npm install
npx prisma generate
npx prisma db push
npm run dev
```

📬 Contact
Feel free to reach out or suggest features by opening an issue.

