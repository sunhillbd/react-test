const ProgressBar = ({ currentStep, type }) => {
  const steps = [
    { number: 1, title: "Geri Bildirim Türü" },
    { number: 2, title: "Marka Seçimi" },
    { number: 3, title: type === 'complaint' ? "Şikayet Detayları" : "Değerlendirme Detayları" },
    { number: 4, title: "Belgeler" }
  ];

  return (
    <div className="relative">
      {/* Progress Line */}
      <div className="absolute top-5 left-0 right-0 h-[2px] bg-gray-200 dark:bg-gray-700" />
      <div
        className={`absolute top-5 left-0 h-[2px] transition-all duration-300 ${
          type === 'complaint' ? 'bg-red-500' : type === 'review' ? 'bg-green-500' : 'bg-primary'
        }`}
        style={{ width: `${((currentStep - 1) / (steps.length - 1)) * 100}%` }}
      />

      {/* Steps */}
      <div className="relative flex justify-between">
        {steps.map((step) => (
          <div
            key={step.number}
            className="flex flex-col items-center"
          >
            {/* Step Circle */}
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center relative z-10 transition-colors
                ${currentStep === step.number
                  ? type === 'complaint'
                    ? 'bg-red-500 text-white'
                    : type === 'review'
                    ? 'bg-green-500 text-white'
                    : 'bg-primary text-white'
                  : currentStep > step.number
                  ? type === 'complaint'
                    ? 'bg-red-100 text-red-500'
                    : type === 'review'
                    ? 'bg-green-100 text-green-500'
                    : 'bg-primary/10 text-primary'
                  : 'bg-gray-200 dark:bg-gray-700 text-grey dark:text-gray-400'
                }
              `}
            >
              {currentStep > step.number ? "✓" : step.number}
            </div>
            
            {/* Step Title */}
            <span
              className={`mt-2 text-sm font-medium transition-colors
                ${currentStep === step.number
                  ? type === 'complaint'
                    ? 'text-red-500'
                    : type === 'review'
                    ? 'text-green-500'
                    : 'text-primary'
                  : currentStep > step.number
                  ? type === 'complaint'
                    ? 'text-red-500/80'
                    : type === 'review'
                    ? 'text-green-500/80'
                    : 'text-primary/80'
                  : 'text-grey dark:text-gray-400'
                }
              `}
            >
              {step.title}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProgressBar;
