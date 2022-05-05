<script setup>

</script>

<template>
  <div id='wishLists'>
    <h1>All Wish Lists</h1>
    <p>Manage Wish Lists</p>
    <router-link to='/admin/users' style='margin-right: 10px'>Back to Users</router-link>
    <p>&nbsp;</p>
  </div>
  <div id='browseWishLists'>
    <table border='1' cellpadding='5' style='margin-left: auto; margin-right: auto;'>
      <tr>
        <th>user_id</th>
        <th></th>
        <th>Actions</th>
      </tr>
      <tr>
        <td>1</td>
        <td><a href='#'>View</a></td>
        <td><a href='#'>Delete</a></td>

      </tr>
      <tr>
        <td>2</td>
        <td><a href='#'>View</a></td>
        <td><a href='#'>Delete</a></td>
      </tr>
      <tr>
        <td>3</td>
        <td><a href='#'>View</a></td>
        <td><a href='#'>Delete</a></td>
      </tr>
      <tr>
        <td>4</td>
        <td><a href='#'>View</a></td>
        <td><a href='#'>Delete</a></td>
      </tr>
      <tr>
        <td>5</td>
        <td><a href='#'>View</a></td>
        <td><a href='#'>Delete</a></td>
      </tr>
      <tr>
        <td>6</td>
        <td><a href='#'>View</a></td>
        <td><a href='#'>Delete</a></td>
      </tr>
      <tr>
        <td>7</td>
        <td><a href='#'>View</a></td>
        <td><a href='#'>Delete</a></td>
      </tr>
      <tr>
        <td>8</td>
        <td><a href='#'>View</a></td>
        <td><a href='#'>Delete</a></td>
      </tr>
      <tr>
        <td>9</td>
        <td><a href='#'>View</a></td>
        <td><a href='#'>Delete</a></td>
      </tr>
      <tr>
        <td>10</td>
        <td><a href='#'>View</a></td>
        <td><a href='#'>Delete</a></td>
      </tr>
    </table>
  </div><!-- browse -->
  <p>&nbsp;</p>
  <div id='viewWishList'>
    <p><strong>All Wish List Books for user_id: 1</strong></p>
    <table border='1' cellpadding='5' style='margin-left: auto; margin-right: auto;'>
      <tr>
        <th>book_id</th>
        <th>title</th>
        <th></th>
      </tr>
      <tr>
        <td>3</td>
        <td>nisi venenatis tristique fusce</td>
        <td><a href='#'>Delete</a></td>
      </tr>
      <tr>
        <td>9</td>
        <td>auctor gravida sem praesent id</td>
        <td><a href='#'>Delete</a></td>
      </tr>
      <tr>
        <td>7</td>
        <td>in leo maecenas pulvinar lobortis est phasellus</td>
        <td><a href='#'>Delete</a></td>
      </tr>
      <tr>
        <td>2</td>
        <td>bibendum imperdiet nullam orci pede venenatis non ...</td>
        <td><a href='#'>Delete</a></td>
      </tr>
    </table>
  </div><!-- viewWishList -->
  <p>&nbsp;</p>
  <div id='delete' style='display: block'>
    <form id='deleteWishListBook' method='POST'>
      <legend><strong>Delete Book from Wish List</strong></legend>
      <fieldset class='fields'>
        <p>Are you sure you wish to delete the following Wish List item?</p>
        <input id='deleteWishListBook' type='hidden' name='bookID' value='3'>
        <label><strong>user_id:</strong></label> 1
        <label><strong>book_id:</strong></label> 3
        <label><strong>title:</strong> </label> nisi venenatis tristique fusce
      </fieldset>
      <input id='DeleteUser' class='btn' type='submit' value='Delete Book From Wish List'>
      <input class='btn' type='button' value='Cancel'>
    </form>
  </div><!-- deleteWishListItem -->
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
