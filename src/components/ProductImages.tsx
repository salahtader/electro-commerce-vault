
interface ProductImagesProps {
  images: string[];
  productName: string;
  selectedImage: number;
  onImageSelect: (index: number) => void;
}

const ProductImages = ({ images, productName, selectedImage, onImageSelect }: ProductImagesProps) => {
  return (
    <div>
      <div className="mb-4">
        <img
          src={images[selectedImage]}
          alt={productName}
          className="w-full h-96 object-cover rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800"
        />
      </div>
      <div className="flex space-x-2">
        {images.map((image, index) => (
          <button
            key={index}
            onClick={() => onImageSelect(index)}
            className={`w-20 h-20 border-2 rounded-lg overflow-hidden transition-colors ${
              selectedImage === index 
                ? 'border-electric-blue dark:border-blue-400' 
                : 'border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500'
            }`}
          >
            <img src={image} alt="" className="w-full h-full object-cover bg-white dark:bg-gray-800" />
          </button>
        ))}
      </div>
    </div>
  );
};

export default ProductImages;
