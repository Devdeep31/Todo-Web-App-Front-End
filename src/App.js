import './App.css';
import Navbar from './components/Navbar';
import Notes from './components/Notes';

function App() {
  return (
    <>
    <div className='dark:bg-gray-800'>
      <Navbar />
     
      <Notes/>
      </div>
    </>
  );
}

export default App;
