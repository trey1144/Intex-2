import sqlite3
import pandas as pd
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import linear_kernel
from sklearn.decomposition import TruncatedSVD
from scipy.sparse import csr_matrix
import urllib.parse

# Load and prep data for both recommenders
conn = sqlite3.connect('Movies.db')
movies = pd.read_sql_query("SELECT * FROM movies_titles", conn)
ratings = pd.read_sql_query("SELECT * FROM movies_ratings", conn)

# Content-Based Prep
genre_cols = movies.columns[10:]
movies['description'] = movies['description'].fillna('')
movies['genres_combined'] = movies[genre_cols].apply(lambda row: ' '.join([col for col, val in row.items() if val == 1]), axis=1)
movies['content'] = movies['description'] + ' ' + movies['genres_combined']
movies['image'] = movies['title'].apply(lambda t: urllib.parse.quote(f"{t}.jpg"))
tfidf = TfidfVectorizer(stop_words='english')
tfidf_matrix = tfidf.fit_transform(movies['content'])
indices = pd.Series(movies.index, index=movies['show_id'])

def get_similar_movies(show_id, top_n=5):
    idx = indices.get(show_id)
    if idx is None:
        return []
    sim_scores = linear_kernel(tfidf_matrix[idx], tfidf_matrix).flatten()
    sim_indices = sim_scores.argsort()[::-1][1:top_n + 1]
    return movies.iloc[sim_indices][['show_id', 'title', 'description', 'image']].to_dict(orient='records')

# Collaborative Prep
user_movie_df = ratings.pivot(index='user_id', columns='show_id', values='rating').fillna(0)
sparse_matrix = csr_matrix(user_movie_df.values)
model = TruncatedSVD(n_components=20, random_state=42)
matrix_reduced = model.fit_transform(sparse_matrix)
reconstructed = model.inverse_transform(matrix_reduced)
reconstructed_df = pd.DataFrame(reconstructed, index=user_movie_df.index, columns=user_movie_df.columns)

def get_user_recommendations(user_id, top_n=20):
    if user_id not in reconstructed_df.index:
        return []
    sorted_scores = reconstructed_df.loc[user_id].sort_values(ascending=False)
    already_rated = ratings[ratings['user_id'] == user_id]['show_id'].tolist()
    recommended = sorted_scores[~sorted_scores.index.isin(already_rated)].head(top_n).index.tolist()
    return movies[movies['show_id'].isin(recommended)][['show_id', 'title', 'image']].to_dict(orient='records')
Collapse



