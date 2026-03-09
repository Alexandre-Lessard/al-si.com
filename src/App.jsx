import { useState, useEffect } from 'react';
import Nav from './sections/Nav.jsx';
import Hero from './sections/Hero.jsx';
import About from './sections/About.jsx';
import Services from './sections/Services.jsx';
import Projects from './sections/Projects.jsx';
import Articles from './sections/Articles.jsx';
import Contact from './sections/Contact.jsx';
import Footer from './sections/Footer.jsx';

function App() {
  const [lang, setLang] = useState('fr');

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  return (
    <div
      className="min-h-screen"
      style={{
        background: `
          radial-gradient(at 90% 15%, rgba(255, 123, 84, 0.35), transparent 55%),
          radial-gradient(at 85% 70%, rgba(128, 42, 22, 0.45), transparent 45%),
          #050505
        `,
      }}
    >
      <Nav lang={lang} setLang={setLang} />
      <Hero lang={lang} />
      <About lang={lang} />
      <Services lang={lang} />
      <Projects lang={lang} />
      <Articles lang={lang} />
      <Contact lang={lang} />
      <Footer lang={lang} />
    </div>
  );
}

export default App;
