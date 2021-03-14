import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/Login'
import Main from '../views/Main'

import notFound from '@/views/notFound'
import Register from '@/views/Register'
import creditMenu from "@/views/creditInfo/creditFinfo/creditMenu";
import assetPackMenu from "@/views/creditInfo/assetPackage/assetPackMenu";
import assetPackInfo from "@/views/creditInfo/assetPackage/assetPackInfo";
import recallDetail from "@/views/creditRecall/recallDetail";
import JudicialDetail from "@/views/JudicialProceedings/JudicialDetail";
import userInfo from "@/views/userInfo/userInfo";
import userManage from "@/views/userInfo/userManage";
import collectionManage from "@/views/totalSearch/collectionManage";
import fqCompany from "@/views/totalSearch/fqCompany";
import SMAD from "@/views/totalSearch/SMAD";
import crashedCredit from "@/views/totalSearch/crashedCredit";
import creditTransfer from "@/views/totalSearch/creditTransfer";
import addfqCompanyInfo from "@/views/totalSearch/addfqCompanyInfo";
import addCrashedCreditInfo from "@/views/totalSearch/addCrashedCreditInfo";
import addCreditTransferInfo from "@/views/totalSearch/addCreditTransferInfo";
import recallXq from "@/views/creditRecall/recallXq";
import JudicialInfo from "@/views/JudicialProceedings/JudicialInfo";
import assetPackAdd from "@/views/creditInfo/assetPackage/assetPackAdd";
import addCollection from "@/views/totalSearch/addCollection";
import xqCollection from "@/views/creditInfo/creditFinfo/xqCollection";
import xqJudicature from "@/views/creditInfo/creditFinfo/xqJudicature";
import xqRecall from "@/views/creditInfo/creditFinfo/xqRecall";
import xqFee from "@/views/creditInfo/creditFinfo/xqFee";
import fee from "@/views/creditInfo/fee";
import SMortgage from "@/views/creditInfo/SMortgage";
import FInfo from "@/views/creditInfo/FInfo";
import xqSmortgage from "@/views/creditInfo/creditFinfo/xqSmortgage";
import xqCreditFinfo from "@/views/creditInfo/creditFinfo/xqCreditFinfo";
import SMADxq from "@/views/totalSearch/SMADXQ/SMADxq";
import SMADFinfo from "@/views/totalSearch/SMADXQ/SMADFinfo";
import SMADauction from "@/views/totalSearch/SMADXQ/SMADauction";
import SMADinfo from "@/views/totalSearch/SMADXQ/SMADinfo";

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Login',
    component: Login
  },
  {
    path: '/Main',
    name: 'Main',
    component: Main,
    // 嵌套路由
    children: [
      {
        path: '/creditInfo/creditFinfo/creditMenu',
        name: 'creditMenu',
        component: creditMenu
      },
      {
        path: '/creditInfo/assetPackage/assetPackMenu',
        name: 'assetPackMenu',
        component: assetPackMenu
      },
      {
        path: '/creditInfo/assetPackage/assetPackAdd',
        name: 'assetPackAdd',
        component: assetPackAdd
      },
      {
        path: '/creditInfo/assetPackage/assetPackInfo',
        name: 'assetPackInfo',
        component: assetPackInfo
      },
      {
        path: '/creditInfo/fee',
        name: 'fee',
        component: fee
      },
      {
        path: '/creditInfo/SMortgage',
        name: 'SMortgage',
        component: SMortgage
      },
      {
        path: '/creditInfo/FInfo',
        name: 'FInfo',
        component: FInfo
      },
      {
        path: '/creditInfo/creditFinfo/xqCollection',
        name: 'xqCollection',
        component: xqCollection
      },
      {
        path: '/creditInfo/creditFinfo/xqJudicature',
        name: 'xqJudicature',
        component: xqJudicature
      },
      {
        path: '/creditInfo/creditFinfo/xqRecall',
        name: 'xqRecall',
        component: xqRecall
      },
      {
        path: '/creditInfo/creditFinfo/xqFee',
        name: 'xqFee',
        component: xqFee
      },
      {
        path: '/creditInfo/creditFinfo/xqSmortgage',
        name: 'xqSmortgage',
        component: xqSmortgage
      },
      {
        path: '/creditInfo/creditFinfo/xqCreditFinfo',
        name: 'xqCreditFinfo',
        component: xqCreditFinfo
      },
      {
        path: '/creditRecall/recallDetail',
        name: 'recallDetail',
        component: recallDetail
      },
      {
        path: '/creditRecall/recallXq',
        name: 'recallXq',
        component: recallXq
      },
      {
        path: '/JudicialProceedings/JudicialDetail',
        name: 'JudicialDetail',
        component: JudicialDetail
      },
      {
        path: '/JudicialProceedings/JudicialInfo',
        name: 'JudicialInfo',
        component: JudicialInfo
      },
      {
        path: '/userInfo/userInfo',
        name: 'userInfo',
        component: userInfo
      },
      {
        path: '/userInfo/userManage',
        name: 'userManage',
        component: userManage
      },
      {
        path: '/totalSearch/collectionManage',
        name: 'collectionManage',
        component: collectionManage
      },
      {
        path: '/totalSearch/addCollection',
        name: 'addCollection',
        component: addCollection
      },
      {
        path: '/totalSearch/fqCompany',
        name: 'fqCompany',
        component: fqCompany
      },
      {
        path: '/totalSearch/addfqCompanyInfo',
        name: 'addfqCompanyInfo',
        component: addfqCompanyInfo
      },
      {
        path: '/totalSearch/crashedCredit',
        name: 'crashedCredit',
        component: crashedCredit
      },
      {
        path: '/totalSearch/addCrashedCreditInfo',
        name: 'addCrashedCreditInfo',
        component: addCrashedCreditInfo
      },
      {
        path: '/totalSearch/SMAD',
        name: 'SMAD',
        component: SMAD
      },
      {
        path: '/totalSearch/SMADXQ/SMADxq',
        name: 'SMADxq',
        component: SMADxq
      },
      {
        path: '/totalSearch/SMADXQ/SMADFinfo',
        name: 'SMADFinfo',
        component: SMADFinfo
      },
      {
        path: '/totalSearch/SMADXQ/SMADauction',
        name: 'SMADauction',
        component: SMADauction
      },
      {
        path: '/totalSearch/SMADXQ/SMADinfo',
        name: 'SMADinfo',
        component: SMADinfo
      },
      {
        path: '/totalSearch/creditTransfer',
        name: 'creditTransfer',
        component: creditTransfer
      },
      {
        path: '/totalSearch/addCreditTransferInfo',
        name: 'addCreditTransferInfo',
        component: addCreditTransferInfo
      }
    ]
  },
  {
    path: '/Register',
    name: 'Register',
    component: Register
  },
  {
    path: '*',
    name: 'notFound',
    component: notFound
  }
]

const router = new VueRouter({
  routes,
  mode: 'history'
})

export default router
