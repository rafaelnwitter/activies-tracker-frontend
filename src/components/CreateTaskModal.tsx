import { makeStyles, Modal } from '@mui/material';
import React from 'react';

interface Props {
    open: boolean;
    handleClose: () => void;
}

function getModalStyle() {
    const top = 50;
    const left = 50;

    return {
        top: `${top}%`,
        left: `${left}%`,
        transform: `translate(-${top}%, -${left}%)`,
    };
}

const CreateTaskModal = (props: Props) => {
    const useStyles = makeStyles((theme: { palette: { background: { paper: any; }; }; shadows: any[]; spacing: (arg0: number, arg1: number, arg2: number) => any; }) => ({
        paper: {
            position: "absolute",
            width: 400,
            backgroundColor: theme.palette.background.paper,
            boxShadow: theme.shadows[5],
            padding: theme.spacing(2, 4, 3),
        },
    })); 
    const [modalStyle] = React.useState(getModalStyle);
    const [open, setOpen] = React.useState(false);
    const classes = useStyles;
    const body = (
        <div style={modalStyle} >
            <h2 id="simple-modal-title">Text in a modal</h2>
            <p id="simple-modal-description">
                Pinto pequeno não forma cu
            </p>
        </div>
    );
    return (
        <div>
            <Modal
            open={props.open}
            onClose={props.handleClose}
            arial-labelledby="simple-modal-title"
            aria-describeby="simple-modal-description">
                {body}
            </Modal>
        </div>
    );
}

export default CreateTaskModal;
