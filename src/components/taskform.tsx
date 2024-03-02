import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

export interface Task {
  id: string;
  title: string;
  description: string;
  completed: boolean;
}

interface TaskFormProps {
  addTask: (newTask: Task) => void;
  onDeleteTask: (taskId: string) => void;
}

const TaskForm: React.FC<TaskFormProps> = ({ addTask }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Validate title and description
    if (title.trim() === '' || description.trim() === '') {
      return;
    }
    // Create a new task object
    const newTask: Task = {
      id: Math.random().toString(),
      title: title,
      description: description,
      completed: false,
    };
    addTask(newTask);
    setTitle('');
    setDescription('');
  };

  const isFormValid = title.trim() !== '' && description.trim() !== '';

  return (
    <form onSubmit={handleSubmit} className="flex items-center justify-center mt-2 w-[70vw]">
      <TextField
        label="Task title"
        variant="outlined"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        sx={{
          mr: 2,
          mt: 3,
          '& .MuiFormLabel-root': {
            color: '#AFEEEE',
          },
          '&.Mui-focused .MuiFormLabel-root': {
            color: '#40E0D0',
          },
          '& .MuiOutlinedInput-notchedOutline': {
            borderColor: '#AFEEEE',
          },
          '&:hover .MuiOutlinedInput-notchedOutline': {
            borderColor: '#40E0D0',
          },
          '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
            borderColor: '#40E0D0',
          },
        }}
      />
      <TextField
        label="Task description"
        variant="outlined"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        sx={{
          mr: 2,
          mt: 3,
          '& .MuiFormLabel-root': {
            color: '#AFEEEE',
          },
          '& .MuiOutlinedInput-notchedOutline': {
            borderColor: '#AFEEEE',
          },
          '&:hover .MuiOutlinedInput-notchedOutline': {
            borderColor: '#40E0D0',
          },
          '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
            borderColor: '#40E0D0',
          },
        }}
      />
      <Button
        type="submit"
        variant="contained"
        disabled={!isFormValid}
        style={{
          backgroundColor: isFormValid ? '#40E0D0' : '#AFEEEE', // Change color based on form validity
          color: '#fff',
          cursor: isFormValid ? 'pointer' : 'not-allowed', // Change cursor based on form validity
          opacity: isFormValid ? 1 : 0.65, // Adjust opacity based on form validity
          borderRadius: '5px',
          outline: 'none',
          marginTop: '25px',
        }}
      >
        Add Task
      </Button>
    </form>
  );
};

export default TaskForm;
