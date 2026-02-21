import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { toast, ToastContainer } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import axiosInstance from "../api/axiosInstance";
import "./css/auth.css";

const schema = yup.object().shape({
  name: yup.string().required("Name is required"),
  email: yup
    .string()
    .matches(/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/, "Invalid email format")
    .required("Email is required"),
  password: yup
    .string()
    .matches(
      /^(?=.*[a-zA-Z]{6})(?=.*\d)[a-zA-Z\d]{7,}$/,
      "Password must have 6 letters and 1 number (7 chars total)"
    )
    .required("Password is required"),
});

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    mode: "onSubmit",
  });

  const onSubmit = async (data) => {
    try {
      const response = await axiosInstance.post("/users/signup", data);
      
      if (response.data.token) {
        localStorage.setItem("token", response.data.token);
      }

      toast.success("Registration successful!");
      setTimeout(() => navigate("/dictionary"), 1500);
    } catch (error) {
      const errorMessage = error.response?.data?.message || "Registration failed!";
      toast.error(errorMessage);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <div className="login-form-container">
          <div className="auth-logo">
            <img src="/logo.png" alt="Logo" />
            <span>VocabBuilder</span>
          </div>

          <div className="auth-header">
            <h2 className="login-title">Register</h2>
            <p className="login-text">
              To start using our services, please fill out the registration form below:
            </p>
          </div>

          <form className="auth-form-fields" onSubmit={handleSubmit(onSubmit)}>
            <div className="input-wrapper">
              <input {...register("name")} type="text" placeholder="Name" />
              {errors.name && <p className="error-text">{errors.name.message}</p>}
            </div>

            <div className="input-wrapper">
              <input {...register("email")} type="email" placeholder="Email" />
              {errors.email && <p className="error-text">{errors.email.message}</p>}
            </div>

            <div className="input-wrapper password-input-container">
              <input
                {...register("password")}
                type={showPassword ? "text" : "password"}
                placeholder="Password"
              />
              <button
                type="button"
                className="password-toggle-btn"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FiEyeOff size={20} /> : <FiEye size={20} />}
              </button>
              {errors.password && <p className="error-text">{errors.password.message}</p>}
            </div>

            <div className="auth-button-group">
              <button type="submit" className="login-login-btn">
                Register
              </button>
              <Link to="/login" className="login-register-link">
                Login
              </Link>
            </div>
          </form>
        </div>

        <div className="auth-hero-banner">
          <img src="/illustration.png" alt="Illustration" className="hero-img" />
          <p className="hero-footer-text">
            Word · Translation · Grammar · Progress
          </p>
          <img src="/vector-2.png" alt="Vector" className="vector-shadow" />
        </div>
      </div>
      <ToastContainer position="bottom-right" />
    </div>
  );
};

export default Register;