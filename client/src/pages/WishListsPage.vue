<script setup>

</script>

<template>
    <div id="wishLists">
            <h1>All Wish Lists</h1>
            <p>Manage Wish Lists</p>
            <router-link to='/users' style='margin-right: 10px'>Back to Users</router-link>
            <p>&nbsp;</p>
        </div>
    <div id="browseWishLists">
        <table border="1" cellpadding="5" style="margin-left: auto; margin-right: auto;">
            <tr>
                <th>user_id</th>
                <th></th>
                <th>Actions</th>
            </tr>
            <tr>
                <td>1</td>
                <td><a href="#">View</a></td>
                <td><a href="#">Delete</a></td>
                
            </tr>
            <tr>
                <td>2</td>
                <td><a href="#">View</a></td>
                <td><a href="#">Delete</a></td>
            </tr>
            <tr>
                <td>3</td>
                <td><a href="#">View</a></td>
                <td><a href="#">Delete</a></td>
            </tr>
            <tr>
                <td>4</td>
                <td><a href="#">View</a></td>
                <td><a href="#">Delete</a></td>
            </tr>
            <tr>
                <td>5</td>
                <td><a href="#">View</a></td>
                <td><a href="#">Delete</a></td>
            </tr>
            <tr>
                <td>6</td>
                <td><a href="#">View</a></td>
                <td><a href="#">Delete</a></td>
            </tr>
            <tr>
                <td>7</td>
                <td><a href="#">View</a></td>
                <td><a href="#">Delete</a></td>
            </tr>
            <tr>
                <td>8</td>
                <td><a href="#">View</a></td>
                <td><a href="#">Delete</a></td>
            </tr>
            <tr>
                <td>9</td>
                <td><a href="#">View</a></td>
                <td><a href="#">Delete</a></td>
            </tr>
            <tr>
                <td>10</td>
                <td><a href="#">View</a></td>
                <td><a href="#">Delete</a></td>
            </tr>
        </table>
    </div><!-- browse -->
    <p>&nbsp;</p>
    <div id="viewWishList">
        <p><strong>All Wish List Books for user_id: 1</strong></p>
        <table border="1" cellpadding="5" style="margin-left: auto; margin-right: auto;">
            <tr>
                <th>book_id</th>
                <th>title</th>
                <th></th>
            </tr>
            <tr>
                <td>3</td>
                <td>nisi venenatis tristique fusce</td>
                <td><a href="#">Delete</a></td>
            </tr>
            <tr>
                <td>9</td>
                <td>auctor gravida sem praesent id</td>
                <td><a href="#">Delete</a></td>
            </tr>
            <tr>
                <td>7</td>
                <td>in leo maecenas pulvinar lobortis est phasellus</td>
                <td><a href="#">Delete</a></td>
            </tr>
            <tr>
                <td>2</td>
                <td>bibendum imperdiet nullam orci pede venenatis non ...</td>
                <td><a href="#">Delete</a></td>
            </tr>
        </table>
    </div><!-- viewWishList -->
    <p>&nbsp;</p>
    <div id="delete" style="display: block">
        <form method="POST" id="deleteWishListBook">
            <legend><strong>Delete Book from Wish List</strong></legend>
            <fieldset class="fields">
                <p>Are you sure you wish to delete the following Wish List item?</p>
                <input type="hidden" name="bookID" id="deleteWishListBook" value="3">
                    <label><strong>user_id:</strong></label> 1
                    <label><strong>book_id:</strong></label> 3
                    <label><strong>title:</strong> </label> nisi venenatis tristique fusce             
            </fieldset>
            <input class="btn" type="submit" id="DeleteUser" value="Delete Book From Wish List">
            <input class="btn" type="button" value="Cancel">
        </form> 
    </div><!-- deleteWishListItem -->
</template>