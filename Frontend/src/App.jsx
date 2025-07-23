import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import BookList from "./pages/BookList";
import AddBook from "./pages/AddBook";
import BookDetail from "./pages/BookDetail";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Navbar from "./components/Navbar";

const isLoggedIn = () => !!localStorage.getItem("token");

function ProtectedRoute({ children }) {
  return isLoggedIn() ? children : <Navigate to="/login" />;
}

const App = () => (
  <BrowserRouter>
    <Navbar />
    <Routes>
      <Route path="/" element={<BookList />} />
      <Route path="/add" element={<ProtectedRoute><AddBook /></ProtectedRoute>} />
      <Route path="/books/:id" element={<BookDetail />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  </BrowserRouter>
);

export default App;
