<script setup>

</script>

<template>
  <div>
    <h1>Books</h1>
    <p>View All Book Data | Add New Books | Update Books | Delete Books</p>
    <router-link to='/search-books' style='margin-right: 10px'>Search All Books</router-link>
    <p>&nbsp;</p>
  </div>
  <div id="browse">
   <table border="1" cellpadding="5" style="margin-left: auto; margin-right: auto;">
      <tr>
        <th>id</th>
        <th>title</th>
        <th>genre</th>
        <th>isbn</th>
        <th>cover_image</th>
        <th>quantity_available</th>
        <th>quantity_rented</th>
        <th></th>
        <th><a href="#">Add Book</a></th>
      </tr>
      <tr>
        <td>1</td>
        <td>lobortis vel dapibus at diam nam tristique tortor ...</td>
        <td>Comedy</td>
        <td>488010340-3</td>
        <td>http://dummyimage.com/220x.png/dddddd/000000</td>
        <td>13</td>
        <td>10</td>
        <td><a href="#">Edit</a></td>
        <td><a href="#">Delete</a></td>
      </tr>
      <tr>
        <td>2</td>
        <td>bibendum imperdiet nullam orci pede venenatis non ...</td>
        <td>Non-Fiction</td>
        <td>255899754-8</td>
        <td>http://dummyimage.com/167x.png/5fa2dd/ffffff</td>
        <td>15</td>
        <td>9</td>
        <td><a href="#">Edit</a></td>
        <td><a href="#">Delete</a></td>
      </tr>
      <tr>
        <td>3</td>
        <td>nisi venenatis tristique fusce</td>
        <td>Horror</td>
        <td>930917083-2</td>
        <td>http://dummyimage.com/222x.png/cc0000/ffffff</td>
        <td>17</td>
        <td>11</td>
        <td><a href="#">Edit</a></td>
        <td><a href="#">Delete</a></td>
      </tr>
      <tr>
        <td>4</td>
        <td>aliquet massa id lobortis convallis tortor risus d...</td>
        <td>Fiction</td>
        <td>064063105-3</td>
        <td>http://dummyimage.com/234x.png/ff4444/ffffff</td>
        <td>17</td>
        <td>3</td>
        <td><a href="#">Edit</a></td>
        <td><a href="#">Delete</a></td>
      </tr>
      <tr>
        <td>5</td>
        <td>nulla ultrices aliquet maecenas</td>
        <td>Comedy</td>
        <td>941228042-4</td>
        <td>http://dummyimage.com/160x.png/ff4444/ffffff</td>
        <td>14</td>
        <td>9</td>
        <td><a href="#">Edit</a></td>
        <td><a href="#">Delete</a></td>
      </tr>
      <tr>
        <td>6</td>
        <td>nulla quisque arcu libero rutrum</td>
        <td>Comedy</td>
        <td>711009564-9</td>
        <td>http://dummyimage.com/153x.png/ff4444/ffffff</td>
        <td>20</td>
        <td>7</td>
        <td><a href="#">Edit</a></td>
        <td><a href="#">Delete</a></td>
      </tr>
      <tr>
        <td>7</td>
        <td>in leo maecenas pulvinar lobortis est phasellus</td>
        <td>Horror</td>
        <td>588823922-4</td>
        <td>http://dummyimage.com/203x.png/cc0000/ffffff</td>
        <td>17</td>
        <td>10</td>
        <td><a href="#">Edit</a></td>
        <td><a href="#">Delete</a></td>
      </tr>
      <tr>
        <td>8</td>
        <td>quisque ut erat curabitur gravida nisi at</td>
        <td>Drama</td>
        <td>810394541-2</td>
        <td>http://dummyimage.com/182x.png/dddddd/000000</td>
        <td>13</td>
        <td>6</td>
        <td><a href="#">Edit</a></td>
        <td><a href="#">Delete</a></td>
      </tr>
      <tr>
        <td>9</td>
        <td>auctor gravida sem praesent id</td>
        <td>Horror</td>
        <td>363704582-6</td>
        <td>http://dummyimage.com/209x.png/ff4444/ffffff</td>
        <td>15</td>
        <td>11</td>
        <td><a href="#">Edit</a></td>
        <td><a href="#">Delete</a></td>
      </tr>
      <tr>
        <td>10</td>
        <td>in est risus auctor sed tristique in tempus sit</td>
        <td>Non-Fiction</td>
        <td>663570720-4</td>
        <td>http://dummyimage.com/218x.png/5fa2dd/ffffff</td>
        <td>12</td>
        <td>11</td>
        <td><a href="#">Edit</a></td>
        <td><a href="#">Delete</a></td>
      </tr>
  </table>
  </div><!-- browse -->
    <p>&nbsp;</p>
  <div id="insert">
      <form method="POST" id="addBook">
        <legend><strong>Add Book</strong></legend>
          <fieldset class="fields">
            <label> title </label> <input type="text" name="title">
            <label> genre </label> 
                <select name="genre_id">
                <option value="0">&nbsp;</option>
                <option value="1">Non-Fiction</option>
                <option value="2">Fiction</option>
                <option value="3">Horror</option>
                <option value="4">Comedy</option>
                <option value="5">Drama</option>
                </select>
            <label> isbn </label> <input type="text" name="isbn">
            <label> cover_image </label> <input type="text" name="cover_image">
            <label> quantity_available </label> <input type="text" name="quantity_available">
            <label> quantity_rented </label> <input type="text" name="quantity_rented">
      </fieldset>
          <input class="btn" type="submit" id="addBook" value="Add New Book">
          <input class="btn" type="button" value="Cancel">
	</form> 
  </div><!-- insert -->
    <p>&nbsp;</p>
  <div id="update">
      <form method="POST" id="updateBook">
        <legend><strong>Update Book</strong></legend>
          <fieldset class="fields">
            <label> title </label> <input type="text" name="title" value="lobortis vel dapibus at diam nam tristique tortor ...	">
            <label> genre </label> 
                <select name="genre_id">
                <option value="0">&nbsp;</option>
                <option value="1">Non-Fiction</option>
                <option value="2">Fiction</option>
                <option value="3">Horror</option>
                <option value="4" selected>Comedy</option>
                <option value="5">Drama</option>
                </select>
            <label> isbn </label> <input type="text" name="isbn" value="488010340-3">
            <label> cover_image </label> <input type="text" name="cover_image" value="http://dummyimage.com/220x.png/dddddd/000000">
            <label> quantity_available </label> <input type="text" name="quantity_available" value="13">
            <label> quantity_rented </label> <input type="text" name="quantity_rented" value="10">
      </fieldset>
          <input class="btn" type="submit" id="addBook" value="Update Book">
          <input class="btn" type="button" value="Cancel">
	</form> 
  </div><!-- update -->
    <p>&nbsp;</p>
  <div id="delete" style="display: block">
    <form method="POST" id="deleteBook">
        <legend><strong>Delete Book</strong></legend>
          <fieldset class="fields">
            <p>Are you sure you wish to delete the following?</p>
            <input type="hidden" name="bookID" id="deletebookID" value="1">
              <label><strong>id:</strong></label> 1
              <label> <strong>title:</strong> </label> lobortis vel dapibus at diam nam tristique tortor ...            
          </fieldset>
          <input class="btn" type="submit" id="DeleteBook" value="Delete Book">
          <input class="btn" type="button" value="Cancel">
    </form> 
  </div><!-- delete -->
</template>