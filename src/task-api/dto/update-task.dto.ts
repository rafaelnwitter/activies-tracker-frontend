import { TaskType, TaskStatus } from "./task.dto";

export interface UpdateTaskDTO {
    title?: string;
    description?: string;
    type?: TaskType;
    status?: TaskStatus;
}