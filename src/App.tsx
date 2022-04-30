import './App.scss';
import Planner1 from './components/planner1/Planner1';
import Planner2 from './components/planner2/Planner2';
import Planner3 from './components/planner3/Planner3';
import Planner4 from './components/planner4/Planner4';

const App = () => (
  <div className="App">
    <h2>Todos</h2>
    <br />
    <Planner1 />
    <br />
    <Planner2 />
    <br />
    <Planner3 />
    <br />
    <Planner4 />
    <br />
  </div>
);

export default App;
