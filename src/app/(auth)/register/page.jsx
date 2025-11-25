"use client";

import { useState, useContext } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { FaEye, FaEyeSlash, FaGoogle } from "react-icons/fa6";
import { AuthContext } from "@/app/provider/AuthContext";
import toast from "react-hot-toast";

const Register = () => {
  const { createUser, updateUserProfile, signInWithGoogle } = useContext(AuthContext);
  const router = useRouter();
  const [showPass, setShowPass] = useState(false);

  const handleRegister = (event) => {
    event.preventDefault();
    const displayName = event.target.displayName.value;
    const photoURL = event.target.photoURL.value;
    const email = event.target.email.value;
    const password = event.target.password.value;

    // 🔹 Password Validation
    if (password.length < 6) {
      toast.error("Password must be at least 6 characters long!");
      return;
    }
    if (!/[A-Z]/.test(password)) {
      toast.error("Password must contain at least one uppercase letter!");
      return;
    }
    if (!/[a-z]/.test(password)) {
      toast.error("Password must contain at least one lowercase letter!");
      return;
    }

    toast.loading("Creating user...", { id: "create-user" });
    createUser(email, password)
      .then(() => {
        updateUserProfile(displayName, photoURL);
        toast.success("User created successfully!", { id: "create-user" });
        router.push("/auth/login");
      })
      .catch((error) => {
        toast.error(error.message, { id: "create-user" });
      });
  };

  const handleGoogleSignIn = () => {
    toast.loading("Creating user...", { id: "create-user" });
    signInWithGoogle()
      .then(() => {
        toast.success("User created successfully!", { id: "create-user" });
        router.push("/");
      })
      .catch((error) => {
        toast.error(error.message, { id: "create-user" });
      });
  };

  return (
    <div className="card w-full mx-auto max-w-sm">
      <div className="card-body bg-blue-900 shrink-0 shadow-2xl md:border-l-2 md:border-l-blue-500 md:border-r-2 md:border-r-orange-800 mt-5">
        <h1 className="title text-center">Register</h1>

        <form onSubmit={handleRegister}>
          <fieldset className="fieldset">
            <label className="label">Name</label>
            <input
              type="text"
              name="displayName"
              autoComplete="name"
              className="input text-black rounded-full border-[1px] border-blue-800 focus:border-0 focus:outline-gray-200"
              placeholder="Name"
              required
            />

            <label className="label">PhotoURL</label>
            <input
              type="text"
              name="photoURL"
              autoComplete="photo"
              className="input text-black rounded-full border-[1px] border-blue-800 focus:border-0 focus:outline-gray-200"
              placeholder="Photo URL"
              required
            />

            <label className="label">Email</label>
            <input
              type="email"
              name="email"
              autoComplete="email"
              className="input text-black rounded-full border-[1px] border-blue-800 focus:border-0 focus:outline-gray-200"
              placeholder="Email"
              required
            />

            <div className="relative">
              <label className="label">Password</label>
              <input
                type={showPass ? "text" : "password"}
                name="password"
                autoComplete="new-password"
                className="input text-black rounded-full border-[1px] border-blue-800 focus:border-0 focus:outline-gray-200"
                placeholder="Enter your password"
                required
              />
              <button
                type="button"
                onClick={() => setShowPass(!showPass)}
                className="absolute right-6 top-8 text-purple-600"
              >
                {showPass ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>

            <div>
              <a className="link link-hover">Forgot password?</a>
            </div>

            <button className="btn text-white mt-4 rounded-full bg-linear-to-r from-blue-900 to-red-900 hover:bg-black hover:text-blue-500">
              Register
            </button>
          </fieldset>
        </form>

        <button
          onClick={handleGoogleSignIn}
          className="btn bg-white rounded-full text-black border-[1px] border-orange-800 mt-3"
        >
          <FaGoogle />
          Login with Google
        </button>

        <p className="text-center mt-2">
          Already have an account? Please{" "}
          <Link
            href="/login"
            className="text-blue-500 hover:text-blue-800"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
