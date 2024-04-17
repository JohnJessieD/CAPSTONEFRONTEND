import { createRouter, createWebHistory } from 'vue-router'
import Template from '../views/Template.vue'
import Navbar from '../views/Navbar.vue'
import Offices from '../views/Offices.vue'
import Services from '../views/Services.vue'
import Disastervictims from '../views/Offices/Disastervictims.vue'
import Contacts from '../views/Offices/Contacts.vue'
import Needyadults from '../views/Offices/Needyadults.vue'
import Pwd from '../views/Offices/Pwd.vue'
import ProfileEntryView from '../views/Admin/ProfileEntryView.vue';
import FormManagementView from '../views/Admin/FormManagementView.vue';
import InformationManagementView from '../views/Admin/InformationManagementView.vue';
import UserManagementView from '../views/Admin/UserManagementView.vue';
import Dashboard from '../views/Admin/Dashboard.vue';

import Soloparent from '../views/Offices/Soloparent.vue'
import AdminNav from '../views/Admin/AdminNav.vue'
import publications from '../views/Offices/publications.vue'
import OfficeCard from '../views/OfficeCard.vue'
import Login from '../views/Login.vue'
import Events from '@/views/Events.vue'

import landingpage from '@/views/landingpage.vue'
import RegisterComponent from '../views/RegisterComponent.vue'
import AssistancePWD from '../views/AssistancePWD.vue'

import SoloNav from '../views/SoloNav.vue'
const routes = [
  {
    path: '/index',
    component: Template,
  },
  {
    path: '/AssistancePWD',
    component: AssistancePWD,
  },
  {
    path: '/SoloNav',
    component: SoloNav,
  },
  {
    path: '/Login',
    component: Login,
  },
  {
    path: '/RegisterComponent',
    component: RegisterComponent,
  },
  {
    path: '/OfficeCard',
    component: OfficeCard,
  },
  {
    path: '/Dashboard',
    component: Dashboard,
  },
  {
    path: '/publications',
    component: publications,
  },
  { path: '/profile-entry', component: ProfileEntryView },
  { path: '/form-management', component: FormManagementView },
  { path: '/information-management', component: InformationManagementView },
  { path: '/user-management', component: UserManagementView },
  {
    path: '/Contacts',
    component: Contacts,
  },
  {
    path: '/Soloparent',
    component: Soloparent,
  },

  {
    path: '/Pwd',
    component:Pwd
  },
  {
    path: '/Events',
    component:Events
  },
  {
    path: '/Needyadults',
    component: Needyadults,
  },
 
 
  {
    path: '/Disastervictims',
    component: Disastervictims,
  },
 
  {
    path: '/Services',
    component: Services,
  },
  {
    path: '/Offices',
    component: Offices,
  },
  {
    path: '/about',
    name: 'about',
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  },
  {
    path: '/Navbar',
    name: 'Navbar',
    component: Navbar
  },
  {
    path: '/',
    name: 'landingpage',
    component: landingpage
  },
  {
    path: '/AdminNav',
    name: 'AdminNav',
    component: AdminNav
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

// Navigation guard to check authentication and role/category-based access control
router.beforeEach(async (to, from, next) => {
  // Check if the route requires authentication
  if (to.meta.requiresAuth) {
    try {
      // Fetch user data from the backend to determine their role and category
      const response = await axios.get('/api/user'); // Replace with your API endpoint to fetch user data
      const userData = response.data;

      // Check if user is authenticated
      if (userData) {
        // Check user's role
        const userRole = userData.role;

        if (userRole === 'admin' && to.path.startsWith('/user')) {
          // Admin trying to access user side, redirect to admin dashboard
          next('/dashboard');
        } else if (userRole === 'user' && to.path.startsWith('/admin')) {
          // User trying to access admin side, redirect to user dashboard or unauthorized page
          next('/'); // Assuming user dashboard is '/'
        } else {
          // User has correct role, continue navigation
          next();
        }
      } else {
        // User is not authenticated, redirect to login page
        next('/login');
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
      // Redirect to login page or show error message
      next('/login');
    }
  } else {
    // Route does not require authentication, allow access
    next();
  }
});

export default router;