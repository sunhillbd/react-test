"use client";
import { useState } from 'react';
import { PlusCircle, ImagePlus } from 'lucide-react';
import Image from 'next/image';

const BrandSearch = ({ selectedBrand, onBrandSelect, feedbackType }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);

  // Mock brands (gerçek uygulamada API'den gelecek)
  const mockBrands = [
    { id: 1, name: 'Apple', logo: '/brands/apple.svg' },
    { id: 2, name: 'Samsung', logo: '/brands/samsung.svg' },
    { id: 3, name: 'Nike', logo: '/brands/nike.svg' },
  ];

  const handleSearch = (e) => {
    const query = e.target.value;
    setSearchTerm(query);
    
    if (query.trim()) {
      const results = mockBrands.filter(brand => 
        brand.name.toLowerCase().includes(query.toLowerCase())
      );
      setSearchResults(results);
      setShowDropdown(true);
    } else {
      setSearchResults([]);
      setShowDropdown(false);
    }
  };

  return (
    <div className="space-y-4">
      <div className="relative">
        <input
          type="text"
          placeholder="Marka adı yazın..."
          value={searchTerm}
          onChange={handleSearch}
          className="w-full py-[9px] px-[12px] rounded-[50px] text-black-primary dark:text-white bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 outline-none"
        />
        
        {/* Arama Sonuçları */}
        {showDropdown && searchResults.length > 0 && (
          <div className="absolute w-full mt-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg z-10">
            {searchResults.map((brand) => (
              <button
                key={brand.id}
                onClick={() => {
                  onBrandSelect(brand);
                  setShowDropdown(false);
                  setSearchTerm('');
                }}
                className="w-full p-3 text-left hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors flex items-center gap-3"
              >
                {brand.logo && (
                  <Image
                    src={brand.logo}
                    alt={brand.name}
                    width={32}
                    height={32}
                    className="object-contain"
                  />
                )}
                <span className="text-black-primary dark:text-white">
                  {brand.name}
                </span>
              </button>
            ))}
          </div>
        )}
        
        {/* Yeni Marka Ekleme */}
        {!selectedBrand && searchTerm && searchResults.length === 0 && (
          <button
            onClick={() => {
              onBrandSelect({
                id: 'new',
                name: searchTerm,
                isNew: true
              });
              setShowDropdown(false);
              setSearchTerm('');
            }}
            className="mt-2 w-full p-3 text-left hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg transition-colors"
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                <PlusCircle size={20} className="text-primary" />
              </div>
              <div>
                <span className="text-black-primary dark:text-white">
                  &quot;{searchTerm}&quot;
                </span>
                <span className="ml-2 text-xs text-primary bg-primary/10 px-2 py-1 rounded-full">
                  Yeni Marka
                </span>
              </div>
            </div>
          </button>
        )}
      </div>

      {/* Seçili Marka */}
      {selectedBrand && (
        <div className="mt-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg flex items-center justify-between">
          <div className="flex items-center gap-3">
            {selectedBrand.isNew ? (
              <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                <PlusCircle size={20} className="text-primary" />
              </div>
            ) : (
              selectedBrand.logo && (
                <Image
                  src={selectedBrand.logo}
                  alt={selectedBrand.name}
                  width={32}
                  height={32}
                  className="object-contain"
                />
              )
            )}
            <div>
              <span className="text-black-primary dark:text-white font-medium">
                {selectedBrand.name}
              </span>
              {selectedBrand.isNew && (
                <span className="ml-2 text-xs text-primary bg-primary/10 px-2 py-1 rounded-full">
                  New Brand
                </span>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BrandSearch;
