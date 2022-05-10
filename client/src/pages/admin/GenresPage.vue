<script setup>

</script>

<template>
  <div id='header'>
    <h1>Genres</h1>
    <p>View All Genres | Add New Genres | Update Genres | Delete Genres</p>
  </div>
  <div id='browseGenres'>
    <table border='1' cellpadding='5' style='margin-left: auto; margin-right: auto;'>
      <tr>
        <th>id</th>
        <th>name</th>
        <th></th>
        <th><a href='#'>Add Genre</a></th>
      </tr>
      <tr>
        <td>1</td>
        <td>Non-Fiction</td>
        <td><a href='#'>Edit</a></td>
        <td><a href='#'>Delete</a></td>
      </tr>
      <tr>
        <td>2</td>
        <td>Fiction</td>
        <td><a href='#'>Edit</a></td>
        <td><a href='#'>Delete</a></td>
      </tr>
      <tr>
        <td>3</td>
        <td>Horror</td>
        <td><a href='#'>Edit</a></td>
        <td><a href='#'>Delete</a></td>
      </tr>
      <tr>
        <td>4</td>
        <td>Comedy</td>
        <td><a href='#'>Edit</a></td>
        <td><a href='#'>Delete</a></td>
      </tr>
      <tr>
        <td>5</td>
        <td>Drama</td>
        <td><a href='#'>Edit</a></td>
        <td><a href='#'>Delete</a></td>
      </tr>
    </table>
  </div><!-- browse -->
  <br />
  <div id='insert'>
    <form id='addGenre' method='POST'>
      <legend><strong>Add Genre</strong></legend>
      <fieldset class='fields'>
        <label for='genre-name'> name </label> 
        <input id='genre-name' type='text' name='genreName'>
      </fieldset>
      <input id='addGenre' class='btn' type='submit' value='Add New Genre'>
      <input class='btn' type='button' value='Cancel'>
    </form>
  </div><!-- insert -->
  <br />
  <div id='update'>
    <form id='updateGenre' method='POST'>
      <legend><strong>Edit Genre</strong></legend>
      <fieldset class='fields'>
        <input id='updateGenre' type='hidden' name='genre_ID' value='1'>
        <label for='genre-name'> name </label> 
        <input id='genre-name' type='text' name='genreName' value='Non-Fiction'>
      </fieldset>
      <input id='editGenre' class='btn' type='submit' value='Edit Genre'>
      <input class='btn' type='button' value='Cancel'>
    </form>
  </div><!-- update -->
  <br />
  <div id='delete' style='display: block'>
    <form id='deleteGenre' method='POST'>
      <legend><strong>Delete Genre</strong></legend>
      <fieldset class='fields'>
        <p>Are you sure you wish to delete the following?</p>
        <p>It will set the Genre on all associated books to NULL</p>
        <input id='deleteGenre' type='hidden' name='genre_ID' value='1'>
        <label><strong>id:</strong></label> 1
        <label> <strong>name:</strong> </label> Non-Fiction
      </fieldset>
      <input id='deleteGenre' class='btn' type='submit' value='Delete Genre'>
      <input class='btn' type='button' value='Cancel'>
    </form>
  </div><!-- delete -->
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
