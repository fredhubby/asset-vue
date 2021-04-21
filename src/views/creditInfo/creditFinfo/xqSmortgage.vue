<template>
  <div>
    <el-breadcrumb separator="/">
      <el-breadcrumb-item to="/timeRemider"><i class="el-icon-s-home"></i></el-breadcrumb-item>
      <el-breadcrumb-item class="el-breadcrumb1">债权信息</el-breadcrumb-item>
      <el-breadcrumb-item class="el-breadcrumb1">担保抵押信息</el-breadcrumb-item>
    </el-breadcrumb>
    <el-row class="el-row1">
      <div class="grid-content">
        <el-button type="primary" @click="newGuarantee">新增担保</el-button>
      </div>
    </el-row>
    <el-menu
        :default-active="activeIndex"
        class="el-menu-demo"
        mode="horizontal"
        background-color="#b2bec3"
        text-color="#333"
        active-text-color="#409eff">
      <el-menu-item index="1">
        <router-link
            :to="{path:'/creditInfo/creditFinfo/xqCreditFinfo',query:{iou:query_iou}}">债权基本信息</router-link>
      </el-menu-item>
      <el-menu-item index="2">
        <router-link
            :to="{path:'/creditInfo/creditFinfo/xqSmortgage',query:{iou:query_iou}}">担保抵押信息</router-link>
      </el-menu-item>
      <el-menu-item index="3">
        <router-link
            :to="{path:'/creditInfo/creditFinfo/xqFee',query:{iou:query_iou}}">债权费用信息</router-link>
      </el-menu-item>
      <el-menu-item index="4">
        <router-link
            :to="{path:'/creditInfo/creditFinfo/xqRecall',query:{iou:query_iou}}">债权清收信息</router-link>
      </el-menu-item>
      <el-menu-item index="5">
        <router-link
            :to="{path:'/creditInfo/creditFinfo/xqJudicature',query:{iou:query_iou}}">债权司法信息</router-link>
      </el-menu-item>
      <el-menu-item index="6">
        <router-link
            :to="{path:'/creditInfo/creditFinfo/xqCollection',query:{iou:query_iou}}">债权催收信息</router-link>
      </el-menu-item>
    </el-menu>

    <div class="table_container">
      <el-table
          :data="tableData"
          style="width: 85%">
        <el-table-column prop="id" label="担保ID"></el-table-column>
        <el-table-column prop="guaranteeMethod" label="担保方式"></el-table-column>
        <el-table-column prop="iouList" label="借据号">
          <template slot-scope="scope">
            <span v-html="scope.row.iouList"></span>
          </template>
        </el-table-column>
        <el-table-column prop="state" label="状态"></el-table-column>
        <el-table-column prop="note" label="备注"></el-table-column>
        <el-table-column prop="operate" label="操作" fixed="right">
          <template slot-scope="scope">
            <el-button @click="guaranteeDetail(scope.row)" type="text" size="small">详情</el-button>
            <el-popconfirm
                title="确定删除整个担保？"
                @confirm="deleteAll(scope.row)"
                style="margin-left: 5px">
              <el-button type="text" slot="reference" size="small">删除</el-button>
            </el-popconfirm>
<!--            <el-button type="text" size="small">删除</el-button>-->
          </template>
        </el-table-column>
      </el-table>
    </div>


    <el-drawer
        :visible.sync="drawer_show"
        :wrapperClosable="false"
        show-close
        size="50%">
      <el-divider class="inner_divider_top"></el-divider>
      <el-row class="innerBar">
        <el-col :span="24">
          <div>
            <el-button @click="edit">{{edit_label}}</el-button>
            <el-popconfirm
                v-if="allow_edit"
                title="确定提交？"
                style="margin-right: 40px;margin-left: 20px"
                @confirm="submit">
              <el-button type="primary" slot="reference">提交</el-button>
            </el-popconfirm>
          </div>
        </el-col>
      </el-row>
      <el-form label-width="130px" label-position="left" ref="form1" :model="form1" :rules="rules">
        <span style="font-size: 15px; font-weight: bold; margin-left:20px; margin-bottom:20px; display:inline-block">#基础信息</span>

        <el-form-item label="担保ID:" label-width="80px">
          <el-input v-model="form1[drawerInfo].guaranteeId" style="width: 45%" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="担保方式:" label-width="80px">
<!--          <el-select v-if="allow_edit" v-model="form1[drawerInfo].guaranteeMethod" placeholder="请选择" style="width: 45%">-->
<!--            <el-option-->
<!--                v-for="item in guaranteeMethodOptions"-->
<!--                :key="item.value"-->
<!--                :label="item.label"-->
<!--                :value="item.value">-->
<!--            </el-option>-->
<!--          </el-select>-->
          <el-input v-model="num2guarantee[form1[drawerInfo].guaranteeMethod]" style="width: 45%" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="备注:" label-width="80px">
          <el-input v-model="form1[drawerInfo].note" style="width: 45%" :disabled="!allow_edit"></el-input>
        </el-form-item>

        <el-divider></el-divider>
        <span style="font-size: 15px; font-weight: bold; margin-left:20px; margin-bottom:20px; display:inline-block">#借据号列表</span>
        <el-form-item
            label-width="80px"
            v-for="(iou, index) in form1[drawerInfo].iouIdList"
            :label="'借据号' + index"
            :key="iou.key"
            :prop="drawerInfo+'.iouIdList.'+index+'.value'"
            :rules="{required:true,message:'不允许为空',trigger:['blur','change']}">
          <el-input v-model="iou.value" style="width: 30%" :disabled="iou.isorigin"></el-input>
          <el-popconfirm
              v-if="iou.isorigin && !allow_edit"
              :title="Boolean(form1[drawerInfo].iouIdList.length>1)?'确定删除该借据？':'确定删除最后一个借据？此删除将删除整个担保信息'"
              @confirm="removeIou(iou)">
            <el-button
                type="text"
                slot="reference"
                style="margin-left: 20px">
              删除
            </el-button>
          </el-popconfirm>
          <el-button
              v-if="!iou.isorigin && !allow_edit"
              @click.prevent="removeIou(iou)"
              type="text"
              style="margin-left: 20px">
            删除
          </el-button>
        </el-form-item>
        <el-form-item style="margin-left: 0px;margin-top: 20px" label-width="80px">
          <el-button v-if="!allow_edit" type="primary" @click="addIou">新增借据</el-button>
          <el-popconfirm
              v-if="this.form1[drawerInfo].iouIdList.length > this.form1[drawerInfo].iouList_length"
              title="确定提交新增的借据？"
              @confirm="addIouSubmit()">
            <el-button
                type="primary"
                slot="reference"
                style="margin-left: 20px">
              提交
            </el-button>
          </el-popconfirm>
        </el-form-item>

        <div v-if="methodNum!=='3'">
        <el-divider></el-divider>
        <span style="font-size: 15px; font-weight: bold; margin-left:20px; margin-bottom:20px; display:inline-block">{{label_info[methodNum]}}</span>
        <el-collapse v-model="activeNames" class="card_list">
          <el-card
              v-for="(info,index1) in form1[drawerInfo][ListInfoType]"
              :key="info.key">
