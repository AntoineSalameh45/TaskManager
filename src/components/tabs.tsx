import React, { useState, useEffect } from 'react';
import '../App.css';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import TaskForm, { Task } from './taskform';
import TabPanel from './tabpanel';
import { loadActiveTasksFromLocalStorage, loadCompletedTasksFromLocalStorage, saveActiveTasksToLocalStorage, saveCompletedTasksToLocalStorage } from '../utils/localStorage';
import TaskPanel from './taskpanel';

const VerticalTabs: React.FC = () => {
  const [value, setValue] = useState<number>(0);
  const [activeTasks, setActiveTasks] = useState<Task[]>([]);
  const [completedTasks, setCompletedTasks] = useState<Task[]>([]);
  const [activeLoading, setActiveLoading] = useState<boolean>(true);
  const [completedLoading, setCompletedLoading] = useState<boolean>(false); 

  const fetchData = () => {
    setActiveLoading(true);
    const activeTasksData = loadActiveTasksFromLocalStorage();
    setActiveTasks(activeTasksData);
    setActiveLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
    if (newValue === 1) {
      setCompletedLoading(true);
      setTimeout(() => {
        const completedTasksData = loadCompletedTasksFromLocalStorage();
        setCompletedTasks(completedTasksData);
        setCompletedLoading(false);
      }, 1000);
    } else {
      setActiveLoading(true);
      setTimeout(() => {
        const activeTasksData = loadActiveTasksFromLocalStorage();
        setActiveTasks(activeTasksData);
        setActiveLoading(false);
      }, 1000);
    }
  };

  const handleAddTask = (newTask: Task) => {
    const updatedActiveTasks = [...activeTasks, newTask];
    setActiveTasks(updatedActiveTasks);
    saveActiveTasksToLocalStorage(updatedActiveTasks);
  };

  const handleDeleteTask = (taskId: string) => {
    const updatedActiveTasks = activeTasks.filter((task: Task) => task.id !== taskId);
    setActiveTasks(updatedActiveTasks);

    const updatedCompletedTasks = completedTasks.filter((task: Task) => task.id !== taskId);
    setCompletedTasks(updatedCompletedTasks);

    saveActiveTasksToLocalStorage(updatedActiveTasks);
    saveCompletedTasksToLocalStorage(updatedCompletedTasks);
  };

  const handleToggleCompletion = (taskId: string) => {
    const taskIndex = activeTasks.findIndex((task) => task.id === taskId);
    const completedTaskIndex = completedTasks.findIndex((task) => task.id === taskId);
  
    if (taskIndex !== -1) {
      const updatedActiveTasks = [...activeTasks];
      const taskToToggle = updatedActiveTasks.splice(taskIndex, 1)[0];
      const updatedTask = { ...taskToToggle, completed: !taskToToggle.completed };
      setCompletedTasks([...completedTasks, updatedTask]);
      setActiveTasks(updatedActiveTasks);
  
      // Update local storage
      saveActiveTasksToLocalStorage(updatedActiveTasks);
      saveCompletedTasksToLocalStorage([...completedTasks, updatedTask]);
    } else if (completedTaskIndex !== -1) {
      const updatedCompletedTasks = [...completedTasks];
      const taskToToggle = updatedCompletedTasks.splice(completedTaskIndex, 1)[0];
      const updatedTask = { ...taskToToggle, completed: !taskToToggle.completed };
      setCompletedTasks(updatedCompletedTasks);
      setActiveTasks([...activeTasks, updatedTask]);
  
      // Update local storage
      saveCompletedTasksToLocalStorage(updatedCompletedTasks);
      saveActiveTasksToLocalStorage([...activeTasks, updatedTask]);
    }
  };
  

  return (
    <Box
      sx={{
        bgcolor: 'background.paper',
        display: 'flex',
        height: '75vh',
        minWidth: '85vw',
        justifyContent: 'centered',
        borderRadius: '7px',
        border: 2,
        borderColor: '#40E0D0',
        mx: 10,
        mt: 5,
        boxShadow: '5px 5px 10px 5px rgba(0, 0, 0, 0.4) ',
      }}
    >
      <Tabs
        orientation="vertical"
        value={value}
        onChange={handleChange}
        aria-label="Vertical tabs example"
        sx={{
          bgcolor: '#AFEEEE',
          borderRadius: '5px 0 0 5px',
          '& .Mui-selected': {
            bgcolor: '#40E0D0',
            color: '#fff !important',
          },
        }}
      >
        <Tab label="Active Tasks" />
        <Tab label="Completed" />
      </Tabs>
      <Box
        sx={{
          overflowX: 'auto',
          width: '100%',
          display: 'flex',
          flexDirection: 'row',
          flexWrap: 'wrap',
          justifyContent: 'flex-center',
          alignItems: 'flex-start',
          position: 'relative',
        }}
      >
        <TabPanel value={value} index={0}>
          <TaskForm 
            addTask={handleAddTask}
          />
          <TaskPanel
            loading={activeLoading}
            tasks={activeTasks}
            handleDeleteTask={handleDeleteTask}
            handleToggleCompletion={handleToggleCompletion}
          />
        </TabPanel>
        <TabPanel value={value} index={1}>
          <TaskPanel
            loading={completedLoading}
            tasks={completedTasks}
            handleDeleteTask={handleDeleteTask}
            handleToggleCompletion={handleToggleCompletion}
          />
        </TabPanel>

      </Box>
    </Box>
  );
};

export default VerticalTabs;