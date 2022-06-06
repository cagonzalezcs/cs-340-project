-- Database Manipulation Queries for Novel Pursuits 

-- user queries
-- Create a user
INSERT INTO users (user_role_id, first_name, last_name, email, address_line_1, address_line_2, city, state, password)
VALUES(:user_role_id, :user_first_name, :user_last_name, :user_email, :user_address_line_1, :user_address_line_2, :user_city, :user_state, :user_password),

-- get all Users
SELECT users.id,
    users.user_role_id,
    users.first_name,
    users.last_name,
    users.email,
    users.address_line_1,
    users.address_line_2,
    users.city,
    users.state,
    users.created_at,
    users.updated_at
FROM users

-- get User by Id (with and without password)
-- with password
SELECT users.id,
    users.user_role_id,
    users.first_name,
    users.last_name,
    users.email,
    users.address_line_1,
    users.address_line_2,
    users.city,
    users.state,
    users.password,
    users.password_updated_at,
    users.created_at,
    users.updated_at
FROM users
WHERE users.id = :user_id_input;
LIMIT 1
-- without password
SELECT users.id,
    users.user_role_id,
    users.first_name,
    users.last_name,
    users.email,
    users.address_line_1,
    users.address_line_2,
    users.city,
    users.state,
    users.created_at,
    users.updated_at
FROM users
WHERE users.id = :user_id_input;
LIMIT 1

-- get User by Email (with and without password)
-- with password
SELECT users.id,
    users.user_role_id,
    users.first_name,
    users.last_name,
    users.email,
    users.address_line_1,
    users.address_line_2,
    users.city,
    users.state,
    users.password,
    users.password_updated_at,
    users.created_at,
    users.updated_at
FROM users
WHERE users.email = :user_email_input;
LIMIT 1
-- without password
SELECT users.id,
    users.user_role_id,
    users.first_name,
    users.last_name,
    users.email,
    users.address_line_1,
    users.address_line_2,
    users.city,
    users.state
FROM users
WHERE users.email = :user_email_input;
LIMIT 1

-- create User
INSERT INTO users(
    user_role_id, 
    first_name, 
    last_name, 
    email, 
    address_line_1, 
    address_line_2, 
    city, 
    state,
    password
)
VALUES (
    :user_role_id,
    :user_first_name, 
    :user_last_name, 
    :user_email, 
    :user_address_line_1, 
    :user_address_line_2, 
    :user_city, 
    :user_state, 
    :user_encrypted_password
)

-- update single User to handle updates from admin
UPDATE
    users
SET
    users.user_role_id = :user_role_id_input,
    users.first_name = :first_name_input,
    users.last_name = :last_name_input,
    users.email = :email_input,
    users.address_line_1 = :address_line_1_input,
    users.address_line_2 = :address_line_2_input,
    users.city = :city_input,
    users.state = :state_input
WHERE
        users.id = :user_id_value;

-- delete User
DELETE FROM users WHERE user.id = :user_id_value;

-- get User Rental List
SELECT
    rental_list_books.user_id AS user_id,
    books.id, 
    books.title
FROM
    books
INNER JOIN rental_list_books ON books.id = rental_list_books.book_id
WHERE
    rental_list_books.user_id = :user_id_value;

-- get User Wish List
SELECT
    wish_list_books.user_id AS user_id,
    books.id,
    books.title
FROM
    books
INNER JOIN wish_list_books ON books.id = wish_list_books.book_id
WHERE
    wish_list_books.user_id = :user_id_value;

-- user_role queries
-- get all user roles
SELECT *
FROM user_roles;

-- get user role by ID
SELECT *
FROM user_roles
WHERE
    users.id = :user_id_input;
LIMIT 1;

-- create user role
INSERT INTO user_roles(type)
VALUES(:role_type_input);

-- update user role
UPDATE user_roles
SET user_roles.type = :updated_user_role_type;
WHERE user_roles.id = :user_role_id;

-- delete user role
DELETE FROM user_roles WHERE user_roles.id = :user_role_id;

-- rental_list_books queries
-- get all rental lists
SELECT
    rental_list_books.user_id AS user_id, 
    books.id,
    books.title
FROM
    books
INNER JOIN rental_list_books ON books.id = rental_list_books.user_id
GROUP BY
    rental_list_books.user_id
ORDER BY
    rental_list_books.user_id;

-- get all rental list items for a user
SELECT rental_list_books.book_id,
    books.title,
    books.isbn,
    books.cover_image,
    (SELECT GROUP_CONCAT(authors.name SEPARATOR ', ')
FROM authors
LEFT JOIN book_authors ON authors.id = book_authors.author_id
WHERE book_authors.book_id = rental_list_books.book_id) AS 'authors',
    genres.name AS 'genre',
    rental_list_books.created_at AS 'date_rented'
