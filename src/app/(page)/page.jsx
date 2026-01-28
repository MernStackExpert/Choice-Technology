"use client";

import FreeService from "@/Components/Home/FreeService/FreeService";
import HeroSection from "@/Components/Home/Hero/HeroSection";
import MissionVision from "@/Components/Home/MissionVision/MissionVision";
import Newsletter from "@/Components/Home/Newsletter/Newsletter";
import Pricing from "@/Components/Home/Pricing/Pricing";
import ProcessFAQ from "@/Components/Home/ProcessFAQ/ProcessFAQ";
import Services from "@/Components/Home/Services/Services";
import Stats from "@/Components/Home/Stats/Stats";
import TechStack from "@/Components/Home/TechStack/TechStack";
import WhyChooseUs from "@/Components/Home/WhyChooseUs/WhyChooseUs";
import WorkingProcess from "@/Components/Home/WorkingProcess/WorkingProcess";
import axiosInstance from "@/utils/axiosInstance";
import { useEffect, useState } from "react";

export default function Home() {
  const [homeData, setHomeData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHomeContent = async () => {
      try {
        const response = await axiosInstance.get('/home-section');
        setHomeData(response.data[0]);
      } catch (error) {
        console.error("Error For Data Fetch", error);
      } finally {
        setLoading(false);
      }
    };

    fetchHomeContent();
  }, []);


  if (loading) return <div className="min-h-screen flex items-center justify-center"><span className="loading loading-infinity loading-xl"></span></div>;  

  return (
    <div>
      <HeroSection />
      <FreeService />
      <Services />
      <WhyChooseUs />
      <WorkingProcess />
      {/* <TechStack/> */}
      <MissionVision mission={homeData?.mission} vision={homeData?.vision} />
      <ProcessFAQ faqs={homeData?.faq} />
      <Stats />
      <Pricing />
      <Newsletter />
    </div>
  );
}
