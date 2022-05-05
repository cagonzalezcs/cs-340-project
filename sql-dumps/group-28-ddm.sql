-- Database Manipulation Queries for Novel Pursuits 



-- Genre queries 
-- get all Genres to display on GenresPage.vue
SELECT
    genres.id,
    genres.name
FROM
    genres; 

-- add new Genre
INSERT INTO genres(NAME)
VALUES(:genre_name_input)

-- get single Genre to update in updateGenre form
SELECT
    genres.id,
    genres.name
FROM
    genres
WHERE
    genres.id = :genre_id_from_genres_page;

-- update Genre based on genre_id selection from the updateGenre form
UPDATE
    genres
SET
    genres.name = :genre_name_input
WHERE
    genres.id = :genre_id_from_genres_page;

-- delete Genre
DELETE
FROM
    genres
WHERE
    genres.id = :genre_id_from_genres_page;
-- end Genre queries


-- Author queries
-- get all Authors to display on AuthorsPage.vue
SELECT 
    authors.name, 
    authors.birth_date 
FROM 
    authors; 

-- add new Author based on items from addAuthor form
INSERT INTO authors (name, birth_date) 
VALUES(:name_input, :birth_date_input);

-- get single Author to update for updateAuthor form
SELECT
    authors.name,
    authors.birth_date
FROM
    authors
WHERE
    authors.id = :author_id_from_authors_page;

-- update Author based on selection from updateAuthor form
UPDATE
    authors
SET
    authors.name = :name_input,
    authors.birth_date = :birth_date_input
WHERE
    authors.id = :author_id_from_authors_page;

-- delete Author 
DELETE
FROM
    authors
WHERE
    authors.id = :author_id_from_authors_page;
-- end Author queries


-- Book_Author queries
-- show Book Author intersection table and corresponding data
SELECT
    books.id,
    books.title,
    books.isbn
FROM
    books 
INNER JOIN 
	book_authors ON books.id = book_authors.book_id 
INNER JOIN 
	authors ON book_authors.author_id = authors.id
WHERE author_id = :author_id_from_authors_page;
-- end Book_Author queries


-- Book queries 
-- show Books and their genres.name
SELECT 
    books.id, 
    books.title,  
    genres.name AS genre, 
    books.isbn, 
    books.cover_image, 
    books.quantity_available, 
    books.quantity_rented 
FROM 
    books 
INNER JOIN 
    genres ON books.genre_id = genres.id;

-- get all genre_ids and their names to populate the Genre dropdown
SELECT genres.id, genres.name FROM genres; 

-- add new Book based on items from addBook form 
INSERT INTO books(
    title,
    genre,
    isbn,
    cover_image,
    quantity_available,
    quantity_rented
)
VALUES(
    :title_input,
    :genre_input_from_drop_down,
    :isbn_input,
    :cover_image_input,
    :quantity_available_input,
    :quantity_rented_input
);

-- get single Book data for update form
SELECT 
    books.id, 
    books.title,  
    genres.name AS genre, 
    books.isbn, 
    books.cover_image, 
    books.quantity_available, 
    books.quantity_rented 
FROM 
    books 
INNER JOIN 
    genres ON books.genre_id = genres.id
WHERE 
    books.id= :book_id_from_books_page;

-- update this Book 
UPDATE 
    books 
SET 
    books.title= :title_input,
    genre= :genre_input_from_drop_down,
    books.isbn= :isbn_input,
    books.cover_image= :cover_image_input,
    books.quantity_available= :quantity_available_input,
    books.quantity_rented= :quantity_rented_input
WHERE 
    books.id= :book_id_from_books_page;

-- delete a Book 
DELETE 
FROM 
    books   
WHERE 
    books.id= :book_id_from_books_page;
-- end Books queries 


-- Search Books queries

-- select Genres for search dropdown
SELECT genre.id, genre.name FROM genres; 

-- search by Genre
SELECT
    books.title,
    authors.name,
    books.isbn
FROM
    books
LEFT JOIN book_authors ON book_authors.book_id = books.id
LEFT JOIN authors ON book_authors.author_id = authors.id
WHERE books.genre_id= :book_genre_id_from_genre_dropdown;

-- search by Title
SELECT
    books.title,
    authors.name,
    books.isbn
FROM
    books
LEFT JOIN book_authors ON book_authors.book_id = books.id
LEFT JOIN authors ON book_authors.author_id = authors.id
WHERE books.title= :book_title_input;

-- select Authors for search dropdown
SELECT authors.id, authors.name FROM genres;


-- search by Author
SELECT
    books.title,
    authors.name,
    books.isbn
FROM
    books
LEFT JOIN book_authors ON book_authors.book_id = books.id
LEFT JOIN authors ON book_authors.author_id = authors.id
WHERE authors.name= :author_name_input;
-- end Search Books queries