import { toast } from "react-toastify";
import { useForm} from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
// import "react-toastify/dist/ReactToastify.css";
import { FiEye, FiEyeOff } from "react-icons/fi";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
const schema = yup.object().shape({
  name: yup.string().required("Name is required"),
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


const Register = () => {
    
const [showPassword, setShowPassword] = useState(false);

const { register, handleSubmit, formState: { errors } } = useForm({
  resolver: yupResolver(schema)
});

const onSubmit = (data) =>{
    console.log('Form Verileri:', data);

    // backende istek atılacak
}
  return (
    <div className="register-page">
      <div className="register-form">
        <div>
          <h2 className="register-title">Register</h2>
          <p className="registre-text">
            To start using our services, please fill out the registration form
            below. All fields are mandatory:
          </p>
        </div>
        <form className="register-inputs" onSubmit={handleSubmit(onSubmit)}>

          <input {...register("name")} type="name" placeholder="Name" />
          {errors.name && <p className="error-message"  style={{color: "red"}}>{errors.name.message}</p>}

          <input {...register("email")} type="email" placeholder="Email" />
          {errors.email && <p className="error-message"  style={{color: "red"}}>{errors.email.message}</p>}

          <input {...register("password")} type={showPassword ? "text" : "password"} placeholder="Password"/>
          {errors.password && <p className="error-message"  style={{color: "red"}}>{errors.password.message}</p>}

          <button
            type="button"
            className="register-password-toggle"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <FiEyeOff size={20} /> : <FiEye size={20} />}
          </button>
          <div className="register-buttons">
          <button type="submit" className="register-register-btn">Register</button>
          <Link to="/login" type="button" className="login-login-btn">Login</Link>
        </div>
        </form>
        
      </div>
      <div className="register-page-picture"></div>
    </div>
  );
};

export default Register;
