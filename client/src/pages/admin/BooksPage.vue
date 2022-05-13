<script setup>
import { reactive } from 'vue';
import AddBookForm from '../../components/books/AddBookForm.vue';
import UpdateBookForm from '../../components/books/UpdateBookForm.vue';
import DeleteBookForm from '../../components/books/DeleteBookForm.vue';

let state = reactive({
  isAddBookModalActive: false,
  isUpdateBookModalActive: false,
  isDeleteBookModalActive: false,
});

const toggleAddBookModal = () => {
  state.isAddBookModalActive = !state.isAddBookModalActive;
};
const toggleUpdateBookModal = () => {
  state.isUpdateBookModalActive = !state.isUpdateBookModalActive;
};
const toggleDeleteBookModal = () => {
  state.isDeleteBookModalActive = !state.isDeleteBookModalActive;
};
</script>

<template>
  <div>
    <h1>Books</h1>
    <p>View All Book Data | Add New Books | Update Books | Delete Books</p>
    <router-link to='/admin/search-books' style='margin-right: 10px'>Search All Books</router-link>
    <br />
  </div>
  <div id='browse'>
    <table border='1' cellpadding='5' style='margin-left: auto; margin-right: auto;'>
      <tr>
        <th>id</th>
        <th>title</th>
        <th>author</th>
        <th>genre</th>
        <th>isbn</th>
        <th>cover_image</th>
        <th>quantity_available</th>
        <th>quantity_rented</th>
        <th></th>
        <th><button @click='toggleAddBookModal'>Add Book</button></th>
      </tr>
      <tr>
        <td>1</td>
        <td>lobortis vel dapibus at diam nam tristique tortor ...</td>
        <td>Adiana Pavlishchev</td>
        <td>Comedy</td>
        <td>488010340-3</td>
        <td>http://dummyimage.com/220x.png/dddddd/000000</td>
        <td>13</td>
        <td>10</td>
        <td><button @click='toggleUpdateBookModal'>Edit</button></td>
        <td><button @click='toggleDeleteBookModal'>Delete</button></td>
      </tr>
      <tr>
        <td>1</td>
        <td>lobortis vel dapibus at diam nam tristique tortor ...</td>
        <td>Perren Benzi</td>
        <td>Comedy</td>
        <td>488010340-3</td>
        <td>http://dummyimage.com/220x.png/dddddd/000000</td>
        <td>13</td>
        <td>10</td>
        <td><button @click='toggleUpdateBookModal'>Edit</button></td>
        <td><button @click='toggleDeleteBookModal'>Delete</button></td>
      </tr>
      <tr>
        <td>2</td>
        <td>bibendum imperdiet nullam orci pede venenatis non ...</td>
        <td>Berne Yele</td>
        <td>Non-Fiction</td>
        <td>255899754-8</td>
        <td>http://dummyimage.com/167x.png/5fa2dd/ffffff</td>
        <td>15</td>
        <td>9</td>
        <td><button @click='toggleUpdateBookModal'>Edit</button></td>
        <td><button @click='toggleDeleteBookModal'>Delete</button></td>
      </tr>
      <tr>
        <td>3</td>
        <td>nisi venenatis tristique fusce</td>
        <td>Berne Yele</td>
        <td>Horror</td>
        <td>930917083-2</td>
        <td>http://dummyimage.com/222x.png/cc0000/ffffff</td>
        <td>17</td>
        <td>11</td>
        <td><button @click='toggleUpdateBookModal'>Edit</button></td>
        <td><button @click='toggleDeleteBookModal'>Delete</button></td>
      </tr>
      <tr>
        <td>4</td>
        <td>aliquet massa id lobortis convallis tortor risus d...</td>
        <td>Thomasin Seakin</td>
        <td>Fiction</td>
        <td>064063105-3</td>
        <td>http://dummyimage.com/234x.png/ff4444/ffffff</td>
        <td>17</td>
        <td>3</td>
        <td><button @click='toggleUpdateBookModal'>Edit</button></td>
        <td><button @click='toggleDeleteBookModal'>Delete</button></td>
      </tr>
      <tr>
        <td>5</td>
        <td>nulla ultrices aliquet maecenas</td>
        <td>Adiana Pavlishchev</td>
        <td>Comedy</td>
        <td>941228042-4</td>
        <td>http://dummyimage.com/160x.png/ff4444/ffffff</td>
        <td>14</td>
        <td>9</td>
        <td><button @click='toggleUpdateBookModal'>Edit</button></td>
        <td><button @click='toggleDeleteBookModal'>Delete</button></td>
      </tr>
      <tr>
        <td>6</td>
        <td>nulla quisque arcu libero rutrum</td>
        <td>Perren Benzi</td>
        <td>Comedy</td>
        <td>711009564-9</td>
        <td>http://dummyimage.com/153x.png/ff4444/ffffff</td>
        <td>20</td>
        <td>7</td>
        <td><button @click='toggleUpdateBookModal'>Edit</button></td>
        <td><button @click='toggleDeleteBookModal'>Delete</button></td>
      </tr>
      <tr>
        <td>7</td>
        <td>in leo maecenas pulvinar lobortis est phasellus</td>
        <td>Thomasin Seakin</td>
        <td>Horror</td>
        <td>588823922-4</td>
        <td>http://dummyimage.com/203x.png/cc0000/ffffff</td>
        <td>17</td>
        <td>10</td>
        <td><button @click='toggleUpdateBookModal'>Edit</button></td>
        <td><button @click='toggleDeleteBookModal'>Delete</button></td>
      </tr>
      <tr>
        <td>8</td>
        <td>quisque ut erat curabitur gravida nisi at</td>
        <td>Robbi Feild</td>
        <td>Drama</td>
        <td>810394541-2</td>
        <td>http://dummyimage.com/182x.png/dddddd/000000</td>
        <td>13</td>
        <td>6</td>
        <td><button @click='toggleUpdateBookModal'>Edit</button></td>
        <td><button @click='toggleDeleteBookModal'>Delete</button></td>
      </tr>
      <tr>
        <td>9</td>
        <td>auctor gravida sem praesent id</td>
        <td>Adiana Pavlishchev</td>
        <td>Horror</td>
        <td>363704582-6</td>
        <td>http://dummyimage.com/209x.png/ff4444/ffffff</td>
        <td>15</td>
        <td>11</td>
        <td><button @click='toggleUpdateBookModal'>Edit</button></td>
        <td><button @click='toggleDeleteBookModal'>Delete</button></td>
      </tr>
      <tr>
        <td>9</td>
        <td>auctor gravida sem praesent id</td>
        <td>Thomasin Seakin</td>
        <td>Horror</td>
        <td>363704582-6</td>
        <td>http://dummyimage.com/209x.png/ff4444/ffffff</td>
        <td>15</td>
        <td>11</td>
        <td><button @click='toggleUpdateBookModal'>Edit</button></td>
        <td><button @click='toggleDeleteBookModal'>Delete</button></td>
      </tr>
      <tr>
        <td>10</td>
        <td>in est risus auctor sed tristique in tempus sit</td>
        <td>Perren Benzi</td>
        <td>Non-Fiction</td>
        <td>663570720-4</td>
        <td>http://dummyimage.com/218x.png/5fa2dd/ffffff</td>
        <td>12</td>
        <td>11</td>
        <td><button @click='toggleUpdateBookModal'>Edit</button></td>
        <td><button @click='toggleDeleteBookModal'>Delete</button></td>
      </tr>
    </table>
  </div><!-- browse -->

  <add-book-form :is-add-book-modal-active='state.isAddBookModalActive' @toggle-add-book-modal='toggleAddBookModal' />
  <update-book-form :is-update-book-modal-active='state.isUpdateBookModalActive' @toggle-update-book-modal='toggleUpdateBookModal' />
  <delete-book-form :is-delete-book-modal-active='state.isDeleteBookModalActive' @toggle-delete-book-modal='toggleDeleteBookModal' />

</template>

