import heroImage from '../assets/hero.jpg';

const Hero = () => (
  <section id="accueil" className="hero">
    <div className="hero__text">
      <p className="hero__eyebrow">Alexandre Lessard</p>
      <h1>
        <span>ALEXANDRE LESSARD</span>
        <span>SERVICES INFORMATIQUES</span>
      </h1>
      <p className="hero__subtitle">
        Administrateur système et développeur depuis 7 ans
      </p>
    </div>
    <div className="hero__image">
      <img src={heroImage} alt="Écran affichant du code" loading="lazy" />
    </div>
  </section>
);

export default Hero;
