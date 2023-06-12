from flask import Flask, jsonify, request
from flask_cors import CORS, cross_origin
import logic
import logging

logging.basicConfig(level=logging.INFO)

app = Flask(__name__)
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'

builds = logic.load_builds()

@app.route('/builds', methods=['POST'])
@cross_origin()
def get_builds():
    engravings_wanted = request.json['engravings']
    stats_wanted = request.json['stats']
    logging.info(f"Engravings wanted :  {engravings_wanted}")
    logging.info(f"Stats wanted : {stats_wanted}")
    result = [build.__dict__() for build in logic.filter_by_engravings_and_stats(builds, engravings_wanted, stats_wanted)]
    return jsonify(result)

if __name__ == '__main__':
    app.run()