<!--            /////////////////////////////////////////////////////卡片头部///////////////////////////////////////////////////-->
            <div style="display: flex; justify-content: space-between">
              <el-form label-width="80px" class="card_head_form">
                <el-form-item
                    v-if="methodNum!=='2' && methodNum !=='3' && activeNames.indexOf(index1) === -1 && info.isorigin"
                    :label="cardLabel[methodNum].label">
                  <el-input v-model="info[cardLabel[methodNum].value_index]" style="width: 45%;" :disabled="true"></el-input>
                </el-form-item>
                <el-form-item
                    v-if="methodNum !=='3' && activeNames.indexOf(index1) === -1 && info.isorigin"
                    label="担保人">
                  <el-input v-model="info.guarantor" style="width: 45%;" :disabled="true"></el-input>
                </el-form-item>
                <el-form-item
                    v-if="methodNum !=='3' && activeNames.indexOf(index1) === -1 && info.isorigin"
                    :label="(methodNum==='0')?'抵押期间:':(methodNum==='1')?'质押期间':(methodNum==='2')?'担保期间':''">
                  <el-input v-model="info.guaranteeStartDate" style="width: 20%;" :disabled="true"></el-input>
                  <span style="color: #DCDFE6;margin: 0 3px 0 3px">~</span>
                  <el-input v-model="info.guaranteeEndDate" style="width: 25%;" :disabled="true"></el-input>
                </el-form-item>
                <span v-if="methodNum !=='3' && !info.isorigin" style="color: #409eff;font-size: small;display: inline-block;margin-top: 8px">新增编辑中</span>
              </el-form>
              <el-popconfirm
                  v-if="info.isorigin && !allow_edit"
                  title="确定删除该信息？"
                  @confirm="removeInfo(info)">
                <el-button
                    type="text"
                    slot="reference">
                  删除
                </el-button>
              </el-popconfirm>
              <el-button v-if="!allow_edit && !info.isorigin" type="text" @click.native="removeInfo(info)">删除</el-button>
            </div>
            <el-divider class="inner_divider"></el-divider>
