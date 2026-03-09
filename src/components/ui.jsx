export function Button({ children, href, variant = 'primary', className = '', ...props }) {
  const base = 'inline-flex items-center justify-center px-8 py-3 rounded-full font-semibold text-sm transition-all duration-300 cursor-pointer';
  const variants = {
    primary: 'bg-accent !text-black hover:bg-white hover:!text-accent border border-transparent hover:border-accent shadow-[0_8px_30px_rgba(255,139,95,0.25)] hover:shadow-[0_8px_30px_rgba(255,255,255,0.15)]',
    secondary: 'border border-text/30 text-text hover:border-accent hover:text-accent',
  };

  const classes = `${base} ${variants[variant]} ${className}`;

  if (href) {
    return <a href={href} className={classes} {...props}>{children}</a>;
  }
  return <button className={classes} {...props}>{children}</button>;
}

export function SectionHeader({ title, className }) {
  return (
    <div className={className || 'mb-12'}>
      <h2 className="text-2xl md:text-3xl font-bold tracking-tight">{title}</h2>
    </div>
  );
}
