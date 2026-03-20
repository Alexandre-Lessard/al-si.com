import { translations } from '../i18n';
import { sectionClasses } from '../styles';
import { SectionHeader } from '../components/ui';
import { ScrollReveal } from '../components/ScrollReveal';
import Card from '../components/Card';

const GitHubIcon = ({ className }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
  </svg>
);

const comingSoonLabel = { fr: 'À venir', en: 'Coming soon' };

const ProjectCard = ({ project, lang }) => {
  const hasGitHub = !!project.github;
  const linkUrl = project.githubOnly ? project.github : project.url;
  const isClickable = !!linkUrl && !project.comingSoon;

  return (
    <Card dimmed={project.comingSoon} className="overflow-hidden flex flex-col relative group">
      {/* Stretched link covers the entire card */}
      {isClickable && (
        <a
          href={linkUrl}
          target="_blank"
          rel="noreferrer"
          className="absolute inset-0 z-0"
          aria-label={project.title}
        />
      )}

      {/* Coming soon badge overlay */}
      {project.comingSoon && (
        <span className="absolute top-3 left-3 z-10 text-xs font-medium bg-accent/90 text-black px-3 py-1 rounded-full">
          {comingSoonLabel[lang] || comingSoonLabel.fr}
        </span>
      )}

      {/* GitHub icon - above stretched link */}
      {hasGitHub && (
        <button
          onClick={() => window.open(project.github, '_blank', 'noopener')}
          className="absolute top-3 right-3 z-20 text-muted hover:text-text transition-colors duration-200 bg-transparent border-0 cursor-pointer p-0"
          aria-label="GitHub"
        >
          <GitHubIcon className="w-10 h-10" />
        </button>
      )}

      {/* Visual area - pointer-events-none so clicks pass through to stretched link */}
      <div
        className={`aspect-video ${project.gradient || ''} flex items-center justify-center overflow-hidden pointer-events-none`}
      >
        {project.image ? (
          <img
            src={project.image}
            alt={project.title}
            className={
              project.image.endsWith('.svg')
                ? 'w-3/4 h-3/4 opacity-60 object-contain'
                : 'w-full h-full object-cover object-center'
            }
          />
        ) : (
          <span className="opacity-20 text-[5rem] leading-none">{project.icon}</span>
        )}
      </div>

      {/* Content */}
      <div className="p-6 flex flex-col flex-1 pointer-events-none">
        <h3 className="text-lg font-semibold mb-2">{project.title}</h3>
        <p className="text-sm text-muted mb-4 flex-1">{project.description}</p>
        <div className="flex flex-wrap gap-2">
          {project.tags.map((tag, j) => (
            <span key={j} className="text-xs bg-surface-hover border border-line rounded-full px-3 py-1 text-muted">
              {tag}
            </span>
          ))}
        </div>
      </div>
    </Card>
  );
};

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
            <ProjectCard project={project} lang={lang} />
          </ScrollReveal>
        ))}
      </div>
    </section>
  );
};

export default Projects;
