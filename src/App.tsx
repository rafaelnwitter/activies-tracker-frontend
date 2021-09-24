import React, { useEffect, useState } from 'react';
import './App.css';
import { TaskAPI } from './task-api/task.api';
import { TaskDTO } from './task-api/dto/task.dto';
import { AppBar, Button, Grid, IconButton, Toolbar, Typography } from '@mui/material';
import Task from './components/Task';
// import CreateTaskModal from './components/CreateTaskModal';

function App() {
  const [tasks, setTasks] = useState<TaskDTO[]>([]);
//  const [creteModalOpen, setCreateModalOpen] = useState(false);
//  const [createTaskModalOpen, setCreateTaskModalOpen] = useState(false);

  useEffect(() => {
    async function fetchAll() {
      const resp = await TaskAPI.findAll();

      setTasks(resp);
    }

    fetchAll();
  }, [])

// <CreateTaskModal open={createTaskModalOpen} handleClose={() => setCreateTaskModalOpen(false)} />

  return (
    <div className="App">
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Dashboard Tasks
          </Typography>
          <Button variant="contained" color="primary">Create Task</Button>
        </Toolbar>
      </AppBar>
      
      <Grid container spacing={1} style={{ padding: 10 }}>
      {tasks.map(task => {
          return (
          <Grid item xs={3} key={task.id}>
            <Task data={task} />
          </Grid>);
         })}
      </Grid>
      
    </div>
  );
}

export default App;
