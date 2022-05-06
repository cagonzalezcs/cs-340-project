SET FOREIGN_KEY_CHECKS=0;
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

CREATE TABLE authors (
  id int(11) NOT NULL AUTO_INCREMENT,
  name varchar(255) NOT NULL,
  birth_date date NOT NULL,
  created_at timestamp NOT NULL DEFAULT current_timestamp(),
  updated_at timestamp NULL DEFAULT NULL,
  PRIMARY KEY (id),
  CONSTRAINT unique_author UNIQUE (name,birth_date)
);

-- --------------------------------------------------------

--
-- Table structure for table genres
--

CREATE TABLE genres (
  id int(11) NOT NULL AUTO_INCREMENT,
  name varchar(255) NOT NULL,
  created_at timestamp NOT NULL DEFAULT current_timestamp(),
  updated_at timestamp NULL DEFAULT NULL,
  PRIMARY KEY (id),
  CONSTRAINT unique_genre UNIQUE (name)
);

-- --------------------------------------------------------

--
-- Table structure for table books
--

CREATE TABLE books (
  id int(11) NOT NULL AUTO_INCREMENT,
  title varchar(255) NOT NULL,
  genre_id int(11) NOT NULL,
  isbn varchar(20) DEFAULT NULL,
  cover_image varchar(255) DEFAULT NULL,
  quantity_available int(11) NOT NULL,
  quantity_rented int(11) NOT NULL,
  created_at timestamp NOT NULL DEFAULT current_timestamp(),
  updated_at timestamp NULL DEFAULT NULL,
  PRIMARY KEY (id),
  FOREIGN KEY (genre_id) REFERENCES genres(id) ON DELETE RESTRICT
);

-- --------------------------------------------------------

--
-- Table structure for table book_authors
--

CREATE TABLE book_authors (
  book_id int(11) NOT NULL,
  author_id int(11) NOT NULL,
  created_at timestamp NOT NULL DEFAULT current_timestamp(),
  updated_at timestamp NULL DEFAULT NULL,
  PRIMARY KEY (book_id,author_id),
  FOREIGN KEY (book_id) REFERENCES books(id) ON DELETE CASCADE,
  FOREIGN KEY (author_id) REFERENCES authors(id) ON DELETE CASCADE
);

-- --------------------------------------------------------

--
-- Table structure for table user_roles
--

CREATE TABLE user_roles (
  id int(11) NOT NULL AUTO_INCREMENT,
  type varchar(255) NOT NULL,
  created_at timestamp NOT NULL DEFAULT current_timestamp(),
  updated_at timestamp NULL DEFAULT NULL,
  PRIMARY KEY (id),
  CONSTRAINT unique_user_role UNIQUE (type)
);

-- --------------------------------------------------------

--
-- Table structure for table users
--

CREATE TABLE users (
  id int(11) NOT NULL AUTO_INCREMENT,
  user_role_id int(11) NOT NULL,
  first_name varchar(255) NOT NULL,
  last_name varchar(255) NOT NULL,
  email varchar(255) NOT NULL,
  address_line_1 varchar(255) DEFAULT NULL,
  address_line_2 varchar(255) DEFAULT NULL,
  city varchar(50) DEFAULT NULL,
  state varchar(50) DEFAULT NULL,
  password varchar(255) NOT NULL,
  password_updated_at timestamp NULL DEFAULT NULL,
  created_at timestamp NOT NULL DEFAULT current_timestamp(),
  updated_at timestamp NULL DEFAULT NULL,
  PRIMARY KEY (id),
  FOREIGN KEY (user_role_id) REFERENCES user_roles(id) ON DELETE RESTRICT,
  CONSTRAINT unique_user UNIQUE (email)
);

-- --------------------------------------------------------

--
-- Table structure for table rental_list_books
--

CREATE TABLE rental_list_books (
  user_id int(11) NOT NULL,
  book_id int(11) NOT NULL,
  created_at timestamp NOT NULL DEFAULT current_timestamp(),
  updated_at timestamp NULL DEFAULT NULL,
  PRIMARY KEY (user_id,book_id),
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (book_id) REFERENCES books(id) ON DELETE CASCADE
);

-- --------------------------------------------------------

--
-- Table structure for table wish_list_books
--

CREATE TABLE wish_list_books (
  user_id int(11) NOT NULL,
  book_id int(11) NOT NULL,
  created_at timestamp NOT NULL DEFAULT current_timestamp(),
  updated_at timestamp NULL DEFAULT NULL,
  PRIMARY KEY (user_id,book_id),
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (book_id) REFERENCES books(id) ON DELETE CASCADE
);


-- --------------------------------------------------------

