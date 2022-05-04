<script setup>

</script>

<template>
    <div id="header">
        <h1>Roles</h1>
        <p>View All User Roles | Add User Roles | Update User Roles | Delete User Roles</p>
    </div>
    <div id="browseRoles">
    <table border="1" cellpadding="5" style="margin-left: auto; margin-right: auto;">
        <tr>
            <th>id</th>
            <th>type</th>
            <th></th>
            <th><a href="#" onClick="newRole()">Add Role</a></th>
        </tr>
        <tr>
            <td>1</td>
            <td>admin</td>
            <td><a href="#" onclick="updateRole('this.user_role_ID')">Edit</a></td>
            <td><a href="#" onclick="deleteRole('this.user_role_ID')">Delete</a></td>
        </tr>
        <tr>
            <td>2</td>
            <td>manager</td>
            <td><a href="#" onclick="updateRole('this.user_role_ID')">Edit</a></td>
            <td><a href="#" onclick="deleteRole('this.user_role_ID')">Delete</a></td>
        </tr>
        <tr>
            <td>3</td>
            <td>sales</td>
            <td><a href="#" onclick="updateRole('this.user_role_ID')">Edit</a></td>
            <td><a href="#" onclick="deleteRole('this.user_role_ID')">Delete</a></td>
        </tr>
        <tr>
            <td>4</td>
            <td>customer</td>
            <td><a href="#" onclick="updateRole('this.user_role_ID')">Edit</a></td>
            <td><a href="#" onclick="deleteRole('this.user_role_ID')">Delete</a></td>
        </tr>
    </table>
    </div><!-- browse -->
    <p>&nbsp;</p>
    <div id="insert">
      <form method="POST" id="addRole">
        <legend><strong>Add User Role</strong></legend>
          <fieldset class="fields">
            <label> type </label> <input type="text" name="type">
      </fieldset>
          <input class="btn" type="submit" id="addRole" value="Add New Role">
          <input class="btn" type="button" value="Cancel" onClick="browseRoles()">
	</form> 
    </div><!-- insert -->
    <p>&nbsp;</p>
    <div id="update">
      <form method="POST" id="updateRole">
        <legend><strong>Edit Role</strong></legend>
          <fieldset class="fields">
            <label> type </label> <input type="text" name="type" value="admin">
      </fieldset>
          <input class="btn" type="submit" id="editRole" value="Edit Role">
          <input class="btn" type="button" value="Cancel" onClick="browseRoles()">
	</form> 
    </div><!-- update -->
    <p>&nbsp;</p>
    <div id="delete" style="display: block">
    <form method="POST" id="deleteRole">
        <legend><strong>Delete User Role</strong></legend>
            <fieldset class="fields">
            <p>Are you sure you wish to delete the following?</p>
            <input type="hidden" name="user_role_ID" id="deleteUserRoleID" value="1">
            <label><strong>ID:</strong></label> 1
                <label> <strong>Type</strong> </label> admin          
            </fieldset>
            <input class="btn" type="submit" id="deleteRole" value="Delete Role">
            <input class="btn" type="button" value="cancel" onClick="browseRoles()">
    </form> 
    </div><!-- delete -->
</template>