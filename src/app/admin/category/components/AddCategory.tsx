"use client";
import { useState } from "react";
import { createCategory } from "@/app/services/category/postCategory";

export default function AddCategory({ onSuccess }: { onSuccess: () => void }) {
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSave() {
    if (!name.trim()) {
      alert("Nome obrigatório");
      return;
    }

    try {
      setLoading(true);
      await createCategory(name);
      setName("");
      onSuccess();
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <h2 className="font-bold mb-3 text-black">Adicionar Categoria</h2>

      <input
        className="w-full border p-2 rounded mb-3 text-black"
        placeholder="Nome da categoria"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <div className="flex justify-end">
        <button
          onClick={handleSave}
          disabled={loading}
          className="bg-green-500 text-white px-4 py-2 rounded cursor-pointer hover:scale-110 hover:bg-green-600 transition duration-200"
        >
          Guardar
        </button>
      </div>
    </div>
  );
}
