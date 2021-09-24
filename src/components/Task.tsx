import React from 'react';
import { TaskDTO } from "../task-api/dto/task.dto";
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Container } from '@mui/material';
import { TaskAPI } from '../task-api/task.api';

interface Props {
    data: TaskDTO;
    onTaskDelete: (taskId: number) => void;
}

const Task = ({ data }: Props) => {
    const deleteTask = async () => {
        await TaskAPI.deleteOne(data.id);
        // onTaskDelete(data.id);
    };
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
                <Typography
                  variant="body2" component="p">
                    {data.status}
                </Typography>
            </CardContent>
            <CardActions>
                <Container>
                    <Button style={{ marginLeft: 5 }}size="small" variant="contained" color="primary">Edit</Button>
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
