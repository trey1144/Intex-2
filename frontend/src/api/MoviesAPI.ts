import { Movie } from "../types/Movie";

// This matches what the backend returns (mapped from "projects" and "totalNumProjects")
interface FetchMoviesResponse {
  movies: Movie[];
  totalNumMovies: number;
}

const API_URL = "https://cineniche-2-13-backend-f9bef5h7ftbscahz.eastus-01.azurewebsites.net/api/Movie"; // 👈 Use HTTP or HTTPS based on your backend

// ✅ Fetch movies with optional filtering by category
export const fetchMovies = async (
  pageSize: number,
  pageNum: number,
  selectedCategories: string[]
): Promise<FetchMoviesResponse | undefined> => {
  try {
    const categoryParams = selectedCategories
      .map((cat) => `movieTypes=${encodeURIComponent(cat)}`)
      .join("&");

    const response = await fetch(
      `${API_URL}/AllMovies?pageSize=${pageSize}&pageNum=${pageNum}${
        selectedCategories.length ? `&${categoryParams}` : ""
      }`
    );

    if (!response.ok) {
      throw new Error("Failed to fetch movies");
    }

    const result = await response.json();

    return {
      movies: result.projects,               // 👈 map backend "projects" to "movies"
      totalNumMovies: result.totalNumProjects,
    };
  } catch (error) {
    console.error("Error fetching movies:", error);
    return undefined;
  }
};

// ✅ Add a new movie
export const addMovie = async (newMovie: Movie): Promise<Movie> => {
  try {
    const response = await fetch(`${API_URL}/AddMovie`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newMovie),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("❌ Backend responded with:", response.status, errorText);
      throw new Error("Failed to add movie");
    }

    return await response.json();
  } catch (error) {
    console.error("Error adding movie:", error);
    throw error;
  }
};

// ✅ Update an existing movie
export const updateMovie = async (
  showId: string,
  updatedMovie: Movie
): Promise<Movie> => {
  try {
    const response = await fetch(`${API_URL}/UpdateMovie/${showId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedMovie),
    });

    if (!response.ok) {
      throw new Error("Failed to update movie");
    }

    return await response.json();
  } catch (error) {
    console.error("Error updating movie:", error);
    throw error;
  }
};

// ✅ Delete a movie
export const deleteMovie = async (showId: string): Promise<void> => {
  try {
    const response = await fetch(`${API_URL}/Delete/${showId}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      throw new Error("Failed to delete movie");
    }
  } catch (error) {
    console.error("Error deleting movie:", error);
    throw error;
  }
};
