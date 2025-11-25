"use client";

import { useState, useEffect, useContext } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { GoHomeFill } from "react-icons/go";
import { IoLogIn, IoLogOut, IoPersonAddSharp } from "react-icons/io5";
import { FaGear, FaUser } from "react-icons/fa6";
import { CgProfile } from "react-icons/cg";
import { ImBoxAdd } from "react-icons/im";
import { Briefcase, LucidePackageCheck, Plus } from "lucide-react";
import Logo from "@/app/assets/logo.png";
import { AuthContext } from "@/app/provider/AuthContext";

const Navbar = () => {
    const { user, logOut } = useContext(AuthContext);

    const pathname = usePathname();



    return (
        <div className="navbar max-w-[1400px] mx-auto py-0 min-h-0 z-1 shadow-sm glass-card">
            <div className="flex justify-between items-center w-full">
                <div className="flex items-center max-sm:justify-between max-sm:w-[80%]">
                    <div className="dropdown">
                        <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" />
                            </svg>
                        </div>

                        <ul tabIndex={-1} className="menu menu-sm dropdown-content rounded-box z-1 mt-3 w-52 p-2 shadow">
                            <li>
                                <Link href="/"  >
                                    <GoHomeFill /> Home
                                </Link>
                            </li>
                            <li>
                                <Link href="/jobs" >
                                    <Briefcase size={14} /> All Jobs
                                </Link>
                            </li>

                            {user && (
                                <>
                                    <li>
                                        <Link href="/add-jobs" >
                                            <Plus size={15} /> Add Jobs
                                        </Link>
                                    </li>

                                    <li>
                                        <Link href="/profile" >
                                            <CgProfile /> Profile
                                        </Link>
                                    </li>
                                </>
                            )}
                            <li>
                                <Link href="/register" >
                                    <IoPersonAddSharp size={14} /> Register
                                </Link>
                            </li>
                        </ul>
                    </div>

                    <Link href="/" className="max-sm:mx-auto">
                        <img src={Logo.src} alt="Logo" className="w-[140px]" />
                    </Link>
                </div>

                <div className="hidden lg:flex my-3">
                    <ul className="menu menu-horizontal text-base-300  font-bold px-1">
                        <li >
                            <Link href="/">
                                <GoHomeFill /> Home
                            </Link>
                        </li>
                        <li >
                            <Link href="/jobs">
                                <Briefcase size={14} /> All Jobs
                            </Link>
                        </li>
                        <li >
                            <Link href="/register">
                                <IoPersonAddSharp size={14} /> Register
                            </Link>
                        </li>
                        {user && (
                            <>
                                <li>
                                    <Link href="/addjobs">
                                        <Plus size={15} /> Add Jobs
                                    </Link>
                                </li>

                                <li>
                                    <Link href="/profile">
                                        <CgProfile /> Profile
                                    </Link>
                                </li>
                            </>
                        )}
                    </ul>
                </div>

                <div className="flex gap-3  items-center">
                    {user ? (
                        <div className="dropdown dropdown-end z-50">
                            <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                                <div className="w-9 border-2 border-gray-300 rounded-full">
                                    <img
                                        alt="User Avatar"
                                        referrerPolicy="no-referrer"
                                        src={user.photoURL || "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"}
                                    />
                                </div>
                            </div>
                            <ul tabIndex={-1} className="menu menu-sm  bg-purple-900  dropdown-content bg-base-100 rounded-box z-50 mt-3 w-52 p-2 shadow">
                                <div className="pb-3 border-b border-b-gray-200 ">
                                    <li className="text-sm font-bold text-[#fe8830]">{user.displayName}</li>
                                    <li className="text-xs text-purple-500">{user.email}</li>
                                </div>
                                <li>
                                    <Link href="/profile">
                                        <FaUser /> Profile
                                    </Link>
                                </li>
                              
                                <li>
                                    <a>
                                        <FaGear /> Settings
                                    </a>
                                </li>
                                <li>
                                    <button onClick={logOut} className="btn btn-xs text-left btn-primary text-white">
                                        <IoLogOut /> Logout
                                    </button>
                                </li>
                            </ul>
                        </div>
                    ) : (
                        <Link href="/auth/login" className="btn rounded-full border-gray-300 btn-sm btn-primary text-white">
                            <IoLogIn /> Login
                        </Link>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Navbar;
