"use server";
import CategoryOptions from "./CategoryOptions";

async function SelectTag() {
  return (
    <select
      name="category"
      className="border border-gray-200 text-slate-400 text-sm p-2 rounded-md"
    >
      <option value="Java" className="text-slate-300" disabled selected hidden>
        Choose Category
      </option>
      <CategoryOptions />
    </select>
  );
}

export default SelectTag;
