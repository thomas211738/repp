import React, { useState } from "react";
// No additional imports needed for a regular button

const Repp = () => {
  const [experimentStatus, setExperimentStatus] = useState(null);
  const [plotUrl, setPlotUrl] = useState("");

  const startExperiment = async () => {
    setExperimentStatus("Running...");
    
    try {
      const response = await fetch("http://127.0.0.1:5000/start_experiment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      });

      const data = await response.json();
      
      if (data.error) {
        setExperimentStatus("Error: " + data.error);
      } else {
        setExperimentStatus("Experiment Completed!");
        setPlotUrl("http://127.0.0.1:5000/get_plot");
      }
    } catch (error) {
      setExperimentStatus("Error connecting to the server.");
    }
  };

return (
    <div className="p-4 text-center">
        <h1 className="text-xl font-semibold mb-4">Psychology Experiment</h1>
        <button onClick={startExperiment} className="mb-4 px-4 py-2 bg-blue-500 text-white rounded">
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
