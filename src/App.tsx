import './App.scss';
import Planner1 from './components/planner1/Planner1';
import Planner2 from './components/planner2/Planner2';
import Planner3 from './components/planner3/Planner3';
import Planner4 from './components/planner4/Planner4';
import Planner5 from './components/planner5/Planner5';

const App = () => (
  <div className="App">
    <h2>Planners</h2>
    <div className="container">
      <div className="row">
        <div className="col-xs-12">
          <Planner1 />
        </div>
      </div>
      <div className="row">
        <div className="col-xs-12">
          <Planner2 />
        </div>
      </div>
      <div className="row">
        <div className="col-xs-12">
          <Planner3 />
        </div>
      </div>
      <div className="row">
        <div className="col-xs-12">
          <Planner4 />
        </div>
      </div>
      <div className="row">
        <div className="col-xs-12">
          <Planner5 />
        </div>
      </div>
    </div>
  </div>
);

export default App;
