<template>
  <div class="dashboard">
    <aside class="sidebar">
      <div class="sidebar-header">
        <img src="/placeholder.svg?height=50&width=50" alt="MSWD Logo" class="logo">
        <h1 class="sidebar-title">MSWD Admin</h1>
      </div>
      <nav class="sidebar-nav">
          <a href="#" class="nav-link active">
            <i class="fas fa-users"></i> <span>Users</span>
          </a>
          <a href="#" class="nav-link">
            <i class="fas fa-chart-line"></i> <span>Dashboard</span>
          </a>
          <a href="#" class="nav-link">
            <i class="fas fa-file-alt"></i> <span>Reports</span>
          </a>
          <a href="#" class="nav-link">
            <i class="fas fa-cog"></i> <span>Settings</span>
          </a>
      </nav>
      <div class="user-info">
        <img src="/placeholder.svg?height=40&width=40" alt="User Avatar" class="user-avatar">
        <span class="user-name">Admin User</span>
        <button class="logout-button">
          <i class="fas fa-sign-out-alt"></i> <span>Logout</span>
        </button>
      </div>
    </aside>

    <main class="main-content">
      <header class="main-header">
        <h2 class="page-title">User Management</h2>
        <div class="header-actions">
          <div class="search-container">
            <i class="fas fa-search search-icon"></i>
            <input
              type="text"
              v-model="searchQuery"
              placeholder="Search Users..."
              class="search-input"
            />
          </div>
          <button class="refresh-button" @click="refreshData">
            <i class="fas fa-sync-alt"></i> Refresh Data
          </button>
        </div>
      </header>

      <div class="admin-panel">
        <div class="user-list">
          <table class="user-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Role</th>
                <th>Category</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="user in filteredUsers" :key="user.id">
                <td>{{ user.id }}</td>
                <td>{{ user.username }}</td>
                <td>{{ user.role }}</td>
                <td>{{ user.category }}</td>
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
                <label for="name" class="form-label">Name:</label>
                <input type="text" id="name" v-model="editedUserName" class="form-input">
              </div>
              <div class="form-group">
                <label for="role" class="form-label">Role:</label>
                <input type="text" id="role" v-model="editedUserRole" class="form-input">
              </div>
              <div class="form-group">
                <label for="category" class="form-label">Category:</label>
                <select id="category" v-model="editedUserCategory" class="form-select">
                  <option value="">Select Category</option>
                  <option value="PWD">Persons with Disabilities (PWD)</option>
                  <option value="Senior Citizen">Senior Citizen</option>
                  <option value="Solo Parent">Solo Parent</option>
                </select>
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
    </main>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'UserManagement',
  data() {
    return {
      searchQuery: '',
      users: [],
      editMode: false,
      editedUserId: null,
      editedUserName: '',
      editedUserRole: '',
      editedUserCategory: '',
    };
  },
  computed: {
    filteredUsers() {
      return this.users.filter((user) => {
        return user.username.toLowerCase().includes(this.searchQuery.toLowerCase());
      });
    },
  },
  mounted() {
    this.getUsers();
  },
  methods: {
    refreshData() {
      this.getUsers();
    },
    getUsers() {
      axios.get('/api/users')
        .then((response) => {
          this.users = response.data;
        })
        .catch((error) => {
          console.error('Error fetching users:', error);
        });
    },
    editUser(user) {
      this.editMode = true;
      this.editedUserId = user.id;
      this.editedUserName = user.username;
      this.editedUserRole = user.role;
      this.editedUserCategory = user.category;
    },
    updateUser() {
      const data = {
        username: this.editedUserName,
        role: this.editedUserRole,
        category: this.editedUserCategory,
      };

      axios.post(`/api/update_user/${this.editedUserId}`, data)
        .then((response) => {
          console.log(response.data.msg);
          this.getUsers();
          this.editMode = false;
          this.resetEditedUser();
        })
        .catch((error) => {
          console.error('Error updating user:', error);
        });
    },
    deleteUser(user) {
      axios.delete(`/api/delete/${user.id}`)
        .then((response) => {
          console.log(response.data.msg);
          this.getUsers();
        })
        .catch((error) => {
          console.error('Error deleting user:', error);
        });
    },
    cancelEdit() {
      this.editMode = false;
      this.resetEditedUser();
    },
    resetEditedUser() {
      this.editedUserId = null;
      this.editedUserName = '';
      this.editedUserRole = '';
      this.editedUserCategory = '';
    },
  },
};
</script>

<style scoped>
.dashboard {
  display: flex;
  min-height: 100vh;
  background-color: #f5f5f5;
}

