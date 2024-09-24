<template>
  
  <AdminNav />
  
  <div class="spacer"></div>
  <div>
    <div class="schedule-container">
      <h1>Schedule List</h1>
      <div v-if="isLoading" class="loading-overlay">
        <div class="spinner"></div>
        <p>Loading schedules...</p>
      </div>
      <table v-else class="schedule-table">
        <thead>
          <tr>
            <th>User</th>
            <th>Date</th>
            <th>Description</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(schedule, index) in schedules" :key="index">
            <td>{{ schedule.user }}</td>
            <td>{{ formatDate(schedule.date) }}</td>
            <td>{{ schedule.description }}</td>
            <td>
              <button @click="notifyUser(schedule)" class="notify-btn">Notify User</button>
              <button @click="openModal(schedule.user)" class="add-schedule-btn">Add Schedule</button>
            </td>
          </tr>
        </tbody>
      </table>
      <div class="add-schedule">
        <div v-if="showModal" class="modal-overlay">
          <div class="modal">
            <span class="close" @click="showModal = false">&times;</span>
            <h3>Add New Schedule</h3>
            <form @submit.prevent="addSchedule">
              <label for="date">Date:</label>
              <input type="date" id="date" v-model="newSchedule.date" required>
              <label for="description">Description:</label>
              <input type="text" id="description" v-model="newSchedule.description" required>
              <div class="modal-buttons">
                <button type="submit" class="modal-btn">Submit</button>
                <button type="button" @click="showModal = false" class="modal-btn">Cancel</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
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
      schedules: [
        { user: "User 1", date: "2024-05-01", description: "Meeting" },
        { user: "User 2", date: "2024-05-02", description: "Training" },
        { user: "User 3", date: "2024-05-03", description: "Presentation" },
        { user: "User 4", date: "2024-05-04", description: "Workshop" },
      ],
      newSchedule: { date: '', description: '' },
      isLoading: false,
      showModal: false,
      selectedUser: null
    };
  },
  methods: {
    addSchedule() {
      // Add logic to handle adding schedule
      console.log("New schedule:", this.newSchedule);
      // Reset newSchedule and close modal
      this.newSchedule.date = '';
      this.newSchedule.description = '';
      this.showModal = false;
    },
    notifyUser(schedule) {
      console.log('Notifying user about schedule:', schedule);
      // Add logic to notify user
    },
    formatDate(date) {
      return new Date(date).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      });
    },
    openModal(user) {
      this.selectedUser = user;
      this.showModal = true;
    }
  }
};
</script>

<style scoped>.spacer {
  height: 100px; /* Adjust the height for desired spacing */
}
.schedule-container {
  max-width: 800px;
  margin: 20px auto 0; /* Added margin-top */
}

.loading-overlay {
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 10;
}

.spinner {
  width: 50px;
  height: 50px;
  border: 5px solid #fff;
  border-radius: 50%;
  border-top-color: #3498db;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

.schedule-table {
  width: 100%;
  border-collapse: collapse;
}

.schedule-table th,
.schedule-table td {
  border: 1px solid #ddd;
  padding: 8px;
  text-align: left;
}

.schedule-table th {
  background-color: #f2f2f2;
}

.notify-btn {
  padding: 8px 16px;
  cursor: pointer;
  border: none;
  background-color: #007bff;
  color: white;
  border-radius: 4px;
}

.notify-btn:hover {
  background-color: #0056b3;
}

.add-schedule-btn {
  padding: 8px 16px;
  cursor: pointer;
  border: none;
  background-color: #4caf50;
  color: white;
  border-radius: 4px;
}

.add-schedule-btn:hover {
  background-color: #45a049;
}

.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal {
  background-color: #fefefe;
  padding: 20px;
  border-radius: 5px;
  width: 400px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
}

.close {
  color: #aaa;
  float: right;
  font-size: 20px;
  font-weight: bold;
  cursor: pointer;
}

.close:hover,
.close:focus {
  color: black;
  text-decoration: none;
}

.modal-buttons {
  margin-top: 20px;
  text-align: right;
}

.modal-btn {
  padding: 8px 16px;
  cursor: pointer;
  border: none;
  background-color: #007bff;
  color: white;
  border-radius: 4px;
  margin-left: 10px;
}

.modal-btn:hover {
  background-color: #0056b3;
}
</style>
