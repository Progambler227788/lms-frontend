const CategoryCard = ({ category }) => {
  return (
    <div className="bg-white shadow-md rounded-xl overflow-hidden hover:shadow-lg transition">
      <img src={category.image} alt={category.name} className="w-full h-36 object-cover" />
      <div className="p-4 text-center">
        <h3 className="text-lg font-semibold">{category.name}</h3>
      </div>
    </div>
  );
};

export default CategoryCard;