--
-- Insert Authors
-- 

INSERT INTO authors (name, birth_date) 
VALUES ('Adiana Pavlishchev', '2020-07-11'),
('Perren Benzi', '2020-11-16'),
('Berne Yele', '2019-03-22'),
('Robbi Feild', '2020-01-06'),
('Thomasin Seakin', '2019-08-11');

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
VALUES ('lobortis vel dapibus at diam nam tristique tortor eu', 4, '488010340-3', 'http://dummyimage.com/220x.png/dddddd/000000', 13, 10),
('bibendum imperdiet nullam orci pede venenatis non sodales sed', 1, '255899754-8', 'http://dummyimage.com/167x.png/5fa2dd/ffffff', 15, 9),
('nisi venenatis tristique fusce', 3, '930917083-2', 'http://dummyimage.com/222x.png/cc0000/ffffff', 17, 11),
('aliquet massa id lobortis convallis tortor risus dapibus augue', 2, '064063105-3', 'http://dummyimage.com/234x.png/ff4444/ffffff', 17, 3),
('nulla ultrices aliquet maecenas', 4, '941228042-4', 'http://dummyimage.com/160x.png/ff4444/ffffff', 14, 9),
('nulla quisque arcu libero rutrum', 4, '711009564-9', 'http://dummyimage.com/153x.png/ff4444/ffffff', 20, 7),
('in leo maecenas pulvinar lobortis est phasellus', 3, '588823922-4', 'http://dummyimage.com/203x.png/cc0000/ffffff', 17, 10),
('quisque ut erat curabitur gravida nisi at', 5, '810394541-2', 'http://dummyimage.com/182x.png/dddddd/000000', 13, 6),
('auctor gravida sem praesent id', 3, '363704582-6', 'http://dummyimage.com/209x.png/ff4444/ffffff', 15, 11),
('in est risus auctor sed tristique in tempus sit', 1, '663570720-4', 'http://dummyimage.com/218x.png/5fa2dd/ffffff', 12, 11);

-- --------------------------------------------------------

--
-- Insert Book Authors
-- 

INSERT INTO book_authors (book_id, author_id)
VALUES (1, 1),
(1, 2),
(2, 3),
(3, 3),
(4, 5),
(5, 1),
(6, 2),
(7, 5),
(8, 4),
(9, 5),
(9, 1),
(10, 2);

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
VALUES (1, 'Baryram', 'Basil', 'bbasil0@thetimes.co.uk', '6 Farwell Trail', NULL, 'New York City', 'New York', 'ai2lYKdzx'),
(1, 'Kerry', 'Wybern', 'kwybern6@paginegialle.it', '24448 Stang Street', 'Suite 3', 'Lancaster', 'Pennsylvania', 'vSK0NgLFBIo'),
(3, 'Christye', 'Vinck', 'cvinck1@washington.edu', '188 Tennyson Plaza', NULL, 'Reno', 'Nevada', 'xcKqRge9j'),
(2, 'Gwenni', 'Preece', 'gpreece2@seesaa.net', '4 Melody Plaza', 'Apartment 4', 'Denver', 'Colorado', 'gFO5UApqA'),
(2, 'Glennis', 'Spours', 'gspours3@sohu.com', '21 Memorial Crossing', NULL, 'Sacramento', 'California', 'cUH5NAwdG5zR'),
(4, 'Saba', 'Bainton', 'sbainton4@sohu.com', '1771 Scoville Street', NULL, 'Jacksonville', 'Florida', '6be40v'),
(4, 'Maxine', 'Kiellor', 'mkiellor5@amazon.co.jp', '347 Kropf Drive', 'Suite 451', 'Memphis', 'Tennessee', 'rztKgHD'),
(4, 'Deerdre', 'Van Bruggen', 'dvanbruggen7@soup.io', '371 Lindbergh Road', NULL, 'Atlanta', 'Georgia', 'sM9ksN4wN'),
(4, 'Waverly', 'Wellbeloved', 'wwellbeloved8@sogou.com', '096 Coleman Trail', NULL, 'Oklahoma City', 'Oklahoma', 'k5eyFr'),
(4, 'Pauly', 'Guidotti', 'pguidotti9@ucoz.ru', '49 Debs Center', NULL, 'Grand Rapids', 'Michigan', 'k5Wr95');

-- --------------------------------------------------------

--
-- Insert Rental List Books
-- 

INSERT INTO rental_list_books (user_id, book_id) 
VALUES (6, 9),
(6, 2),
(7, 9),
(7, 6),
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
VALUES (6, 3),
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


SET FOREIGN_KEY_CHECKS=1;
COMMIT;
