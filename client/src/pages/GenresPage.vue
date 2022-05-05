<script setup>

</script>

<template>
    <div id="header">
        <h1>Genres</h1>
        <p>View All Genres | Add New Genres | Update Genres | Delete Genres</p>
    </div>
    <div id="browseGenres">
        <table border="1" cellpadding="5" style="margin-left: auto; margin-right: auto;">
            <tr>
                <th>id</th>
                <th>name</th>
                <th></th>
                <th><a href="#">Add Genre</a></th>
            </tr>
            <tr>
                <td>1</td>
                <td>Non-Fiction</td>
                <td><a href="#">Edit</a></td>
                <td><a href="#">Delete</a></td>
            </tr>
            <tr>
                <td>2</td>
                <td>Fiction</td>
                <td><a href="#">Edit</a></td>
                <td><a href="#">Delete</a></td>
            </tr>
            <tr>
                <td>3</td>
                <td>Horror</td>
                <td><a href="#">Edit</a></td>
                <td><a href="#">Delete</a></td>
            </tr>
            <tr>
                <td>4</td>
                <td>Comedy</td>
                <td><a href="#">Edit</a></td>
                <td><a href="#">Delete</a></td>
            </tr>
            <tr>
                <td>5</td>
                <td>Drama</td>
                <td><a href="#">Edit</a></td>
                <td><a href="#">Delete</a></td>
            </tr>
        </table>
    </div><!-- browse -->
    <p>&nbsp;</p>
    <div id="insert">
      <form method="POST" id="addGenre">
        <legend><strong>Add Genre</strong></legend>
            <fieldset class="fields">
                <label> name </label> <input type="text" name="genreName">
            </fieldset>
          <input class="btn" type="submit" id="addGenre" value="Add New Genre">
          <input class="btn" type="button" value="Cancel">
	    </form> 
    </div><!-- insert -->
    <p>&nbsp;</p>
    <div id="update">
        <form method="POST" id="updateGenre">
            <legend><strong>Edit Genre</strong></legend>
            <fieldset class="fields">
                <input type="hidden" name="genre_ID" id="updateGenre" value="1">
                <label> name </label> <input type="text" name="genreName" value="Non-Fiction">
            </fieldset>
          <input class="btn" type="submit" id="editGenre" value="Edit Genre">
          <input class="btn" type="button" value="Cancel">
	    </form> 
    </div><!-- update -->
    <p>&nbsp;</p>
    <div id="delete" style="display: block">
        <form method="POST" id="deleteGenre">
            <legend><strong>Delete Genre</strong></legend>
            <fieldset class="fields">
                    <p>Are you sure you wish to delete the following?</p>
                    <p>It will set the Genre on all associated books to NULL</p>
                <input type="hidden" name="genre_ID" id="deleteGenre" value="1">
                <label><strong>id:</strong></label> 1
                <label> <strong>name:</strong> </label> Non-Fiction          
            </fieldset>
            <input class="btn" type="submit" id="deleteGenre" value="Delete Genre">
            <input class="btn" type="button" value="Cancel">
        </form> 
    </div><!-- delete -->
</template>