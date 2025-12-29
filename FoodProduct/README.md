# 🍔 TastyCart

TastyCart is a modern food ordering web application built with **React + TypeScript**.  
It provides a smooth user experience with a clean UI, real-time cart updates, and Firebase-powered authentication & database.

---

## 🚀 Features

- 🛒 Add to Cart & Remove from Cart
- 🔄 Real-time Navbar Cart Updates
- 🔐 User Authentication (Firebase)
- 📦 Product & Cart Data Management
- 🎨 Modern UI with Material UI
- 🔔 Beautiful Alerts using SweetAlert
- ⚡ Fast & Optimized State Management with Zustand

---

## 🛠️ Tech Stack

- **React**
- **TypeScript**
- **Material UI (MUI)**
- **Zustand (State Management)**
- **SweetAlert2**
- **Firebase (Auth & Database)**
- **Vite**

---

## 📦 Installation

Clone the repository:

```bash
git clone https://github.com/mohsinyzonetechnology-dev/TastyCartFood.git

#Go to project directory:
cd TastyCartFood

# Install dependencies:
npm install


#Run the Project
#Start the development server:
npm run dev

#The app will run on:
http://localhost:5173


##🔥 Firebase Setup

Create a project in Firebase Console
Enable:
Authentication (Email/Password)
Realtime Database or Firestore
Add your Firebase config in the project:
src/DataBase/fireBase.ts

# Project Structure (Simplified)
src/
├── components/
├── pages/
├── store/          # Zustand stores
├── DataBase/       # Firebase  
├── hooks/
├── App.tsx
├── main.tsx

# State Management

TastyCart uses Zustand for:
Cart State
Product Data
Global App State
This ensures fast updates and clean code structure.

# 🎨 UI & UX

Fully responsive design
Material UI components
Smooth animation
User-friendly alerts with SweetAlert

# 📌 Scripts
npm run dev      # Start development server
npm run build    # Build for production
npm run preview  # Preview production build

👨‍💻 Author

PrimeStack-Sol
Frontend Developer (React | TypeScript | Firebase)