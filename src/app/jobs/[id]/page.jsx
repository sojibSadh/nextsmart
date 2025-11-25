'use client';

import useAxiosSecure from '@/hook/useAxiosSecure';
import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation'; // <-- Import the useParams hook
import { Bars } from 'react-loader-spinner';

// The component must be a standard function, not async, since it uses Hooks
function JobDetails() {

    const params = useParams();
    const id = params.id;
    const [loading, setLoading] = useState(true);

    const [jobData, setJobData] = useState(null);

    // 3. Axios hook instance
    const axiosInstanceSecure = useAxiosSecure();

    // 4. Data fetching using useEffect
    useEffect(() => {
        // Ensure both the ID and the axios instance are available before fetching
        if (id && axiosInstanceSecure) {
            // Set jobData to null or undefined before new fetch for loading state
            setJobData(null);

            axiosInstanceSecure
                .get(`/alljobs/${id}`)
                .then((res) => {
                    setJobData(res.data);
                })
                .catch((err) => {
                    console.error("Error fetching job data:", err);
                    // Handle error state if necessary
                });
        }
    }, [id, axiosInstanceSecure]); // Dependency array ensures refetch when ID or instance changes

 
    return (
        <div className="p-6">
            <h2 className="text-xl font-bold">Job Details</h2>

            <div className="mt-4">
                {/* Display a loading state while jobData is null */}
                {!jobData ? (
                    <div className="flex justify-center items-center h-screen">
                        <Bars
                            height="40"
                            width="40"
                            color="#4fa94d"
                            ariaLabel="bars-loading"
                            visible={true}
                        />
                    </div>
                ) : (
                    <>


                        <div className="p-4 sm:p-6 space-y-4">
                            <img
                                src={jobData.coverImage}
                                alt={jobData.title}
                                className="w-full h-56 sm:h-120 object-cover rounded-3xl"
                            />
                            <h2 className="text-2xl sm:text-3xl font-bold text-gray-300 capitalize">
                                {jobData.title}
                            </h2>

                            <div className="flex flex-col sm:flex-row sm:flex-wrap gap-2 sm:gap-4 text-sm sm:text-base text-gray-600">
                                <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full w-fit text-center">
                                    {jobData.category}
                                </span>
                                <span className="flex items-center gap-2 text-gray-300">
                                    <span className="font-medium text-gray-300">Posted by:</span> {jobData.postedBy}
                                </span>
                                <span className="flex items-center gap-2">
                                    <span className="font-medium text-gray-300">Date:</span>{" "}
                                    {new Date(jobData.postedDate).toLocaleDateString()}
                                </span>
                            </div>

                            <hr className="my-3 border-gray-200" />

                            <div>
                                <h3 className="text-lg sm:text-xl font-semibold mb-2 text-gray-300">
                                    Job Summary
                                </h3>
                                <p className="text-gray-300 leading-relaxed text-sm sm:text-base dark:text-gray-400">
                                    {jobData.summary}
                                </p>
                            </div>

                            {/* Apply Button */}
                            {/* <div className="pt-4">
                    <button
                        className="w-full  hover:opacity-70 text-white py-2"
                    >
                        Accept Task
                    </button>
                </div> */}
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}

export default JobDetails;