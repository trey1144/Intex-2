from flask import Flask, jsonify
from recommender_logic import get_similar_movies, get_user_recommendations
from flask_cors import CORS

app = Flask(__name__)
CORS(app) 

@app.route('/api/recommend/item/<show_id>', methods=['GET'])
def item_based(show_id):
    return jsonify(get_similar_movies(show_id))

@app.route('/api/recommend/user/<int:user_id>', methods=['GET'])
def user_based(user_id):
    return jsonify(get_user_recommendations(user_id))

if __name__ == '__main__':
    app.run(debug=True)