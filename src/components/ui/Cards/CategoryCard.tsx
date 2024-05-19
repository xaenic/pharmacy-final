import Image from "next/image";

async function CategoryCard({
  Category,
  total,
  image,
}: {
  Category: string;
  total: number;
  image: string;
}) {
  return (
    <div className=" p-5 bg-white shadow-sm flex items-center justify-end relative">
      <div className="absolute left-4">
        <h1>{Category}</h1>
        <p className="text-sm text-slate-500">{total} products</p>
      </div>

      <Image
        src={image}
        alt="rp"
        width={10}
        height={10}
        className="w-72 object-cover h-full"
        unoptimized={true}
      />
    </div>
  );
}

export default CategoryCard;
