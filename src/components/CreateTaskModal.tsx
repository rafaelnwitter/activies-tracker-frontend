import { Box, makeStyles, Modal, TextField } from '@mui/material';
import React from 'react';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { TaskAPI } from '../task-api/task.api';
import { TaskDTO } from '../task-api/dto/task.dto';

interface props {
    open: boolean;
    handleClose: () => void;
    onTaskCreated: (task: TaskDTO) => void;
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

const CreateTaskModal = (props: props) => {
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
    const createTask = async () => {
        const resp = await TaskAPI.createOne({
            title,
            description,
        });
        props.onTaskCreated(resp);
        console.log("New task: ", resp)
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
                    Create New Task
                </Typography>
                <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                    Create a new work
                </Typography>
                <TextField placeholder="Title" variant="filled" fullWidth onChange={(e) => setTitle(e.target.value)} />
                <TextField placeholder="Description" variant="filled" fullWidth onChange={(e) => setDescription(e.target.value)} />
                <Button color="primary" variant="contained" onClick={createTask}>Create New Task</Button>
            </Box>
            </Modal>
        </div>
    );
}

export default CreateTaskModal;
