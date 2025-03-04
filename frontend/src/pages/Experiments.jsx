import React from 'react';
import { Outlet, Link } from 'react-router-dom';

export default function Experiments() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h2 className="text-3xl font-bold mb-8">Choose an Experiment</h2>
      <div className="space-x-4">
        <Link to="/experiments/repp">
          <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700 transition duration-300">
            Go to Repp
          </button>
        </Link>
        <Link to="/experiments/experiment2">
          <button className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-700 transition duration-300">
            Go to Experiment 2
          </button>
        </Link>
      </div>

      {/* This Outlet renders the matched child route */}
      <div className="mt-8 w-full">
        <Outlet />
      </div>
    </div>
  );
}
