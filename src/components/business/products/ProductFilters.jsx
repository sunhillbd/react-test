export default function ProductFilters() {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-lg border 
      border-gray-200 dark:border-gray-700 p-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Kategori Filtresi */}
          <div>
            <label className="block text-sm font-medium text-gray-700 
            dark:text-gray-300 mb-1">
              Kategori
            </label>
            <select className="w-full p-2 bg-white dark:bg-gray-800 border 
            border-gray-200 dark:border-gray-700 rounded-lg">
              <option value="">Tüm Kategoriler</option>
              <option value="electronics">Elektronik</option>
              <option value="clothing">Giyim</option>
              {/* Diğer kategoriler */}
            </select>
          </div>
  
          {/* Stok Durumu */}
          <div>
            <label className="block text-sm font-medium text-gray-700 
            dark:text-gray-300 mb-1">
              Stok Durumu
            </label>
            <select className="w-full p-2 bg-white dark:bg-gray-800 border 
            border-gray-200 dark:border-gray-700 rounded-lg">
              <option value="">Tümü</option>
              <option value="in_stock">Stokta</option>
              <option value="low_stock">Az Stok</option>
              <option value="out_of_stock">Tükendi</option>
            </select>
          </div>
  
          {/* Fiyat Aralığı */}
          <div>
            <label className="block text-sm font-medium text-gray-700 
            dark:text-gray-300 mb-1">
              Fiyat Aralığı
            </label>
            <div className="flex gap-2">
              <input
                type="number"
                placeholder="Min"
                className="w-full p-2 bg-white dark:bg-gray-800 border 
                border-gray-200 dark:border-gray-700 rounded-lg"
              />
              <input
                type="number"
                placeholder="Max"
                className="w-full p-2 bg-white dark:bg-gray-800 border 
                border-gray-200 dark:border-gray-700 rounded-lg"
              />
            </div>
          </div>
        </div>
  
        <div className="mt-4 flex justify-end gap-2">
          <button className="px-4 py-2 text-sm text-gray-600 dark:text-gray-300 
          hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors">
            Sıfırla
          </button>
          <button className="px-4 py-2 text-sm text-white bg-primary 
          hover:bg-primary-600 rounded-lg transition-colors">
            Uygula
          </button>
        </div>
      </div>
    );
  }