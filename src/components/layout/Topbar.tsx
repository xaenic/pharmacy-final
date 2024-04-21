import Image from "next/image";
import SearchIcon from "../icons/SearchIcon";
function Topbar({ title }: { title: string }) {
  return (
    <div className="flex justify-between items-center border-b border-gray-300 pb-3">
      <h2 className="text-2xl font-semibold">{title}</h2>
      <div className="flex items-center gap-3">
        <div className="bg-white rounded-md flex items-center pr-2">
          <input
            className="bg-transparent p-2 pr-0"
            type="text"
            placeholder="Search user..."
          />
          <SearchIcon />
        </div>
        <div>
          <Image
            width={32}
            height={32}
            src={`https://i.pinimg.com/280x280_RS/5c/a0/11/5ca01165fbff968cbb8f75eac624b42e.jpg`}
            alt="Avatar"
            unoptimized={true}
            className="rounded-full"
          />
        </div>
      </div>
    </div>
  );
}

export default Topbar;
