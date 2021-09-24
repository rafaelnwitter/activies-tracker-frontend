import { Box, makeStyles, MenuItem, Modal, Select, TextField } from '@mui/material';
import React, { useEffect } from 'react';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { TaskAPI } from '../task-api/task.api';
import { TaskDTO, TaskStatus, TaskType } from '../task-api/dto/task.dto';
import Task from './Task';

interface Props {
    open: boolean;
    handleClose: () => void;
    onTaskUpdate: (task: TaskDTO) => void;
    data: TaskDTO | undefined;
}

function getModalStyle() {
    const top = 25;
    const left = 50;

    return {
        top: `${top}%`,
        left: `${left}%`,
        transform: `translate(-${top}%, -${left}%)`,
    };
}

const EditTaskModal = (props: Props) => {
    const style = {
        position: 'absolute' as 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
      };      
    const [modalStyle] = React.useState(getModalStyle);
    const [open, setOpen] = React.useState(false);
    const classes = style;

    // This create a hook to new tasks
    const [title, setTitle] = React.useState('');
    const [description, setDescription] = React.useState<undefined | string>(undefined);
    const [type, setType] = React.useState(TaskType.Development);
    const [status, setStatus] = React.useState(TaskStatus.Created);

    useEffect(() => {
        if(props.data){
            setTitle(props.data.title);
            setDescription(props.data.description)
            setType(props.data.type)
            setStatus(props.data.status)
        }
    }, [props.data])

    const updateTask = async () => {
        if(props.data){
            const resp = await TaskAPI.updateOne(props.data.id, {
                title,
                description,
                type,
                status,
            });
            // props.onTaskUpdate(resp);
            console.log("New task: ", resp)
        }
    }

    return (
        <div>
            <Modal
            open={props.open}
            onClose={props.handleClose}
            arial-labelledby="simple-modal-title"
            aria-describeby="simple-modal-description"
            >
            <Box sx={style}>
                <Typography id="modal-modal-title" variant="h6" component="h2">
                    Update Task
                </Typography>
                <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                   Update your work
                </Typography>
                <TextField 
                    placeholder="Title" 
                    variant="filled" 
                    fullWidth 
                    onChange={(e) => setTitle(e.target.value)} 
                    value={title}
                />
                <TextField 
                    placeholder="Description" 
                    variant="filled" 
                    fullWidth 
                    onChange={(e) => setDescription(e.target.value)}
                    value={description}
                />
                <Select
                    value={status}
                    onChange={(e) => setStatus(e.target.value as TaskStatus)}
                    fullWidth
                >
                    <MenuItem value={TaskStatus.Created}>Created</MenuItem>
                    <MenuItem value={TaskStatus.InProgress}>In Progress</MenuItem>
                    <MenuItem value={TaskStatus.Done}>Done</MenuItem>
                </Select>
                <Button color="primary" variant="contained" onClick={updateTask}>Edit Task</Button>
            </Box>
            </Modal>
        </div>
    );
}

export default EditTaskModal;
