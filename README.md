# 💼 Book Review Platform – Full Stack Assignment

This repository contains the implementation for an assignment given by **7Webs**. It is a full-stack web application built with React.js, Tailwind CSS, Node.js, and MongoDB.

The project demonstrates the following functionalities:

- ✅ **Adding new books**
- 📖 **View a list of all books with filters**
- ✍️ **Write reviews for books**
- ⭐ **Rating books (1 to 5 stars)**
- 📊 **View average rating per book**

## 🌐 Live URLs

- **Frontend Base URL**: [https://7-webs-assignment.vercel.app](https://7-webs-assignment.vercel.app/)
- **Backend Base URL**: [https://sevenwebs-assignment-l9zw.onrender.com](https://sevenwebs-assignment-l9zw.onrender.com)

## ⚙️ Tech Stack

- **Frontend**: React.js, Tailwind CSS
- **Backend**: Node.js, Express.js  
- **Database**: MongoDB  
- **ODM**: Mongoose  
- **Authentication**: JWT (accessToken and refreshToken stored in HTTP-only cookies)  
- **Hosting**: Vercel(Frontend) & Render(Backend)

## 🚀 Running Locally

### 1. Clone the repository
```bash
git clone https://github.com/manas-agarwal16/7Webs_Assignment.git
cd 7Webs_Assignment
```
### 2. Setup Backend
```bash
cd backend
npm install
```
**Create a .env file in the backend folder:**
```bash
MONGODB_URI=your_mongodb_connection_string
PORT=
ACCESS_TOKEN_KEY=
ACCESS_TOKEN_EXPIRY=
REFRESH_TOKEN_KEY=
REFRESH_TOKEN_EXPIRY=
CORS_ORIGIN=
```
**To run the backend server:**
```bash
npm start
```

### 3. Setup Frontend
```bash
cd frontend
npm install
```

**Create a .env file in the frontend folder:**
```bash
VITE_BACKEND_URL=
```
**To start the frontend development server:**
```bash
npm run dev
```

### 📞 Contact

- **Email**: [manas.agarwal1604@gmail.com](mailto:manas.agarwal1604@gmail.com)  
- **Phone**: +91 82796 53442

