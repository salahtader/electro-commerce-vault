
const BrandPartners = () => {
  const brands = [
    { name: "Schneider Electric", logo: "SE" },
    { name: "ABB", logo: "ABB" },
    { name: "Siemens", logo: "SIE" },
    { name: "Legrand", logo: "LEG" },
    { name: "Hager", logo: "HAG" },
    { name: "General Electric", logo: "GE" },
    { name: "Eaton", logo: "EAT" },
    { name: "Rockwell", logo: "ROC" }
  ];

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-montserrat font-bold text-electric-blue mb-4">
            Nos Marques Partenaires
          </h2>
          <p className="text-lg text-gray-600 font-inter">
            Nous travaillons avec les leaders mondiaux du matériel électrique
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-8 items-center">
          {brands.map((brand, index) => (
            <div
              key={index}
              className="flex items-center justify-center h-20 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-300 cursor-pointer group"
            >
              <div className="text-2xl font-bold text-gray-400 group-hover:text-electric-blue transition-colors duration-300">
                {brand.logo}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BrandPartners;
