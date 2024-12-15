const PageHeader = ({ title, description }) => {
  return (
    <div className="bg-gray-50 dark:bg-gray-800 py-12">
      <div className="max-w-4xl mx-auto px-8">
        <h1 className="text-4xl font-bold text-black-primary dark:text-white mb-4">
          {title}
        </h1>
        {description && (
          <p className="text-grey dark:text-gray-300 text-lg">
            {description}
          </p>
        )}
      </div>
    </div>
  );
};

export default PageHeader;