<!--            /////////////////////////////////////////////////////卡片内部具体内容///////////////////////////////////////////////////-->
            <el-collapse-item :name="index1">

              <div v-if="Boolean(methodNum==='0')">
                <el-form-item
                    :inline-message="true"
                    label="抵押物名称:"
                    :prop="drawerInfo+'.'+ListInfoType + '.' + index1+'.collateralName'"
                    :rules="{required: allow_edit || !info.isorigin,message: '不允许为空',trigger:['blur','change']}">
                  <el-input v-model="info.collateralName" style="width: 45%" :disabled="!allow_edit && info.isorigin"></el-input>
                </el-form-item>
                <el-form-item
                    :inline-message="true"
                    label="抵押物类型:"
                    :prop="drawerInfo+'.'+ListInfoType + '.' + index1+'.collateralType'"
                    :rules="{required: allow_edit || !info.isorigin,message: '不允许为空',trigger:['blur','change']}">
                  <el-select v-if="allow_edit || !info.isorigin" v-model="info.collateralType" placeholder="请选择" style="width: 45%">
                    <el-option
                        v-for="item in collateralType_options"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                    </el-option>
                  </el-select>
                  <el-input v-if="!allow_edit && info.isorigin" v-model="collateralTypeIndex[info.collateralType]" style="width: 45%" :disabled="!allow_edit && info.isorigin"></el-input>
                </el-form-item>
                <el-form-item label="抵押物位置:">
                  <el-input v-model="info.collateralLocation" style="width: 45%" :disabled="!allow_edit && info.isorigin"></el-input>
                </el-form-item>
                <el-form-item
                    :inline-message="true"
                    label="土地面积(亩):"
                    :prop="drawerInfo+'.'+ListInfoType + '.' + index1+'.landArea'"
                    :rules="{pattern:/^\d+(\.\d*)?$/,message:'必须为数字',trigger:['change','blur']}">
                  <el-input v-model="info.landArea" style="width: 45%" :disabled="!allow_edit && info.isorigin"></el-input>
                </el-form-item>
                <el-form-item label="土地性质:">
                  <el-select v-if="allow_edit || !info.isorigin" v-model="info.landType" placeholder="请选择" style="width: 45%">
                    <el-option
                        v-for="item in landType_options"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                    </el-option>
                  </el-select>
                  <el-input v-if="!allow_edit && info.isorigin" v-model="landTypeTypeIndex[info.landType]" style="width: 45%" :disabled="!allow_edit && info.isorigin"></el-input>
                </el-form-item>
                <el-form-item
                    :inline-message="true"
                    label="房产面积(平方米):"
                    :prop="drawerInfo+'.'+ListInfoType + '.' + index1+'.propertySize'"
                    :rules="{pattern:/^\d+(\.\d*)?$/,message:'必须为数字',trigger:['change','blur']}">
                  <el-input v-model="info.propertySize" style="width: 45%" :disabled="!allow_edit && info.isorigin"></el-input>
                </el-form-item>
                <el-form-item
                    label="抵押物评估价(元):"
                    :inline-message="true"
                    :prop="drawerInfo+'.'+ListInfoType + '.' + index1+'.appraisedValue'"
                    :rules="{pattern:/^\d+(\.\d?\d?)?$/,message:'必须为数字(最多两位小数)',trigger:['change','blur']}">
                  <el-input v-model="info.appraisedValue" style="width: 45%" :disabled="!allow_edit && info.isorigin"></el-input>
                </el-form-item>
                <el-form-item
                    label="抵押物登记金额(元):"
                    :inline-message="true"
                    :prop="drawerInfo+'.'+ListInfoType + '.' + index1+'.registrationAmount'"
                    :rules="{pattern:/^\d+(\.\d?\d?)?$/,message:'必须为数字(最多两位小数)',trigger:['change','blur']}">
                  <el-input v-model="info.registrationAmount" style="width: 45%" :disabled="!allow_edit && info.isorigin"></el-input>
                </el-form-item>
                <el-form-item label="抵押期间起止日期:">
                  <el-input v-if="!allow_edit && info.isorigin" v-model="info.guaranteeStartDate" style="width: 30%;" :disabled="!allow_edit && info.isorigin"></el-input>
                  <span v-if="!allow_edit && info.isorigin" style="color: #DCDFE6;margin: 0 3px 0 3px">~</span>
                  <el-input v-if="!allow_edit && info.isorigin" v-model="info.guaranteeEndDate" style="width: 30%;" :disabled="!allow_edit && info.isorigin"></el-input>
                  <el-row v-if="allow_edit || !info.isorigin">
                    <el-col :span="10">
                      <el-form-item
                          style="margin-left: 0px"
                          :prop="drawerInfo+'.'+ListInfoType + '.' + index1+'.guaranteeStartDate'"
                          :rules="{required: allow_edit || !info.isorigin,message: '不允许为空',trigger:['blur','change']}">
                        <el-date-picker
                            v-model="info.guaranteeStartDate"
                            type="date" placeholder="选择日期" format="yyyy-MM-dd" value-format="yyyy-MM-dd" style="width: 100%">
                        </el-date-picker>
                      </el-form-item>
                    </el-col>
                    <el-col :span="10">
                      <el-form-item
                          style="margin-left: 0px"
                          :prop="drawerInfo+'.'+ListInfoType + '.' + index1+'.guaranteeEndDate'"
                          :rules="{required: allow_edit || !info.isorigin,message: '不允许为空',trigger:['blur','change']}">
                        <el-date-picker
                            v-model="info.guaranteeEndDate"
                            type="date" placeholder="选择日期" format="yyyy-MM-dd" value-format="yyyy-MM-dd" style="width: 100%">
                        </el-date-picker>
                      </el-form-item>
                    </el-col>
                  </el-row>
                </el-form-item>
                <el-form-item
                    :inline-message="true"
                    :prop="drawerInfo+'.'+ListInfoType + '.' + index1+'.reminderDay'"
                    :rules="[{required:allow_edit || !info.isorigin,message:'不允许为空',trigger:['blur','change']},{pattern:/^\d+$/,message:'必须为数字',trigger:['change','blur']}]">
                  <template slot="label">
                    <span>提醒时间(天):</span>
                    <el-tooltip class="item" effect="dark" content="提前多长时间进行时效提醒" placement="top-start">
                      <i class="el-icon-info"></i>
                    </el-tooltip>
                  </template>
                  <el-input v-model="info.reminderDay" style="width: 45%" :disabled="!allow_edit && info.isorigin"></el-input>
                </el-form-item>
                <el-form-item
                    label="是否被催告:"
                    :inline-message="true"
                    :prop="drawerInfo+'.'+ListInfoType + '.' + index1+'.timeConversion'"
                    :rules="[{required:allow_edit || !info.isorigin,message:'不允许为空',trigger:['blur','change']}]">
                  <span v-if="!allow_edit && info.isorigin" style="color: #C0C4CC; margin-left: 15px">{{Boolean(info.timeConversion==='1')?'是':'否'}}</span>
                  <el-select v-if="allow_edit || !info.isorigin" v-model="info.timeConversion" placeholder="请选择" style="width: 45%">
                    <el-option
                        v-for="item in isurge_options"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                    </el-option>
                  </el-select>
                </el-form-item>
                <el-form-item v-if="!allow_edit && info.isorigin" label="抵押人:">
                  <el-input v-model="info.guarantor" style="width: 45%" :disabled="!allow_edit && info.isorigin"></el-input>
                </el-form-item>
                <div v-if="allow_edit || !info.isorigin">
                  <el-form-item
                      v-for="(guarantor, index2) in info.guarantorList"
                      :label="'抵押人' + index2"
                      :key="guarantor.key"
                      :inline-message="true"
                      :prop="drawerInfo+'.'+ListInfoType + '.' + index1+'.guarantorList.'+index2+'.value'"
                      :rules="[{required:allow_edit || !info.isorigin,message:'不允许为空',trigger:['blur','change']}]">
                    <el-input v-model="guarantor.value" style="width: 45%"></el-input>
                    <el-button
                        @click.prevent="removeGuarantor(guarantor,index1)"
                        type="text"
                        style="margin-left: 20px">
                      删除
                    </el-button>
                  </el-form-item>
                  <el-form-item style="margin-left: 35px">
                    <el-button type="primary" @click="addGuarantor(index1)">新增抵押人</el-button>
                  </el-form-item>
                </div>
              </div>

              <div v-if="Boolean(methodNum==='1')">
                <el-form-item
                    label="质押物名称:"
                    :inline-message="true"
                    :prop="drawerInfo+'.'+ListInfoType + '.' + index1+'.pledgesName'"
                    :rules="{required: allow_edit || !info.isorigin,message: '不允许为空',trigger:['blur','change']}">
                  <el-input v-model="info.pledgesName" style="width: 45%" :disabled="!allow_edit && info.isorigin"></el-input>
                </el-form-item>
                <el-form-item
                    label="质押物类型:"
                    :inline-message="true"
                    :prop="drawerInfo+'.'+ListInfoType + '.' + index1+'.pledgesType'"
                    :rules="{required: allow_edit || !info.isorigin,message: '不允许为空',trigger:['blur','change']}">
                  <el-select v-if="allow_edit || !info.isorigin" v-model="info.pledgesType" placeholder="请选择" style="width: 45%">
                    <el-option
                        v-for="item in pledgesType_options"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                    </el-option>
                  </el-select>
                  <el-input v-if="!allow_edit && info.isorigin" v-model="pledgesTypeIndex[info.pledgesType]" style="width: 45%" :disabled="!allow_edit && info.isorigin"></el-input>
                </el-form-item>
                <el-form-item
                    :inline-message="true"
                    :prop="drawerInfo+'.'+ListInfoType + '.' + index1+'.pledgesValue'"
                    :rules="{pattern:/^\d+(\.\d?\d?)?$/,message:'必须为数字(最多两位小数)',trigger:['change','blur']}"
                    label="质押物价值(元):">
                  <el-input v-model="info.pledgesValue" style="width: 45%" :disabled="!allow_edit && info.isorigin"></el-input>
                </el-form-item>
                <el-form-item label="质押期间起止日期:">
                  <el-input v-if="!allow_edit && info.isorigin" v-model="info.guaranteeStartDate" style="width: 30%;" :disabled="!allow_edit && info.isorigin"></el-input>
                  <span v-if="!allow_edit && info.isorigin" style="color: #DCDFE6;margin: 0 3px 0 3px">~</span>
                  <el-input v-if="!allow_edit && info.isorigin" v-model="info.guaranteeEndDate" style="width: 30%;" :disabled="!allow_edit && info.isorigin"></el-input>
                  <el-row v-if="allow_edit || !info.isorigin">
                    <el-col :span="10">
                      <el-form-item
                          style="margin-left: 0px"
                          :prop="drawerInfo+'.'+ListInfoType + '.' + index1+'.guaranteeStartDate'"
                          :rules="{required: allow_edit || !info.isorigin,message: '不允许为空',trigger:['blur','change']}">
                        <el-date-picker
                            v-model="info.guaranteeStartDate"
                            type="date"
                            placeholder="选择日期"
                            format="yyyy-MM-dd"
                            value-format="yyyy-MM-dd"
                            style="width: 100%">
                        </el-date-picker>
                      </el-form-item>
                    </el-col>
                    <el-col :span="10">
                      <el-form-item
                          style="margin-left: 0px"
                          :prop="drawerInfo+'.'+ListInfoType + '.' + index1+'.guaranteeEndDate'"
                          :rules="{required: allow_edit || !info.isorigin,message: '不允许为空',trigger:['blur','change']}">
                        <el-date-picker
                            v-model="info.guaranteeEndDate"
                            type="date"
                            placeholder="选择日期"
                            format="yyyy-MM-dd"
                            value-format="yyyy-MM-dd"
                            style="width: 100%">
                        </el-date-picker>
                      </el-form-item>
                    </el-col>
                  </el-row>
                </el-form-item>
                <el-form-item
                    :inline-message="true"
                    :prop="drawerInfo+'.'+ListInfoType + '.' + index1+'.reminderDay'"
                    :rules="[{required:allow_edit || !info.isorigin,message:'不允许为空',trigger:['blur','change']},{pattern:/^\d+$/,message:'必须为数字',trigger:['change','blur']}]">
                  <template slot="label">
                    <span>提醒时间(天):</span>
                    <el-tooltip class="item" effect="dark" content="提前多长时间进行时效提醒" placement="top-start">
                      <i class="el-icon-info"></i>
                    </el-tooltip>
                  </template>
                  <el-input v-model="info.reminderDay" style="width: 45%" :disabled="!allow_edit && info.isorigin"></el-input>
                </el-form-item>
                <el-form-item
                    label="是否被催告:"
                    :inline-message="true"
                    :prop="drawerInfo+'.'+ListInfoType + '.' + index1+'.timeConversion'"
                    :rules="[{required:allow_edit || !info.isorigin,message:'不允许为空',trigger:['blur','change']}]">
                  <span v-if="!allow_edit && info.isorigin" style="color: #C0C4CC; margin-left: 15px">{{Boolean(info.timeConversion==='1')?'是':'否'}}</span>
                  <el-select v-if="allow_edit || !info.isorigin" v-model="info.timeConversion" placeholder="请选择" style="width: 45%">
                    <el-option
                        v-for="item in isurge_options"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                    </el-option>
                  </el-select>
                </el-form-item>
                <el-form-item v-if="!allow_edit && info.isorigin" label="质押人:">
                  <el-input v-model="info.guarantor" style="width: 45%" :disabled="!allow_edit && info.isorigin"></el-input>
                </el-form-item>
                <el-form-item
                    v-if="allow_edit || !info.isorigin"
                    v-for="(guarantor, index2) in info.guarantorList"
                    :label="'质押人' + index2"
                    :key="guarantor.key"
                    :inline-message="true"
                    :prop="drawerInfo+'.'+ListInfoType + '.' + index1+'.guarantorList.'+index2+'.value'"
                    :rules="[{required:allow_edit || !info.isorigin,message:'不允许为空',trigger:['blur','change']}]">
                  <el-input v-model="guarantor.value" style="width: 45%"></el-input>
                  <el-button
                      @click.prevent="removeGuarantor(guarantor,index1)"
                      type="text"
                      style="margin-left: 20px">
                    删除
                  </el-button>
                </el-form-item>
                <el-form-item v-if="allow_edit || !info.isorigin" style="margin-left: 35px">
                  <el-button type="primary" @click="addGuarantor(index1)">新增质押人</el-button>
                </el-form-item>
              </div>

              <div v-if="Boolean(methodNum==='2')">
                <el-form-item label="担保期间起止日期:">
                  <el-input v-if="!allow_edit && info.isorigin" v-model="info.guaranteeStartDate" style="width: 30%;" :disabled="!allow_edit && info.isorigin"></el-input>
                  <span v-if="!allow_edit && info.isorigin" style="color: #DCDFE6;margin: 0 3px 0 3px">~</span>
                  <el-input v-if="!allow_edit && info.isorigin" v-model="info.guaranteeEndDate" style="width: 30%;" :disabled="!allow_edit && info.isorigin"></el-input>
                  <el-row v-if="allow_edit || !info.isorigin">
                    <el-col :span="10">
                      <el-form-item
                          style="margin-left: 0px"
                          :prop="drawerInfo+'.'+ListInfoType + '.' + index1+'.guaranteeStartDate'"
                          :rules="{required: allow_edit || !info.isorigin,message: '不允许为空',trigger:['blur','change']}">
                        <el-date-picker
                            v-model="info.guaranteeStartDate"
                            type="date" placeholder="选择日期" format="yyyy-MM-dd" value-format="yyyy-MM-dd" style="width: 100%">
                        </el-date-picker>
                      </el-form-item>
                    </el-col>
                    <el-col :span="10">
                      <el-form-item
                          style="margin-left: 0px"
                          :prop="drawerInfo+'.'+ListInfoType + '.' + index1+'.guaranteeEndDate'"
                          :rules="{required: allow_edit || !info.isorigin,message: '不允许为空',trigger:['blur','change']}">
                        <el-date-picker
                            v-model="info.guaranteeEndDate"
                            type="date" placeholder="选择日期" format="yyyy-MM-dd" value-format="yyyy-MM-dd" style="width: 100%">
                        </el-date-picker>
                      </el-form-item>
                    </el-col>
                  </el-row>
                </el-form-item>
                <el-form-item
                    :inline-message="true"
                    :prop="drawerInfo+'.'+ListInfoType + '.' + index1+'.reminderDay'"
                    :rules="[{required:allow_edit || !info.isorigin,message:'不允许为空',trigger:['blur','change']},{pattern:/^\d+$/,message:'必须为数字',trigger:['change','blur']}]">
                  <template slot="label">
                    <span>提醒时间(天):</span>
                    <el-tooltip class="item" effect="dark" content="提前多长时间进行时效提醒" placement="top-start">
                      <i class="el-icon-info"></i>
                    </el-tooltip>
                  </template>
                  <el-input v-model="info.reminderDay" style="width: 45%" :disabled="!allow_edit && info.isorigin"></el-input>
                </el-form-item>
                <el-form-item label="是否被催告:"
                    :inline-message="true"
                    :prop="drawerInfo+'.'+ListInfoType + '.' + index1+'.timeConversion'"
                    :rules="[{required:allow_edit || !info.isorigin,message:'不允许为空',trigger:['blur','change']}]">
                  <span v-if="!allow_edit && info.isorigin" style="color: #C0C4CC; margin-left: 15px">{{Boolean(info.timeConversion==='1')?'是':'否'}}</span>
                  <el-select v-if="allow_edit || !info.isorigin" v-model="info.timeConversion" placeholder="请选择" style="width: 45%">
                    <el-option
                        v-for="item in isurge_options"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                    </el-option>
                  </el-select>
                </el-form-item>
                <el-form-item  v-if="!allow_edit && info.isorigin" label="担保人:">
                  <el-input v-model="info.guarantor" style="width: 45%" :disabled="!allow_edit && info.isorigin"></el-input>
                </el-form-item>
                <el-form-item
                    v-if="allow_edit || !info.isorigin"
                    v-for="(guarantor, index2) in info.guarantorList"
                    :label="'担保人' + index2"
                    :key="guarantor.key"
                    :inline-message="true"
                    :prop="drawerInfo+'.'+ListInfoType + '.' + index1+'.guarantorList.'+index2+'.value'"
                    :rules="[{required:allow_edit || !info.isorigin,message:'不允许为空',trigger:['blur','change']}]">
                  <el-input v-model="guarantor.value" style="width: 45%"></el-input>
                  <el-button
                      @click.prevent="removeGuarantor(guarantor,index1)"
                      type="text"
                      style="margin-left: 20px">
                    删除
                  </el-button>
                </el-form-item>
                <el-form-item v-if="allow_edit || !info.isorigin" style="margin-left: 35px">
                  <el-button type="primary" @click="addGuarantor(index1)">新增担保人</el-button>
                </el-form-item>
              </div>

            </el-collapse-item>
          </el-card>
        </el-collapse>
