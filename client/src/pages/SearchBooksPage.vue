<script setup>

</script>

<template>
  <div>
    <h1>Search Books</h1>
    <p>Search for Books by: Genre, Title or Author</p>
  </div>
  <div id="search" style="display: block">
        <form method="POST" id="searchBookGenres">
            <legend><strong>Select a Genre</strong></legend>
            <fieldset class="fields">
                <label> Genre: </label> 
                <select name="genre_id">
                  <option value="0">&nbsp;</option>
                  <option value="1">Non-Fiction</option>
                  <option value="2">Fiction</option>
                  <option value="3">Horror</option>
                  <option value="4">Comedy</option>
                  <option value="5">Drama</option>
                </select>    
            </fieldset>
            <input class="btn" type="submit" id="BookSearchGenre" value="Search for Book">
            <input class="btn" type="button" value="Cancel">
        </form> 
    </div><!-- search by genre -->
    <p>&nbsp;</p>
    <div id="search" style="display: block">
        <form method="POST" id="searchBookTitles">
            <legend><strong>Enter a Title</strong></legend>
            <label> Title: </label> 
            <input type="text" name="book_search_title">
            <input class="btn" type="submit" id="BookSearchTitle" value="Search for Book">
            <input class="btn" type="button" value="Cancel">
        </form> 
    </div><!-- search by title -->
    <p>&nbsp;</p>
    <div id="search" style="display: block">
        <form method="POST" id="searchBookTitles">
            <legend><strong>Choose an Author</strong></legend>
            <fieldset class="fields">
                <label> Genre: </label> 
                <select name="author_id">
                  <option value="0">&nbsp;</option>
                  <option value="1">Adiana Pavlishchev</option>
                  <option value="2">Perren Benzi</option>
                  <option value="3">Berne Yele</option>
                  <option value="4">Robbi Feild</option>
                  <option value="5">Thomasin Seakin</option>
                </select>    
            </fieldset>
            <input class="btn" type="submit" id="BookSearchAuthor" value="Search for Book">
            <input class="btn" type="button" value="Cancel">
        </form> 
    </div><!-- search by author -->
</template>