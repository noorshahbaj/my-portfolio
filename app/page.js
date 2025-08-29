import { personalData } from "@/utils/data/personal-data";
import AboutSection from "./components/homepage/about";
import Blog from "./components/homepage/blog";
import ContactSection from "./components/homepage/contact";
import Education from "./components/homepage/education";
import Experience from "./components/homepage/experience";
import HeroSection from "./components/homepage/hero-section";
import Projects from "./components/homepage/projects";
import Skills from "./components/homepage/skills";

async function getData() {
  try {
    const res = await fetch(`https://dev.to/api/articles/latest?username=${personalData.devUsername}`, {
      headers: {
        'Accept': 'application/vnd.forem.api-v1+json'
      }
    });

    if (!res.ok) {
      console.error('Failed to fetch data:', res.status);
      return [];
    }

    const data = await res.json();
    
    const filtered = data.filter((item) => item?.cover_image);
    
    return filtered;
  } catch (error) {
    console.error('Error fetching blog data:', error);
    return [];
  }
};

export default async function Home() {
  const blogs = await getData();

  return (
    <div suppressHydrationWarning >
      <HeroSection />
      <AboutSection />
      <Experience />
      <Skills />
      <Projects />
      <Education />
      <Blog blogs={blogs} />
      <ContactSection />
    </div>
  )
};