FROM rental_list_books
LEFT JOIN books ON rental_list_books.book_id = books.id
LEFT JOIN book_authors ON rental_list_books.book_id = book_authors.book_id
LEFT JOIN authors ON book_authors.author_id = authors.id
LEFT JOIN genres ON books.genre_id = genres.id
WHERE rental_list_books.user_id = :user_id_input;
GROUP BY rental_list_books.book_id
ORDER BY date_rented DESC;

-- add a book to the user's rental list
INSERT INTO rental_list_books (user_id, book_id)
VALUES(:user_id_input, :book_id_input);

-- remove a book from the user's rental list
DELETE 
FROM rental_list_books
WHERE rental_list_books.user_id = :user_id_input
  AND rental_list_books.book_id = :book_id_input;


-- wish_list_books queries
-- get all wish lists
SELECT
    wish_list_books.user_id AS user_id, 
    books.id,
    books.title
FROM
    books
INNER JOIN wish_list_books ON books.id = wish_list_books.user_id
GROUP BY
    wish_list_books.user_id
ORDER BY
    wish_list_books.user_id;

-- get a single wish list item
SELECT *
FROM wish_list_books
WHERE user_id = :user_id_input
    AND book_id = :book_id_input;

-- get all wish list books for a user
SELECT wish_list_books.book_id,
    wish_list_books.created_at,
    books.title,
    books.isbn,
    books.cover_image,
    (SELECT GROUP_CONCAT(authors.name SEPARATOR ', ')
FROM authors
LEFT JOIN book_authors ON authors.id = book_authors.author_id
WHERE book_authors.book_id = wish_list_books.book_id) AS 'authors',
    genres.name AS 'genre'
FROM wish_list_books
LEFT JOIN books ON wish_list_books.book_id = books.id
LEFT JOIN book_authors ON wish_list_books.book_id = book_authors.book_id
LEFT JOIN authors ON book_authors.author_id = authors.id
LEFT JOIN genres ON books.genre_id = genres.id
WHERE wish_list_books.user_id = ?
GROUP BY wish_list_books.book_id
ORDER BY wish_list_books.created_at DESC;

-- add a book to the user's wish list
INSERT INTO wish_list_books (user_id, book_id)
VALUES(:user_id_input, :book_id_input);

-- remove a book from the user's wish list
DELETE FROM wish_list_books
WHERE wish_list_books.user_id = :user_id_input
  AND wish_list_books.book_id = :book_id_input;


-- Genre queries 
-- get all Genres
SELECT *
FROM genres
ORDER BY genres.id;

-- get page of Genres
SELECT *
FROM genres
ORDER BY genres.id
LIMIT :input_page_num, :input_per_page;

-- get genre by ID
SELECT *
FROM genres
WHERE genres.id = :genre_id_from_genres_page;

-- get genre ID by name
SELECT genres.id
FROM genres
WHERE genres.name = :genre_name_input;

-- add new Genre
INSERT INTO genres(NAME)
VALUES(:genre_name_input);

-- update Genre based on genre_id selection from the updateGenre form
UPDATE genres
SET genres.name = :genre_name_input
WHERE genres.id = :genre_id_from_genres_page;

-- delete Genre
DELETE FROM genres
WHERE genres.id = :genre_id_from_genres_page;
-- end Genre queries


-- Author queries
-- get all Authors to display on AuthorsPage.vue
SELECT authors.id, authors.name, TRIM('T07:00:00.000Z' FROM authors.birth_date) as 'birth_date'
FROM authors
ORDER BY authors.id; 

-- get single Author by ID
SELECT authors.id, authors.name, TRIM('T07:00:00.000Z' FROM authors.birth_date) as 'birth_date'
FROM authors
WHERE authors.id = :author_id_input
ORDER BY authors.id;

-- get author ID by name
SELECT authors.id 
FROM authors 
WHERE authors.name = :author_name_input;

-- add new Author based on items from addAuthor form
INSERT INTO authors (name, birth_date) 
VALUES(:name_input, :birth_date_input);

-- update Author based on selection from updateAuthor form
UPDATE authors
SET authors.name = :name_input, authors.birth_date = :birth_date_input
WHERE authors.id = :author_id;

-- delete Author 
DELETE FROM authors
WHERE authors.id = :author_id;
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
WHERE author_id = :author_id;
-- end Book_Author queries


-- Book queries 
-- get all Books for books page
SELECT 
    books.id, 
    books.title,  
    (SELECT GROUP_CONCAT(authors.name SEPARATOR ', ')
    FROM authors
    LEFT JOIN book_authors ON authors.id = book_authors.author_id
    WHERE book_authors.book_id = books.id) AS authors,
    genres.name AS genre, 
    books.isbn, 
    books.cover_image, 
    books.quantity_available, 
    books.quantity_rented 
FROM 
    books 
