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
const routes = [
  {
    path: '/',
    component: Template,
  },

  {
    path: '/Login',
    component: Login,
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
    path: '/AdminNav',
    name: 'AdminNav',
    component: AdminNav
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
