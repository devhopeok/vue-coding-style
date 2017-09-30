import Vue from 'vue'
import Router from 'vue-router'
import Container from '../pages/Container.vue'
import Home from '../pages/Home/Home.vue'
import StudentLogin from '../pages/Student/Login.vue'
//import StudentSettings from '../pages/Student/Settings.vue'
//import StudentAssignmentView from '../pages/Student/AssignmentView.vue'
import MyAssingmentFolders from '../pages/Teacher/MyAssignmentFolders.vue'
import AssignmentQuestion from '../pages/Teacher/AssignmentQuestion.vue'
import TeacherSettings from '../pages/Teacher/Settings.vue'

Vue.use(Router)

export default new Router({
  mode: 'hash',
  routes: [
    {
      path: '/',
      component: Home
    },
    {
      path: '/student',
      component: Container,
      children: [
        {
          path: '',
          component: StudentLogin
        },
        // {
        //   path: 'assignment',
        //   component: StudentAssignmentView
        // },
        // {
        //   path: 'settings',
        //   component: StudentSettings
        // }
      ]
    },
    {
      path: '/teacher',
      component: Container,
      children: [
        {
          path: '',
          component: MyAssingmentFolders
        },
        {
          path: 'question',
          component: AssignmentQuestion
        },
        {
          path: 'settings',
          component: TeacherSettings
        }
      ]
    }
  ]
})