<!--            /////////////////////////////////////////////////////新增卡片///////////////////////////////////////////////////-->
        <el-form-item v-if="!allow_edit && methodNum!=='3'" style="margin-left: 0px" label-width="45px">
          <el-button v-if="!allow_edit && methodNum==='0'" type="primary" @click="addCollatera">新增抵押物</el-button>
          <el-button v-if="!allow_edit && methodNum==='1'" type="primary" @click="addPledge">新增质押物</el-button>
          <el-button v-if="!allow_edit && methodNum==='2'" type="primary" @click="addAssurance">新增保证信息</el-button>
          <el-popconfirm
              v-if="this.form1[drawerInfo][ListInfoType].length > this.form1[drawerInfo].ListLength"
              title="确定提交新增的数据？"
              @confirm="addCollateraOrPledgeSubmit">
            <el-button
                type="primary"
                slot="reference"
                style="margin-left: 20px">
              提交
            </el-button>
          </el-popconfirm>
        </el-form-item>
        </div>
      </el-form>
    </el-drawer>

  </div>
</template>

<script>
import {default as api} from "@/utils/api";

export default {
  name: "xqSmortgage",
  data() {
    return {
      activeIndex: '2',
      form1: {
        assuranceInfo:{assuranceList:[], guaranteeId:'', guaranteeMethod:'', id:'', iouId:'', iouIdList:[], note:''},
        collateralInfo:{collateralList:[], guaranteeId:'', guaranteeMethod:'', id:'', iouId:'', iouIdList:[], note:''},
        guaranteeInfo:{guaranteeId:'', guaranteeMethod:'', id:'', iouId:'', iouIdList:[], note:''},
        pledgesInfo:{guaranteeId:'', guaranteeMethod:'', id:'', iouId:'', iouIdList:[], note:'', pledgesList:[]}
      },
      tableData:[],
      rules:{},
      methodNum:'0',
      drawerInfo:'collateralInfo',
      ListInfoType:'collateralList',
      cardLabel: {
        '0': {label: '抵押物', value_index: 'collateralName'},
        '1': {label: '质押物', value_index: 'pledgesName'},
        '2': {label: '', value_index: ''},
        '3': {label: '', value_index: ''}
      },

      num2guarantee:{'0':'抵押担保','1':'质押担保','2':'保证担保','3':'综合担保'},
      collateralTypeIndex:{'0':'建筑物和其它土地附着物','1':'建设用地使用权','2':'海域使用权','3':'生产设备、原材料、半成品、产品','4':'交通运输工具','5':'其它'},
      landTypeTypeIndex:{'0':'工业用地','1':'商业用地'},
      pledgesTypeIndex:{'0':'动产','1':'汇票、支票、本票','2':'债券、存款单','3':'仓单、提单','4':'基金份额、股权','5':'知识产权中的财产权','6':'其它'},
      num2labelInfo:{'0':'collateralInfo','1':'pledgesInfo','2':'assuranceInfo','3':'guaranteeInfo'},
      num2LitInfo:{'0':'collateralList','1':'pledgesList','2':'assuranceList','3':null},

      drawer_show:false,
      guaranteeMethodOptions:[
        {value: '0', label: '抵押担保'},
        {value: '1', label: '质押担保'},
        {value: '2', label: '保证担保'},
        {value: '3', label: '综合担保'}],
      collateralType_options:[
        {value:'0', label:'建筑物和其它土地附着物'},
        {value:'1', label:'建设用地使用权'},
        {value:'2', label:'海域使用权'},
        {value:'3', label:'生产设备、原材料、半成品、产品'},
        {value:'4', label:'交通运输工具'},
        {value:'5', label:'其它'}],
      landType_options:[
        {value:'0', label:'工业用地'},
        {value:'1', label:'商业用地'}],
      pledgesType_options:[
        {value:'0', label:'动产'},
        {value:'1', label:'汇票、支票、本票'},
        {value:'2', label:'债券、存款单'},
        {value:'3', label:'仓单、提单'},
        {value:'4', label:'基金份额、股权'},
        {value:'5', label:'知识产权中的财产权'},
        {value:'6', label:'其它'}],
      isurge_options:[
        {value:'0',label:'否'},
        {value:'1',label:'是'}
      ],
      allow_edit:false,
      activeNames: [],
      label_info: {'0':"#抵押物信息",'1':"#质押物信息",'2':"#保证信息"},

      timeData:[],
      isRegister:false,
      newGuaranteeStartDate:'',
      newGuaranteeEndDate:'',
      newReminderDay:'',
      reRegisterDate:'',


      pickerOptions:[],
      temp_key:0,
      collapse_active:['collateralInfo','pledgesInfo','assuranceInfo'],
      query_iou:this.$route.query.iou,
      edit_label:'编辑',
      origin_form_data:'',
      origin_timeData:'',

    }
  },
  created() {
    var _this = this;
    this.query_iou = this.$route.query.iou.replace(/^\s+|\s+$/g,"");
    api({
      url: "/Secure/getSecure",
      method: "get",
      params:{
        iouId:_this.$route.query.iou,
      }
    }).then(data => {
      console.log('获取担保信息')
      console.log(data);
      this.origin_form_data = data.data.datas;
      this.jsondata2form(data.data.datas);
      this.setTableData();
      //如果传参存在除借据号以外的信息，则打开对应的卡片
      this.openByquery();
    }).catch(err => {
      console.log(err);
    })
  },
  methods:{
    jsondata2form(data){
      //主要是为了在列表中加上key
      //使用JSON转换能够实现深拷贝
      this.form1 = JSON.parse(JSON.stringify(data)); //经过测试，这样给data中的数据复制，内部的所有属性都会被监测
      for(let prop in this.form1){
        if(this.form1[prop]!==null){
          let iouList_length = 0;
          for(let key in this.form1[prop]){
            if(key==='assuranceList' || key==='collateralList' || key==='pledgesList'){
              if(this.form1[prop][key]===null){
                this.form1[prop][key] = [];
              }
              for(let i=0;i<this.form1[prop][key].length;i++){
                //*************************重点注意，a[new_prop]=b这种赋值方式，会使得新加入的属性不被vue监测*********************//
                // this.form1[prop][key][i]['key'] = this.getTempKey();
                // this.form1[prop][key][i]['isorigin'] = true;
                this.$set(this.form1[prop][key][i],'key',this.getTempKey());
                this.$set(this.form1[prop][key][i],'isorigin',true);
                this.$set(this.form1[prop][key][i],'dialogShow',false);
                let guarantors = [];
                if(this.form1[prop][key][i].guarantor !== null){
                  if(this.form1[prop][key][i].guarantor instanceof Object){
                    guarantors = this.form1[prop][key][i].guarantor.split(",");
                  }
                  else{
                    guarantors.push(this.form1[prop][key][i].guarantor);
                  }
                }
                // if(this.form1[prop][key][i].guarantor instanceof Object && this.form1[prop][key][i].guarantor !== null) {
                //   guarantors = this.form1[prop][key][i].guarantor.split(",");
                // }
                // else if(this.form1[prop][key][i].guarantor instanceof String && this.form1[prop][key][i].guarantor !== null){
                //   guarantors.push(this.form1[prop][key][i].guarantor);
                // }
                let guarantorList = [];
                this.$set(this.form1[prop][key][i],'guarantorList',guarantorList)
                console.log('guarantos:'+guarantors)
                for(let j=0;j<guarantors.length;j++){
                  this.form1[prop][key][i].guarantorList.push({key:this.getTempKey(),value:guarantors[j]})
                }
                console.log('担保人测试');
                console.log(this.form1[prop][key][i])
                // this.$set(this.form1[prop][key][i],'guarantorList',guarantorList)
                // this.form1[prop][key][i]['guarantorList'] = guarantorList;
              }
              this.$set(this.form1[prop],'ListLength',this.form1[prop][key].length)
              // this.form1[prop]['ListLength'] = this.form1[prop][key].length;
            }
            else if(key==='iouIdList'){
              if(this.form1[prop][key]===null){
                this.form1[prop][key] = [];
              }
              //当借据号只有一个时，传来的数据可能不是List，而是字符串
              let iouList = [];
              if(this.form1[prop][key]!==null){
                if(this.form1[prop][key] instanceof Object){
                  iouList_length = this.form1[prop][key].length;
                  for(let i=0;i<iouList_length;i++){
                    let iouValue = this.form1[prop][key][i];
                    iouList.push({key:this.getTempKey(),value:iouValue,isorigin:true})
                  }
                }
                else{
                  let iouValue = this.form1[prop][key];
                  iouList.push({key:this.getTempKey(),value:iouValue,isorigin:true})
                }
              }
              // if(this.form1[prop][key] instanceof Object){
              //   iouList_length = this.form1[prop][key].length;
              //   for(let i=0;i<iouList_length;i++){
              //     let iouValue = this.form1[prop][key][i];
              //     iouList.push({key:this.getTempKey(),value:iouValue,isorigin:true})
              //   }
              // }
              // else if(this.form1[prop][key] instanceof String){
              //   let iouValue = this.form1[prop][key];
              //   iouList.push({key:this.getTempKey(),value:iouValue,isorigin:true})
              // }
              this.form1[prop][key] = iouList;
            }
          }
          this.$set(this.form1[prop],'iouList_length',iouList_length)
          // this.form1[prop]['iouList_length'] = this.form1[prop].iouIdList.length;
        }
      }
      console.log(this.form1)
    },
    setTableData(){
      this.tableData = []
      for(let key in this.form1){
        if(this.form1[key]!==null && this.form1[key].guaranteeId!==null){
          let data = {};
          data['id'] = this.form1[key].guaranteeId;
          data['guaranteeMethod'] = this.num2guarantee[this.form1[key].guaranteeMethod];
          data['guaranteeMethodNum'] = this.form1[key].guaranteeMethod;
          let iou = '';
          for(let i=0;i<this.form1[key].iouIdList.length && i<1;i++){
            iou+=String(this.form1[key].iouIdList[i].value)+'<br/>'
          }
          if(this.form1[key].iouIdList.length>1){
            iou+='...'
          }
          data['iouList'] = iou;
          data['state']='无';
          data['note'] = this.form1[key].note;
          this.tableData.push(data);
        }
      }
    },
    openByquery(){
      if((typeof this.$route.query.type) !== 'undefined' && this.$route.query.type!== ''){
        this.methodNum = this.$route.query.type;
        this.drawerInfo = this.num2labelInfo[this.methodNum];
        this.ListInfoType = this.num2LitInfo[this.methodNum];
        this.drawer_show=true;
        if((typeof this.$route.query.id) !== 'undefined' && this.$route.query.id!== ''){
          this.form1[this.drawerInfo][this.ListInfoType].forEach((info,index) => {
            if(info.id.replace(/^\s+|\s+$/g,"") === this.$route.query.id.replace(/^\s+|\s+$/g,"")){
              this.activeNames=[index];
              // var ele = document.getElementsByClassName('card_list');
              // console.log(ele)
            }
          })
        }
      }
    },
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    guaranteeDetail(row){
      this.drawer_show=true;
      this.methodNum = row.guaranteeMethodNum;
      this.drawerInfo = this.num2labelInfo[row.guaranteeMethodNum];
      this.ListInfoType = this.num2LitInfo[row.guaranteeMethodNum];
      this.activeNames=[];
    },
    getTempKey(){
      this.temp_key++;
      return this.temp_key;
    },
    edit(){
      //如果是允许编辑，即是点击放弃修改
      if(this.allow_edit){
        this.allow_edit=false;
        this.jsondata2form(this.origin_form_data);
        this.edit_label='编辑';
      }
      else{
        //在已存在新增借据号或者新增抵押物状态时，不允许编辑
        if(this.form1[this.drawerInfo].iouIdList.length > this.form1[this.drawerInfo].iouList_length ||
            (this.methodNum!=='3' && this.methodNum!=='2' &&
                this.form1[this.drawerInfo][this.ListInfoType].length > this.form1[this.drawerInfo].ListLength)){
          alert("新增编辑中，不允许编辑");
        }
        else{
          this.allow_edit=true;
          this.edit_label='放弃修改';
        }
      }
    },
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    timeDetail(index){
      this.form1[this.drawerInfo][this.ListInfoType][index].dialogShow = true;
      api({
        url: "/Secure/getTimelinessHistory",
        method: "post",
        data:{
          guaranteeTimeId:this.form1[this.drawerInfo][this.ListInfoType][index].id,
          guaranteeMethod:this.methodNum
        }
      }).then(data => {
        console.log(data);
        this.origin_timeData = data.data.datas;
        this.jsondata2timeData(data.data.datas)

      }).catch(err => {
        console.log(err);
      })
    },
    jsondata2timeData(data){
      this.timeData = JSON.parse(JSON.stringify(data));
      for(let i=0;i<this.timeData.length;i++){
        this.$set(this.timeData[i],'edit',false);
        this.$set(this.timeData[i],'edit_label',"编辑");
      }
    },
    timeDataEdit(row,index){
      if(!row.edit){
        row.edit=true;
        row.edit_label = "放弃修改";
      }
      else{
        row.edit = false;
        row.edit_label="编辑";
        row.reRegistrationDate = this.origin_timeData[index].reRegistrationDate;
        row.guaranteeStartDate = this.origin_timeData[index].guaranteeStartDate;
        row.guaranteeEndDate = this.origin_timeData[index].guaranteeEndDate;
        row.reminderDay = this.origin_timeData[index].reminderDay;
      }
    },
    reRegister(index){
      this.isRegister = true;
    },
    handleClose(done){
      if(this.isRegister){
        this.$confirm('确认放弃修改并关闭？')
            .then(_ => {
              this.isRegister=false;
              this.newGuaranteeStartDate ='';
              this.newGuaranteeEndDate ='';
              this.newReminderDay ='';
              this.reRegisterDate = '';
              done();
            })
            .catch(_ => {});
      }
      else{
        done();
      }
    },
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    registerSubmit(index){
      api({
        url: "/Secure/updateTimelinessHistory",
        method: "post",
        data:{
          guaranteeTimeId:this.form1[this.drawerInfo][this.ListInfoType][index].id,
          guaranteeMethod:this.methodNum,
          guaranteeStartDate:this.newGuaranteeStartDate,
          guaranteeEndDate:this.newGuaranteeEndDate,
          reminderDay:this.newReminderDay,
          reRegistrationDate:this.reRegisterDate
        }
      }).then(data => {
        // console.log(data);
        // this.timeData = data.data.datas;
        location.reload();
      }).catch(err => {
        console.log(err);
      })
    },
    saveTableData(){
      let send_data = [];
      for(let i=0;i<this.timeData.length;i++){
        if(this.timeData[i].edit){
          send_data.push({
            id:this.timeData[i].id,
            guaranteeTimeId:this.timeData[i].guaranteeTimeId,
            guaranteeStartDate:this.timeData[i].guaranteeStartDate,
            guaranteeEndDate:this.timeData[i].guaranteeEndDate,
            reminderDay:this.timeData[i].reminderDay,
            reRegistrationDate:this.timeData[i].reRegistrationDate
          })
        }
      }
      // console.log(send_data);
      if(send_data.length===0){
        alert("未发现可保存的条目")
      }
      else{
        api({
          url: "/Secure/modifyTimelinessHistory",
          method: "post",
          data:send_data
        }).then(data => {
          // console.log(data);
          // this.timeData = data.data.datas;
          location.reload();
        }).catch(err => {
          console.log(err);
        })
      }
    },
    deleteTimeData(row){
      this.$confirm('确认删除？')
          .then(_ => {
            api({
              url: "/Secure/deleteTimelinessHistory",
              method: "post",
              data:[row.id]
            }).then(data => {
              // console.log(data);
              // this.timeData = data.data.datas;
              location.reload();
            }).catch(err => {
              console.log(err);
            })
          })
          .catch(_ => {});
    },
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    submit(){

      this.$refs['form1'].validate((valid) => {
        if(valid){
          let send_data = {};
          send_data[this.drawerInfo] = JSON.parse(JSON.stringify(this.origin_form_data[this.drawerInfo]));
          // let typeIndex = {'0':'collateralInfo','1':'pledgesInfo','2':'assuranceInfo','3':'guaranteeInfo'};
          // let typeIndex2 = {'0':'collateralList','1':'pledgesList','2':'assuranceList'};
          //
          // let guaranteeMethod = typeIndex[this.methodNum];
          // send_data[this.drawerInfo] = {};
          // send_data[this.drawerInfo]['guaranteeId'] = this.form1[this.drawerInfo].guaranteeId
          // send_data[this.drawerInfo]['guaranteeMethod'] = this.form1[this.drawerInfo].guaranteeMethod
          send_data[this.drawerInfo]['note'] = this.form1[this.drawerInfo].note;
          // send_data[this.drawerInfo]['iouIdList'] = this.origin_form_data[this.drawerInfo].iouIdList

          if(this.form1.guaranteeMethod !== '3'){
            // send_data[this.drawerInfo][this.ListInfoType] = [];
            for(let i=0;i<this.form1[this.drawerInfo][this.ListInfoType].length;i++){
              // let temp_dict = {};
              for(let key in this.form1[this.drawerInfo][this.ListInfoType][i]){
                if(key === 'guarantorList'){
                  let guarantors='';
                  let j;
                  for(j=0;j<this.form1[this.drawerInfo][this.ListInfoType][i][key].length;j++){
                    if(j===0){
                      guarantors+=String(this.form1[this.drawerInfo][this.ListInfoType][i][key][j].value);
                    }
                    else{
                      guarantors+=","+String(this.form1[this.drawerInfo][this.ListInfoType][i][key][j].value)
                    }
                  }
                  // temp_dict['guarantor'] = guarantors;
                  send_data[this.drawerInfo][this.ListInfoType][i]['guarantor'] = guarantors;
                }
                else if(key !== 'key' && key !== 'isorigin' && key!== 'dialogShow'){
                  // temp_dict[key] = this.form1[this.drawerInfo][this.ListInfoType][i][key];
                  send_data[this.drawerInfo][this.ListInfoType][i][key] = this.form1[this.drawerInfo][this.ListInfoType][i][key];
                }
              }
              // send_data[this.drawerInfo][this.ListInfoType].push(temp_dict);
            }
          }
          console.log(send_data);
          api({
            url: "/Secure/updateSecure",
            method: "post",
            data:send_data
          }).then(data => {
            // console.log(data);
            // this.$router.replace('/creditInfo/creditFinfo/creditMenu');
            location.reload();
          }).catch(err => {
            console.log(err);
          })
        }
        else{
          console.log('err submit')
          this.$message('提交内容不符合要求')
          return false;
        }
      })

    },
    deleteAll(row){
      api({
        url: "/Secure/deleteSecureByGuaranteeId",
        method: "post",
        data:{'guaranteeId':row.id,'guaranteeMethod':row.guaranteeMethodNum}
      }).then(data => {
        // console.log(data);
        // this.$router.replace('/creditInfo/creditFinfo/creditMenu');
        location.reload();
      }).catch(err => {
        console.log(err);
      })
    },
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    //担保人
    addGuarantor(index){
      this.form1[this.drawerInfo][this.ListInfoType][index].guarantorList.push({key:this.getTempKey(),value:''});
    },
    removeGuarantor(guarantor,index){
      var i = this.form1[this.drawerInfo][this.ListInfoType][index].guarantorList.indexOf(guarantor);
      if(i!==-1){
        this.form1[this.drawerInfo][this.ListInfoType][index].guarantorList.splice(i,1);
      }
    },
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    //借据对象
    addIou(){
      this.form1[this.drawerInfo].iouIdList.push({key:this.getTempKey(),value:'',isorigin:false})
    },
    removeIou(iou){
      //如果删除的是原有的借据，会调用删除接口，否则只是在界面上删除
      if(iou.isorigin){
        console.log(this.form1[this.drawerInfo])
        if(this.form1[this.drawerInfo].iouIdList.length===1){
          api({
            url: "/Secure/deleteSecureByGuaranteeId",
            method: "post",
            data:{'guaranteeId':this.form1[this.drawerInfo].guaranteeId,'guaranteeMethod':this.form1[this.drawerInfo].guaranteeMethod}
          }).then(data => {
            // console.log(data);
            // this.$router.replace('/creditInfo/creditFinfo/creditMenu');
            location.reload();
          }).catch(err => {
            console.log(err);
          })
        }
        else{
          api({
            url: "/Secure/deleteSecureByIouId",
            method: "post",
            data:{guaranteeId:this.form1[this.drawerInfo].guaranteeId,iouId:iou.value}
          }).then(data => {
            // console.log(data);
            // this.$router.replace('/creditInfo/creditFinfo/creditMenu');
            location.reload();
          }).catch(err => {
            console.log(err);
          })
        }
      }
      else{
        var i = this.form1[this.drawerInfo].iouIdList.indexOf(iou);
        if (i !== -1) {
          this.form1[this.drawerInfo].iouIdList.splice(i, 1);
        }
      }
    },
    addIouSubmit(){
      //提交新增的借据
      this.$refs['form1'].validate((valid) => {
        if(valid){
          let send_data = [];
          for(let i=0;i<this.form1[this.drawerInfo].iouIdList.length;i++){
            if(!this.form1[this.drawerInfo].iouIdList[i].isorigin){
              send_data.push({
                iouId:this.form1[this.drawerInfo].iouIdList[i].value,
                guaranteeId:this.form1[this.drawerInfo].guaranteeId,
                guaranteeMethod:this.form1[this.drawerInfo].guaranteeMethod,
                note:this.form1[this.drawerInfo].note,
                deleteFlag:0
              })
            }
          }
          api({
            url: "/Secure/addIouId",
            method: "post",
            data:send_data
          }).then(data => {
            console.log(data);
            if(data.data.success){
              location.reload()
            }
            else{
              this.$message(data.data.msg)
            }
          }).catch(err => {
            console.log(err);
          })
        }
        else{
          console.log('err submit')
        }
      })


    },
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    //抵押物
    addCollatera(){
      this.form1.collateralInfo.collateralList.push({key:this.getTempKey(),collateralName:'',collateralType:'',collateralLocation:'',landArea:'',landType:'', propertySize:'',appraisedValue:'',registrationAmount:'',guarantorList:[{key:this.getTempKey(),value:''}],guaranteeStartDate:'', guaranteeEndDate:'',reminderDay:'',isorigin:false})
      this.activeNames=[this.form1.collateralInfo.collateralList.length-1];
    },
    //质押物
    addPledge(){
      this.form1.pledgesInfo.pledgesList.push({key:this.getTempKey(),pledgesName:'',pledgesValue:'',pledgesType:'',guarantorList:[{key:this.getTempKey(),value:''}],guaranteeStartDate:'', guaranteeEndDate:'',reminderDay:'',isorigin:false})
      this.activeNames=[this.form1.pledgesInfo.pledgesList.length-1];
    },

    addAssurance(){
      this.form1.assuranceInfo.assuranceList.push({key:this.getTempKey(),guarantorList:[{key:this.getTempKey(),value:''}],guaranteeStartDate:'', guaranteeEndDate:'',reminderDay:'',isorigin:false})
      this.activeNames=[this.form1.assuranceInfo.assuranceList.length-1];
    },
    addCollateraOrPledgeSubmit(){
      this.$refs['form1'].validate((valid) => {
        if(valid){
          if(this.methodNum==='0'){
            let send_data = [];
            for(let i=0;i<this.form1.collateralInfo.collateralList.length;i++){
              if(!this.form1.collateralInfo.collateralList[i].isorigin){
                let guarantors = '';
                for(let j=0;j<this.form1.collateralInfo.collateralList[i].guarantorList.length;j++){
                  if(j===0){
                    guarantors += String(this.form1.collateralInfo.collateralList[i].guarantorList[j].value)
                  }
                  else{
                    guarantors += "," + String(this.form1.collateralInfo.collateralList[i].guarantorList[j].value)
                  }
                }
                send_data.push({
                  guaranteeId:this.form1.collateralInfo.guaranteeId,
                  collateralName:this.form1.collateralInfo.collateralList[i].collateralName,
                  collateralLocation:this.form1.collateralInfo.collateralList[i].collateralLocation,
                  landArea:this.form1.collateralInfo.collateralList[i].landArea,
                  propertySize:this.form1.collateralInfo.collateralList[i].propertySize,
                  appraisedValue:this.form1.collateralInfo.collateralList[i].appraisedValue,
                  registrationAmount:this.form1.collateralInfo.collateralList[i].registrationAmount,
                  collateralType:this.form1.collateralInfo.collateralList[i].collateralType,
                  landType:this.form1.collateralInfo.collateralList[i].landType,
                  reminderDay:this.form1.collateralInfo.collateralList[i].reminderDay,
                  guaranteeStartDate:this.form1.collateralInfo.collateralList[i].guaranteeStartDate,
                  guaranteeEndDate:this.form1.collateralInfo.collateralList[i].guaranteeEndDate,
                  guarantor:guarantors,
                })
              }
            }
            api({
              url: "/Secure/addCollateral",
              method: "post",
              data:send_data
            }).then(data => {
              // console.log(data);
              // this.$router.replace('/creditInfo/creditFinfo/creditMenu');
              location.reload();
            }).catch(err => {
              console.log(err);
            })
          }
          else if(this.methodNum==='1'){
            let send_data = [];
            for(let i=0;i<this.form1.pledgesInfo.pledgesList.length;i++){
              if(!this.form1.pledgesInfo.pledgesList[i].isorigin){
                let guarantors = '';
                for(let j=0;j<this.form1.pledgesInfo.pledgesList[i].guarantorList.length;j++){
                  if(j===0){
                    guarantors += String(this.form1.pledgesInfo.pledgesList[i].guarantorList[j].value)
                  }
                  else{
                    guarantors += "," + String(this.form1.pledgesInfo.pledgesList[i].guarantorList[j].value)
                  }
                }
                send_data.push({
                  guaranteeId:this.form1.pledgesInfo.guaranteeId,
                  pledgesName:this.form1.pledgesInfo.pledgesList[i].pledgesName,
                  pledgesValue:this.form1.pledgesInfo.pledgesList[i].pledgesValue,
                  pledgesType:this.form1.pledgesInfo.pledgesList[i].pledgesType,
                  reminderDay:this.form1.pledgesInfo.pledgesList[i].reminderDay,
                  guaranteeStartDate:this.form1.pledgesInfo.pledgesList[i].guaranteeStartDate,
                  guaranteeEndDate:this.form1.pledgesInfo.pledgesList[i].guaranteeEndDate,
                  guarantor:guarantors,
                })
              }
            }
            api({
              url: "/Secure/addPledges",
              method: "post",
              data:send_data
            }).then(data => {
              // console.log(data);
              // this.$router.replace('/creditInfo/creditFinfo/creditMenu');
              location.reload();
            }).catch(err => {
              console.log(err);
            })
          }
          else if(this.methodNum==='2') {
            let send_data = [];
            for (let i = 0; i < this.form1.assuranceInfo.assuranceList.length; i++) {
              if (!this.form1.assuranceInfo.assuranceList[i].isorigin) {
                let guarantors = '';
                for (let j = 0; j < this.form1.assuranceInfo.assuranceList[i].guarantorList.length; j++) {
                  if (j === 0) {
                    guarantors += String(this.form1.assuranceInfo.assuranceList[i].guarantorList[j].value)
                  } else {
                    guarantors += "," + String(this.form1.assuranceInfo.assuranceList[i].guarantorList[j].value)
                  }
                }
                send_data.push({
                  guaranteeId: this.form1.assuranceInfo.guaranteeId,
                  reminderDay: this.form1.assuranceInfo.assuranceList[i].reminderDay,
                  guaranteeStartDate: this.form1.assuranceInfo.assuranceList[i].guaranteeStartDate,
                  guaranteeEndDate: this.form1.assuranceInfo.assuranceList[i].guaranteeEndDate,
                  guarantor: guarantors,
                })
              }
            }
            api({
              url: "/Secure/addAssurance",
              method: "post",
              data: send_data
            }).then(data => {
              // console.log(data);
              // this.$router.replace('/creditInfo/creditFinfo/creditMenu');
              location.reload();
            }).catch(err => {
              console.log(err);
            })
          }
        }
        else{
          console.log('err submit')
          return false;
        }
      })

    },
    removeInfo(info){
      if(info.isorigin){
        let url = {'0':"/Secure/deleteCollateral",'1':"/Secure/deletePledges",'2':"/Secure/deleteAssurance"}
        api({
          url: url[this.methodNum],
          method: "post",
          data:[info.id]
        }).then(data => {
          // console.log(data);
          // this.$router.replace('/creditInfo/creditFinfo/creditMenu');
          location.reload();
        }).catch(err => {
          console.log(err);
        })
      }
      else{
        var i = this.form1[this.drawerInfo][this.ListInfoType].indexOf(info);
        if(i !== -1){
          this.form1[this.drawerInfo][this.ListInfoType].splice(i, 1);
        }
      }
    },
    newGuarantee(){
      let newpage = this.$router.resolve({
        path: '/creditInfo/SMortgage',
        query:{
          creditList:JSON.stringify([this.query_iou])
        }
      })
      window.open(newpage.href, '_blank');
    }
  }
}
</script>

