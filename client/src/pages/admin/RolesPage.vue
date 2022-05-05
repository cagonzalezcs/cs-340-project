<script setup>

</script>

<template>
  <div id='header'>
    <h1>Roles</h1>
    <p>View All User Roles | Add User Roles | Update User Roles | Delete User Roles</p>
  </div>
  <div id='browseRoles'>
    <table border='1' cellpadding='5' style='margin-left: auto; margin-right: auto;'>
      <tr>
        <th>id</th>
        <th>type</th>
        <th></th>
        <th><a href='#'>Add Role</a></th>
      </tr>
      <tr>
        <td>1</td>
        <td>admin</td>
        <td><a href='#'>Edit</a></td>
        <td><a href='#'>Delete</a></td>
      </tr>
      <tr>
        <td>2</td>
        <td>manager</td>
        <td><a href='#'>Edit</a></td>
        <td><a href='#'>Delete</a></td>
      </tr>
      <tr>
        <td>3</td>
        <td>sales</td>
        <td><a href='#'>Edit</a></td>
        <td><a href='#'>Delete</a></td>
      </tr>
      <tr>
        <td>4</td>
        <td>customer</td>
        <td><a href='#'>Edit</a></td>
        <td><a href='#'>Delete</a></td>
      </tr>
    </table>
  </div><!-- browse -->
  <p>&nbsp;</p>
  <div id='insert'>
    <form id='addRole' method='POST'>
      <legend><strong>Add User Role</strong></legend>
      <fieldset class='fields'>
        <label> type </label> <input type='text' name='type'>
      </fieldset>
      <input id='addRole' class='btn' type='submit' value='Add New Role'>
      <input class='btn' type='button' value='Cancel'>
    </form>
  </div><!-- insert -->
  <p>&nbsp;</p>
  <div id='update'>
    <form id='updateRole' method='POST'>
      <legend><strong>Edit Role</strong></legend>
      <fieldset class='fields'>
        <label> type </label> <input type='text' name='type' value='admin'>
      </fieldset>
      <input id='editRole' class='btn' type='submit' value='Edit Role'>
      <input class='btn' type='button' value='Cancel'>
    </form>
  </div><!-- update -->
  <p>&nbsp;</p>
  <div id='delete' style='display: block'>
    <form id='deleteRole' method='POST'>
      <legend><strong>Delete User Role</strong></legend>
      <fieldset class='fields'>
        <p>Are you sure you wish to delete the following?</p>
        <input id='deleteUserRoleID' type='hidden' name='user_role_ID' value='1'>
        <label><strong>ID:</strong></label> 1
        <label> <strong>Type</strong> </label> admin
      </fieldset>
      <input id='deleteRole' class='btn' type='submit' value='Delete Role'>
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
