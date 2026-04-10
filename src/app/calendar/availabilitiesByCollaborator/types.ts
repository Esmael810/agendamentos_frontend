export interface CollaboratorAvailability {
  id: number;
  collaboratorId: number;
  collaboratorName: string;
  categoryId: number;
  categoryName: string;
  date: string;
  startTime: string;
  endTime: string;
  isAvailability: boolean;
  status: string;
  description: string;
}
