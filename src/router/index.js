import Vue from 'vue'
import VueRouter from 'vue-router'

const HomeView = () => import('../views/HomeView.vue')
const AboutView = () => import('../views/AboutView.vue')
const LoginView = () => import('../views/LoginView.vue')
const MainView = () => import('../views/MainView.vue')

const ComponentsCreate = () => import('../components/components/ComponentsCreate.vue')
const ComponentsList = () => import('../components/components/ComponentsList.vue')
const ConfigCreate = () => import('../components/config/ConfigCreate.vue')
const ConfigList = () => import('../components/config/ConfigList.vue')
const TemplateCreate = () => import('../components/template/TemplateCreate.vue')
const TemplateList = () => import('../components/template/TemplateList.vue')
const UsersCreate = () => import('../components/users/UsersCreate.vue')
const UsersList = () => import('../components/users/UsersList.vue')

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'login',                      
    component: LoginView
  },
  {
    path: '/login',
    name: 'login',
    component: LoginView
  },
  {
    path: '/main',
    name: 'main',
    component: MainView,
    children: [
      {
        path: '/components/create', 
        component: ComponentsCreate,
      },
      {
        path: '/components/edit/:id', 
        component: ComponentsCreate,
        props: true
      },
      {
        path: '/components/list', 
        component: ComponentsList,
      },
      {
        path: '/config/edit/:id', 
        component: ConfigCreate,
        props: true
      },
      {
        path: '/config/create', 
        component: ConfigCreate,
      },
      {
        path: '/config/list', 
        component: ConfigList,
      },
      {
        path: '/template/edit/:id', 
        component: TemplateCreate,
        props: true
      },
      {
        path: '/template/create', 
        component: TemplateCreate,
      },
      {
        path: '/template/list', 
        component: TemplateList,
      },
      {
        path: '/users/edit/:id', 
        component: UsersCreate,
        props: true
      },
      {
        path: '/users/create', 
        component: UsersCreate,
      },
      {
        path: '/users/list', 
        component: UsersList,
      },
      {
        path: '/about',
        component: AboutView
      },
    ]
  },
]

const router = new VueRouter({
  routes
})

export default router
