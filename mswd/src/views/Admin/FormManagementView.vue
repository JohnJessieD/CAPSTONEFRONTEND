<template>
        <AdminNav />
    <div class="form-management">

      <h1>Form Management</h1>
      <div v-if="forms.length === 0" class="no-forms">No forms available</div>
      <div v-else>
        <div class="form-controls">
          <input type="text" v-model="searchQuery" placeholder="Search by name" />
          <select v-model="sortBy">
            <option value="name">Name</option>
            <option value="type">Type</option>
            <option value="status">Status</option>
          </select>
        </div>
        <table class="form-table">
          <thead>
            <tr>
              <th @click="sortForms(sortBy)">Name</th>
              <th @click="sortForms(sortBy)">Type</th>
              <th @click="sortForms(sortBy)">Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="form in sortedForms" :key="form.id">
              <td>{{ form.name }}</td>
              <td>{{ form.type }}</td>
              <td>{{ form.status }}</td>
              <td>
                <button @click="viewForm(form)" class="action-btn view-btn">View</button>
                <button @click="editForm(form)" class="action-btn edit-btn">Edit</button>
                <button @click="deleteForm(form)" class="action-btn delete-btn">Delete</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <button @click="addNewForm" class="add-btn">Add New Form</button>
    </div>
  </template>
  
  <script>
  import AdminNav from './AdminNav.vue';
  
  export default {
    name: 'FormManagement',
    components: {
      AdminNav
    },
    data() {
      return {
        forms: [
          { id: 1, name: 'Application Form', type: 'Application', status: 'Pending' },
          { id: 2, name: 'Request Form', type: 'Request', status: 'Approved' }
        ],
        searchQuery: '',
        sortBy: 'name'
      };
    },
    computed: {
      sortedForms() {
        return this.forms.filter(form => form.name.toLowerCase().includes(this.searchQuery.toLowerCase()))
                         .sort((a, b) => a[this.sortBy].localeCompare(b[this.sortBy]));
      }
    },
    methods: {
      viewForm(form) {
        // Implement logic to view form details
        console.log('View form:', form);
      },
      editForm(form) {
        // Implement logic to edit form
        console.log('Edit form:', form);
      },
      deleteForm(form) {
        // Implement logic to delete form
        console.log('Delete form:', form);
        this.forms = this.forms.filter(f => f.id !== form.id);
      },
      addNewForm() {
        const newForm = {
          id: this.forms.length + 1,
          name: 'New Form',
          type: 'Custom',
          status: 'Draft'
        };
        this.forms.push(newForm);
        console.log('New form added:', newForm);
      },
      sortForms(key) {
        this.sortBy = key;
      }
    }
  };
  </script>
  
  <style scoped>
  .form-management {
    padding: 20px;
  }
  
  h1 {
    font-size: 24px;
    margin-bottom: 20px;
  }
  
  .no-forms {
    margin-bottom: 20px;
  }
  
  .form-controls {
    margin-bottom: 10px;
  }
  
  .form-controls input,
  .form-controls select {
    margin-right: 10px;
  }
  
  .form-table {
    width: 100%;
    border-collapse: collapse;
  }
  
  .form-table th,
  .form-table td {
    border: 1px solid #ccc;
    padding: 10px;
    text-align: left;
  }
  
  .action-btn {
    border: none;
    cursor: pointer;
    padding: 5px 10px;
    border-radius: 4px;
    color: #fff;
    font-size: 14px;
  }
  
  .view-btn {
    background-color: #3498db;
  }
  
  .edit-btn {
    background-color: #2ecc71;
  }
  
  .delete-btn {
    background-color: #e74c3c;
  }
  
  .add-btn {
    background-color: #27ae60;
    color: #fff;
    border: none;
    padding: 10px 20px;
    border-radius: 4px;
    cursor: pointer;
    font-size: 16px;
  }
  </style>
  