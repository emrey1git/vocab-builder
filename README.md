# 📚 VocabBuilder - Vocabulary Learning Application

VocabBuilder is a modern web application designed to help users learn English and Ukrainian vocabulary efficiently. Developed as part of the GoIT curriculum, this app allows users to build their own dictionary, get recommendations, and test their skills through interactive training sessions.

## 🚀 Live Demo
[**View the Live Project on Vercel**](https://vocab-builder-henna.vercel.app)

## ✨ Features
- **User Authentication:** Secure registration and login using JWT (JSON Web Tokens).
- **Personal Dictionary:** Full CRUD (Create, Read, Update, Delete) functionality for managing your vocabulary.
- **Smart Training:** Interactive flashcard-style learning with progress tracking and performance summaries.
- **Word Recommendations:** Access a global list of recommended words to expand your learning.
- **Responsive Design:** Optimized for a seamless experience on Desktop, Tablet, and Mobile devices.
- **Real-time Notifications:** Feedback via React Toastify for successful actions and errors.

## 🛠️ Tech Stack
- **Frontend Framework:** React.js (Vite)
- **Routing:** React Router DOM
- **HTTP Client:** Axios (with Interceptors for Authorization)
- **Styling:** CSS3 (Flexbox, Grid, Responsive Design)
- **UI Feedback:** React Toastify, Lucide React (Icons)
- **API:** GoIT Vocabulary Builder Backend API

## 📦 Installation & Setup
1. Clone the repository:
   ```bash
   git clone https://github.com/emrey1git/vocab-builder.git
2. npm install
3. npm run dev

## 📂 Project Structure
- `/src/api`: Axios instance and service functions for API calls.
- `/src/components`: UI components and their specific CSS files.
- `/src/pages`: Main page components and their dedicated CSS files.
- `/src/assets`: Local images and icons (if any).
- `/public`: Static assets, flags, and images accessible via root path..