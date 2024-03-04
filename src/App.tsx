import './App.css';
import VerticalTabs from './components/tabs';

function App() {

  return (
    <>
      <div>
        <h1 className="text-3xl font-bold text-center">
          Welcome to your friendly neighborhood&nbsp;
          <span className='text-[#40E0D0] underline underline-offset-8 decoration-wavy'>TaskManager</span>!
        </h1>
        <VerticalTabs />
      </div>
    </>
  )
}

export default App
