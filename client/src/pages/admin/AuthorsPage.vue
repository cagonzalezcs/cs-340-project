<script setup>

</script>

<template>
  <div id='header'>
    <h1>Authors</h1>
    <p>View All Authors | Add New Authors | Update Authors | Delete Authors</p>
  </div>
  <div id='browseAuthors'>
    <table border='1' cellpadding='5' style='margin-left: auto; margin-right: auto;'>
      <tr>
        <th>id</th>
        <th>name</th>
        <th>birth_date</th>
        <th>books</th>
        <th></th>
        <th><a href='#'>Add Author</a></th>
      </tr>
      <tr>
        <td>1</td>
        <td>Adiana Pavlishchev</td>
        <td>2020-07-11</td>
        <td><a href='#'>View All Titles</a></td>
        <td><a href='#'>Edit</a></td>
        <td><a href='#'>Delete</a></td>
      </tr>
      <tr>
        <td>2</td>
        <td>Perren Benzi</td>
        <td>2020-11-16</td>
        <td><a href='#'>View All Titles</a></td>
        <td><a href='#'>Edit</a></td>
        <td><a href='#'>Delete</a></td>
      </tr>
      <tr>
        <td>3</td>
        <td>Berne Yele</td>
        <td>2019-03-22</td>
        <td><a href='#'>View All Titles</a></td>
        <td><a href='#'>Edit</a></td>
        <td><a href='#'>Delete</a></td>
      </tr>
      <tr>
        <td>4</td>
        <td>Robbi Feild</td>
        <td>2020-01-06</td>
        <td><a href='#'>View All Titles</a></td>
        <td><a href='#'>Edit</a></td>
        <td><a href='#'>Delete</a></td>
      </tr>
      <tr>
        <td>5</td>
        <td>Thomasin Seakin</td>
        <td>2019-08-11</td>
        <td><a href='#'>View All Titles</a></td>
        <td><a href='#'>Edit</a></td>
        <td><a href='#'>Delete</a></td>
      </tr>
    </table>
  </div><!-- browse -->
  <p>&nbsp;</p>
  <div id='insert'>
    <form id='addAuthor' method='POST'>
      <legend><strong>Add Author</strong></legend>
      <fieldset class='fields'>
        <label> name </label> <input type='text' name='name'>
        <label> birth_date </label> <input type='date' name='birth_date'>
      </fieldset>
      <input id='addAuthor' class='btn' type='submit' value='Add New Author'>
      <input class='btn' type='button' value='Cancel'>
    </form>
  </div><!-- insert -->
  <p>&nbsp;</p>
  <div id='update'>
    <form id='updateAuthor' method='POST'>
      <legend><strong>Edit Author</strong></legend>
      <fieldset class='fields'>
        <input id='updateAuthorID' type='hidden' name='author_ID' value='1'>
        <label for='author-name'> name </label> <input
id='author-name' type='text' name='name'
                                                       value='Adiana Pavlishchev'>
        <label for='author-birth-date'> birth_date </label> <input
id='author-birth-date' type='date' name='birth_date'
                                                                   value='2020-07-11'>
      </fieldset>
      <input id='editAuthor' class='btn' type='submit' value='Edit Author'>
      <input class='btn' type='button' value='Cancel'>
    </form>
  </div><!-- update -->
  <br />
  <div id='delete' style='display: block'>
    <form id='deleteAuthor' method='POST'>
      <legend><strong>Delete Author</strong></legend>
      <fieldset class='fields'>
        <p>Are you sure you wish to delete the following?</p>
        <input id='deleteAuthorID' type='hidden' name='author_ID' value='1'>
        <label><strong>id:</strong></label> 1
        <label> <strong>name:</strong> </label> Adiana Pavlishchev
      </fieldset>
      <input id='deleteAuthor' class='btn' type='submit' value='Delete Author'>
      <input class='btn' type='button' value='Cancel'>
    </form>
  </div><!-- delete -->
  <div id='bookAuthorsTable'>
    <h1>Books By Author</h1>
    <p>View All Books Written by author_id: 1</p>
  </div>
  <div id='viewBookAuthors'>
    <table border='1' cellpadding='5' style='margin-left: auto; margin-right: auto;'>
      <tr>
        <th>book_id</th>
        <th>title</th>
        <th>isbn</th>
      </tr>
      <tr>
        <td>1</td>
        <td>lobortis vel dapibus at diam nam tristique tortor ...</td>
        <td>488010340-3</td>
      </tr>
      <tr>
        <td>5</td>
        <td>nulla ultrices aliquet maecenas</td>
        <td>941228042-4</td>
      </tr>
      <tr>
        <td>9</td>
        <td>auctor gravida sem praesent id</td>
        <td>363704582-6</td>
      </tr>
    </table>
  </div><!-- viewBookAuthors -->
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