import Navbar from "./components/Navbar";
import Hero from './sections/Hero.jsx'
import Skills from "./sections/TechSkills.jsx";
import Projects from "./sections/Projects.jsx";
import Certifications from "./sections/Certifications.jsx";
import Contact from "./sections/Contacts.jsx";
import Footer from "./components/Footer.jsx";
import './App.css'
import AdvancedCursor from "./components/AdvancedCursor.jsx";
import Participation from "./sections/Participations.jsx"

function App() {
  return (
    <>
      <div className="relative bg-gray-50 dark:bg-gray-950 min-h-screen">
        <AdvancedCursor />
        <Navbar />
        <Hero />
        <Skills />
        <Projects />
        <Certifications />
        <Participation />
        <Contact />
        <Footer />
      </div>
    </>
  )
}

export default App;