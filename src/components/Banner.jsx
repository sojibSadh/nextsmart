"use client"; // Carousel একটি client-side component

import Image from "next/image";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // Carousel CSS
import { Carousel } from "react-responsive-carousel";

import bannerImg1 from "@/app/assets/banner/banner1.png";
import bannerImg2 from "@/app/assets/banner/banner2.png";
import bannerImg3 from "@/app/assets/banner/banner3.png";

const Banner = () => {
  return (
    <div>
      <Carousel autoPlay infiniteLoop showThumbs={false}>
        <div>
          <Image src={bannerImg1} alt="Banner 1" className="w-full" />
          <p className="legend">Legend 1</p>
        </div>
        <div>
          <Image src={bannerImg2} alt="Banner 2" className="w-full" />
          <p className="legend">Legend 2</p>
        </div>
        <div>
          <Image src={bannerImg3} alt="Banner 3" className="w-full" />
          <p className="legend">Legend 3</p>
        </div>
      </Carousel>
    </div>
  );
};

export default Banner;
