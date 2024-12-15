const ContentSection = ({ children, className = "" }) => {
  return (
    <div className={`py-12 ${className}`}>
      <div className="max-w-4xl mx-auto px-8 prose dark:prose-invert prose-lg prose-gray">
        {children}
      </div>
    </div>
  );
};

export default ContentSection;
