import { translations } from '../i18n';
import { sectionClasses } from '../styles';
import { SectionHeader } from '../components/ui';
import { ScrollReveal } from '../components/ScrollReveal';

const Projects = ({ lang }) => {
  const t = translations[lang] || translations.fr;
  const { title, items } = t.projects;

  return (
    <section id="projects" className={sectionClasses}>
      <ScrollReveal>
        <SectionHeader title={title} />
      </ScrollReveal>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {items.map((project, i) => (
          <ScrollReveal key={i} delay={i * 0.1}>
            <article className="border border-line rounded-2xl overflow-hidden bg-surface hover:border-accent/30 transition-all duration-300 group h-full">
              <div className={`aspect-video ${project.gradient} flex items-center justify-center`}>
                <span className="text-4xl opacity-20">{project.icon}</span>
              </div>
              <div className="p-6">
                <h3 className="text-lg font-semibold mb-2">{project.title}</h3>
                <p className="text-sm text-muted mb-4">{project.description}</p>
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag, j) => (
                    <span key={j} className="text-xs bg-surface-hover border border-line rounded-full px-3 py-1 text-muted">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </article>
          </ScrollReveal>
        ))}
      </div>
    </section>
  );
};

export default Projects;
