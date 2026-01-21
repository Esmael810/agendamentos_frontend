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
    <div className="overflow-x-auto">
      <table className="w-full border border-gray-200 rounded">
        <thead>
          <tr>
            <th className="border px-4 py-2 text-left">Nome</th>
            <th className="border px-4 py-2 text-left">Email</th>
            <th className="border px-4 py-2 text-left">Contato</th>
            <th className="border px-4 py-2 text-left">Nif</th>
            <th className="border px-4 py-2 text-left">Municipio</th>
            <th className="border px-4 py-2 text-left">Ilha</th>
            <th className="border px-4 py-2 text-left">Categoria</th>
          </tr>
        </thead>

        <tbody>
          {collaborators.map((collaborator) => (
            <tr key={collaborator.id} className="hover:bg-blue-500">
              <td className="border px-4 py-2">{collaborator.name}</td>

              <td className=" border px-4 py-2">{collaborator.email}</td>

              <td className="border px-4 py-2">{collaborator.contact}</td>

              <td className="border px-4 py-2">{collaborator.nif}</td>

              <td className="border px-4 py-2">{collaborator.municipality}</td>

              <td className="border px-4 py-2">{collaborator.island}</td>

              <td className="border px-4 py-2">{collaborator.category}</td>

              <td className="border px-4 py text-right  ">
                <button className="text-blue-900 hover: underline mr-3 cursor-pointer"
                  onClick={() =>
                    router.push(`/admin/collaborators/edit/${collaborator.id}`)
                  }
                >
                  Editar
                </button>

                <button
                  className="text-red-600 hover: underline mr-3 cursor-pointer"
                  onClick={() => handleDelete(collaborator.id)}
                >
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
