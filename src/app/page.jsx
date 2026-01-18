import HeroSection from "@/Components/Home/Hero/HeroSection";
import Services from "@/Components/Home/Services/Services";
import WhyChooseUs from "@/Components/Home/WhyChooseUs/WhyChooseUs";
import Image from "next/image";

export default function Home() {
  return <div>
    <HeroSection/>
    <Services/>
    <WhyChooseUs/>
  </div>;
}
