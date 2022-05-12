<script setup>

</script>

<template>
  <div id='rentalLists'>
    <h1>All Rental Lists</h1>
    <p>Manage Rental Lists</p>
    <router-link to='/admin/users' style='margin-right: 10px'>Back to Users</router-link>
    <br />
  </div>
  <div id='browseRentalLists'>
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
  </div><!-- browseRentalList -->
  <br />
  <div id='viewRentalList'>
    <p><strong>All Rental List Books for user_id: 1</strong></p>
    <table border='1' cellpadding='5' style='margin-left: auto; margin-right: auto;'>
      <tr>
        <th>book_id</th>
        <th>title</th>
        <th></th>
      </tr>
      <tr>
        <td>10</td>
        <td>in est risus auctor sed tristique in tempus sit</td>
        <td><a href='#'>Delete</a></td>
      </tr>
      <tr>
        <td>8</td>
        <td>quisque ut erat curabitur gravida nisi at</td>
        <td><a href='#'>Delete</a></td>
      </tr>
    </table>
  </div><!-- viewRentalList -->
  <br />
  <div id='delete' style='display: block'>
    <form id='deleteRentalListBook' method='POST'>
      <legend><strong>Delete Book from Rental List</strong></legend>
      <fieldset class='fields'>
        <p>Are you sure you wish to delete the following Rental List item?</p>
        <input id='deleteRentalListBook' type='hidden' name='bookID' value='3'>
        <label><strong>user_id:</strong></label> 1
        <label><strong>book_id:</strong></label> 10
        <label><strong>title:</strong> </label> in est risus auctor sed tristique in tempus sit
      </fieldset>
      <input id='DeleteUser' class='btn' type='submit' value='Delete Book From Rental List'>
      <input class='btn' type='button' value='Cancel'>
    </form>
  </div><!-- deleteRentalListItem -->
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