.sidebar {
  width: 250px;
  background-color: #4CAF50;
  color: white;
  padding: 20px;
  display: flex;
  flex-direction: column;
  position: fixed;
  height: 100vh;
  overflow-y: auto;
}

.sidebar-header {
  display: flex;
  align-items: center;
  margin-bottom: 30px;
}

.logo {
  width: 50px;
  height: 50px;
  margin-right: 10px;
}

.sidebar-title {
  font-size: 20px;
  font-weight: bold;
}

.sidebar-nav {
  flex-grow: 1;
}

.nav-links {
  list-style-type: none;
  padding: 0;
  margin: 0;
}

.nav-link {
  display: flex;
  align-items: center;
  padding: 10px;
  color: white;
  text-decoration: none;
  transition: background-color 0.3s;
  border-radius: 5px;
}

.nav-link:hover, .nav-link.active {
  background-color: rgba(255, 255, 255, 0.1);
}

.nav-link i {
  margin-right: 10px;
  width: 20px;
  text-align: center;
}

.user-info {
  margin-top: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 20px;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
}

.user-avatar {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  margin-bottom: 10px;
}

.user-name {
  margin-bottom: 10px;
  font-weight: bold;
}

.logout-button {
  background-color: transparent;
  border: 1px solid white;
  color: white;
  padding: 8px 15px;
  border-radius: 20px;
  cursor: pointer;
  transition: background-color 0.3s;
  display: flex;
  align-items: center;
}

.logout-button:hover {
  background-color: rgba(255, 255, 255, 0.1);
}

.logout-button i {
  margin-right: 5px;
}

.main-content {
  flex-grow: 1;
  padding: 20px;
  margin-left: 250px;
}

.main-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  background-color: white;
  padding: 15px 20px;
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.page-title {
  font-size: 24px;
  font-weight: bold;
  color: #333;
}

.header-actions {
  display: flex;
  align-items: center;
}

.search-container {
  position: relative;
  margin-right: 15px;
}

.search-icon {
  position: absolute;
  left: 10px;
  top: 50%;
  transform: translateY(-50%);
  color: #757575;
}

.search-input {
  padding: 8px 8px 8px 35px;
  font-size: 14px;
  border: 1px solid #ccc;
  border-radius: 20px;
  width: 200px;
  transition: all 0.3s ease;
}

.search-input:focus {
  width: 250px;
  outline: none;
  border-color: #4CAF50;
  box-shadow: 0 0 0 2px rgba(76, 175, 80, 0.2);
}

.refresh-button {
  background-color: #4CAF50;
  color: white;
  border: none;
  padding: 8px 15px;
  border-radius: 20px;
  cursor: pointer;
  transition: background-color 0.3s;
  display: flex;
  align-items: center;
}

.refresh-button:hover {
  background-color: #45a049;
}

.refresh-button i {
  margin-right: 5px;
}

.admin-panel {
  background-color: #ffffff;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
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
  padding: 6px 12px;
  border: none;
  cursor: pointer;
  transition: background-color 0.3s ease;
  border-radius: 4px;
  font-weight: bold;
  font-size: 12px;
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
  width: 300px;
}

.form-title {
  font-size: 20px;
  color: #333333;
  margin-bottom: 20px;
}

.form-group {
  margin-bottom: 15px;
}

.form-label {
  font-size: 14px;
  color: #333333;
  margin-bottom: 5px;
  display: block;
}

.form-input,
.form-select {
  width: 100%;
  padding: 8px;
  box-sizing: border-box;
  border: 1px solid #ced4da;
  border-radius: 4px;
  font-size: 14px;
}

@media (max-width: 992px) {
  .sidebar {
    width: 80px;
  }

  .sidebar-title, .user-name, .nav-link span, .logout-button span {
    display: none;
  }

  .main-content {
    margin-left: 80px;
  }

  .user-info {
    align-items: center;
  }

  .logout-button {
    padding: 8px;
  }

  .logout-button i {
    margin-right: 0;
  }
}

@media (max-width: 768px) {
  .dashboard {
    flex-direction: column;
  }

  .sidebar {
    width: 100%;
    height: auto;
    position: static;
    padding: 10px;
  }

  .sidebar-nav {
    display: none;
  }

  .user-info {
    display: none;
  }

  .main-content {
    margin-left: 0;
  }

  .main-header {
    flex-direction: column;
    align-items: flex-start;
  }

  .header-actions {
    margin-top: 10px;
    width: 100%;
  }

  .search-container {
    width: 100%;
    margin-right: 0;
    margin-bottom: 10px;
  }

  .search-input, .search-input:focus {
    width: 100%;
  }

  .refresh-button {
    width: 100%;
    justify-content: center;
  }
}
</style>