import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home.jsx';
import About from './pages/Experiment.jsx';
import Error from './pages/Error.jsx';

import Footer from './components/footer.jsx';
import Header from './components/header.jsx';

function App() {
  return (
    <div className="flex flex-col min-h-screen">
      <Router>
        <Header />
        <div className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/experiments" element={<About />} />
            <Route path="*" element={<Error />} />
          </Routes>
        </div>
        <Footer className="mt-auto" />
      </Router>
    </div>
  );
}

export default App;
