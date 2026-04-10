"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { signIn, useSession } from "next-auth/react";
import { changeIdentificationCode } from "../services/collaborators/changeIdentificationCode";

export default function AccessCode() {
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [showChangeCode, setShowChangeCode] = useState(false);
  const [collaboratorId, setCollaboratorId] = useState<number | null>(null);
  const [newCode, setNewCode] = useState("");
  const [confirmCode, setConfirmCode] = useState("");
  const [changing, setChanging] = useState(false);
  const router = useRouter();

  async function handleApply() {
    setLoading(true);
    const result = await signIn("credentials", {
      redirect: false,
      code,
    });
    setLoading(false);

    if (result?.ok) {
      const res = await fetch("/api/auth/session");
      const session = await res.json();

      if (session?.user?.isFirstLogin) {
        setCollaboratorId(session.user.id);
        setShowChangeCode(true);
      } else {
        router.push("/calendar");
      }
    } else {
      alert("Codigo Invalido, tente novamente");
      setCode("");
    }
  }

  async function handleChangeCode() {
    if (!newCode || newCode.length !== 8) {
      alert("O novo código deve ter 8 caracteres");
      return;
    }
    if (newCode !== confirmCode) {
      alert("Codigos diferentes, Tenta novamente!");
      setConfirmCode("");
      return;
    }
    if (!collaboratorId) return;

    setChanging(true);
    try {
      await changeIdentificationCode(collaboratorId, newCode);
      alert("Código alterado com sucesso!");
      router.push("/calendar");
    } catch (err: any) {
      alert(err.message || "Erro ao alterar código");
    } finally {
      setChanging(false);
    }
  }

  if (showChangeCode) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-linear-to-l from-blue-900 to-blue-700">
        <div className="w-full max-w-md rounded-3xl bg-white p-6 shadow-md text-black">
          <h1 className="text-xl font-bold text-center mb-2">Código Aceite</h1>
          <p className="text-sm text-gray-500 text-center mb-6">
            Queres alterar o teu código de acesso?
          </p>

          <input
            maxLength={8}
            value={newCode}
            onChange={(e) => setNewCode(e.target.value.toUpperCase().trim())}
            type="password"
            placeholder=" Inserir novo código (8 caracteres)"
            className="w-full rounded border border-zinc-300 p-2 text-xs mb-3"
          />

          <input
            maxLength={8}
            value={confirmCode}
            onChange={(e) =>
              setConfirmCode(e.target.value.toUpperCase().trim())
            }
            type="password"
            placeholder="Confirmar novo código"
            className={`w-full rounded border p-2 text-xs mb-3 ${
              confirmCode && confirmCode !== newCode
                ? "border-red-400 focus:ring-red-400"
                : "border-zinc-300"
            }`}
          />

          

          <button
            onClick={handleChangeCode}
            disabled={changing}
            className="w-full rounded bg-blue-700 p-2 text-white font-bold hover:bg-blue-800 cursor-pointer mb-2 disabled:opacity-60"
          >
            {changing ? "Alterando..." : "Alterar Código"}
          </button>

          <button
            onClick={() => router.push("/calendar")}
            className="w-full rounded border border-gray-300 p-2 text-gray-600 font-bold hover:bg-gray-50 cursor-pointer"
          >
            Ignorar e Entrar
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen items-center justify-center font-sans bg-linear-to-l from-blue-900 to-blue-700">
      <div className="w-full max-w-md rounded-3xl bg-white p-6 shadow-md mb-20 text-black">
        <h1 className="mb-4 text-xl font-bold text-center">
          Sistema de Gestão de Turnos
        </h1>
        <h4 className="mb-1 text-xl font-semibold">Código de Acesso</h4>
        <input
          maxLength={8}
          value={code}
          onChange={(e) => setCode(e.target.value.toUpperCase().trim())}
          type="password"
          placeholder="Digite o seu código de acesso"
          className="w-full rounded border border-zinc-300 p-2 text-xs"
        />
        <button
          onClick={handleApply}
          disabled={loading}
          className="mt-4 w-full rounded bg-blue-700 p-2 text-white font-bold hover:bg-blue-800 cursor-pointer disabled:opacity-60"
        >
          {loading ? "A verificar..." : "Aplicar"}
        </button>
      </div>
    </div>
  );
}
