"use client";

import { useContext, useEffect, useState } from "react";

import Swal from "sweetalert2";
import { AuthContext } from "../provider/AuthContext";
import useAxiosSecure from "@/hook/useAxiosSecure";

export default function AddJobs() {
    const { user } = useContext(AuthContext);
    const axiosInstanceSecure = useAxiosSecure();

    const today = new Date().toISOString().slice(0, 10);
    const fullTimestamp = new Date().toISOString();

    const handlePostJobs = async (e) => {
        e.preventDefault();

        const newJob = {
            title: e.target.title.value,
            postedBy: user?.displayName,
            userEmail: user?.email,
            category: e.target.category.value,
            summary: e.target.summary.value,
            coverImage: e.target.cover.value,
            postedDate: today,
        };

        try {
            const { data } = await axiosInstanceSecure.post("/jobs", newJob);

            if (data.insertedId) {
                Swal.fire({
                    icon: "success",
                    title: "Your Post has been saved",
                    showConfirmButton: false,
                    timer: 1500,
                });
                e.target.reset();
            }
        } catch (err) {
            Swal.fire({
                icon: "error",
                title: "Your Job Post not send",
                showConfirmButton: false,
                timer: 3000,
                toast: true,
            });
        }
    };

    return (
        <div className="card md:border-l-1 md:border-l-blue-500 md:border-r-1 md:border-r-orange-800 bg-base-100 w-full max-w-md mx-auto shadow-2xl mt-5 rounded">
            <div className="card-body bg-purple-800  p-6 relative">
                <h2 className="text-2xl font-bold text-center mb-6">Add New Job</h2>

                <form onSubmit={handlePostJobs} className="space-y-4">

                    {/* Title Field */}
                    <div>
                        <label className="label">Title</label>
                        <input
                            type="text"
                            name="title"
                            required
                            className="input w-full text-black rounded-full focus:border-0 focus:outline-gray-200"
                            placeholder="Title"
                        />
                    </div>

                    {/* Posted By */}
                    <div>
                        <label className="label font-medium">Posted By</label>
                        <input
                            type="text"
                            readOnly
                            defaultValue={user?.displayName || "N/A"}
                            className="input w-full text-black rounded-full bg-gray-100 cursor-not-allowed dark:text-orange-800"
                        />
                    </div>

                    {/* Category */}
                    <div>
                        <label className="label font-medium">Category</label>
                        <select
                            name="category"
                            required
                            defaultValue=""
                            className="select w-full text-black rounded-full border border-blue-800 focus:outline-gray-200"
                        >
                            <option disabled value="">Select category</option>
                            <option value="Web">Web Development</option>
                            <option value="Graphics">Graphics Designing</option>
                            <option value="Digital">Digital Marketing</option>
                            <option value="Brand">Brand Identity Designer</option>
                            <option value="Developer">Full Stack Developer (Python/Django)</option>
                            <option value="SEO">SEO Specialist</option>
                            <option value="Campaign">PPC Campaign Manager</option>
                            <option value="Ui">UI/UX Designer</option>
                        </select>
                    </div>

                    {/* Summary */}
                    <div>
                        <label className="label font-medium">Summary</label>
                        <textarea
                            name="summary"
                            rows="3"
                            required
                            className="textarea w-full text-black rounded-2xl h-[250px] border border-blue-800 focus:outline-gray-200"
                            placeholder="Enter description"
                        ></textarea>
                    </div>

                    {/* Cover Image */}
                    <div>
                        <label className="label font-medium">Cover Img Url</label>
                        <input
                            type="url"
                            name="cover"
                            required
                            className="input text-black w-full rounded-full focus:outline-gray-200"
                            placeholder="https://example.com/image.jpg"
                        />
                    </div>

                    {/* Email */}
                    <div>
                        <label className="label font-medium">Email</label>
                        <input
                            type="email"
                            readOnly
                            defaultValue={user?.email || "N/A"}
                            className="input w-full text-black rounded-full bg-gray-100 cursor-not-allowed dark:text-orange-800"
                        />
                    </div>

                    {/* Posted Date */}
                    <div>
                        <label className="label font-medium">Posted Date</label>
                        <input
                            type="date"
                            readOnly
                            defaultValue={today}
                            className="input w-full text-black rounded-full bg-gray-100 cursor-not-allowed dark:text-orange-800"
                        />
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        className="btn w-full text-white mt-6 rounded-full btn-primary hover:opacity-80"
                    >
                        Add Job
                    </button>
                </form>
            </div>
        </div>
    );
}
