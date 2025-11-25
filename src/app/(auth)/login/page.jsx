"use client";

import { useState, useContext } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";

import { FaGoogle } from "react-icons/fa";
import { AuthContext } from "@/app/provider/AuthContext";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import { FaEye, FaEyeSlash } from "react-icons/fa6";

const Login = () => {
  const [showPass, setShowPass] = useState(false);
  const { signInUser, signInWithGoogle } = useContext(AuthContext);

  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectPath = searchParams.get("redirect") || "/";

  const handleLogIn = (event) => {
    event.preventDefault();
    const email = event.target.email.value;
    const password = event.target.password.value;

    signInUser(email, password)
      .then(() => {
        toast.success("Your Login Account Successfully");
        event.target.reset();
        router.push(redirectPath);
      })
      .catch(() => {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Something went wrong!",
        });
      });
  };

  const handleGoogleSignIn = () => {
    signInWithGoogle()
      .then(() => {
        router.push(redirectPath);
      })
      .catch(() => {});
  };

  return (
    <div className="card bg-blue-900 w-full mx-auto max-w-sm shadow-2xl">
      <div className="card-body border-l-2 border-l-blue-500 border-r-2 border-r-orange-800 mt-5">
        <h1 className="text-3xl font-bold text-center">Login</h1>

        <form onSubmit={handleLogIn}>
          <fieldset className="fieldset">
            <label className="label">Email</label>
            <input
              type="email"
              name="email"
              autoComplete="email"
              className="input text-black border-[1px] border-blue-800 rounded-full"
              placeholder="Email"
            />

            <label className="label">Password</label>
            <div className="relative">
              <input
                type={showPass ? "text" : "password"}
                name="password"
                autoComplete="password"
                className="input text-black border-[1px] border-blue-800 rounded-full"
                placeholder="Enter Your Password"
              />
              <button
                type="button"
                onClick={() => setShowPass(!showPass)}
                className="absolute right-6 top-3 text-purple-600"
              >
                {showPass ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>

            <div>
              <a className="link link-hover">Forgot password?</a>
            </div>

            <button className="btn text-white mt-4 rounded-full bg-linear-to-r from-blue-900 to-red-900 hover:bg-black hover:text-blue-500">
              Login
            </button>
          </fieldset>
        </form>

        <button
          onClick={handleGoogleSignIn}
          className="btn bg-white rounded-full text-black border-[1px] border-orange-800"
        >
          <FaGoogle />
          Login with Google
        </button>

        <p className="text-center">
          New to our website? Please{" "}
          <Link
            href="/register"
            className="text-orange-500 hover:text-orange-300"
          >
            Register
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
