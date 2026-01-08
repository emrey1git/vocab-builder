import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { toast } from "react-toastify";

// Şartnamedeki kurallara (regex) uygun doğrulama şeması 📜
const schema = yup.object().shape({
  email: yup
    .string()
    .matches(/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/, "Invalid email format")
    .required("Email is required"),
  password: yup
    .string()
    .matches(
      /^(?=.*[a-zA-Z]{6})(?=.*\d)[a-zA-Z\d]{7}$/,
      "Password must have 6 letters and 1 number (7 chars total)"
    )
    .required("Password is required"),
});

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data) => {
    console.log("Giriş verileri:", data);
    // Backend entegrasyonu buraya gelecek 🚀
  };

  return (
    <div className="auth-page">
      <div className="login-form-container">
        <div className="auth-header">
          <h2 className="login-title">Login</h2>
          <p className="login-text">
            Please enter your login details to continue using our service:
          </p>
        </div>

        <form className="auth-form-fields" onSubmit={handleSubmit(onSubmit)}>
          {/* Email Alanı */}
          <div className="input-wrapper">
            <input 
              {...register("email")} 
              type="email" 
              placeholder="Email" 
              className={errors.email ? "input-error" : ""}
            />
            {errors.email && <p className="error-text"> {errors.email.message}</p>}
          </div>

          {/* Şifre Alanı */}
          <div className="input-wrapper password-input-container">
            <input
              {...register("password")}
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              className={errors.password ? "input-error" : ""}
            />
            <button
              type="button"
              className="password-toggle-btn"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <FiEyeOff size={20} /> : <FiEye size={20} />}
            </button>
            {errors.password && <p className="error-text">⚠️ {errors.password.message}</p>}
          </div>

          {/* Buton Grubu */}
          <div className="auth-button-group">
            <button type="submit" className="login-login-btn">
              Login
            </button>
            <button type="button" className="login-register-btn">
              Register
            </button>
          </div>
        </form>
      </div>

   
      <div className="auth-hero-banner">
       
      </div>
    </div>
  );
};

export default Login;