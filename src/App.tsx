import React, { useEffect, useState } from 'react';
import './App.css';
import { TaskAPI } from './task-api/task.api';
import { TaskDTO } from './task-api/dto/task.dto';
import { AppBar, Button, Grid, IconButton, Toolbar, Typography } from '@mui/material';
import Task from './components/Task';
import CreateTaskModal from './components/CreateTaskModal';
import EditTaskModal from './components/EditTaskModal';


function App() {
  const [tasks, setTasks] = useState<TaskDTO[]>([]);
  const [createTaskModalOpen, setCreateTaskModalOpen] = useState(false);
  const [updateTaskModalOpen, setUpdateTaskModalOpen] = useState(false);
  const [taskBeingEdited, setTaskBeingEdited] = useState<undefined | TaskDTO>(undefined)

  const addTask = (task: TaskDTO) => {
    setTasks([...tasks, task])
  }

  const deleteTask = (taskId: number) => {
    setTasks(tasks.filter((x) => x.id !== taskId));
  }

  const updateTask = (task: TaskDTO) => {
    setTasks(
      tasks.map(x => {
        if(x.id === task.id) return task;
        return x;
      })
    );
  }

  const onTaskEdotBtnClicked = (task: TaskDTO) => {

  }

  useEffect(() => {
    async function fetchAll() {
      const resp = await TaskAPI.findAll();

      setTasks(resp);
    }

    fetchAll();
  }, [])

  return (
    <div className="App">
      <CreateTaskModal 
        open={createTaskModalOpen} 
        handleClose={() => setCreateTaskModalOpen(false)} 
        onTaskCreated={addTask}
      />
      <EditTaskModal 
        data={taskBeingEdited}
        open={updateTaskModalOpen} 
        handleClose={() => setUpdateTaskModalOpen(false)} 
        onTaskUpdate={updateTask}
      />
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Dashboard Tasks
          </Typography>
          <Button
            variant="contained" 
            color="primary" 
            onClick={() => setCreateTaskModalOpen(true)}>Create Task</Button>
        </Toolbar>
      </AppBar>
      
      <Grid container spacing={1} style={{ padding: 10 }}>
      {tasks.map(task => {
          return (
          <Grid item xs={3} key={task.id}>
            <Task data={task} onTaskDelete={deleteTask} onTaskUpdate={(task: TaskDTO) => {
              setTaskBeingEdited(task);
              setUpdateTaskModalOpen(true);
            }}/>
          </Grid>);
         })}
      </Grid>
      
    </div>
  );
}

export default App;
