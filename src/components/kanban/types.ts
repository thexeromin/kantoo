export interface Task {
  id: number;
  title: string;
  description: string;
}

export interface Items {
  [key: string]: Task[];
}
