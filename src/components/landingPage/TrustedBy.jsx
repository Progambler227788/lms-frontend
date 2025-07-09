import React from 'react';

const brands = [
  { name: 'Google', logo: 'https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg' },
  { name: 'Amazon', logo: 'https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg' },
  { name: 'Microsoft', logo: 'https://upload.wikimedia.org/wikipedia/commons/9/96/Microsoft_logo_%282012%29.svg' },
  { name: 'Netflix', logo: 'https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg' },
];

const TrustedBy = () => {
  return (
    <section className="bg-white py-16 px-6 text-center">
      <h2 className="text-3xl font-bold text-gray-800 mb-10">
        Trusted by Learners at Top Companies
      </h2>
      <div className="flex flex-wrap justify-center items-center gap-10">
        {brands.map((brand, index) => (
          <img
            key={index}
            src={brand.logo}
            alt={brand.name}
            className="h-10 object-contain grayscale hover:grayscale-0 transition"
          />
        ))}
      </div>
    </section>
  );
};

export default TrustedBy;
