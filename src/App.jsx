import { useState, useEffect } from 'react';
import Hero from './sections/Hero.jsx';
import Services from './sections/Services.jsx';
import About from './sections/About.jsx';
import Contact from './sections/Contact.jsx';
import Footer from './sections/Footer.jsx';

function App() {
  const [lang, setLang] = useState('fr');

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  return (
    <div className="page-wrapper">
      <Hero lang={lang} />
      <About lang={lang} />
      <Services lang={lang} />
      <Contact lang={lang} />
      <Footer lang={lang} setLang={setLang} />
    </div>
  );
}

export default App;
