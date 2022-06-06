SET FOREIGN_KEY_CHECKS = 0;
SET AUTOCOMMIT = 0;

--
-- Clean up any existing tables within the database, removing foreign key checks to ensure tables are successfully deleted before setup.
--

DROP TABLE IF EXISTS authors;
DROP TABLE IF EXISTS genres;
DROP TABLE IF EXISTS books;
DROP TABLE IF EXISTS book_authors;
DROP TABLE IF EXISTS rental_list_books;
DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS user_roles;
DROP TABLE IF EXISTS wish_list_books;

--
-- Table structure for table authors
--

CREATE TABLE authors
(
    id         int(11)      NOT NULL AUTO_INCREMENT,
    name       varchar(255) NOT NULL,
    birth_date date         NOT NULL,
    created_at timestamp    NOT NULL DEFAULT current_timestamp(),
    updated_at timestamp    NULL     DEFAULT NULL ON UPDATE current_timestamp(),
    PRIMARY KEY (id),
    CONSTRAINT unique_author UNIQUE (name, birth_date)
);

-- --------------------------------------------------------

--
-- Table structure for table genres
--

CREATE TABLE genres
(
    id         int(11)      NOT NULL AUTO_INCREMENT,
    name       varchar(255) NOT NULL,
    created_at timestamp    NOT NULL DEFAULT current_timestamp(),
    updated_at timestamp    NULL     DEFAULT NULL ON UPDATE current_timestamp(),
    PRIMARY KEY (id),
    CONSTRAINT unique_genre UNIQUE (name)
);

-- --------------------------------------------------------

--
-- Table structure for table books
--

CREATE TABLE books
(
    id                 int(11)      NOT NULL AUTO_INCREMENT,
    title              varchar(255) NOT NULL,
    genre_id           int(11),
    isbn               varchar(20)           DEFAULT NULL,
    cover_image        varchar(255)          DEFAULT NULL,
    quantity_available int(11)      NOT NULL,
    quantity_rented    int(11)      NOT NULL,
    created_at         timestamp    NOT NULL DEFAULT current_timestamp(),
    updated_at         timestamp    NULL     DEFAULT NULL ON UPDATE current_timestamp(),
    PRIMARY KEY (id),
    FOREIGN KEY (genre_id) REFERENCES genres (id) ON DELETE SET NULL
);

-- --------------------------------------------------------

--
-- Table structure for table book_authors
--

CREATE TABLE book_authors
(
    book_id    int(11)   NOT NULL,
    author_id  int(11)   NOT NULL,
    created_at timestamp NOT NULL DEFAULT current_timestamp(),
    updated_at timestamp NULL     DEFAULT NULL ON UPDATE current_timestamp(),
    PRIMARY KEY (book_id, author_id),
    FOREIGN KEY (book_id) REFERENCES books (id) ON DELETE CASCADE,
    FOREIGN KEY (author_id) REFERENCES authors (id) ON DELETE CASCADE
);

-- --------------------------------------------------------

--
-- Table structure for table user_roles
--

CREATE TABLE user_roles
(
    id         int(11)      NOT NULL AUTO_INCREMENT,
    type       varchar(255) NOT NULL,
    created_at timestamp    NOT NULL DEFAULT current_timestamp(),
    updated_at timestamp    NULL     DEFAULT NULL ON UPDATE current_timestamp(),
    PRIMARY KEY (id),
    CONSTRAINT unique_user_role UNIQUE (type)
);

-- --------------------------------------------------------

--
-- Table structure for table users
--

CREATE TABLE users
(
    id                  int(11)      NOT NULL AUTO_INCREMENT,
    user_role_id        int(11)      NOT NULL,
    first_name          varchar(255) NOT NULL,
    last_name           varchar(255) NOT NULL,
    email               varchar(255) NOT NULL,
    address_line_1      varchar(255)          DEFAULT NULL,
    address_line_2      varchar(255)          DEFAULT NULL,
    city                varchar(50)           DEFAULT NULL,
    state               varchar(50)           DEFAULT NULL,
    password            varchar(255) NOT NULL,
    password_updated_at timestamp    NULL     DEFAULT NULL ON UPDATE current_timestamp(),
    created_at          timestamp    NOT NULL DEFAULT current_timestamp(),
    updated_at          timestamp    NULL     DEFAULT NULL ON UPDATE current_timestamp(),
    PRIMARY KEY (id),
    FOREIGN KEY (user_role_id) REFERENCES user_roles (id) ON DELETE RESTRICT,
    CONSTRAINT unique_user UNIQUE (email)
);

