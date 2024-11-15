<template>
    <div class="publication-manager">
      <header>
        <h1>MSWD Publication Manager</h1>
      </header>
  
      <main>
        <section class="publication-form-section">
          <h2>{{ editingId ? 'Edit Publication' : 'Add New Publication' }}</h2>
          <form @submit.prevent="submitPublication" class="publication-form">
            <div class="form-group">
              <label for="title">Title</label>
              <input
                v-model="newPublication.title"
                id="title"
                type="text"
                required
                placeholder="Enter publication title"
              >
            </div>
            <div class="form-group">
              <label for="description">Description</label>
              <textarea
                v-model="newPublication.description"
                id="description"
                required
                placeholder="Enter publication description"
                rows="4"
              ></textarea>
            </div>
            <div class="form-group">
              <label for="publication_date">Publication Date</label>
              <input
                v-model="newPublication.publication_date"
                id="publication_date"
                type="date"
                required
              >
            </div>
            <div class="form-actions">
              <button type="submit" class="btn btn-primary">
                {{ editingId ? 'Update Publication' : 'Add Publication' }}
              </button>
              <button
                v-if="editingId"
                @click="cancelEdit"
                type="button"
                class="btn btn-secondary"
              >
                Cancel
              </button>
            </div>
          </form>
        </section>
  
        <section class="publications-list-section">
          <h2>Publications List</h2>
          <div v-if="loading" class="loading">
            <div class="spinner"></div>
            <p>Loading publications...</p>
          </div>
          <div v-else-if="error" class="error-message">
            {{ error }}
          </div>
          <div v-else-if="publications.length === 0" class="no-publications">
            <p>No publications found. Add your first publication above.</p>
          </div>
          <transition-group name="list" tag="ul" v-else class="publications-list">
            <li v-for="pub in publications" :key="pub.id" class="publication-item">
              <div class="publication-content">
                <h3>{{ pub.title }}</h3>
                <p class="description">{{ pub.description }}</p>
                <p class="date">
                  {{ formatDate(pub.publication_date) }}
                </p>
              </div>
              <div class="publication-actions">
                <button
                  @click="editPublication(pub)"
                  class="btn btn-edit"
                  aria-label="Edit publication"
                >
                  Edit
                </button>
                <button
                  @click="deletePublication(pub.id)"
                  class="btn btn-delete"
                  aria-label="Delete publication"
                >
                  Delete
                </button>
              </div>
            </li>
          </transition-group>
        </section>
      </main>
  
      <footer>
        <p>&copy; {{ currentYear }} MSWD Publication Manager. All rights reserved.</p>
      </footer>
    </div>
  </template>
  
  <script>
  import axios from 'axios'
  
  export default {
    data() {
      return {
        publications: [],
        newPublication: {
          title: '',
          description: '',
          publication_date: ''
        },
        editingId: null,
        loading: true,
        error: null,
        currentYear: new Date().getFullYear()
      }
    },
    methods: {
      async fetchPublications() {
        this.loading = true
        try {
          const response = await axios.get('/api/publications')
          this.publications = response.data
          this.error = null
        } catch (error) {
          console.error('Error fetching publications:', error)
          this.error = 'Failed to load publications. Please try again.'
        } finally {
          this.loading = false
        }
      },
      async submitPublication() {
        try {
          if (this.editingId) {
            await axios.put(`/api/publications/${this.editingId}`, this.newPublication)
          } else {
            await axios.post('/api/publications', this.newPublication)
          }
          await this.fetchPublications()
          this.resetForm()
        } catch (error) {
          console.error('Error submitting publication:', error)
          this.error = 'Failed to save publication. Please try again.'
        }
      },
      editPublication(publication) {
        this.editingId = publication.id
        this.newPublication = { ...publication }
      },
      cancelEdit() {
        this.resetForm()
      },
      async deletePublication(id) {
        if (confirm('Are you sure you want to delete this publication?')) {
          try {
            await axios.delete(`/api/publications/${id}`)
            await this.fetchPublications()
          } catch (error) {
            console.error('Error deleting publication:', error)
            this.error = 'Failed to delete publication. Please try again.'
          }
        }
      },
      resetForm() {
        this.newPublication = {
          title: '',
          description: '',
          publication_date: ''
        }
        this.editingId = null
      },
      formatDate(dateString) {
        const options = { year: 'numeric', month: 'long', day: 'numeric' }
        return new Date(dateString).toLocaleDateString(undefined, options)
      }
    },
    mounted() {
      this.fetchPublications()
    }
  }
  </script>
  
  <style scoped>
  :root {
    --primary-color: #4a90e2;
    --secondary-color: #50e3c2;
    --background-color: #f8f9fa;
    --surface-color: #ffffff;
    --error-color: #ff6b6b;
    --text-primary: #333333;
    --text-secondary: #6c757d;
    --border-color: #e9ecef;
    --shadow-color: rgba(0, 0, 0, 0.1);
  }
  
  .publication-manager {
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen-Sans, Ubuntu, Cantarell, 'Helvetica Neue', sans-serif;
    max-width: 1200px;
    margin: 0 auto;
    padding: 40px 20px;
    background-color: var(--background-color);
    color: var(--text-primary);
  }
  
  header {
    margin-bottom: 40px;
    text-align: center;
  }
  
  h1 {
    color: var(--primary-color);
    font-size: 2.5rem;
    margin-bottom: 20px;
    font-weight: 700;
  }
  
  h2 {
    color: var(--text-primary);
    font-size: 1.8rem;
    margin-bottom: 20px;
    font-weight: 600;
  }
  
  main {
    display: flex;
    flex-wrap: wrap;
    gap: 40px;
  }
  
  .publication-form-section,
  .publications-list-section {
    flex: 1;
    min-width: 300px;
  }
  
  .publication-form {
    background-color: var(--surface-color);
    padding: 30px;
    border-radius: 12px;
    box-shadow: 0 4px 6px var(--shadow-color);
  }
  
  .form-group {
    margin-bottom: 24px;
  }
  
  label {
    display: block;
    margin-bottom: 8px;
    color: var(--text-secondary);
    font-weight: 500;
    font-size: 0.9rem;
  }
  
  input[type="text"],
  input[type="date"],
  textarea {
    width: 100%;
    padding: 12px 16px;
    border: 1px solid var(--border-color);
    border-radius: 8px;
    font-size: 16px;
    transition: all 0.3s ease;
    outline: none;
    background-color: var(--surface-color);
  }
  
  input[type="text"]:focus,
  input[type="date"]:focus,
  textarea:focus {
    border-color: var(--primary-color);
    box-shadow: 0 0 0 3px rgba(74, 144, 226, 0.1);
  }
  
  textarea {
    resize: vertical;
    min-height: 120px;
  }
  
  .form-actions {
    display: flex;
    justify-content: flex-end;
    gap: 16px;
  }
  
  .btn {
    padding: 12px 24px;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    font-size: 16px;
    font-weight: 600;
    transition: all 0.3s ease;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    min-width: 120px;
  }
  
  .btn-primary {
    background-color: var(--primary-color);
    color: white;
  }
  
  .btn-secondary {
    background-color: var(--secondary-color);
    color: var(--text-primary);
  }
  
  .loading,
  .no-publications,
  .error-message {
    text-align: center;
    color: var(--text-secondary);
    font-style: italic;
    margin-top: 20px;
  }
  
  .error-message {
    color: var(--error-color);
  }
  
  .spinner {
    border: 4px solid var(--border-color);
    border-top: 4px solid var(--primary-color);
    border-radius: 50%;
    width: 40px;
    height: 40px;
    animation: spin 1s linear infinite;
    margin: 20px auto;
  }
  
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
  
  .publications-list {
    list-style-type: none;
    padding: 0;
  }
  
  .publication-item {
    background-color: var(--surface-color);
    border-radius: 12px;
    padding: 24px;
    margin-bottom: 20px;
    box-shadow: 0 2px 4px var(--shadow-color);
    transition: all 0.3s ease;
  }
  
  .publication-item:hover {
    box-shadow: 0 6px 12px var(--shadow-color);
  }
  
  .publication-content h3 {
    color: var(--text-primary);
    margin-top: 0;
    margin-bottom: 12px;
    font-size: 1.4rem;
    font-weight: 600;
  }
  
  .publication-content .description {
    color: var(--text-secondary);
    margin-bottom: 16px;
    line-height: 1.6;
  }
  
  .publication-content .date {
    color: var(--text-secondary);
    font-size: 14px;
  }
  
  .publication-actions {
    display: flex;
    justify-content: flex-end;
    gap: 12px;
    margin-top: 20px;
  }
  
  .btn-edit,
  .btn-delete {
    padding: 8px 16px;
    font-size: 14px;
    min-width: auto;
  }
  
  .btn-edit {
    background-color: var(--secondary-color);
    color: var(--text-primary);
  }
  
  .btn-delete {
    background-color: var(--error-color);
    color: white;
  }
  
  footer {
    margin-top: 60px;
    text-align: center;
    color: var(--text-secondary);
    font-size: 14px;
  }
  
  .list-enter-active,
  .list-leave-active {
    transition: all 0.5s ease;
  }
  .list-enter-from,
  .list-leave-to {
    opacity: 0;
    transform: translateX(30px);
  }
  
  @media (max-width: 768px) {
    .publication-manager {
      padding: 20px 10px;
    }
  
    main {
      flex-direction: column;
    }
  
    .publication-form-section,
    .publications-list-section {
      width: 100%;
    }
  
    .btn {
      width: 100%;
      margin-bottom: 10px;
    }
  
    .publication-actions {
      flex-direction: column;
    }
  }
  </style>