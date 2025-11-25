"use client"; // useState, useEffect ব্যবহার করার জন্য

import React, { useEffect, useState } from 'react';
import Banner from '@/components/Banner';
import useAxios from '@/hook/useAxios';
import { SuperCard } from '@/components/SuperCard';
import TopCategories from '@/components/TopCategories';
import About from '@/components/About';

const Page = () => {
  const [latestData, setLatestData] = useState([]);
  const axiosInstance = useAxios();

  useEffect(() => {
    axiosInstance
      .get("/latestjobs")
      .then((data) => {
        setLatestData(data.data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, [axiosInstance]);

  return (
    <div>
 {/* ----------  Banner Section ---------- */}
      <Banner />
 {/* ----------  Latest Super Jobs Section ---------- */}
      <div className='my-8'>
        <h2 className="text-3xl font-bold text-center mb-6 title">
          Latest Super Jobs
        </h2>

        <div className="grid md:grid-cols-3 gap-6 mt-10">
          {latestData.map((model) => (
            <SuperCard key={model._id} model={model} />
          ))}
        </div>
      </div>

  {/* ---------- Top Categories Section ---------- */}
      <TopCategories/>

  {/* ---------- About Section ---------- */}
      <About/>
    </div>
  );
};

export default Page;
