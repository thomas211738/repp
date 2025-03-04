import React, { useState } from "react";
const backendUrl = import.meta.env.VITE_BACKEND_URL;

const Repp = () => {
  // We store the user's choice in a state. Default is true (music).
  const [isMusic, setIsMusic] = useState(true);
  const [experimentStatus, setExperimentStatus] = useState(null);
  const [plotUrl, setPlotUrl] = useState("");

  // Call the Flask backend
  const startExperiment = async () => {
    setExperimentStatus("Running...");

    try {
      const response = await fetch(`${backendUrl}/start_experiment`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ isMusic: isMusic }),
      });

      setExperimentStatus("Analysing Results...");
      const data = await response.json();

      if (data.error) {
        setExperimentStatus("Error: " + data.error);
      } else {
        setExperimentStatus("Experiment Completed!");
        setPlotUrl(`${backendUrl}/get_plot`);
      }
    } catch (error) {
      setExperimentStatus("Error connecting to the server.");
    }
  };

  return (
    <div className="p-4 text-center">
      <h1 className="text-xl font-semibold mb-4">Repp Experiment</h1>

      {/* Buttons or Toggle to choose isMusic or not */}
      <div className="mb-4">
        <button 
          onClick={() => setIsMusic(true)} 
          className={`px-4 py-2 mr-2 text-white rounded ${isMusic ? 'bg-blue-600' : 'bg-gray-500'}`}
        >
          Music
        </button>
        <button 
          onClick={() => setIsMusic(false)} 
          className={`px-4 py-2 text-white rounded ${!isMusic ? 'bg-blue-600' : 'bg-gray-500'}`}
        >
          Metronome Only
        </button>
      </div>

      <button 
        onClick={startExperiment} 
        className="mb-4 px-4 py-2 bg-green-500 text-white rounded"
      >
        Start Experiment
      </button>

      {experimentStatus && <p className="mt-2">{experimentStatus}</p>}

      {plotUrl && (
        <div className="flex flex-col items-center justify-center min-h-screen">
          <h2 className="text-2xl font-semibold mb-4">Results</h2>
          <img 
            src={plotUrl} 
            alt="Experiment Result" 
            className="w-full max-w-4xl h-auto rounded-lg"
          />
        </div>
      )}
    </div>
  );
};

export default Repp;
