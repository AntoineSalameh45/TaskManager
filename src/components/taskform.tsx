// This component renders a form for adding new tasks to the task manager.

// Props
// - addTask: (newTask: Task) => void - A function to add a new task to the task manager.

// State
// - title: string - Represents the title of the new task.
// - description: string - Represents the description of the new task.

// Methods
// - handleSubmit(e: React.FormEvent): void - Handles the form submission event and adds the new task to the task manager.
// - isFormValid: boolean - Computes whether the form inputs are valid (both title and description are non-empty).




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
    <div className='w-[55vw] lg:w-[75vw] sm:w-[55vw]'>
      <form onSubmit={handleSubmit} className="flex items-center mb-4 justify-center flex-col md:flex-row ">
        <TextField
          label="Task title"
          variant="outlined"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          sx={{
            mr: 2,
            mt: 3,
            '& .MuiFormLabel-root': {
              color: '#00000069',
            },
            '& .MuiOutlinedInput-notchedOutline': {
              borderColor: '#AFEEEE',
              borderWidth: '2px',
            },
            '&:hover .MuiOutlinedInput-notchedOutline': {
              borderColor: '#40E0D0 !important',
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
              color: '#00000069',
            },
            '& .MuiOutlinedInput-notchedOutline': {
              borderColor: '#AFEEEE',
              borderWidth: '2px',
            },
            '&:hover .MuiOutlinedInput-notchedOutline': {
              borderColor: '#40E0D0 !important',
            },
          }}
        />
        <Button
          type="submit"
          variant="contained"
          disabled={!isFormValid}
          style={{
            backgroundColor: isFormValid ? '#40E0D0' : '#AFEEEE',
            color: '#fff',
            cursor: isFormValid ? 'pointer' : 'not-allowed', 
            opacity: isFormValid ? 1 : 0.65, 
            borderRadius: '5px',
            outline: 'none',
            marginTop: '25px',
          }}
        >
          Add Task
        </Button>
      </form>
    </div>
  );
};

export default TaskForm;
