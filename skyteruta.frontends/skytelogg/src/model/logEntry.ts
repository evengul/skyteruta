export interface LogEntry {
  id: string;
  owner: string;
  title: string;
  createdAt: number;
  performedAt: number | null;
  plan: string | null;
  content: string;
}
