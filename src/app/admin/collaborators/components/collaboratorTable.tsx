
import { useRouter } from "next/navigation";
import { Collaborator } from "../page";
import { deleteCollaborator } from "@/app/services/collaborators/deleteCollaborator";

interface CollaboratorTableProps {
  collaborators: Collaborator[];
  onDelete: (id: number) => void;
}

export default function CollaboratorTable({
  collaborators,
  onDelete,
}: CollaboratorTableProps) {
  const router = useRouter();

  const handleDelete = (id: number) => {
    if (!confirm("Tem certeza que deseja deletar este colaborador?")) return;
    deleteCollaborator(id)
      .then(() => {
        alert("Colaborador deletado com sucesso");
        onDelete(id);
      })
      .catch(() => alert("Erro ao deletar colaborador"));
  };

  if (collaborators.length === 0) {
    return (
      <div className="bg-white/95 backdrop-blur-sm rounded-xl shadow-lg shadow-blue-900/30 border border-white/20">
        <p className="text-gray-400 text-sm py-12 text-center">
          Nenhum colaborador encontrado nesta categoria.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white/95 backdrop-blur-sm rounded-xl shadow-lg shadow-black border border-white/20 overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-gray-100">
            <th className="py-3 px-4 text-left text-xs font-bold text-black uppercase tracking-wide whitespace-nowrap">Nome</th>
            <th className="py-3 px-4 text-left text-xs font-bold text-black uppercase tracking-wide whitespace-nowrap">Email</th>
            <th className="py-3 px-4 text-left text-xs font-bold text-black uppercase tracking-wide whitespace-nowrap">Contato</th>
            <th className="py-3 px-4 text-left text-xs font-bold text-black uppercase tracking-wide whitespace-nowrap">NIF</th>
            <th className="py-3 px-4 text-left text-xs font-bold text-black uppercase tracking-wide whitespace-nowrap">Município</th>
            <th className="py-3 px-4 text-left text-xs font-bold text-black uppercase tracking-wide whitespace-nowrap">Ilha</th>
            <th className="py-3 px-4 text-left text-xs font-bold text-black uppercase tracking-wide whitespace-nowrap">Ações</th>
          </tr>
        </thead>
        <tbody>
          {collaborators.map((collaborator, idx) => (
            <tr
              key={collaborator.id}
              className={`border-b border-gray-50 transition-colors hover:bg-gray-50 ${
                idx % 2 === 0 ? "bg-white" : "bg-gray-50/50"
              }`}
            >
              <td className="py-3.5 px-4 font-semibold text-gray-800 ">
                {collaborator.name}
              </td>
              <td className="py-3.5 px-4 text-gray-600 whitespace-nowrap">
                {collaborator.email}
              </td>
              <td className="py-3.5 px-4 text-gray-600 whitespace-nowrap">
                {collaborator.contact}
              </td>
              <td className="py-3.5 px-4 text-gray-600 whitespace-nowrap">
                {collaborator.nif}
              </td>
              <td className="py-3.5 px-4 text-gray-600 whitespace-nowrap">
                {collaborator.municipality}
              </td>
              <td className="py-3.5 px-4 text-gray-600 whitespace-nowrap">
                {collaborator.island}
              </td>
              <td className="py-3.5 px-4 whitespace-nowrap">
                <div className="flex gap-2">
                  <button
                    onClick={() =>
                      router.push(`/admin/collaborators/edit/${collaborator.id}`)
                    }
                    className="bg-blue-600 text-white px-4 py-1.5 rounded text-sm font-semibold hover:bg-blue-700 transition-colors cursor-pointer"
                  >
                    Atualizar
                  </button>
                  <button
                    onClick={() => handleDelete(collaborator.id)}
                    className="bg-red-500 text-white px-4 py-1.5 rounded text-sm font-semibold hover:bg-red-600 transition-colors cursor-pointer"
                  >
                    Eliminar
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}