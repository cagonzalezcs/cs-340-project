-- phpMyAdmin SQL Dump
-- version 5.1.3-2.el7.remi
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Apr 05, 2022 at 06:12 PM
-- Server version: 10.6.7-MariaDB-log
-- PHP Version: 7.4.28

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `cs340_lyonsked`
--

-- --------------------------------------------------------

--
-- Table structure for table `authors`
--

CREATE TABLE `authors` (
  `author_id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL DEFAULT 'unknown author',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

-- --------------------------------------------------------

--
-- Table structure for table `books`
--

CREATE TABLE `books` (
  `book_id` int(11) NOT NULL,
  `genre_id` int(11) NOT NULL,
  `title` varchar(255) NOT NULL,
  `isbn` varchar(255) DEFAULT NULL,
  `cover_image` varchar(255) DEFAULT NULL,
  `quantity_rented` int(11) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

-- --------------------------------------------------------

--
-- Table structure for table `book_authors`
--

CREATE TABLE `book_authors` (
  `book_authors_id` int(11) NOT NULL,
  `authors_author_id` int(11) NOT NULL,
  `books_book_id` int(11) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

-- --------------------------------------------------------

--
-- Table structure for table `genres`
--

CREATE TABLE `genres` (
  `genre_id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL DEFAULT 'no genre',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

-- --------------------------------------------------------

--
-- Table structure for table `rental_lists`
--

CREATE TABLE `rental_lists` (
  `rental_list_id` int(11) NOT NULL,
  `users_user_id` int(11) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

-- --------------------------------------------------------

--
-- Table structure for table `rental_list_books`
--

CREATE TABLE `rental_list_books` (
  `rental_list_book_id` int(11) NOT NULL,
  `books_book_id` int(11) NOT NULL,
  `rental_lists_rental_list_id` int(11) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `user_id` int(11) NOT NULL,
  `first_name` varchar(255) NOT NULL,
  `last_name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `password_updated_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

-- --------------------------------------------------------

--
-- Table structure for table `user_relationships`
--

CREATE TABLE `user_relationships` (
  `user_relationship_id` int(11) NOT NULL,
  `users_user_id` int(11) NOT NULL,
  `users2_user_id` int(11) NOT NULL,
  `type` varchar(30) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

-- --------------------------------------------------------

--
-- Table structure for table `wish_lists`
--

CREATE TABLE `wish_lists` (
  `wish_list_id` int(11) NOT NULL,
  `users_user_id` int(11) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

-- --------------------------------------------------------

--
-- Table structure for table `wish_list_books`
--

CREATE TABLE `wish_list_books` (
  `wish_list_book_id` int(11) NOT NULL,
  `wish_lists_wish_list_id` int(11) NOT NULL,
  `books_book_id` int(11) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `authors`
--
ALTER TABLE `authors`
  ADD PRIMARY KEY (`author_id`);

--
-- Indexes for table `books`
--
ALTER TABLE `books`
  ADD PRIMARY KEY (`book_id`,`genre_id`),
  ADD KEY `fk_books_genres1_idx` (`genre_id`);

--
-- Indexes for table `book_authors`
--
ALTER TABLE `book_authors`
  ADD PRIMARY KEY (`book_authors_id`,`authors_author_id`,`books_book_id`),
  ADD KEY `fk_book_authors_books1_idx` (`books_book_id`),
  ADD KEY `fk_book_authors_authors1` (`authors_author_id`);

--
-- Indexes for table `genres`
--
ALTER TABLE `genres`
  ADD PRIMARY KEY (`genre_id`);

--
-- Indexes for table `rental_lists`
--
ALTER TABLE `rental_lists`
  ADD PRIMARY KEY (`rental_list_id`,`users_user_id`),
  ADD KEY `fk_rental_lists_users1_idx` (`users_user_id`);

--
-- Indexes for table `rental_list_books`
--
ALTER TABLE `rental_list_books`
  ADD PRIMARY KEY (`rental_list_book_id`,`books_book_id`,`rental_lists_rental_list_id`),
  ADD KEY `fk_rental_list_books_books1_idx` (`books_book_id`),
  ADD KEY `fk_rental_list_books_rental_lists1_idx` (`rental_lists_rental_list_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`user_id`);

--
-- Indexes for table `user_relationships`
--
ALTER TABLE `user_relationships`
  ADD PRIMARY KEY (`user_relationship_id`,`users_user_id`),
  ADD KEY `fk_user_relationships_users1_idx` (`users_user_id`);

--
-- Indexes for table `wish_lists`
--
ALTER TABLE `wish_lists`
  ADD PRIMARY KEY (`wish_list_id`,`users_user_id`),
  ADD KEY `fk_wish_lists_users1_idx` (`users_user_id`);

--
-- Indexes for table `wish_list_books`
--
ALTER TABLE `wish_list_books`
  ADD PRIMARY KEY (`wish_list_book_id`,`wish_lists_wish_list_id`,`books_book_id`),
  ADD KEY `fk_wish_list_books_wish_lists1_idx` (`wish_lists_wish_list_id`),
  ADD KEY `fk_wish_list_books_books1_idx` (`books_book_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `authors`
--
ALTER TABLE `authors`
  MODIFY `author_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `books`
--
ALTER TABLE `books`
  MODIFY `book_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `book_authors`
--
ALTER TABLE `book_authors`
  MODIFY `book_authors_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `genres`
--
ALTER TABLE `genres`
  MODIFY `genre_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `rental_lists`
--
ALTER TABLE `rental_lists`
  MODIFY `rental_list_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `rental_list_books`
--
ALTER TABLE `rental_list_books`
  MODIFY `rental_list_book_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `user_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `user_relationships`
--
ALTER TABLE `user_relationships`
  MODIFY `user_relationship_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `wish_lists`
--
ALTER TABLE `wish_lists`
  MODIFY `wish_list_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `wish_list_books`
--
ALTER TABLE `wish_list_books`
  MODIFY `wish_list_book_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `books`
--
ALTER TABLE `books`
  ADD CONSTRAINT `fk_books_genres1` FOREIGN KEY (`genre_id`) REFERENCES `genres` (`genre_id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Constraints for table `book_authors`
--
ALTER TABLE `book_authors`
  ADD CONSTRAINT `fk_book_authors_authors1` FOREIGN KEY (`authors_author_id`) REFERENCES `authors` (`author_id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_book_authors_books1` FOREIGN KEY (`books_book_id`) REFERENCES `books` (`book_id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Constraints for table `rental_lists`
--
ALTER TABLE `rental_lists`
  ADD CONSTRAINT `fk_rental_lists_users1` FOREIGN KEY (`users_user_id`) REFERENCES `users` (`user_id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Constraints for table `rental_list_books`
--
ALTER TABLE `rental_list_books`
  ADD CONSTRAINT `fk_rental_list_books_books1` FOREIGN KEY (`books_book_id`) REFERENCES `books` (`book_id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_rental_list_books_rental_lists1` FOREIGN KEY (`rental_lists_rental_list_id`) REFERENCES `rental_lists` (`rental_list_id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Constraints for table `user_relationships`
--
ALTER TABLE `user_relationships`
  ADD CONSTRAINT `fk_user_relationships_users1` FOREIGN KEY (`users_user_id`) REFERENCES `users` (`user_id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Constraints for table `wish_lists`
--
ALTER TABLE `wish_lists`
  ADD CONSTRAINT `fk_wish_lists_users1` FOREIGN KEY (`users_user_id`) REFERENCES `users` (`user_id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Constraints for table `wish_list_books`
--
ALTER TABLE `wish_list_books`
  ADD CONSTRAINT `fk_wish_list_books_books1` FOREIGN KEY (`books_book_id`) REFERENCES `books` (`book_id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_wish_list_books_wish_lists1` FOREIGN KEY (`wish_lists_wish_list_id`) REFERENCES `wish_lists` (`wish_list_id`) ON DELETE NO ACTION ON UPDATE NO ACTION;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
