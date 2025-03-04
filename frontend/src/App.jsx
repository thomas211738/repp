import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home.jsx';
import Experiments from './pages/Experiments.jsx';
import Error from './pages/Error.jsx';

import Footer from './components/footer.jsx';
import Header from './components/header.jsx';

import Repp from './pages/Experiments/Experiment1/Repp.jsx'
import Experiment2 from './pages/Experiments/Experiment2/Experiment2.jsx';

function App() {
  return (
    <div className="flex flex-col min-h-screen">
      <Router>
        <Header />
        <div className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/experiments" element={<Experiments />}/>
            <Route path="experiments/repp" element={<Repp />} />
            <Route path="experiments/experiment2" element={<Experiment2 />} />
            <Route path="*" element={<Error />} />
          </Routes>
        </div>
        <Footer className="mt-auto" />
      </Router>
    </div>
  );
}

export default App;
