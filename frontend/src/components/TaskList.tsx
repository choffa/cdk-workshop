import * as React from 'react';
import { Checkbox, Fab, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import { Add as AddIcon } from '@mui/icons-material';
import { addTask, getTasks, setStatus, Task } from '../services/taskService';
import NewTaskModal from './NewTaskModal';

const TaskList: React.FC<{}> = () => {
  const [tasks, setTasks] = React.useState<Array<Task>>([]);
  const [open, setOpen] = React.useState(false);

  React.useEffect(() => {
    const fetchTasks = async () => {
      const t = await getTasks();
      setTasks(t);
    };
    fetchTasks();
  }, []);

  const handleToggle = async (taskToUpdate: Task) => {
    const updatedTask = await setStatus(taskToUpdate.id, !taskToUpdate.done);
    const updatedTasks = tasks.map((task) => {
      if (task.id === updatedTask.id) {
        return updatedTask;
      }
      return task;
    });
    setTasks(updatedTasks);
  };

  const handleAdd = async (description: string) => {
    const newTask = await addTask(description);
    setTasks((curr) => [...curr, newTask]);
    setOpen(false);
  };

  return (
    <>
      <List>
        {tasks.map((task, idx) => {
          return (
            <ListItem key={idx} disablePadding>
              <ListItemButton onClick={() => handleToggle(task)} dense>
                <ListItemIcon>
                  <Checkbox
                    edge="start"
                    checked={task.done}
                    tabIndex={-1}
                    disableRipple
                    inputProps={{ 'aria-labelledby': task.description }}
                  />
                </ListItemIcon>
                <ListItemText id={task.description} primary={task.description} />
              </ListItemButton>
            </ListItem>
          );
        })}
      </List>
      <NewTaskModal open={open} onSubmit={handleAdd} onCancel={() => setOpen(false)} />
      <Fab
        onClick={() => setOpen(true)}
        color="primary"
        aria-label="add"
        sx={{ position: 'fixed', right: '0px', bottom: '0px', margin: '2rem' }}
      >
        <AddIcon />
      </Fab>
    </>
  );
};

export default TaskList;
