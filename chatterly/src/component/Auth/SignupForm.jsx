import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "./LoginForm.css"; // Use the same CSS file as the LoginForm component
import Navbar from "../Navbar/Navbar";
import Footer from "../footer/Footer";

// Validation schema
const SignupSchema = Yup.object().shape({
  email: Yup.string()
    .email("Invalid email address")
    .min(2, "Too Short!")
    .max(50, "Too Long!")
<<<<<<< HEAD
    .required("Required"),
  name: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
  password: Yup.string()
    .min(8, "Password must be at least 8 characters")
    .required("Required"),
=======
    .required("*Required"),
  name: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("*Required"),
  password: Yup.string()
    .min(8, "Password must be at least 8 characters")
    .required("*Required"),
>>>>>>> teammate/main
});

const SignupForm = () => {
  const navigate = useNavigate();

  const handleSubmit = async (values, { setSubmitting, setFieldError }) => {
    try {
      localStorage.setItem("userData", JSON.stringify(values));
<<<<<<< HEAD
      const response = await axios.post("https://blogsite-chatteryl.onrender.com/signup", {
=======
      const response = await axios.post("http://localhost:8081/signup", {
>>>>>>> teammate/main
        name: values.name,
        email: values.email,
        password: values.password,
      });

      if (response.status === 201) {
        alert("Sign Up Successful!");
        navigate("/login", { state: { email: values.email } });
      }
    } catch (error) {
      if (error.response && error.response.data) {
        setFieldError("email", error.response.data.msg);
      } else {
        console.error("Error signing up", error);
      }
    } finally {
      setSubmitting(false);
    }
  };

  return (
<<<<<<< HEAD
    <div>
      <Navbar />
=======
    <div className="SignUp-body">
      {/* <Navbar /> */}
>>>>>>> teammate/main
      <div className="gradient__bg">
      <div id="mtl">
      <div className="form-container">
        <h2>SIGN UP</h2>
        <Formik
          initialValues={{
            name: "",
            email: "",
            password: "",
          }}
          validationSchema={SignupSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
               
            <Form className="login-form">
              <div className="form-group">
                <label htmlFor="name">Name</label>
                <Field type="text" name="name" className="form-field" />
                <ErrorMessage
                  name="name"
                  component="div"
                  className="error-message"
                />
              </div>
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <Field type="email" name="email" className="form-field" />
                <ErrorMessage
                  name="email"
                  component="div"
                  className="error-message"
                />
              </div>
              <div className="form-group">
                <label htmlFor="password">Password</label>
                <Field
                  type="password"
                  name="password"
                  className="form-field"
                />
                <ErrorMessage
                  name="password"
                  component="div"
                  className="error-message"
                />
              </div>
              <button
                type="submit"
                disabled={isSubmitting}
                className="submit-button"
              >
                Sign Up
              </button>
            </Form>
          )}
        </Formik>
        <div className="signup-link">
          Already have an account? <Link to="/login">Login</Link>
        </div>
      </div>
      </div>
      </div>
<<<<<<< HEAD
      <Footer />
=======
      {/* <Footer /> */}
>>>>>>> teammate/main
    </div>
  );
};

export default SignupForm;
