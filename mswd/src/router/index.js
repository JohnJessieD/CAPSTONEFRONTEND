import { createRouter, createWebHistory } from 'vue-router';
import axios from 'axios';

import Navbar from '../views/Navbar.vue';

import Offices from '../views/Offices.vue';
import SeniorServices from '../views/Senior Citizen/SeniorServices.vue';
import Disastervictims from '../views/Offices/Disastervictims.vue';
import SeniorContacts from '../views/Senior Citizen/SeniorContacts.vue';
import Needyadults from '../views/Senior Citizen/Needyadults.vue';
import Pwd from '../views/PWD/Pwd.vue';
import UserManagementView from '../views/Admin/UserManagementView.vue';
import Dashboard from '../views/Admin/Dashboard.vue';
import UserUpdateModal from '../views/UserUpdateModal.vue'
import Feedbacklist from '../views/Admin/Feedbacklist.vue';
import Soloparent from '../views/SoloParent/Soloparent.vue';
import AdminNav from '../views/Admin/AdminNav.vue';
import Solopublications from '../views/SoloParent/Solopublications.vue';
import OfficeCard from '../views/OfficeCard.vue';
import Login from '../views/Login.vue';
import SoloEvents from '../views/SoloParent/SoloEvents.vue';
import SoloServices from '@/views/SoloParent/SoloServices.vue';
import landingpage from '../views/landingpage.vue';
import RegisterComponent from '../views/RegisterComponent.vue';
import AssistancePWD from '../views/AssistancePWD.vue';

import PWDNavbar from '../views/PWD/PWDNavbar.vue';
import SoloNav from '../views/SoloNav.vue';
import SeniorTemplate from '../views/Senior Citizen/SeniorTemplate.vue';
import publicationsPWD from '../views/PWD/publicationsPWD.vue';
import CPWD from '../views/PWD/CPWD.vue';

import temlpatep from '../views/PWD/temlpatep.vue';
import EventsPWD from '../views/PWD/EventsPWD.vue';

import Schedule from '../views/Admin/Schedule.vue';

import Publicationmanager from '../views/Admin/Publicationmanager.vue';
import ServicesPWD from '../views/PWD/ServicesPWD.vue';

import Status from '../views/PWD/Status.vue';
import AssistanceManagement from '../views/Admin/AssistanceManagement.vue';

import Eventsmanage from '../views/Admin/Eventsmanage.vue';
import SchedulePwd from '../views/PWD/SchedulePwd.vue';
import CardManagement from '../views/Admin/CardManagement.vue';

import SoloTemplate from '../views/SoloParent/SoloTemplate.vue';

import SoloContacts from '../views/SoloParent/SoloContacts.vue';
import financialaid from '../views/SoloParent/financialaid.vue';
import Childcare from '../views/SoloParent/Childcare.vue';
import CommunityEvents from '../views/SoloParent/CommunityEvents.vue';
import ParentingTips from '../views/SoloParent/ParentingTips.vue';

import Counseling from '../views/SoloParent/Counseling.vue';
import Healthandwellness from '../views/SoloParent/Healthandwellness.vue';

import JobTraining from '../views/SoloParent/JobTraining.vue';

import Education from '../views/SoloParent/Education.vue';
import Legalsupport from '../views/SoloParent/Legalsupport.vue';
import Housingassistance from '../views/SoloParent/Housingassistance.vue';
import SupportGroups from '../views/SoloParent/SupportGroups.vue';
import Workshopscomponent from '../views/SoloParent/Workshopscomponent.vue';
import BarangayM  from '@/views/Admin/BarangayM.vue';
const routes = [

  {
    path: '/AssistanceManagement',
    component: AssistanceManagement,
  },
  
  {
    path: '/Education',
    component: Education,
  },
  {
    path: '/BarangayM',
    component: BarangayM,
  },  
  {
    path: '/Legalsupport',
    component: Legalsupport,
  },
  {
    path: '/UserUpdateModal',
    component: UserUpdateModal,
  },
  {
    path: '/SupportGroups',
    component: SupportGroups,
  },
  {
    path: '/Workshopscomponent',
    component: Workshopscomponent,
  },
  {
    path: '/ParentingTips',
    component: ParentingTips,
  },
  {
    path: '/CommunityEvents',
    component: CommunityEvents,
  },
  {
    path: '/JobTraining',
    component: JobTraining,
  },
  {
    path: '/Counseling',
    component: Counseling,
  },
  {
    path: '/Housingassistance',
    component: Housingassistance,
  },
  {
    path: '/Healthandwellness',
    component: Healthandwellness,
  },
  {
    path: '/financialaid',
    component: financialaid,
  },  
  {
    path: '/Childcare',
    component: Childcare,
  }, 
  {
    path: '/Publicationmanager',
    component: Publicationmanager,
  },


  {
    path: '/Eventsmanager',
    component: Eventsmanage,
  },
  {
    path: '/SoloTemplate',
    component: SoloTemplate,
  },
  {
    path: '/SchedulePwd',
    component: SchedulePwd,
  },
  {
    path: '/Solopublications',
    component: Solopublications,
  },
  {
    path: '/Feedbacklist',
    component: Feedbacklist,
  },
  {
    path: '/SoloServices',
    component: SoloServices,
  },
  {
    path: '/SoloContacts',
    component: SoloContacts,
  },
  {
    path: '/SoloEvents',
    component: SoloEvents,
  },
  {
    path: '/Schedule',
    component: Schedule,
  },
  {
    path: '/CardManagement',
    component: CardManagement,
  },
  {
    path: '/Status',
    component: Status,
  },
  {
    path: '/AssistancePWD',
    component: AssistancePWD,
  },
  {
    path: '/EventsPWD',
    component: EventsPWD,
  },
  {
    path: '/ServicesPWD',
    component: ServicesPWD,
  },
  {
    path: '/temlpatep',
    component: temlpatep,
  },
  {
    path: '/SeniorTemplate',
    component: SeniorTemplate,
  },
  {
    path: '/publicationsPWD',
    component: publicationsPWD,
  },
  {
    path: '/SoloNav',
    component: SoloNav,
  },
  {
    path: '/CPWD',
    component: CPWD,
  },
  {
    path: '/PWDNavbar',
    component: PWDNavbar,
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
    path: '/user-management',
    component: UserManagementView,
  },
  {
    path: '/SeniorContacts',
    component: SeniorContacts,
  },
  {
    path: '/Soloparent',
    component: Soloparent,
  },
  {
    path: '/Pwd',
    component: Pwd,
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
    component: SeniorServices,
  },
  {
    path: '/Offices',
    component: Offices,
  },
  {
    path: '/about',
    name: 'about',
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue'),
  },
  {
    path: '/Navbar',
    name: 'Navbar',
    component: Navbar,
  },
  {
    path: '/',
    name: 'landingpage',
    component: landingpage,
  },
  {
    path: '/AdminNav',
    name: 'AdminNav',
    component: AdminNav,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach(async (to, from, next) => {
  if (to.meta.requiresAuth) {
    try {
      const response = await axios.get('/api/user');
      const userData = response.data;

      if (userData) {
        const userRole = userData.role;

        if (userRole === 'admin' && to.path.startsWith('/user')) {
          next('/dashboard');
        } else if (userRole === 'user' && to.path.startsWith('/admin')) {
          next('/');
        } else {
          next();
        }
      } else {
        next('/login');
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
      next('/login');
    }
  } else {
    next();
  }
});

export default router;
