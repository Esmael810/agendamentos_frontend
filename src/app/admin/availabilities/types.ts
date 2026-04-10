export interface Availability {
  id: number;
  collaboratorId: number;
  collaboratorName: string;
  categoryId: number;
  categoryName: string;
  date: string;
  startTime: string;
  endTime: string;
  //status: "PENDENTE" | "CONFIRMADA" | "CANCELADA";
  status: "PENDENTE" | "CONFIRMADO" | "CANCELADO";
  description: string;
}

export interface CategoryGroup {
  categoryId: number;
  categoryName: string;
  availabilities: Availability[];
}
