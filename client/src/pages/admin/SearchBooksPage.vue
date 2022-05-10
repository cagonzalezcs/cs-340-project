<script setup>

</script>

<template>
  <div>
    <h1>Search Books</h1>
    <p>Search for Books by: Genre, Title or Author</p>
  </div>
  <div id='search' style='display: block'>
    <form id='searchBookGenres' method='POST'>
      <legend><strong>Select a Genre</strong></legend>
      <fieldset class='fields'>
        <label for='genre-id'> Genre: </label>
        <select id='genre-id'>
          <option value='0'>&nbsp;</option>
          <option value='1'>Non-Fiction</option>
          <option value='2'>Fiction</option>
          <option value='3'>Horror</option>
          <option value='4'>Comedy</option>
          <option value='5'>Drama</option>
        </select>
      </fieldset>
      <input id='BookSearchGenre' class='btn' type='submit' value='Search for Book'>
      <input class='btn' type='button' value='Cancel'>
    </form>
  </div><!-- search by genre -->
  <br />
  <div id='search' style='display: block'>
    <form id='searchBookTitles' method='POST'>
      <legend><strong>Enter a Title</strong></legend>
      <label for='book-title'> Title: </label>
      <input id='book-title' type='text' name='book-title'>
      <input id='BookSearchTitle' class='btn' type='submit' value='Search for Book'>
      <input class='btn' type='button' value='Cancel'>
    </form>
  </div><!-- search by title -->
  <br />
  <div id='search' style='display: block'>
    <form id='searchBookTitles' method='POST'>
      <legend><strong>Choose an Author</strong></legend>
      <fieldset class='fields'>
        <label for='author_id'> Genre: </label>
        <select id='author_id'>
          <option value='0'>&nbsp;</option>
          <option value='1'>Adiana Pavlishchev</option>
          <option value='2'>Perren Benzi</option>
          <option value='3'>Berne Yele</option>
          <option value='4'>Robbi Feild</option>
          <option value='5'>Thomasin Seakin</option>
        </select>
      </fieldset>
      <input id='BookSearchAuthor' class='btn' type='submit' value='Search for Book'>
      <input class='btn' type='button' value='Cancel'>
    </form>
  </div><!-- search by author -->
</template>

<style lang='scss' scoped>
form {
  width: 600px;
  margin-left: auto;
  margin-right: auto;

  .fields {
    text-align: left;
    display: flex;
    flex-direction: column;
    padding: 10px 25px 35px;
    margin-bottom: 20px;

    label {
      margin-top: 10px;
      margin-bottom: 3px;
      font-weight: 500;
    }
  }

  input[type="submit"],
  input[type="button"] {
    margin-left: 10px;
    margin-right: 10px;
    padding-left: 10px;
    padding-right: 10px;
  }
}
</style>
