"use client";
import { useRef } from 'react';
import { ImagePlus, X } from 'lucide-react';
import Image from 'next/image';

const ComplaintDetails = ({ 
  title, 
  description, 
  images, 
  onUpdateTitle, 
  onUpdateDescription, 
  onUpdateImages 
}) => {
  const imageInputRef = useRef(null);

  const handleImageSelect = (e) => {
    const files = Array.from(e.target.files || []);
    const imageFiles = files.filter(file => file.type.startsWith('image/'));
    onUpdateImages([...images, ...imageFiles]);
    e.target.value = ''; // Input'u sıfırla
  };

  const removeImage = (index) => {
    const newImages = images.filter((_, i) => i !== index);
    onUpdateImages(newImages);
  };

  return (
    <div className="space-y-6">
      <h2 className="text-[30px] text-black-primary dark:text-white font-bold text-center">
        Geri Bildirim Detayları
      </h2>
      <p className="text-grey dark:text-gray-300 font-medium text-base text-center">
        Geri bildiriminiz hakkında detaylı bilgi verin
      </p>

      {/* Başlık Girişi */}
      <div className="space-y-2">
        <label className="text-black-primary dark:text-white font-medium">
          Başlık
        </label>
        <input
          type="text"
          value={title}
          onChange={(e) => onUpdateTitle(e.target.value)}
          placeholder="Geri bildiriminiz için açık bir başlık girin"
          className="w-full py-[9px] px-[12px] rounded-lg text-black-primary dark:text-white bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 outline-none"
        />
      </div>

      {/* Açıklama Girişi */}
      <div className="space-y-2">
        <label className="text-black-primary dark:text-white font-medium">
          Açıklama
        </label>
        <textarea
          value={description}
          onChange={(e) => onUpdateDescription(e.target.value)}
          placeholder="Geri bildiriminizi detaylı bir şekilde açıklayın"
          rows={5}
          className="w-full py-[9px] px-[12px] rounded-lg text-black-primary dark:text-white bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 outline-none resize-none"
        />
      </div>

      {/* Görsel Yükleme */}
      <div className="space-y-4">
        <div
          onClick={() => imageInputRef.current?.click()}
          className="flex items-center justify-center w-full h-32 rounded-lg border border-dashed border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800"
        >
          <div className="flex flex-col items-center justify-center pt-5 pb-6">
            <ImagePlus className="w-8 h-8 text-gray-500 dark:text-gray-400 mb-1" />
            <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
              <span className="font-semibold">Yüklemek için tıklayın</span> veya sürükleyip bırakın
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              SVG, PNG, JPG veya GIF (En fazla 800x400px)
            </p>
          </div>
        </div>
        <input
          ref={imageInputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleImageSelect}
        />
        {images.map((image, index) => (
          <div key={index} className="relative w-32 h-32 rounded-lg">
            <Image
              src={URL.createObjectURL(image)}
              alt="Geri Bildirim Görseli"
              layout="fill"
              objectFit="cover"
              className="rounded-lg"
            />
            <button
              onClick={() => removeImage(index)}
              className="absolute top-0 right-0 p-1 bg-red-500 text-white rounded-full hover:bg-red-600"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ComplaintDetails;
