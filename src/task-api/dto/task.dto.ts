export enum TaskType {
    Development = 0,
    Support = 1,
}
  
  export enum TaskStatus {
    Created = 0,
    InProgress = 1,
    Done = 2,
}

export interface TaskDTO {
    id: number;
    title: string;
    description: string;
    type: TaskType;
    status: TaskStatus;
}
  