LEFT JOIN genres ON books.genre_id = genres.id
LEFT JOIN book_authors ON books.id = book_authors.book_id
LEFT JOIN authors ON book_authors.author_id = authors.id
GROUP BY books.id
ORDER BY books.id;

-- get a single book by ID
SELECT * 
FROM books 
WHERE books.id = :book_id_input
LIMIT 1;

-- add new Book based on items from addBook form 
INSERT INTO books(
    title,
    genre_id,
    isbn,
    cover_image,
    quantity_available,
    quantity_rented
)
VALUES(
    :title_input,
    :genre_id_input,
    :isbn_input,
    :cover_image_input,
    :quantity_available_input,
    :quantity_rented_input
);
-- complete book add by associating it with an Author, and inserting that into book_authors
SELECT author.id FROM authors WHERE authors.name = :author_name_input 

INSERT INTO book_authors(
    book_id, 
    author_id
)
VALUES(
    :book_id_input,
    :author.id
);

-- update this Book 
UPDATE 
    books 
SET 
    books.title= :title_input,
    books.genre_id= :genre_input_from_drop_down,
    books.isbn= :isbn_input,
    books.cover_image= :cover_image_input,
    books.quantity_available= :quantity_available_input,
    books.quantity_rented= :quantity_rented_input
WHERE 
    books.id= :book_id_from_books_page;
-- delete entry from book_authors
DELETE FROM book_authors 
WHERE book_id = :book_id_input;
-- get new authord ID for book authors
SELECT authors.id FROM authors WHERE authors.name = :author_name_input
--update book authors
INSERT INTO book_authors (book_authors.book_id, book_authors.author_id)
VALUES (:book_id_input, :author_id_input)

-- delete a Book 
DELETE FROM books   
WHERE books.id= :book_id_from_books_page;


-- Search Books queries
-- search by Genre
SELECT books.id,
    books.title,
    (SELECT GROUP_CONCAT(authors.name SEPARATOR ', ')
    FROM authors
            LEFT JOIN book_authors ON authors.id = book_authors.author_id
    WHERE book_authors.book_id = books.id) AS "authors",
    genres.name AS "genre",
    books.isbn,
    books.cover_image,
    books.quantity_available,
    books.quantity_rented
FROM books
LEFT JOIN genres ON books.genre_id = genres.id
LEFT JOIN book_authors ON books.id = book_authors.book_id
LEFT JOIN authors ON book_authors.author_id = authors.id
WHERE books.genre_id = :genre_id_input
GROUP BY books.id
ORDER BY books.id;

-- search by Title
SELECT books.id,
    books.title,
    (SELECT GROUP_CONCAT(authors.name SEPARATOR ', ')
    FROM authors
            LEFT JOIN book_authors ON authors.id = book_authors.author_id
    WHERE book_authors.book_id = books.id) AS "authors",
    genres.name AS "genre",
    books.isbn,
    books.cover_image,
    books.quantity_available,
    books.quantity_rented
FROM books
LEFT JOIN genres ON books.genre_id = genres.id
LEFT JOIN book_authors ON books.id = book_authors.book_id
LEFT JOIN authors ON book_authors.author_id = authors.id
WHERE books.title LIKE :book_title_search_input
GROUP BY books.id
ORDER BY books.id;

-- search by Author
SELECT books.id,
    books.title,
    (SELECT GROUP_CONCAT(authors.name SEPARATOR ', ')
    FROM authors
            LEFT JOIN book_authors ON authors.id = book_authors.author_id
    WHERE book_authors.book_id = books.id) AS "authors",
    genres.name AS "genre",
    books.isbn,
    books.cover_image,
    books.quantity_available,
    books.quantity_rented
FROM books
LEFT JOIN genres ON books.genre_id = genres.id
LEFT JOIN book_authors ON books.id = book_authors.book_id
LEFT JOIN authors ON book_authors.author_id = authors.id
WHERE book_authors.author_id = :author_id_input
GROUP BY books.id
ORDER BY books.id;

-- search by Keyword
SELECT books.id,
    books.title,
    (SELECT GROUP_CONCAT(authors.name SEPARATOR ', ')
    FROM authors
            LEFT JOIN book_authors ON authors.id = book_authors.author_id
    WHERE book_authors.book_id = books.id) AS "authors",
    genres.name AS "genre",
    books.isbn,
    books.cover_image,
    books.quantity_available,
    books.quantity_rented
FROM books
LEFT JOIN genres ON books.genre_id = genres.id
LEFT JOIN book_authors ON books.id = book_authors.book_id
LEFT JOIN authors ON book_authors.author_id = authors.id
WHERE books.title LIKE :keyword_input
OR genres.name LIKE :keyword_input
OR authors.name LIKE :keyword_input
GROUP BY books.id;
-- end Search Books queries
