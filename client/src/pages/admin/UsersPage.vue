<script setup>

</script>

<template>
  <div>
    <h1>Users</h1>
    <p>View All User Data | Add New Users | Update Users | Delete Users</p>
    <router-link to='/admin/rental-lists' style='margin-right: 10px'>View Rental Lists</router-link>
    <router-link to='/admin/wish-lists' style='margin-right: 10px'>View Wish Lists</router-link>
    <p>&nbsp;</p>
  </div>
  <div id='browse'>
    <table border='1' cellpadding='5' style='margin-left: auto; margin-right: auto;'>
      <tr>
        <th>id</th>
        <th>user_role_id</th>
        <th>first_name</th>
        <th>last_name</th>
        <th>email</th>
        <th>address_line_1</th>
        <th>address_line_2</th>
        <th>city</th>
        <th>state</th>
        <th></th>
        <th></th>
        <th></th>
        <th><a href='#'>Add </a></th>
      </tr>
      <tr>
        <td>1</td>
        <td>1</td>
        <td>Baryram</td>
        <td>Basil</td>
        <td>bbasil0@thetimes.co.uk</td>
        <td>6 Farwell Trail</td>
        <td>NULL</td>
        <td>New York City</td>
        <td>New York</td>
        <td><a href='#'>Wish List</a></td>
        <td><a href='#'>Rental List</a></td>
        <td><a href='#'>Edit</a></td>
        <td><a href='#'>Delete</a></td>
      </tr>
      <tr>
        <td>2</td>
        <td>1</td>
        <td>Kerry</td>
        <td>Wybern</td>
        <td>kwybern6@paginegialle.it</td>
        <td>24448 Stang Street</td>
        <td>Suite 3</td>
        <td>Lancaster</td>
        <td>Pennsylvania</td>
        <td><a href='#'>Wish List</a></td>
        <td><a href='#'>Rental List</a></td>
        <td><a href='#'>Edit</a></td>
        <td><a href='#'>Delete</a></td>
      </tr>
      <tr>
        <td>3</td>
        <td>3</td>
        <td>Christye</td>
        <td>Vinck</td>
        <td>cvinck1@washington.edu</td>
        <td>188 Tennyson Plaza</td>
        <td>NULL</td>
        <td>Reno</td>
        <td>Nevada</td>
        <td><a href='#'>Wish List</a></td>
        <td><a href='#'>Rental List</a></td>
        <td><a href='#'>Edit</a></td>
        <td><a href='#'>Delete</a></td>
      </tr>
      <tr>
        <td>4</td>
        <td>2</td>
        <td>Gwenni</td>
        <td>Preece</td>
        <td>gpreece2@seesaa.net</td>
        <td>4 Melody Plaza</td>
        <td>Apartment 4</td>
        <td>Denver</td>
        <td>Colorado</td>
        <td><a href='#'>Wish List</a></td>
        <td><a href='#'>Rental List</a></td>
        <td><a href='#'>Edit</a></td>
        <td><a href='#'>Delete</a></td>
      </tr>
      <tr>
        <td>5</td>
        <td>2</td>
        <td>Glennis</td>
        <td>Spours</td>
        <td>gspours3@sohu.com</td>
        <td>21 Memorial Crossing</td>
        <td>NULL</td>
        <td>Sacramento</td>
        <td>California</td>
        <td><a href='#'>Wish List</a></td>
        <td><a href='#'>Rental List</a></td>
        <td><a href='#'>Edit</a></td>
        <td><a href='#'>Delete</a></td>
      </tr>
      <tr>
        <td>6</td>
        <td>4</td>
        <td>Saba</td>
        <td>Bainton</td>
        <td>sbainton4@sohu.com</td>
        <td>1771 Scoville Street</td>
        <td>NULL</td>
        <td>Jacksonville</td>
        <td>Florida</td>
        <td><a href='#'>Wish List</a></td>
        <td><a href='#'>Rental List</a></td>
        <td><a href='#'>Edit</a></td>
        <td><a href='#'>Delete</a></td>
      </tr>
      <tr>
        <td>7</td>
        <td>4</td>
        <td>Maxine</td>
        <td>Kiellor</td>
        <td>mkiellor5@amazon.co.jp</td>
        <td>347 Kropf Drive</td>
        <td>Suite 451</td>
        <td>Memphis</td>
        <td>Tennessee</td>
        <td><a href='#'>Wish List</a></td>
        <td><a href='#'>Rental List</a></td>
        <td><a href='#'>Edit</a></td>
        <td><a href='#'>Delete</a></td>
      </tr>
      <tr>
        <td>8</td>
        <td>4</td>
        <td>Deerdre</td>
        <td>Van Bruggen</td>
        <td>dvanbruggen7@soup.io</td>
        <td>371 Lindbergh Road</td>
        <td>NULL</td>
        <td>Atlanta</td>
        <td>Georgia</td>
        <td><a href='#'>Wish List</a></td>
        <td><a href='#'>Rental List</a></td>
        <td><a href='#'>Edit</a></td>
        <td><a href='#'>Delete</a></td>
      </tr>
      <tr>
        <td>9</td>
        <td>4</td>
        <td>Waverly</td>
        <td>Wellbeloved</td>
        <td>wwellbeloved8@sogou.com</td>
        <td>096 Coleman Trail</td>
        <td>NULL</td>
        <td>Oklahoma City</td>
        <td>Oklahoma</td>
        <td><a href='#'>Wish List</a></td>
        <td><a href='#'>Rental List</a></td>
        <td><a href='#'>Edit</a></td>
        <td><a href='#'>Delete</a></td>
      </tr>
      <tr>
        <td>10</td>
        <td>4</td>
        <td>Pauly</td>
        <td>Guidotti</td>
        <td>pguidotti9@ucoz.ru</td>
        <td>347 Kropf Drive</td>
        <td>NULL</td>
        <td>Grand Rapids</td>
        <td>Michigan</td>
        <td><a href='#'>Wish List</a></td>
        <td><a href='#'>Rental List</a></td>
        <td><a href='#'>Edit</a></td>
        <td><a href='#'>Delete</a></td>
      </tr>
    </table>
  </div><!-- browse -->
  <p>&nbsp;</p>
  <div id='insert'>
    <form id='addUser' method='POST'>
      <legend><strong>Add User</strong></legend>
      <fieldset class='fields'>
        <label> user_role_id </label>
        <select name='user_role_id'>
          <option value='0'>&nbsp;</option>
          <option value='1'>admin</option>
          <option value='2'>manager</option>
          <option value='3'>sales</option>
          <option value='4'>customer</option>
        </select>
        <label> first_name </label> <input type='text' name='first_name'>
        <label> last_name </label> <input type='text' name='last_name'>
        <label> email </label> <input type='text' name='email'>
        <br>
        <label> address_line_1 </label> <input type='text' name='address_line_1'>
        <label> address_line_2 </label> <input type='text' name='address_line_2'>
        <label> city </label> <input type='text' name='city'>
        <label> state </label> <input type='text' name='state'>
      </fieldset>
      <input id='addUser' class='btn' type='submit' value='Add New User'>
      <input class='btn' type='button' value='Cancel'>
    </form>
  </div><!-- insert -->
  <p>&nbsp;</p>
  <div id='update'>
    <form id='updateUser' method='POST'>
      <legend><strong>Edit User</strong></legend>
      <fieldset class='fields'>
        <input id='updateUserID' type='hidden' name='userID' value='1'>
        <label> ID: </label> 1
        <label> user_role_id </label>
        <select name='user_role_id'>
          <option value='0'>&nbsp;</option>
          <option value='1' selected>admin</option>
          <option value='2'>manager</option>
          <option value='3'>sales</option>
          <option value='4'>customer</option>
        </select>
        <label> first_name </label> <input type='text' name='first_name' value='Baryram'>
        <label> last_name </label> <input type='text' name='last_name' value='Basil'>
        <label> email </label> <input type='text' name='email' value='bbasil0@thetimes.co.uk'>
        <br>
        <label> address_line_1 </label> <input type='text' name='address_line_1' value='6 Farwell Trail'>
        <label> address_line_2 </label> <input type='text' name='address_line_2' value='NULL'>
        <label> city </label> <input type='text' name='city' value='New York City'>
        <label> state </label> <input type='text' name='state' value='New York'>
      </fieldset>
      <input id='addUser' class='btn' type='submit' value='Update User'>
      <input class='btn' type='button' value='Cancel'>
    </form>
  </div><!-- update -->
  <p>&nbsp;</p>
  <div id='delete' style='display: block'>
    <form id='deleteUser' method='POST'>
      <legend><strong>Delete User</strong></legend>
      <fieldset class='fields'>
        <p>Are you sure you wish to delete the following?</p>
        <input id='deletepersonID' type='hidden' name='personID' value='1'>
        <label><strong>id:</strong></label> 1
        <label> <strong>first_name:</strong> </label> Baryram
        <label> <strong>last_name:</strong> </label> Basil
      </fieldset>
      <input id='DeleteUser' class='btn' type='submit' value='Delete User'>
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