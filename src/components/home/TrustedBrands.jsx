import Image from 'next/image';

const TrustedBrands = () => {
  return (
    <div className="border-t border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <p className="text-center text-grey dark:text-gray-300 mb-8">
          Trusted by leading brands worldwide
        </p>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8 items-center justify-items-center opacity-60">
          <Image src="/assets/brand1.svg" alt="Brand 1" width={120} height={40} />
          <Image src="/assets/brand2.svg" alt="Brand 2" width={120} height={40} />
          <Image src="/assets/brand3.svg" alt="Brand 3" width={120} height={40} />
          <Image src="/assets/brand4.svg" alt="Brand 4" width={120} height={40} />
          <Image src="/assets/brand5.svg" alt="Brand 5" width={120} height={40} />
          <Image src="/assets/brand6.svg" alt="Brand 6" width={120} height={40} />
        </div>
      </div>
    </div>
  );
};

export default TrustedBrands;
