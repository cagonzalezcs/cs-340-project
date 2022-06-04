import * as genresModel from '../models/genres.mjs';

const getAllGenres = async (request, response) => {
  try {
    if (request.params.pageNumber) {
      const pageNumber = Number(request.params.pageNumber);
      const perPage = Number(request.params.perPage) || 20;
      const pagedGenres = await genresModel.getGenresPage(pageNumber, perPage);
      return response.json(pagedGenres);
    }

    const genres = await genresModel.getAllGenres();
    return response.json(genres);
  } catch (error) {
    response.status(500).json(error);
  }
};

const getGenre = async (request, response) => {
  try {
    const genreId = request.params.genreId;
    const getGenre = await genresModel.getGenre(genreId);
    response.json(getGenre);
  } catch (error) {
    response.status(500).json({ error });
  }
};

const createGenre = async (request, response) => {
  try {
    const newGenreData = request.body;
    await genresModel.createGenre(
      newGenreData.name
    );
    response.json({message: 'Genre has been successfully created.'})
  } catch (error) {
    response.status(500).json({ error })
  }
};

const updateGenre = async (request, response) => {
  try {
    const genreId = request.params.genreId;
    const genreData = request.body;
    await genresModel.updateGenre(
      genreId,
      genreData.name
    );
    response.json({ message: 'Genre has been successfully updated.' });
  } catch (error) {
    response.status(500).json({ error });
  }
};

const deleteGenre = async (request, response) => {
  try {
    const genreId = request.params.genreId;
    await genresModel.deleteGenre(genreId);
    response.json({ message: 'Genre has been successfully deleted.' });
  } catch (error) {
    response.status(500).json({ error });
  }
};

export {
  getAllGenres,
  getGenre,
  createGenre,
  updateGenre,
  deleteGenre,
};
