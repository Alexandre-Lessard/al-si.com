const Contact = () => (
  <section id="contact" className="contact">
    <h2>Contactez-moi!</h2>
    <p>
      Par <a href="mailto:alexandre@example.com">courriel</a> ou via{' '}
      <a href="https://www.facebook.com" target="_blank" rel="noreferrer">
        Facebook
      </a>
      , contactez-moi. Il me fera plaisir de vous aider à cibler vos besoins.
    </p>

    <div className="contact__actions">
      <a className="pill" href="mailto:alexandre@example.com">Email</a>
      <a className="pill" href="https://www.facebook.com" target="_blank" rel="noreferrer">
        Facebook
      </a>
    </div>

    <nav className="floating-nav">
      <a href="#accueil">AL-SI</a>
      <a href="#apropos">À propos de moi</a>
      <a href="#services">Services</a>
      <a href="#contact">Contact</a>
    </nav>
  </section>
);

export default Contact;
