import * as authorsModel from '../models/authors.mjs';

const getAllAuthors = async (request, response) => {
  try {
    const allAuthors = await authorsModel.getAllAuthors();
    response.json(allAuthors);
  } catch (error) {
    response.status(500).json({ error });
  }
};

const getAuthor = async (request, response) => {
  try {
    const authorId = request.params.authorId
    const getAuthor = await authorsModel.getAuthor(authorId);
    response.json(getAuthor);
  } catch (error) {
    response.status(500).json({ error });
  }
}

const getAuthorBooks = async (request, response) => {
  try {
    const authorId = request.params.authorId;
    const getBooks = await authorsModel.getAuthorBooks(authorId);
    response.json(getBooks);
  } catch (error) {
    response.status(500).json({ error });
  }
};

const createAuthor = async (request, response) => {
  try {
    const newAuthorData = request.body;
    await authorsModel.createAuthor(
      newAuthorData.name,
      newAuthorData.birth_date
    );
    response.json({ message: 'Author has been successfully added.' })
  } catch (error) {
    response.status(500).json({ error })
  }
}

const updateAuthor = async (request, response) => {
  try {
    const authorId = request.params.authorId;
    const authorData = request.body;
    await authorsModel.updateAuthor(
      authorId,
      authorData.name,
      authorData.birth_date
    );
    response.json({ message: 'Author has been successfully updated.' });
  } catch (error) {
    response.status(500).json({ error });
  }
}

const deleteAuthor = async (request, response) => {
  try {
    const authorId = request.params.authorId;
    await authorsModel.deleteAuthor(authorId);
    response.json({ message: 'Author has been successfully deleted.' });
  } catch (error) {
    response.status(500).json({ error });
  }
};

export { getAllAuthors, getAuthor, getAuthorBooks, createAuthor, updateAuthor, deleteAuthor };
