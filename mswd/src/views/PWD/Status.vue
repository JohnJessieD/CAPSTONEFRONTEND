<template>
  <div class="status-page-container">
    <nav class="navbar">
      <div class="navbar-brand">
        <img src="/img/Download.jpg" class="logo-img" alt="Government Logo" />
        <span class="brand-text">Welcome to Municipal SWD!</span>
      </div>
      <div class="navbar-links">
        <router-link to="/templatep" class="nav-link">Home</router-link>
        <router-link to="/Pwd" class="nav-link">Assistance</router-link>
        <router-link to="/EventsPWD" class="nav-link">Upcoming Events</router-link>
        <router-link to="/ServicesPWD" class="nav-link">Services</router-link>
        <router-link to="/publicationsPWD" class="nav-link">Publications</router-link>
        <button class="logout-button" @click="logout">Sign Out</button>
      </div>
    </nav>
    <div class="spacer"></div>
    <div class="status-page">
      <h1 class="header">Status Page</h1>
      <div v-if="editing" class="edit-status">
        <input 
          type="text" 
          v-model="newStatus" 
          class="status-input" 
          placeholder="Enter new status"
          @keyup.enter="saveStatus"
        >
        <div class="button-group">
          <button @click="saveStatus" class="action-button save-button">Save</button>
          <button @click="cancelEdit" class="action-button cancel-button">Cancel</button>
        </div>
      </div>
      <div v-else>
        <div v-if="status" class="status-info">
          <p><strong>Current Status:</strong> {{ status }}</p>
          <button @click="editStatus" class="action-button edit-button">Edit</button>
        </div>
        <div v-else class="no-status">
          <p>No status available.</p>
          <button @click="editStatus" class="action-button add-button">Add Status</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'StatusPage',
  props: {
    initialStatus: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      status: this.initialStatus,
      newStatus: this.initialStatus,
      editing: false
    };
  },
  methods: {
    logout() {
      // Perform logout actions (e.g., clear session, redirect to login page)
      this.$router.push('/');
    },
    editStatus() {
      this.editing = true;
      this.newStatus = this.status;
    },
    saveStatus() {
      if (this.newStatus.trim()) {
        this.status = this.newStatus.trim();
        this.editing = false;
        this.$emit('status-updated', this.status);
      }
    },
    cancelEdit() {
      this.newStatus = this.status;
      this.editing = false;
    }
  }
};
</script>

<style scoped>
.status-page-container {
  font-family: Arial, sans-serif;
}

.navbar {
  background-color: #336699;
  color: white;
  padding: 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
}

.navbar-brand {
  display: flex;
  align-items: center;
}

.logo-img {
  height: 40px;
  margin-right: 1rem;
}

.brand-text {
  font-size: 1.2rem;
  font-weight: bold;
}

.navbar-links {
  display: flex;
  gap: 1rem;
  align-items: center;
}

.nav-link {
  color: white;
  text-decoration: none;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  transition: background-color 0.3s;
}

.nav-link:hover {
  background-color: rgba(255, 255, 255, 0.1);
}

.logout-button {
  background-color: #ff6b6b;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.logout-button:hover {
  background-color: #ff5252;
}

.spacer {
  height: 80px;
}

.status-page {
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
}

.header {
  color: #333;
  text-align: center;
  margin-bottom: 2rem;
}

.status-info, .edit-status, .no-status {
  background-color: #f0f0f0;
  border: 1px solid #ccc;
  border-radius: 5px;
  padding: 20px;
  margin-top: 20px;
}

.status-input {
  width: 100%;
  padding: 10px;
  margin-bottom: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 16px;
}

.button-group {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
}

.action-button {
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  font-size: 16px;
}

.save-button, .edit-button, .add-button {
  background-color: #336699;
  color: white;
}

.save-button:hover, .edit-button:hover, .add-button:hover {
  background-color: #254e77;
}

.cancel-button {
  background-color: #ccc;
  color: #333;
}

.cancel-button:hover {
  background-color: #bbb;
}

@media (max-width: 768px) {
  .navbar {
    flex-direction: column;
    align-items: flex-start;
  }

  .navbar-links {
    flex-direction: column;
    align-items: flex-start;
    width: 100%;
    margin-top: 1rem;
  }

  .nav-link {
    width: 100%;
  }

  .spacer {
    height: 200px;
  }
}
</style>