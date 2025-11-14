const offers = [
  'Diagnostic réseau',
  'Intégration de nouveau logiciel',
  'Développement de site internet',
  "Développement d'application",
  'Et plus encore',
];

const pillars = [
  { title: 'Développement', items: ['React', 'Node.js', 'JavaScript', 'Python'] },
  { title: 'Réseau', items: ['Wi-Fi', 'Routage', 'VLAN'] },
  { title: 'Cloud', items: ['AWS', 'Azure', 'Google'] },
];

const Services = () => (
  <section id="services" className="services">
    <h2>Services offers</h2>
    <div className="services__offers">
      <ul>
        {offers.map((offer) => (
          <li key={offer}>{offer}</li>
        ))}
      </ul>
    </div>

    <div className="services__pillars">
      {pillars.map((pillar) => (
        <article key={pillar.title}>
          <h3>{pillar.title}</h3>
          <ul>
            {pillar.items.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </article>
      ))}
    </div>
  </section>
);

export default Services;