-- --------------------------------------------------------

--
-- Table structure for table rental_list_books
--

CREATE TABLE rental_list_books
(
    user_id    int(11)   NOT NULL,
    book_id    int(11)   NOT NULL,
    created_at timestamp NOT NULL DEFAULT current_timestamp(),
    updated_at timestamp NULL     DEFAULT NULL ON UPDATE current_timestamp(),
    PRIMARY KEY (user_id, book_id),
    FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE,
    FOREIGN KEY (book_id) REFERENCES books (id) ON DELETE CASCADE
);

-- --------------------------------------------------------

--
-- Table structure for table wish_list_books
--

CREATE TABLE wish_list_books
(
    user_id    int(11)   NOT NULL,
    book_id    int(11)   NOT NULL,
    created_at timestamp NOT NULL DEFAULT current_timestamp(),
    updated_at timestamp NULL     DEFAULT NULL ON UPDATE current_timestamp(),
    PRIMARY KEY (user_id, book_id),
    FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE,
    FOREIGN KEY (book_id) REFERENCES books (id) ON DELETE CASCADE
);


-- --------------------------------------------------------

--
-- Insert Authors
-- 

INSERT INTO authors (name, birth_date)
VALUES ('Ernest Hemingway', '1899-07-21'),
       ('Yuval Noah Harari', '1976-02-24'),
       ('Oscar G. Brockett', '1923-04-23'),
       ('Tom Sharpe', '1928-03-30'),
       ('Giuseppe Bernardi', '1694-03-24'),
       ('David Vandermeulen', '1968-12-19'),
       ('Daniel Casanave', '1963-09-16'),
       ('Ken Ludwig', '1950-03-15'),
       ('Neil Simon', '1927-07-04'),
       ('Richard Marsh', '1857-10-12'),
       ('Stephen King', '1947-09-21'),
       ('Edith Nesbit', '1858-08-15'),
       ('H. G. Wells', '1866-09-21');

-- --------------------------------------------------------

--
-- Insert Genres
-- 

INSERT INTO genres (name)
VALUES ('Non-Ficton'),
       ('Fiction'),
       ('Horror'),
       ('Comedy'),
       ('Drama');

-- --------------------------------------------------------

--
-- Insert Books
-- 

INSERT INTO books (title, genre_id, isbn, cover_image, quantity_available, quantity_rented)
VALUES ('Blott on the Landscape', 4, '9780330250801', 'https://covers.openlibrary.org/b/isbn/9780330250801-L.jpg', 13,
        10),
       ('Death in the afternoon', 1, '0684717964', 'https://covers.openlibrary.org/b/isbn/0684717964-L.jpg', 15, 9),
       ('The Beetle', 3, '1551114437', 'https://covers.openlibrary.org/b/isbn/1551114437-L.jpg', 17, 11),
       ('Five Children and It', 2, '0706410513', 'https://covers.openlibrary.org/b/isbn/0706410513-L.jpg', 17, 3),
       ('Lend me a tenor', 4, '0573691215', 'https://covers.openlibrary.org/b/isbn/0573691215-L.jpg', 14, 9),
       ('Biloxi blues', 4, '0573690405', 'https://covers.openlibrary.org/b/isbn/0573690405-L.jpg', 20, 7),
       ('Carrie', 3, '0385086954', 'https://covers.openlibrary.org/b/isbn/0385086954-L.jpg', 17, 10),
       ('The essential theatre', 5, '0030493714', 'https://covers.openlibrary.org/b/isbn/0030493714-L.jpg', 13, 6),
       ('Misery', 3, '9780670813643', 'https://covers.openlibrary.org/b/isbn/9780670813643-L.jpg', 15, 15),
       ('Sapiens', 1, '9780771038501', 'https://covers.openlibrary.org/b/isbn/9780771038501-L.jpg', 12, 11),
       ('Island of Dr. Moreau', 1, '0441374212', 'https://covers.openlibrary.org/b/isbn/0441374212-L.jpg', 15, 2);

-- --------------------------------------------------------

--
-- Insert Book Authors
-- 

INSERT INTO book_authors (book_id, author_id)
VALUES (1, 4),
       (2, 1),
       (8, 3),
       (10, 2),
       (10, 5),
       (10, 6),
       (10, 7),
       (5, 8),
       (6, 9),
       (3, 10),
       (7, 11),
       (9, 11),
       (4, 12),
       (11, 13);

