<template>
    <div class="user-sign-ins">
      <AdminNav />
      <h1>User Sign-ins</h1>
      <div class="action-buttons">
        <button @click="showAddModal = true" class="add-user-btn">Add User</button>
      </div>
      <table class="user-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Last Sign-in</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(user, index) in users" :key="index">
            <td>{{ user.name }}</td>
            <td>{{ user.email }}</td>
            <td>{{ user.lastSignIn }}</td>
            <td>
              <button @click="editUser(index)" class="action-btn edit-btn">Edit</button>
              <button @click="deleteUser(index)" class="action-btn delete-btn">Delete</button>
            </td>
          </tr>
        </tbody>
      </table>
  
      <!-- Add User Modal -->
      <div v-if="showAddModal" class="modal">
        <div class="modal-content">
          <span class="close" @click="cancelAddUser">&times;</span>
          <h2>Add New User</h2>
          <div class="input-group">
            <label>Name:</label>
            <input type="text" v-model="newUser.name" class="input-field">
          </div>
          <div class="input-group">
            <label>Email:</label>
            <input type="email" v-model="newUser.email" class="input-field">
          </div>
          <div class="button-group">
            <button @click="addUser" class="action-btn add-btn">Add</button>
            <button @click="cancelAddUser" class="action-btn cancel-btn">Cancel</button>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import AdminNav from './AdminNav.vue';
  
  export default {
    components: {
      AdminNav
    },
    data() {
      return {
        users: [
          { name: 'John Doe', email: 'john@example.com', lastSignIn: '2024-03-06 09:30:00' },
          { name: 'Jane Doe', email: 'jane@example.com', lastSignIn: '2024-03-05 16:45:00' }
          // Add more user data here
        ],
        newUser: {
          name: '',
          email: ''
        },
        showAddModal: false
      };
    },
    methods: {
      addUser() {
        this.users.push({ ...this.newUser, lastSignIn: '-' });
        this.newUser = { name: '', email: '' };
        this.showAddModal = false;
      },
      cancelAddUser() {
        this.newUser = { name: '', email: '' };
        this.showAddModal = false;
      },
      editUser(index) {
        // Implement edit functionality here
        console.log('Edit user:', this.users[index]);
      },
      deleteUser(index) {
        // Implement delete functionality here
        this.users.splice(index, 1);
      }
    }
  }
  </script>
  
  <style scoped>
  .user-sign-ins {
    padding: 20px;
  }
  
  h1 {
    font-size: 24px;
    margin-bottom: 20px;
  }
  
  .action-buttons {
    margin-bottom: 20px;
  }
  
  .add-user-btn {
    background-color: #007bff;
    color: #fff;
    border: none;
    padding: 10px 20px;
    border-radius: 4px;
    cursor: pointer;
    font-size: 16px;
  }
  
  .user-table {
    width: 100%;
    border-collapse: collapse;
  }
  
  .user-table th,
  .user-table td {
    border: 1px solid #ccc;
    padding: 10px;
    text-align: left;
  }
  
  .action-btn {
    border: none;
    cursor: pointer;
    padding: 8px 16px;
    border-radius: 4px;
    font-size: 14px;
    margin-right: 5px;
  }
  
  .edit-btn {
    background-color: #28a745;
    color: #fff;
  }
  
  .delete-btn {
    background-color: #dc3545;
    color: #fff;
  }
  
  .modal {
    display: block;
    position: fixed;
    z-index: 1;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    overflow: auto;
    background-color: rgba(0, 0, 0, 0.4);
  }
  
  .modal-content {
    background-color: #fefefe;
    margin: 15% auto;
    padding: 20px;
    border: 1px solid #888;
    width: 50%;
  }
  
  .close {
    color: #aaa;
    float: right;
    font-size: 28px;
    font-weight: bold;
  }
  
  .close:hover,
  .close:focus {
    color: black;
    text-decoration: none;
    cursor: pointer;
  }
  
  .input-group {
    margin-bottom: 15px;
  }
  
  .label {
    font-weight: bold;
  }
  
  .input-field {
    padding: 8px;
    width: 100%;
    border-radius: 4px;
    border: 1px solid #ccc;
  }
  
  .button-group {
    text-align: right;
  }
  </style>
  