<script setup>

</script>

<template>
  <div>
    <h1>Search Books</h1>
    <p>Search for Books by: Genre, Title, ISBN</p>
  </div>
  <div id="search" style="display: block">
        <form method="POST" id="searchBooks">
            <legend><strong>Search For Book</strong></legend>
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
                <label> Title: </label>
                <input type="text">      
                <label> ISBN: </label>
                <input type="text">       
            </fieldset>
            <input class="btn" type="submit" id="DeleteUser" value="Search for Book">
            <input class="btn" type="button" value="Cancel">
        </form> 
    </div><!-- search -->
</template>