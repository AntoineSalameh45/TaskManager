import React from 'react';
import { Box, CircularProgress } from '@mui/material';
import NoTasksAlert from './notaskalert';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

interface TaskPanelProps {
  loading: boolean;
  tasks: Task[];
  handleDeleteTask: (taskId: string) => void;
  handleToggleCompletion: (taskId: string) => void;
}

interface Task {
  id: string;
  title: string;
  description: string;
  completed: boolean;
}

const TaskPanel: React.FC<TaskPanelProps> = ({ loading, tasks, handleDeleteTask, handleToggleCompletion }) => {
  return (
    <Box sx={{ 
      '& > div': { 
        marginTop: '10px',
        padding: '10px', 
        width: '300px', 
        height: '200px',
      }, 
      display: 'flex', 
      flexWrap: 'wrap', 
      gap: '10px', 
      justifyContent: 'center',
      alignItems: 'center',
      '@media (max-width: 1244px)': {
        '& > div': { 
            width: '250px',
            height: '150px',
        },
      },
      '@media (max-width: 749px)': {
        '& > div': { 
            width: '200px',
            height: '150px',
        },
      },
    }}
    >
      {loading ? (
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-25%, -25%)',
          }}
        >
          <CircularProgress
            style={{
              color: '#40E0D0',
            }}
          />
        </Box>
      ) : (
        <>
          {tasks.length === 0 ? (
            <Box sx={{ textAlign: 'center' }}>
              <NoTasksAlert 
                text='No Tasks!'
              />
            </Box>
          ) : (
            <>
              {tasks.map((task: Task) => (
                <div 
                    key={task.id} 
                    className="border-2 border-[#40E0D0] bg-[#afeeee69] hover:shadow-[3px_5px_10px_5px_rgba(0,0,0,0.3)] flex flex-col"
                >
                    <h3 className='text-lg font-semibold'>
                        {task.title}
                    </h3>
                    <p className='text-base font-extralight max-h-[100px] overflow-x-auto'>
                        {task.description}
                    </p>
                    <div className='mt-auto flex justify-around'>
                        <label className="checkbox-container">
                            <input
                                type="checkbox"
                                checked={task.completed}
                                onChange={() => handleToggleCompletion(task.id)}
                                className="checkbox-input"
                            />
                            <span className="checkmark"></span>
                            <span className="checkbox-label">Completed</span>
                        </label>
                        <button
                            type="button"
                            onClick={() => handleDeleteTask(task.id)}
                            className='delete-button'
                        >
                            <DeleteForeverIcon />
                        </button>
                    </div>
                </div>
              ))}
            </>
          )}
        </>
      )}
    </Box>
  );
};

export default TaskPanel;
