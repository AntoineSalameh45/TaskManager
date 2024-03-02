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
    }}>
      {loading ? (
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
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
                    className="border-2 border-[#40E0D0] bg-[#afeeee69] hover:shadow-lg"
                >
                  <h3 className='text-lg font-semibold'>
                    {task.title}
                  </h3>
                  <p className='text-base font-extralight max-h-[100px] overflow-x-auto'>
                    {task.description}
                  </p>
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
              ))}
            </>
          )}
        </>
      )}
    </Box>
  );
};

export default TaskPanel;
