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
import Image from "next/image";

export default function Home() {
  return <div>
    <HeroSection/>
    <FreeService/>
    <Services/>
    <WhyChooseUs/>
    <WorkingProcess/>
    {/* <TechStack/> */}
    <MissionVision/>
    <ProcessFAQ/>
    <Stats/>
    <Pricing/>
    <Newsletter/>

  </div>;
}
