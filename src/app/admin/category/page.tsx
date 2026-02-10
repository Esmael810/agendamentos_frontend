"use client";
import { useEffect, useState } from "react";
import AddCategory from "./components/AddCategory";
import UpdateCategory from "./components/updateCategory";
import DeleteCategory from "./components/deleteCategory";
import { getCategories } from "@/app/services/category/categoryService";

export default function CategoryPage() {
  const [categories, setCategories] = useState<any[]>([]);

  async function load() {
    const data = await getCategories();
    setCategories(data);
  }

  useEffect(() => {
    load();
  }, []);

  return (
    <div className="flex items-center justify-center min-h-full ">
      <div className="w-full max-w-md bg-white p-6 rounded shadow space-y-8">
        <AddCategory onSuccess={load} />
        <hr />
        <UpdateCategory categories={categories} onSuccess={load} />
        <hr />
        <DeleteCategory categories={categories} onSuccess={load} />
      </div>
    </div>
  );
}