-- --------------------------------------------------------

--
-- Insert User Roles
-- 

INSERT INTO user_roles (type)
VALUES ('admin'),
       ('manager'),
       ('sales'),
       ('customer');

-- --------------------------------------------------------

--
-- Insert User
-- 

INSERT INTO users (user_role_id, first_name, last_name, email, address_line_1, address_line_2, city, state, password)
VALUES (1, 'Admin', 'User', 'admin@admin.com', '6 Farwell Trail', NULL, 'New York City', 'New York',
        'a3b8d72264c6d0b156bdd5aae509b3a8:ca4cb82dfaa990ec76f4f0fd61a6b321'),
       (4, 'Saba', 'Bainton', 'customer@customer.com', '1771 Scoville Street', NULL, 'Jacksonville', 'Florida',
        '778745835ebf5abd5c570c43b4474af7:a2dba8c7e0b0fd1e55000659b24ec41dd50284382804939d54a378590f94eba7'),
       (1, 'Kerry', 'Wybern', 'kwybern6@paginegialle.it', '24448 Stang Street', 'Suite 3', 'Lancaster', 'Pennsylvania',
        '18790dd34b8d36775f61b8ca01f7b74a:e28471bc3eaa001fd06d47b6463dc5a4'),
       (3, 'Christye', 'Vinck', 'cvinck1@washington.edu', '188 Tennyson Plaza', NULL, 'Reno', 'Nevada',
        'ad0a888842984d4f2929c86d10d593ce:894e2bd0102b0c575fbabe63ae5a68c2'),
       (2, 'Gwenni', 'Preece', 'gpreece2@seesaa.net', '4 Melody Plaza', 'Apartment 4', 'Denver', 'Colorado',
        '18790dd34b8d36775f61b8ca01f7b74a:e28471bc3eaa001fd06d47b6463dc5a4'),
       (2, 'Glennis', 'Spours', 'gspours3@sohu.com', '21 Memorial Crossing', NULL, 'Sacramento', 'California',
        '7ddbcab91e741b53d19bbf1c59b31093:77c7626f92880c4068a5a694c03a1aef'),
       (4, 'Maxine', 'Kiellor', 'mkiellor5@amazon.co.jp', '347 Kropf Drive', 'Suite 451', 'Memphis', 'Tennessee',
        'ad0a888842984d4f2929c86d10d593ce:894e2bd0102b0c575fbabe63ae5a68c2'),
       (4, 'Deerdre', 'Van Bruggen', 'dvanbruggen7@soup.io', '371 Lindbergh Road', NULL, 'Atlanta', 'Georgia',
        '18790dd34b8d36775f61b8ca01f7b74a:e28471bc3eaa001fd06d47b6463dc5a4'),
       (4, 'Waverly', 'Wellbeloved', 'wwellbeloved8@sogou.com', '096 Coleman Trail', NULL, 'Oklahoma City', 'Oklahoma',
        'ad0a888842984d4f2929c86d10d593ce:894e2bd0102b0c575fbabe63ae5a68c2'),
       (4, 'Pauly', 'Guidotti', 'pguidotti9@ucoz.ru', '49 Debs Center', NULL, 'Grand Rapids', 'Michigan',
        '7ddbcab91e741b53d19bbf1c59b31093:77c7626f92880c4068a5a694c03a1aef');

-- --------------------------------------------------------

--
-- Insert Rental List Books
-- 

INSERT INTO rental_list_books (user_id, book_id)
VALUES (2, 3),
       (2, 10),
       (6, 9),
       (6, 2),
       (6, 5),
       (7, 9),
       (7, 6),
       (7, 8),
       (8, 3),
       (8, 7),
       (9, 5),
       (9, 2),
       (10, 10),
       (10, 6);

-- --------------------------------------------------------

--
-- Insert Wish List Books
-- 

INSERT INTO wish_list_books (user_id, book_id)
VALUES (2, 5),
       (2, 7),
       (2, 1),
       (2, 9),
       (6, 3),
       (6, 4),
       (7, 10),
       (8, 2),
       (8, 6),
       (8, 10),
       (9, 3),
       (9, 1),
       (9, 4),
       (9, 7),
       (10, 1),
       (10, 3),
       (10, 5),
       (10, 8);


SET FOREIGN_KEY_CHECKS = 1;
COMMIT;
