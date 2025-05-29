
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
          className="w-full h-96 object-cover rounded-lg border"
        />
      </div>
      <div className="flex space-x-2">
        {images.map((image, index) => (
          <button
            key={index}
            onClick={() => onImageSelect(index)}
            className={`w-20 h-20 border-2 rounded-lg overflow-hidden ${
              selectedImage === index ? 'border-electric-blue' : 'border-gray-200'
            }`}
          >
            <img src={image} alt="" className="w-full h-full object-cover" />
          </button>
        ))}
      </div>
    </div>
  );
};

export default ProductImages;
