import { dbQuery } from '../db/db-connection.mjs';

const getAllAuthors = async () => {
  return await dbQuery(
    `SELECT authors.id, authors.name, TRIM('T07:00:00.000Z' FROM authors.birth_date) as 'birth_date'
     FROM authors
     ORDER BY authors.id`,
  );
};

const getAuthor = async (authorId) => {
  return await dbQuery(
    `SELECT authors.id, authors.name, TRIM('T07:00:00.000Z' FROM authors.birth_date) as 'birth_date'
    FROM authors
    WHERE authors.id = ?
    ORDER BY authors.id`, 
    [authorId]
    );
};

const createAuthor = async (name, birthDate) => {
  console.log(name, birthDate)
  return await dbQuery(
    `INSERT INTO authors
    (name, birth_date)
    VALUES (?, ?)`, 
    [name, birthDate],
  );
};

const updateAuthor = async (authorId, name, birthDate) => {
  if (!authorId) {
    throw 'Author Id is a required parameter to update an author.';
  }
  let authorRecord = await getAuthor(authorId);
  authorRecord = authorRecord[0]
  if (!authorRecord) {
    throw 'Author not found, unable to update author.'
  }
  const updatedName = name || authorRecord.name;
  const updatedBirthDate = birthDate || authorRecord.birth_date;
  return await dbQuery(
    `UPDATE authors
    SET authors.name = ?, authors.birth_date = ?
    WHERE authors.id = ?`, 
    [updatedName, updatedBirthDate, authorId]
  )
}; 

const deleteAuthor = async (authorId) => {
  if(!authorId) {
    throw 'Author Id is a required parameter to delete an author.';
  }
  return await dbQuery(`DELETE FROM authors WHERE authors.id = ?`, [authorId]);
};

// Get books from a single author (used in Authors > AuthorBookList.vue)

const getAuthorBooks = async (authorId) => {
  if (!authorId) {
    throw 'Author Id is a required parameter to get a list of books.';
  }
  return await dbQuery(
    `SELECT
        books.id,
        books.title,
        books.isbn
    FROM
        books 
    INNER JOIN 
      book_authors ON books.id = book_authors.book_id 
    INNER JOIN 
      authors ON book_authors.author_id = authors.id
    WHERE author_id = ?`, [authorId]
  );
};

export { getAllAuthors, getAuthor, createAuthor, updateAuthor, deleteAuthor, getAuthorBooks };
