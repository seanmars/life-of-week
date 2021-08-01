import './App.css';
import { Life } from './components/Life';

function App() {
  return (
    <div className="container">
      <Life birthYear={1985} />
    </div>
  );
}

export default App;