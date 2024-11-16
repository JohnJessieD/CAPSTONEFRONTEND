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
          await axios.post(`/api/publications/${this.editingId}`, this.newPublication)
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
  --primary-color: #3498db;
  --secondary-color: #2ecc71;
  --background-color: #f7f9fc;
  --surface-color: #ffffff;
  --error-color: #e74c3c;
  --text-primary: #2c3e50;
  --text-secondary: #7f8c8d;
  --border-color: #bdc3c7;
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
  font-size: 3.5rem;
  margin-bottom: 20px;
  font-weight: 800;
  letter-spacing: -1px;
  text-shadow: 2px 2px 4px var(--shadow-color);
  
}

h2 {
  color: var(--text-primary);
  font-size: 2.2rem;
  margin-bottom: 20px;
  font-weight: 700;
  position: relative;
  padding-bottom: 10px;
}

h2::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  width: 60px;
  height: 4px;
  background-color: var(--primary-color);
  border-radius: 2px;
  
}

main {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 40px;
}

.publication-form-section,
.publications-list-section {
  background-color: var(--surface-color);
  border-radius: 16px;
  padding: 30px;
  box-shadow: 0 10px 30px var(--shadow-color);
  transition: all 0.3s ease;
}

.publication-form-section:hover,
.publications-list-section:hover {
  transform: translateY(-5px);
  box-shadow: 0 15px 35px var(--shadow-color);
}

.publication-form {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.form-group {
  display: flex;
  flex-direction: column;
}

label {
  margin-bottom: 8px;
  color: var(--text-secondary);
  font-weight: 600;
  font-size: 0.9rem;
  text-transform: uppercase;
  letter-spacing: 1px;
  
}

input[type="text"],
input[type="date"],
textarea {
  width: 100%;
  padding: 12px 16px;
  border: 2px solid black;
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
  box-shadow: 0 0 0 3px rgba(52, 152, 219, 0.2);
  
}

textarea {
  resize: vertical;
  min-height: 120px;
  border: 2px solid black;
}

.form-actions {
  display: flex;
  justify-content: flex-end;
  gap: 16px;
}

.btn {
  padding: 12px 24px;
  border: 2px solid transparent;
  border-radius: 8px;
  cursor: pointer;
  font-size: 16px;
  font-weight: 600;
  transition: all 0.3s ease;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 120px;
  text-transform: uppercase;
  letter-spacing: 1px;
}

.btn-primary {
  background-color: var(--primary-color);
  color: black;
  border-color: var(--primary-color);
}

.btn-primary:hover {
  background-color: var(--secondary-color);
  color: black;
  transform: translateY(-2px);
  box-shadow: 0 4px 6px rgba(46, 204, 113, 0.2);
}

.btn-secondary {
  background-color: var(--surface-color);
  color: var(--primary-color);
  border-color: var(--primary-color);
}

.btn-secondary:hover {
  background-color: var(--primary-color);
  color: white;
  transform: translateY(-2px);
  box-shadow: 0 4px 6px rgba(52, 152, 219, 0.2);
}

.loading,
.no-publications,
.error-message {
  text-align: center;
  color: var(--text-secondary);
  font-style: italic;
  margin-top: 20px;
  font-size: 1.1rem;
}

.error-message {
  color: var(--error-color);
  font-weight: bold;
}

.spinner {
  border: 4px solid rgba(52, 152, 219, 0.1);
  border-top: 4px solid var(--primary-color);
  border-radius: 50%;
  width: 50px;
  height: 50px;
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
  display: grid;
  gap: 20px;
}

.publication-item {
  background-color: var(--surface-color);
  border-radius: 12px;
  padding: 24px;
  box-shadow: 0 4px 6px var(--shadow-color);
  transition: all 0.3s ease;
  border: 1px solid var(--border-color);
  display: flex;
  flex-direction: column;
}

.publication-item:hover {
  box-shadow: 0 10px 15px var(--shadow-color);
  transform: translateY(-5px);
}

.publication-content h3 {
  color: var(--primary-color);
  margin-top: 0;
  margin-bottom: 12px;
  font-size: 1.8rem;
  font-weight: 700;
}

.publication-content .description {
  color: var(--text-secondary);
  margin-bottom: 16px;
  line-height: 1.6;
  font-size: 1.1rem;
}

.publication-content .date {
  color: var(--text-secondary);
  font-size: 0.9rem;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 1px;
  margin-top: auto;
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
  background-color: var(--surface-color);
  color: var(--secondary-color);
  border-color: var(--secondary-color);
}

.btn-edit:hover {
  background-color: var(--secondary-color);
  color: black;
  transform: translateY(-2px);
  box-shadow: 0 4px 6px rgba(46, 204, 113, 0.2);
}

.btn-delete {
  background-color: var(--surface-color);
  color: var(--error-color);
  border-color: var(--error-color);
}

.btn-delete:hover {
  background-color: var(--error-color);
  color: black;
  transform: translateY(-2px);
  box-shadow: 0 4px 6px rgba(231, 76, 60, 0.2);
}

footer {
  margin-top: 60px;
  text-align: center;
  color: var(--text-secondary);
  font-size: 14px;
  padding-top: 20px;
  border-top: 1px solid var(--border-color);
}

.list-enter-active,
.list-leave-active {
  transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
}
.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateY(30px);
}

@media (max-width: 768px) {
  .publication-manager {
    padding: 20px 10px;
  }

  h1 {
    font-size: 2.5rem;
  }

  h2 {
    font-size: 1.8rem;
  }

  .publication-form-section,
  .publications-list-section {
    padding: 20px;
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