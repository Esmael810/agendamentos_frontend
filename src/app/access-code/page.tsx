"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";

interface IdentifyCollaboratorResponse{

  CollaboratorId?: number;
  CollaboratorName?: string;
} 

export default function AccessCode() {

  const [code, setCode] = useState("");
  const[loading, setLoading] = useState(false)
  const router = useRouter();

  async function handleApply() {
    
    //console.log("Código enviado ao NextAuth:", code);
    const result = await signIn("credentials", {
      redirect: false,
      code,
    });

    if (result?.ok) {
      router.push("/calendar");
    }
    else {
      alert("Codigo Invalido, tente novamente");
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center font-sans bg-blue-600">
      <div className="w-full max-w-md rounded-3xl bg-white p-6 shadow-md mb-20 text-black">
        <h1 className="mb-4 text-xl font-bold text-center">Sistema de Gestão de Turnos</h1>
        <h4 className="mb-1 text-xl font-semibold ">Código de Acesso</h4>
        <p className="mb-1 text-xs ">Por Favor, insira seu código de acesso.</p>
        <input
           maxLength={8}
           value={code}
           onChange={(e) => setCode(e.target.value.toUpperCase().trim())}
          type="text"
          placeholder="Digite o seu código de acesso"
          className=" w-full rounded border border-zinc-300 p-2 dark:border-zinc-600 text-xs"  
        />
        <button onClick={handleApply} className="mt-4 w-full rounded- bg-blue-500 p-2 text-white font-bold hover:bg-blue-600">
          Aplicar
        </button>
      </div>
    </div>
  );
}