<style scoped>
.el-icon-s-home{
  font-size: 200%;
}
.el-breadcrumb1{
  font-size: 15px;
  margin-top: 10px;
}
.el-row1{
  margin-top: 20px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
  border-radius: 4px;
  text-align: end;
  height: 50px;
  line-height: 50px;
  padding-right: 20px;
}

.innerBar{
  /*box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);*/
  text-align: end;
  border-radius: 4px;
  margin-top: 0px;
}

.el-table{
  flex: 0 1 auto;
}
.table_container{
  margin-top: 40px;
  display: flex;
  justify-content: center;
}
/deep/ .el-form-item{
  margin-bottom: 10px;
  margin-left: 35px;
}

.card_head_form >>> .el-form-item{
  margin: 0 0 0 0;
}
.card_head_form >>> .el-input__inner{
  padding: 0;
}


/deep/ .el-drawer{
  /*padding-top: 80px;*/
  /*background-color: #55efc4;*/
  overflow: auto;

}
/deep/ .el-drawer__header {
  align-items: center;
  color: #72767b;
  display: flex;
  margin-bottom: 0px;
  padding: 20px 20px 0;
}


/deep/ .el-input__inner{
  /*background-color: #55efc4;*/
  height: 30px;
  /*border: none;*/
}

/deep/ .el-input__inner:disabled{
  background-color: white;
  height: 30px;
  border: none;
  cursor: text;
}

/deep/ .el-form-item__content{
  line-height: 30px;
}

/deep/ .el-form-item__label{
  line-height: 30px;
}

.card_list{

}
/*.el-collapse-item{*/
/*  float: right;*/
/*}*/

.el-collapse >>> .el-collapse-item__header{
  height: 20px;
  line-height: 20px;
  border-bottom: 0px;
  font-size: 10px;
  /*margin-left: 20px;*/
  margin-top: 2px;
  display: flex;
  justify-content: center;
  /*color: #409eff;*/

  /*font-weight: 300;*/
}

.inner_divider{
  margin: 0 0 0 0;
}

.inner_divider_top{
  margin: 20px 0 20px 0;
}

.el-collapse >>> .el-collapse-item__arrow{
  margin: 0 8px 0 5px;

}

/deep/ .el-card{
  margin:10px 40px 10px 40px;

}

/deep/ .el-card__body{
  padding: 10px 10px 0 10px;
}

</style>