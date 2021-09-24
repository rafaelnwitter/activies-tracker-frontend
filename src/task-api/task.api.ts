import { TaskDTO } from "./dto/task.dto";
import { CreateTaskDTO } from "./dto/create-task.dto";

export class TaskAPI {
    public static async findAll(): Promise<TaskDTO[]> {
        const resp = await fetch('http://localhost:3000/tasks', {
            method: "GET"
        })

        const data = await resp.json();

        return data;
    }

    public static async createOne(createRequest: CreateTaskDTO): Promise<TaskDTO> {
        const resp = await fetch('http://localhost:3000/tasks', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(createRequest),
        })

        const data = await resp.json();

        return data;
    }

    public static async deleteOne(taskId: number) {
        const resp = await fetch(`http://localhost:3000/tasks/${taskId}`, {
            method: "DELETE",
        })
    }

}