"use client";

import SearchIcon from "@/components/icons/SearchIcon";
import { useSearch } from "@/store/store";

function SearchProduct() {
  const { setTerm, term } = useSearch();
  return (
    <div className="py-1 px-1 flex text-xs items-center bg-white border rounded-md border-slate-200">
      <input
        value={term}
        onChange={(e) =>
          setTerm({
            term: e.target.value,
          })
        }
        type="text"
        placeholder="Quick search by name"
        className="p-1 bg-transparent outline-none"
      />
      <SearchIcon />
    </div>
  );
}

export default SearchProduct;
