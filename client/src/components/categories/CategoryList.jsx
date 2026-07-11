import CategoryCard from "./CategoryCard";

export default function CategoryList({ categories, onEdit, onDelete }) {
  return (
    <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
      {categories.map((category) => (
        <CategoryCard
          key={category._id}
          category={category}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
}
