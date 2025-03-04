from flask import Flask, request, jsonify, send_file
from flask_cors import CORS
from repp.repp.config import sms_tapping
from repp.repp.stimulus import REPPStimulus
from repp.repp.analysis import REPPAnalysis

import numpy as np
import matplotlib
matplotlib.use("Agg") 
import matplotlib.pyplot as plt
import os
import sounddevice as sd

from dotenv import load_dotenv
import os
load_dotenv()

BACKEND_URL = os.getenv('BACKEND_URL')

app = Flask(__name__)
CORS(app)

# Directories
output_dir = "repp/output"
input_dir = "repp/input"

@app.route("/start_experiment", methods=["POST"])
def start_experiment():
    try:
        # Get user input from JSON body
        data = request.get_json()
        is_music = data.get("isMusic", True)  # Default to True if not provided

        if is_music:
            stimulus = REPPStimulus("stim_music1", config=sms_tapping)
            stim_prepared, stim_info, filenames = stimulus.prepare_stim_from_files(input_dir)
        else:
            stim_ioi = np.repeat(500, 10)  # a stimulus defined by a list of ioi
            stimulus = REPPStimulus("iso_500ioi", config=sms_tapping)
            stim_onsets = stimulus.make_onsets_from_ioi(stim_ioi)
            stim_prepared, stim_info, filenames = stimulus.prepare_stim_from_onsets(stim_onsets)

        # Save stimulus
        REPPStimulus.to_json(stim_info, os.path.join(output_dir, filenames['stim_info_file']))
        REPPStimulus.to_wav(stim_prepared, os.path.join(output_dir, filenames['audio_filename']), stimulus.config.FS)

        # Record user tapping
        myrecording = sd.playrec(stim_prepared, stimulus.config.FS, channels=1)
        sd.wait()

        # Save recording
        REPPStimulus.to_wav(myrecording, os.path.join(output_dir, filenames['recording_filename']), stimulus.config.FS)

        # Run analysis
        analysis = REPPAnalysis(config=sms_tapping)
        output, analysis_result, is_failed = analysis.do_analysis(
            stim_info,
            os.path.join(output_dir, filenames['recording_filename']),
            filenames['title_plot'],
            os.path.join(output_dir, filenames['plot_filename'])
        )

        # Generate the plot
        plt.figure(figsize=(6, 4))
        img = plt.imread(os.path.join(output_dir, filenames['plot_filename']))
        plt.imshow(img)
        plt.axis('off')
        plot_path = os.path.join(output_dir, "plot.png")
        plt.savefig(plot_path)
        plt.close()

        return jsonify({
            "message": "Experiment completed successfully",
            "plot_url": f"{BACKEND_URL}/get_plot"
        })
    
    except Exception as e:
        return jsonify({"error": str(e)}), 500


@app.route("/get_plot", methods=["GET"])
def get_plot():
    return send_file("repp/output/plot.png", mimetype="image/png")


if __name__ == "__main__":
    app.run(debug=True)
