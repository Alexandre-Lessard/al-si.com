const Card = ({ children, dimmed = false, className = '', ...props }) => {
  return (
    <article
      className={`border border-line rounded-2xl bg-surface hover:border-accent/30 transition-all duration-300 h-full ${dimmed ? 'opacity-60' : ''} ${className}`}
      {...props}
    >
      {children}
    </article>
  );
};

export default Card;
