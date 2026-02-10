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
  const handleDelete = (id: number) => {
    if (!confirm("Tem certeza que deseja deletar este colaborador?")) return;

    deleteCollaborator(id)
      .then(() => {
        alert("Colaborador deletado com sucesso");
        onDelete(id);
      })
      .catch(() => alert("Erro ao deletar colaborador"));
  };
  const router = useRouter();

  if (collaborators.length === 0) {
    return <p className="text-gray-500">Nenhum colaborador encontrado.</p>;
  }
  return (
    <div className="overflow-x-auto bg-white rounded shadow">
      <table className="w-full text-black">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-2 text-left">Nome</th>
            <th className="p-2 text-left">Email</th>
            <th className="p-2 text-left">Contato</th>
            <th className="p-2 text-left">NIF</th>
            <th className="p-2 text-left">Município</th>
            <th className="p-2 text-left">Ilha</th>
            <th className="p-2 text-left">Categoria</th>
            <th className="p-2 text-left">Ações</th>
          </tr>
        </thead>

        <tbody>
          {collaborators.map((collaborator) => (
            <tr key={collaborator.id} className="border-t">
              <td className="p-2">{collaborator.name}</td>
              <td className="p-2">{collaborator.email}</td>
              <td className="p-2">{collaborator.contact}</td>
              <td className="p-2">{collaborator.nif}</td>
              <td className="p-2">{collaborator.municipality}</td>
              <td className="p-2">{collaborator.island}</td>
              <td className="p-2">{collaborator.category}</td>

              <td className="p-2">
                <div className="flex gap-2">
                  <button
                    className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 cursor-pointer"
                    onClick={() =>
                      router.push(
                        `/admin/collaborators/edit/${collaborator.id}`,
                      )
                    }
                  >
                    Editar
                  </button>

                  <button
                    className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700 cursor-pointer"
                    onClick={() => handleDelete(collaborator.id)}
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
