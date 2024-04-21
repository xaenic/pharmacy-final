"use client";
import { getCategories } from "@/lib/db/db";
import { useEffect, useState } from "react";
function CategoryOptions() {
  const [options, setOptions] = useState<any>([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const ok = await getCategories();
        setOptions(ok.rows);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);
  return (
    <>
      {!loading
        ? options?.map((e: any, i: number) => (
            <option value={e.category_id} key={i}>
              {e.category_name}
            </option>
          ))
        : null}
    </>
  );
}

export default CategoryOptions;
