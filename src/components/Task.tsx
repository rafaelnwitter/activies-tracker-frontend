import React from 'react';
import { TaskDTO, TaskStatus } from "../task-api/dto/task.dto";
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Chip, Container } from '@mui/material';
import { TaskAPI } from '../task-api/task.api';

interface Props {
    data: TaskDTO;
    onTaskDelete: (taskId: number) => void;
    onTaskUpdate: (task: TaskDTO) => void;

}

const Task = ({ data, onTaskDelete, onTaskUpdate }: Props) => {
    const deleteTask = async () => {
        await TaskAPI.deleteOne(data.id);
        // onTaskDelete(data.id);
    };

    const getTaskStatusToString = (status: TaskStatus) => {
        let text: string;

        switch(status){
            case TaskStatus.Created:
                text = "Created";
                break;
            case TaskStatus.InProgress:
                text = "In Progress";
                break;
            case TaskStatus.Done:
                text = "Done";
                break;
            default:
                text = "";
        }
        return text
    }
    return (
        <Card variant="outlined">
            <CardContent>
                <Typography
                  color="textSecondary"
                  gutterBottom
                >
                    {data.title}
                </Typography>
                <Typography
                  variant="body2" component="p">
                    {data.description}
                </Typography>
                <Chip label={getTaskStatusToString(data.status)} />
            </CardContent>
            <CardActions>
                <Container>
                    <Button 
                        style={{ marginLeft: 5 }}
                        size="small" 
                        variant="contained"
                        color="primary"
                        onClick={() => onTaskUpdate(data)}
                        >
                            Edit
                    </Button>
                    <Button 
                        style={{ marginLeft: 5 }}
                        size="small" 
                        variant="contained" 
                        color="secondary"
                        onClick={deleteTask}>
                            Delete
                    </Button>
                </Container>
            </CardActions>
        </Card>
    );
}

export default Task
