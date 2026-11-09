import Audience from "@/components/Audience";
import Curriculum from "@/components/Curriculum";
import Faq from "@/components/Faq";
import Hero from "@/components/Hero";
import HeroMotion from "@/components/HeroMotion";
import Overview from "@/components/Overview";
import Projects from "@/components/Projects";
import SiteFooter from "@/components/SiteFooter";
import Register from "@/components/Register";
import SiteHeader from "@/components/SiteHeader";

export default function Home() {
  return (
    <HeroMotion>
      <SiteHeader />
      <main>
        <Hero />
        <Overview />
        <Curriculum />
        <Projects />
        <Audience />
        <Register />
        <Faq />
      </main>
      <SiteFooter />
    </HeroMotion>
  );
}
