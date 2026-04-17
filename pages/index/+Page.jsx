import { usePageContext } from 'vike-react/usePageContext';
import Hero from '../../src/sections/Hero.jsx';
import ProofBand from '../../src/sections/ProofBand.jsx';
import Services from '../../src/sections/Services.jsx';
import HowItWorks from '../../src/sections/HowItWorks.jsx';
import Projects from '../../src/sections/Projects.jsx';
import Testimonials from '../../src/sections/Testimonials.jsx';
import Faq from '../../src/sections/Faq.jsx';
import About from '../../src/sections/About.jsx';
import Contact from '../../src/sections/Contact.jsx';

export default function Page() {
  const pageContext = usePageContext();
  const lang = pageContext.locale || 'fr';

  return (
    <>
      <Hero lang={lang} />
      <ProofBand lang={lang} />
      <Services lang={lang} />
      <HowItWorks lang={lang} />
      <Projects lang={lang} />
      <Testimonials lang={lang} />
      <Faq lang={lang} />
      <About lang={lang} />
      <Contact lang={lang} />
    </>
  );
}
