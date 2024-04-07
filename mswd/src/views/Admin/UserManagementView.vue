<template>
  <AdminNav />
<v-app>
    <!-- Main Content -->
    <v-main>
      <div class="admin-panel">
        <h1 class="title">User Management</h1>

        <div class="user-list">
          <table class="user-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Role</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="user in users" :key="user.id">
                <td>{{ user.id }}</td>
                <td>{{ user.username }}</td>
                <td>{{ user.role }}</td>
                <td>
                  <button @click="editUser(user)" class="edit-btn">
                    <i class="fas fa-edit"></i> Edit
                  </button>
                  <button @click="deleteUser(user)" class="delete-btn">
                    <i class="fas fa-trash-alt"></i> Delete
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div v-if="editMode" class="user-form-modal">
          <div class="user-form">
            <h2 class="form-title">Edit User</h2>
            <form @submit.prevent="updateUser">
              <div class="form-group">
                <label for="id" class="form-label">ID:</label>
                <input type="number" id="id" v-model="editedUserId" class="form-input">
              </div>
              <div class="form-group">
                <label for="name" class="form-label">Name:</label>
                <input type="text" id="name" v-model="editedUserName" class="form-input">
              </div>
              <div class="form-group">
                <label for="role" class="form-label">Role:</label>
                <input type="text" id="role" v-model="editedUserRole" class="form-input">
              </div>
              <button type="submit" class="update-btn">
                <i class="fas fa-check"></i> Update User
              </button>
              <button type="button" @click="cancelEdit" class="cancel-btn">
                <i class="fas fa-times"></i> Cancel
              </button>
            </form>
          </div>
        </div>
      </div>
    </v-main>
  </v-app>
</template>

<script>
  import AdminNav from './AdminNav.vue';
  
import axios from 'axios';

export default {
  components: {
      AdminNav
    },
  data() {
    return {
      users: [],
      editMode: false,
      editedUserId: null,
      editedUserName: '',
      editedUserRole: '',
    };
  },
  mounted() {
    this.getUsers();
  },
  methods: {
    cancelEdit() {
      console.log('Editing canceled!');
      this.editMode = false; // Make sure this line is present
    },
    editUser(user) {
      this.editMode = true;
      this.editedUserId = user.id;
      this.editedUserName = user.username;
      this.editedUserRole = user.role;
    },
    updateUser() {
      const data = {
        username: this.editedUserName,
        role: this.editedUserRole,
      };

      axios.put(`/api/update_user/${this.editedUserId}`, data)
        .then((response) => {
          this.getUsers();
          this.editMode = false;
          this.editedUserId = null;
          this.editedUserName = '';
          this.editedUserRole = '';
        })
        .catch((error) => {
          console.error('Error updating user:', error);
        });
    },
    getUsers() {
      axios.get('/api/users')
        .then((response) => {
          this.users = response.data;
        });
    },
    deleteUser(user) {
      axios.delete(`/api/delete/${user.id}`)
        .then((response) => {
          this.getUsers();
        })
        .catch((error) => {
          console.error('Error deleting user:', error);
        });
    },
  },
};
</script>

<style scoped>
  /* Resetting default margin and padding */
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    font-family: 'Roboto', sans-serif;
    background-color: #f0f2f5;
  }

  .admin-panel {
    max-width: 800px;
    margin: 50px auto;
    padding: 20px;
    background-color: #ffffff;
    border-radius: 8px;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  }

  .title {
    font-size: 32px;
    color: #050505;
    margin-bottom: 20px;
  }

  .user-table {
    width: 100%;
    border-collapse: collapse;
    margin-top: 20px;
  }

  .user-table th,
  .user-table td {
    border: 1px solid #dee2e6;
    padding: 12px;
    text-align: left;
  }

  .user-table th {
    background-color: #050606;
    color: #ffffff;
  }

  .user-table tbody tr:nth-child(even) {
    background-color: #f8f9fa;
  }

  .edit-btn,
  .delete-btn,
  .update-btn,
  .cancel-btn {
    padding: 10px 15px;
    border: none;
    cursor: pointer;
    transition: background-color 0.3s ease;
    border-radius: 4px;
    font-weight: bold;
  }

  .edit-btn,
  .update-btn {
    background-color: #28a745;
    color: #ffffff;
  }

  .delete-btn,
  .cancel-btn {
    background-color: #dc3545;
    color: #ffffff;
  }

  .edit-btn:hover,
  .update-btn:hover,
  .delete-btn:hover,
  .cancel-btn:hover {
    opacity: 0.8;
  }

  .user-form-modal {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .user-form {
    background: #ffffff;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  }

  .form-title {
    font-size: 24px;
    color: #333333;
    margin-bottom: 20px;
  }

  .form-group {
    margin-bottom: 20px;
  }

  .form-label {
    font-size: 16px;
    color: #333333;
    margin-bottom: 8px;
    display: block;
  }

  .form-input {
    width: 100%;
    padding: 10px;
    box-sizing: border-box;
    border: 1px solid #ced4da;
    border-radius: 4px;
    font-size: 14px;
  }

  /* Global Styles */
  body {
    font-family: 'Roboto', sans-serif; /* Default font family */
    background-color: #fafafa; /* Light gray background color */
  }
</style>
