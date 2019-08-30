import Vue from 'vue'
import Router from 'vue-router'
import login from '@/view/login/login'
import login1 from '@/view/login/login1'
// 登录
import layout from '@/view/layout/layout'
// 整体页面框架
import index from '@/view/index/index'
// 主页，第一层表格
import index2 from '@/view/index/index2'
// 主页，第二层表格
import index3 from '@/view/index/index3'
// 主页，第三层表格
import section from '@/view/section/section'
import hospital from '@/view/hospital/hospital'
import doctor from '@/view/doctor/doctor'
// 住院病例质控管理
import score from '@/view/score/score'
// 评审评分
import aggregation from '@/view/aggregation/aggregation'
import completeness from '@/view/QCmanager/completeness/completeness'
// 完整性配置
import timelimit from '@/view/QCmanager/timeLimit/time-limit'
// 时限配置
import senior from '@/view/QCmanager/senior/senior'
// 逻辑配置
import connotation from '@/view/QCmanager/connotation/connotation'
// 内涵质控配置
import wrongchar from '@/view/QCmanager/wrongchar/wrongchar'
// 错别字控制
import role from '@/view/systemManager/role/role'
// 角色管理
import account from '@/view/systemManager/account/account'
// 账号配置
import caseconfig from '@/view/systemManager/case-config/case-config'
// 病例配置
import casemanager from '@/view/casemanager/casemanager'
// 护士界面
import params from '@/view/systemManager/params/params'
// 护士界面
import nurse from '@/view/nurse/nurse'
import nurse2 from '@/view/nurse/nurse2'
import nurse3 from '@/view/nurse/nurse3'

Vue.use(Router)

export const router = new Router({
  routes: [
    {
      path: '/login',
      name: 'login',
      component: login
    },
    {
      path: '/',
      name: 'login',
      component: login1
    },
    {
      path: '/home',
      name: 'layout',
      component: layout,
      children: [
        {
          path: '/home',
          name: 'index',
          component: index
        },
        {
          path: '/index2/:id',
          name: 'index2',
          component: index2
        },
        {
          path: '/index3',
          name: 'index3',
          component: index3
        },
        {
          path: '/section',
          name: 'section',
          component: section
        },
        {
          path: '/hospital',
          name: 'hospital',
          component: hospital
        },
        {
          path: '/doctor',
          name: 'doctor',
          component: doctor
        },
        {
          path: '/completeness',
          name: 'completeness',
          component: completeness
        },
        {
          path: '/score',
          name: 'score',
          component: score
        },
        {
          path: '/aggregation',
          name: 'aggregation',
          component: aggregation
        },
        {
          path: '/time-limit',
          name: 'timelimit',
          component: timelimit
        },
        {
          path: '/senior',
          name: 'senior',
          component: senior
        },
        {
          path: '/connotation',
          name: 'connotation',
          component: connotation
        },
        {
          path: '/wrongchar',
          name: 'wrongchar',
          component: wrongchar
        },
        {
          path: '/role',
          name: 'role',
          component: role
        },
        {
          path: '/account',
          name: 'account',
          component: account
        },
        {
          path: '/case-config',
          name: 'caseconfig',
          component: caseconfig
        },
        {
          path: '/params',
          name: 'params',
          component: params
        },
        {
          path: '/nurse1',
          name: 'nurse1',
          component: nurse
        },
        {
          path: '/nurse2',
          name: 'nurse2',
          component: nurse2
        },
        {
          path: '/nurse3',
          name: 'nurse3',
          component: nurse3
        },
        {
          path: '/cese',
          name: 'casemanager',
          component: casemanager
        }
      ]
    }
  ]
})

// router.beforeEach((to, from, next) => {
//   const fullPath = to.fullPath
//   if (fullPath.startsWith('/login')) {
//     next()
//   } else {
//     const token = localStorage.getItem('adminToken')
//     if (!token) {
//       next({ replace: true, path: `/login?redirect=${fullPath}` })
//     }
//     next()
//   }
// })
