<template xmlns:el-col="http://www.w3.org/1999/html">
  <div>
    <el-breadcrumb separator="/">
      <el-breadcrumb-item to="/timeRemider"><i class="el-icon-s-home"></i></el-breadcrumb-item>
      <el-breadcrumb-item class="el-breadcrumb1">债权信息</el-breadcrumb-item>
      <el-breadcrumb-item class="el-breadcrumb1">债权基础信息</el-breadcrumb-item>
    </el-breadcrumb>
    <el-row class="el-row1">
      <el-col :span="24">
        <div class="grid-content">
          <el-dropdown @command="handleAddCommand">
            <el-button type="primary" class="el-dropdown-link">
              新增<i class="el-icon-arrow-down el-icon--right"></i>
            </el-button>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item command="a">新增司法</el-dropdown-item>
              <el-dropdown-item command="b" :disabled="this.judical_data.length<2">新增时效</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
<!--          <el-button @click="addJudicature" type="primary">新增</el-button>-->
          <el-button @click="edit" type="primary" style="margin-left: 20px">{{edit_label}}</el-button>
        </div>
      </el-col>
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

    <el-row style="margin-top: 20px" :gutter="20" v-if="judical_data!==''">
      <el-col :span="5">
        <el-card>
          <div class="radio">
            排序：
            <el-radio-group v-model="reverse">
              <el-radio :label="true" class="el_radio_sort">正序</el-radio>
              <el-radio :label="false" class="el_radio_sort">倒序</el-radio>
            </el-radio-group>
          </div>
          <el-timeline :reverse="reverse">
            <el-timeline-item
                v-for="(judical, index) in judical_data"
                :key="index"
                :color="judical.color"
                :timestamp="judical.statusGenerationDate">
              <el-button type="text" class="state_button" @click="show_judical(index)" :style="Boolean(index<judical_data.length-1)?'color: black':''">{{nameIndex[judical.judicialStatusName]}}</el-button>
            </el-timeline-item>
          </el-timeline>
        </el-card>
      </el-col>
      <el-col :span="17">
<!--        /////////////////////////////////////////////时效卡片部分////////////////////////////////////////////////////-->
        <el-card style="max-height: 350px; overflow: auto">
          <el-table
              :data="timeTableData"
              :row-class-name="tableRowClassName"
              style="width: 100%">
            <el-table-column prop="type" sortable label="时效(期限)类型" width="140px"></el-table-column>
            <el-table-column prop="StartDate" sortable label="起始日"></el-table-column>
            <el-table-column prop="EndDate" sortable label="到期日"></el-table-column>
<!--            <el-table-column prop="reminderDay" label="时效提醒"></el-table-column>-->
            <el-table-column prop="state" sortable label="状态" width="90px"></el-table-column>
            <el-table-column prop="guarantor" label="担保(债务)人"></el-table-column>
            <el-table-column prop="info" label="具体信息"></el-table-column>
            <el-table-column prop="operate" label="操作" fixed="right" width="90px">
              <template slot-scope="scope">
<!--                <el-button v-if="scope.row.type!=='借款到期日' || scope.row.type==='已转变诉讼时效'" @click="" type="text" size="small">编辑</el-button>-->
                <el-button  @click="timeDetail(scope.row,scope.$index)" type="text" size="small">详情</el-button>
                <el-button v-if="scope.row.type==='抵押期限' && judical_data[select_index].judicialStatusName === 'e'" type="text" size="small" @click="addPayInKind(scope.row)">执行</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-card>
<!--        /////////////////////////////////////////////司法信息卡片部分////////////////////////////////////////////////////-->
        <el-card style="margin-top: 10px" v-if="Boolean(judical_data[select_index].judicialStatusName !== 'i')">
<!--          <el-button @click="edit">{{judical_data[select_index].edit_label}}</el-button>-->
          <el-row style="text-align: end">
            <el-popconfirm
                v-if="allow_edit"
                title="确定提交？"
                style="margin-right: 20px"
                @confirm="submit">
              <el-button type="primary" slot="reference">提交</el-button>
            </el-popconfirm>
            <el-popconfirm
                v-if="select_index === judical_data.length-1"
                :title="Boolean(select_index===1)?'删除最初的司法状态会删除司法流程内的所有执行时效、保全时效、可申请上述时效，确定删除?':'确定删除？'"
                style="margin-right: 20px"
                @confirm="deleteJudical">
              <el-button type="primary" slot="reference">删除</el-button>
            </el-popconfirm>
          </el-row>
          <div>
            <el-form label-width="100px" ref="judical_data" :rules="judical_rules" :model="judical_data[select_index]">
              <el-row :gutter="0" style="margin-top: 40px">
                <el-col :span="10" :offset="0">
                  <el-form-item label="司法状态">
                    <el-select v-if="allow_edit" v-model="judical_data[select_index].judicialStatusName" placeholder="" style="width: 100%">
                      <el-option
                          v-for="item in judicalState_options"
                          :key="item.value"
                          :label="item.label"
                          :value="item.value">
                      </el-option>
                    </el-select>
                    <el-input v-if="!allow_edit" v-model="nameIndex[judical_data[select_index].judicialStatusName]" style="width: 100%" :disabled="true"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="10">
                  <el-form-item
                      label="创建日期:"
                      class="form_item"
                      prop="statusGenerationDate"
                      :rules="{required:true,message:' ',trigger:['change','blur']}">
                    <el-date-picker
                        v-if="allow_edit"
                        v-model="judical_data[select_index].statusGenerationDate"
                        type="date"
                        placeholder="选择日期"
                        style="width: 100%"
                        format="yyyy-MM-dd"
                        value-format="yyyy-MM-dd">
                    </el-date-picker>
                    <el-input v-if="!allow_edit" v-model="judical_data[select_index].statusGenerationDate" style="width: 100%" :disabled="true"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <div>
                <el-divider></el-divider>
                <span style="font-size: 15px; font-weight: bold; margin-left:20px; margin-bottom:20px; display:inline-block">案号信息</span>
                <el-form-item label="案号">
                  <el-input v-model="judical_data[select_index].caseId" style="width: 50%" :disabled="!allow_edit"></el-input>
                </el-form-item>
                <el-form-item label="法院">
                  <el-input v-model="judical_data[select_index].court" style="width: 50%" :disabled="!allow_edit"></el-input>
                </el-form-item>
                <el-form-item label="承办法官">
                  <el-input v-model="judical_data[select_index].chargeJudge" style="width: 50%" :disabled="!allow_edit"></el-input>
                </el-form-item>
                <el-form-item label="受托律所">
                  <el-input v-model="judical_data[select_index].entrustedLawFirm" style="width: 50%" :disabled="!allow_edit"></el-input>
                </el-form-item>
                <el-form-item label="律师">
                  <el-input v-model="judical_data[select_index].layer" style="width: 50%" :disabled="!allow_edit"></el-input>
                </el-form-item>
                <el-form-item label="备注">
                  <el-input v-model="judical_data[select_index].remarks" style="width: 50%" :disabled="!allow_edit"></el-input>
                </el-form-item>
              </div>
            </el-form>
          </div>
        </el-card>
<!--        /////////////////////////////////////////////借据号卡片部分////////////////////////////////////////////////////-->
        <el-card style="margin-top: 10px" v-if="Boolean(judical_data[select_index].judicialStatusName !== 'i')">
          <span style="font-size: 15px; font-weight: bold; margin-left:20px; margin-bottom:20px; display:inline-block">借据号</span>
          <el-form ref="iou_form" :model="iou_form">
            <el-form-item
                v-for="(iou, index) in iou_form.iouIdList"
                :label="'借据号' + index"
                :key="iou.key"
                style="margin-top: 20px;margin-left: 40px"
                :prop="'iouIdList.'+index+'.value'"
                :rules="{required:true,message:'不允许为空',trigger:['change','blur']}">
              <el-input v-model="iou.value" style="width: 45%" :disabled="iou.isorigin"></el-input>
              <el-popconfirm
                  v-if="iou.isorigin && !allow_edit"
                  :title="Boolean(iou_form.iouIdList.length>1)?'确定删除该借据？':'确定删除最后一个借据？此删除将删除该司法状态信息'"
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
            <el-form-item style="margin-left: 100px">
              <el-button v-if="!allow_edit" type="primary" @click="addIou">新增借据</el-button>
              <el-popconfirm
                  v-if="iou_form.iouIdList.length > iouList_length"
                  title="确定提交新增的借据？"
                  @confirm="addIouSubmit">
                <el-button
                    type="primary"
                    slot="reference"
                    style="margin-left: 20px">
                  提交
                </el-button>
              </el-popconfirm>
            </el-form-item>
          </el-form>
        </el-card>
      </el-col>
    </el-row>

    <el-dialog title="新增时效" :visible.sync="addTimeDialogShow" :append-to-body="true" :close-on-click-modal="false" :before-close="addTimeClose">
      <el-form label-width="90px" ref="addTimeForm" :model="addTimeForm" :rules="addTimeRules">
        <el-form-item label="时效类型" prop="type">
          <el-select v-model="addTimeForm.type" clearable filterable placeholder="请选择" style="width: 30%">
            <el-option
                v-for="item in timeOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="时效起止日" prop="type" label-width="100px">
          <el-row>
            <el-col :span="11">
              <el-form-item prop="startDate">
                <el-date-picker v-model="addTimeForm.startDate" type="date" placeholder="选择日期" format="yyyy-MM-dd" value-format="yyyy-MM-dd" style="width: 100%"></el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="11">
              <el-form-item prop="endDate">
                <el-date-picker v-model="addTimeForm.endDate" type="date" placeholder="选择日期" format="yyyy-MM-dd" value-format="yyyy-MM-dd" style="width: 100%"></el-date-picker>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form-item>
        <el-form-item label="时效提醒(天)" prop="reminderDay" label-width="110px">
          <el-input v-model="addTimeForm.reminderDay" style="width: 30%"></el-input>
        </el-form-item>
        <el-form-item v-if="addTimeForm.type!=='4' && addTimeForm.type!=='5'" :label="Boolean(addTimeForm.type==='0')?'账户信息':Boolean(addTimeForm.type==='1')?'动产信息':Boolean(addTimeForm.type==='2')?'不动产信息':'其它信息'">
          <el-input v-model="addTimeForm.info" style="width: 30%"></el-input>
        </el-form-item>
        <el-form-item
            v-if="addTimeForm.type!=='4' && addTimeForm.type!=='5'"
            label="查封状态"
            prop="state"
            :rules="{required:addTimeForm.type!=='4' && addTimeForm.type!=='5',message:'不允许为空',trigger:['change','blur']}">
          <el-select v-model="addTimeForm.state" clearable filterable placeholder="请选择" style="width: 30%">
            <el-option
                v-for="item in preserveState_options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-row style="text-align: end">
          <el-popconfirm title="确定提交？" @confirm="addTimeSubmit" style="margin-right: 40px">
            <el-button type="primary" slot="reference" style="margin-left: 20px">提交</el-button>
          </el-popconfirm>
        </el-row>
      </el-form>
    </el-dialog>
    <el-dialog title="时效详情" :visible.sync="detailTimeDialogShow" :append-to-body="true" :close-on-click-modal="false" :before-close="detailTimeClose">
      <el-form label-width="90px" :rules="detailTimeRules" ref="detailTimeForm" :model="detailTimeForm">
        <el-form-item label="时效类型" prop="type">
          <el-select v-model="detailTimeForm.type" clearable filterable placeholder="请选择" style="width: 30%" :disabled="!timeDetail_edit">
            <el-option
                v-for="item in timeOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="时效起止日">
          <el-row>
            <el-col :span="7">
              <el-form-item prop="startDate">
                <el-date-picker v-model="detailTimeForm.startDate" type="date" placeholder="选择日期" format="yyyy-MM-dd" value-format="yyyy-MM-dd" style="width: 100%" :disabled="!timeDetail_edit"></el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="7">
              <el-form-item prop="endDate">
                <el-date-picker v-model="detailTimeForm.endDate" type="date" placeholder="选择日期" format="yyyy-MM-dd" value-format="yyyy-MM-dd" style="width: 100%" :disabled="!timeDetail_edit"></el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="2">
              <el-button v-if="!timeDetail_edit" type="text" size="small" style="margin-left: 20px" @click="getTimeHistory">历史详情</el-button>
            </el-col>
          </el-row>
        </el-form-item>
        <el-form-item label="时效提醒" prop="reminderDay">
          <el-input v-model="detailTimeForm.reminderDay" style="width: 30%" :disabled="!timeDetail_edit"></el-input>
        </el-form-item>
        <el-form-item v-if="detailTimeForm.type!=='4' && detailTimeForm.type!=='5'" :label="Boolean(detailTimeForm.type==='0')?'账户信息':Boolean(detailTimeForm.type==='1')?'动产信息':Boolean(detailTimeForm.type==='2')?'不动产信息':'其它信息'">
          <el-input v-model="detailTimeForm.info" style="width: 30%" :disabled="!timeDetail_edit"></el-input>
        </el-form-item>
        <el-form-item
            v-if="detailTimeForm.type!=='4' && detailTimeForm.type!=='5'"
            label="查封状态"
            prop="state"
            :rules="{required:detailTimeForm.type!=='4' && detailTimeForm.type!=='5',message:'不允许为空',trigger:['change','blur']}">
          <el-select v-model="detailTimeForm.state" clearable filterable placeholder="请选择" style="width: 30%" :disabled="!timeDetail_edit">
            <el-option
                v-for="item in preserveState_options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-row style="text-align: end">
          <el-button type="primary" @click="timeDetailEdit">{{timeDetail_label}}</el-button>
          <el-popconfirm v-if="!timeDetail_edit" title="确定删除？" @confirm="deleteTimeInfo" style="margin-left: 20px;margin-right: 40px">
            <el-button type="primary" slot="reference">删除</el-button>
          </el-popconfirm>
          <el-popconfirm v-if="timeDetail_edit" title="确定提交？" @confirm="updateTimeSubmit" style="margin-right: 40px">
            <el-button type="primary" slot="reference" style="margin-left: 20px">提交</el-button>
          </el-popconfirm>

        </el-row>
      </el-form>
      <el-dialog title="时效历史" :visible.sync="timeHistoryDialog" :append-to-body="true" :close-on-click-modal="false" :before-close="timeHistoryDialogClose">
        <el-table :data="timeHistoryData">
          <el-table-column property="type" label="时效类型" width="80px">
            <template slot-scope="scope">
              <span>{{typeIndex[scope.row.type]}}</span>
            </template>
          </el-table-column>
          <el-table-column property="startDate" label="时效起始日" width="100px">
            <template slot-scope="scope">
              <span v-show="!scope.row.edit">{{scope.row.startDate}}</span>
              <el-date-picker v-show="scope.row.edit" v-model="scope.row.startDate" type="date" placeholder="选择日期" format="yyyy-MM-dd" value-format="yyyy-MM-dd" size="mini"></el-date-picker>
            </template>
          </el-table-column>
          <el-table-column property="endDate" label="时效截止日" width="100px">
            <template slot-scope="scope">
              <span v-show="!scope.row.edit">{{scope.row.endDate}}</span>
              <el-date-picker v-show="scope.row.edit" v-model="scope.row.endDate" type="date" placeholder="选择日期" format="yyyy-MM-dd" value-format="yyyy-MM-dd" size="mini"></el-date-picker>
            </template>
          </el-table-column>
          <el-table-column property="reminderDay" label="时效提醒" width="90px">
            <template slot-scope="scope">
              <span v-show="!scope.row.edit">{{scope.row.reminderDay}}</span>
              <el-input size="mini" v-show="scope.row.edit" v-model="scope.row.reminderDay"></el-input>
            </template>
          </el-table-column>
          <el-table-column v-if="detailTimeForm.type!=='4' && detailTimeForm.type!=='5'" property="state" label="查封状态" width="100px">
            <template slot-scope="scope">
              <span v-show="!scope.row.edit">{{stateIndex[scope.row.state]}}</span>
              <el-select v-show="scope.row.edit" v-model="scope.row.state" clearable filterable placeholder="请选择" style="width: 100%" size="mini">
                <el-option
                    v-for="item in preserveState_options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                </el-option>
              </el-select>
<!--              <el-input size="mini" v-show="scope.row.edit" v-model="scope.row.state"></el-input>-->
            </template>
          </el-table-column>
          <el-table-column property="info" label="具体信息" width="100px">
            <template slot-scope="scope">
              <span v-show="!scope.row.edit">{{scope.row.info}}</span>
              <el-input size="mini" v-show="scope.row.edit" v-model="scope.row.info"></el-input>
            </template>
          </el-table-column>
          <el-table-column property="operate" label="操作" width="130px">
            <template slot-scope="scope">
              <el-button @click="timeHistoryEdit(scope.row,scope.$index)" type="text" size="small">{{scope.row.edit_label}}</el-button>
              <el-button type="text" size="small" @click="deleteTimeHistoryData(scope.row)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-popconfirm title="确定提交？" @confirm="saveHistoryTableData" style="float: right;margin-right: 70px">
          <el-button type="primary" slot="reference">保存修改</el-button>
        </el-popconfirm>
        <el-form label-width="100px" ref="registerForm" :rules="registerRules" :model="registerForm">
          <el-form-item v-if="isRegister" label="当前时效" style="margin-top: 50px">
            <el-input v-model="detailTimeForm.startDate" :disabled="true" style="width: 30%"></el-input>
            <el-input v-model="detailTimeForm.endDate" :disabled="true" style="width: 30%"></el-input>
          </el-form-item>
          <el-form-item v-if="isRegister" label="时效起止日">
            <el-row>
              <el-col :span="7">
                <el-form-item prop="startDate">
                  <el-date-picker v-model="registerForm.startDate" type="date" placeholder="选择日期" format="yyyy-MM-dd" value-format="yyyy-MM-dd" style="width: 100%"></el-date-picker>
                </el-form-item>
              </el-col>
              <el-col :span="7">
                <el-form-item prop="endDate">
                  <el-date-picker v-model="registerForm.endDate" type="date" placeholder="选择日期" format="yyyy-MM-dd" value-format="yyyy-MM-dd" style="width: 100%"></el-date-picker>
                </el-form-item>
              </el-col>
            </el-row>


          </el-form-item>
          <el-form-item v-if="isRegister" label="时效提醒" prop="reminderDay">
            <el-input v-model="registerForm.reminderDay" style="width: 30%"></el-input>
          </el-form-item>
          <el-form-item
              v-if="isRegister && detailTimeForm.type!=='4' && detailTimeForm.type!=='5'"
              label="查封状态"
              prop="state"
              :rules="{required:detailTimeForm.type!=='4' && detailTimeForm.type!=='5',message:'不允许为空',trigger:['change','blur']}">
            <el-select v-model="registerForm.state" clearable filterable placeholder="请选择" style="width: 30%">
              <el-option
                  v-for="item in preserveState_options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item v-if="detailTimeForm.type!=='4' && detailTimeForm.type!=='5' && isRegister" :label="Boolean(detailTimeForm.type==='0')?'账户信息':Boolean(detailTimeForm.type==='1')?'动产信息':Boolean(detailTimeForm.type==='2')?'不动产信息':'其它信息'">
            <el-input v-model="registerForm.info" style="width: 30%"></el-input>
          </el-form-item>
          <el-button type="primary" @click="reRegister" style="margin-left: 50px">{{registerLabel}}</el-button>
          <el-popconfirm v-if="isRegister" title="确定提交？" @confirm="registerSubmit">
            <el-button type="primary" slot="reference" style="margin-left: 20px">提交</el-button>
          </el-popconfirm>
        </el-form>
      </el-dialog>
    </el-dialog>
    <el-dialog title="诉讼时效详情" :visible.sync ="limitationDialogShow" :append-to-body="true" :close-on-click-modal="false" :before-close="limitationDialogClose">
      <el-form style="margin-top: 20px" ref="limitationDetailForm" :model="limitationDetailForm" :rules="limitationDetailRules" label-width="130px">
        <!--        <span style="font-family: 黑体;font-size: 18px">借据号</span>-->
        <el-form-item
            v-for="(iou, index) in limitationDetailForm.iouList"
            :label="'借据号' + index"
            :key="iou.key"
            style="margin-top: 20px;margin-left: 20px">
          <el-input v-model="iou.value" style="width: 50%" :disabled="true"></el-input>
        </el-form-item>
        <el-divider></el-divider>
        <el-row :gutter="10">
          <el-col :span="12" :offset="0">
            <el-form-item label='诉讼时效起始日：' prop="limitationOfActionStartDate" label-width="135px">
              <el-date-picker v-model="limitationDetailForm.limitationOfActionStartDate" type="date" placeholder="选择日期" style="width: 100%" format="yyyy-MM-dd" value-format="yyyy-MM-dd" :disabled="!limitation_edit"></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label='诉讼时效到期日：' class="form_item" prop="limitationOfActionEndDate" label-width="135px">
              <el-date-picker v-model="limitationDetailForm.limitationOfActionEndDate" type="date" placeholder="选择日期" style="width: 100%" format="yyyy-MM-dd" value-format="yyyy-MM-dd" :disabled="!limitation_edit"></el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="10">
          <el-col :span="12" :offset="0">
            <el-form-item label='登记日期：'>
              <el-date-picker v-model="limitationDetailForm.changeDate" type="date" placeholder="选择日期" style="width: 100%" format="yyyy-MM-dd" value-format="yyyy-MM-dd" :disabled="!limitation_edit"></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label='时效提醒：' class="form_item" prop="actionNoticeTime">
              <el-input v-model="limitationDetailForm.actionNoticeTime" :disabled="!limitation_edit"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row style="text-align: end">
          <el-button type="primary" @click="addLimitationButton">重新登记</el-button>
          <el-button type="primary" @click="editLimitation">{{limitation_editLabel}}</el-button>
          <el-popconfirm
              v-if="limitation_edit"
              title="确定提交？"
              style="margin-right: 10px; margin-left: 10px"
              @confirm="updateLimitationSubmit">
            <el-button type="primary" slot="reference">提交</el-button>
          </el-popconfirm>
        </el-row>
      </el-form>
      <el-dialog title="新增诉讼时效" :visible.sync="addLimitationDialogShow" :append-to-body="true" :close-on-click-modal="false" :before-close="addLimitationDialogClose">
        <el-form label-width="130px" ref="addLimitationForm" :model="addLimitationForm" :rules="addLimitationRules">
          <el-row :gutter="10">
            <el-col :span="12" :offset="0">
              <el-form-item label='诉讼时效起始日：' prop="limitationOfActionStartDate" label-width="135px">
                <el-date-picker v-model="addLimitationForm.limitationOfActionStartDate" type="date" placeholder="选择日期" style="width: 100%" format="yyyy-MM-dd" value-format="yyyy-MM-dd"></el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label='诉讼时效到期日：' class="form_item" prop="limitationOfActionEndDate" label-width="135px">
                <el-date-picker v-model="addLimitationForm.limitationOfActionEndDate" type="date" placeholder="选择日期" style="width: 100%" format="yyyy-MM-dd" value-format="yyyy-MM-dd"></el-date-picker>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="10">
            <el-col :span="12" :offset="0">
              <el-form-item label='登记日期：'>
                <el-date-picker v-model="addLimitationForm.changeDate" type="date" placeholder="选择日期" style="width: 100%" format="yyyy-MM-dd" value-format="yyyy-MM-dd"></el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label='时效提醒：' class="form_item" prop="actionNoticeTime">
                <el-input v-model="addLimitationForm.actionNoticeTime"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row style="text-align: end">
            <el-popconfirm
                title="确定提交？"
                style="margin-right: 10px"
                @confirm="addLimitationSubmit">
              <el-button type="primary" slot="reference">提交</el-button>
            </el-popconfirm>
          </el-row>
        </el-form>
      </el-dialog>
    </el-dialog>
  </div>
</template>

<script>
import {default as api} from "@/utils/api";

export default {
  name: "xqJudicial",
  data(){
    return{
      activeIndex: '5',
      reverse: true,
      query_iou:this.$route.query.iou,

      //司法
      judical_data:[{judicialStatusName:'i',statusGenerationDate:'',caseId:'',court:'',chargeJudge:'',layer:'',entrustedLawFirm:'',remarks:'',color:'#E4E7ED'}],
      judical_rules:{},
      preservationPeriodList:[],
      origin_judical_data:'',
      select_index:0,
      judicalAllIou:[],
      iou_form:{iouIdList:[]},
      iouList_length:0,
      nameIndex: {
        '0': '撤诉',
        '1': '起诉中',
        '2': '一审审理中',
        '3': '一审判决书生效',
        '4': '一审调解中',
        '5': '一审上诉中',
        '6': '二审审理中',
        '7': '二审判决书生效',
        '8': '二审调解中',
        '9': '二审上诉中',
        'a': '再审审理中',
        'b': '再审判决书生效',
        'c': '再审调解中',
        'd': '申请执行中',
        'e': '执行中',
        'f': '和解终结',
        'g': '无财产终结',
        'h': '申请恢复执行',
        'i': '诉讼前',
      },
      judicalState_options:[
        {value:'0',label:'撤诉'},
        {value:'1',label:'起诉中'},
        {value:'2',label:'一审审理中'},
        {value:'3',label:'一审判决书生效'},
        {value:'4',label:'一审调解中'},
        {value:'5',label:'一审上诉中'},
        {value:'6',label:'二审审理中'},
        {value:'7',label:'二审判决书生效'},
        {value:'8',label:'二审调解中'},
        {value:'9',label:'二审上诉中'},
        {value:'a',label:'再审审理中'},
        {value:'b',label:'再审判决书生效'},
        {value:'c',label:'再审调解中'},
        {value:'d',label:'申请执行中'},
        {value:'e',label:'执行中'},
        {value:'f',label:'和解终结'},
        {value:'g',label:'无财产终结'},
        {value:'h',label:'申请恢复执行'},
        {value:'i',label:'诉讼前'},
      ],
      //担保
      smortgage_data:'',
      //借据号详情
      credit_data:'',
      //修改司法编辑状态
      allow_edit:false,
      edit_label:'编辑',
      temp_key:0,
      //新增保全时效表单
      addTimeForm:{judicialStatusId:'', type:'', info:'', startDate:'',endDate:'',reminderDay:'',state:''},
      addTimeDialogShow:false,
      addTimeRules:{
        type:{required:true, message:'不允许为空',trigger:['change','blur']},
        startDate:{required:true, message:'不允许为空',trigger:['change','blur']},
        endDate:{required:true, message:'不允许为空',trigger:['change','blur']},
        reminderDay:[{required:true, message:'不允许为空',trigger:['change','blur']},{pattern:/^\d+$/,message: '必须为数字',trigger:['change','blur']}],
      },
      //时效信息Tabel
      timeTableData:[],
      //时效详情dialog表单
      detailTimeForm:{judicialStatusId:'', type:'', info:'', startDate:'',endDate:'',reminderDay:'',state:'',index:''},
      detailTimeDialogShow:false,
      detailTimeRules:{
        type:{required:true, message:'不允许为空',trigger:['change','blur']},
        startDate:{required:true, message:'不允许为空',trigger:['change','blur']},
        endDate:{required:true, message:'不允许为空',trigger:['change','blur']},
        reminderDay:[{required:true, message:'不允许为空',trigger:['change','blur']},{pattern:/^\d+$/,message: '必须为数字',trigger:['change','blur']}],
      },
      //时效历史详情页dialog
      timeHistoryData:[],    //历史详情表格数据
      timeHistoryDialog:false,
      timeDetail_edit:false,
      timeDetail_label:'编辑',
      origin_TimeHitoryData:'',  //获取的原始时效历史数据
      registerLabel:'重新登记',
      isRegister:false,
      //重新登记的时效表单
      registerForm:{info:'', startDate:'',endDate:'',reminderDay:'',state:''},
      registerRules:{
        startDate:{required:true, message:'不允许为空',trigger:['change','blur']},
        endDate:{required:true, message:'不允许为空',trigger:['change','blur']},
        reminderDay:[{required:true, message:'不允许为空',trigger:['change','blur']},{pattern:/^\d+$/,message: '必须为数字',trigger:['change','blur']}],
      },

      //诉讼时效详情dialog,包含了修改(重新登记)诉讼时效功能，
      limitationDialogShow:false,
      // addLimitationForm:{limitationOfActionStartDate:'',limitationOfActionEndDate:'',changeDate:'',actionNoticeTime:''},
      limitationDetailForm:{limitationOfActionStartDate:'',limitationOfActionEndDate:'',changeDate:'',actionNoticeTime:'',iouList:[],index:''},
      limitationDetailRules:{
        limitationOfActionStartDate:{required:true, message:'不允许为空',trigger:['change','blur']},
        limitationOfActionEndDate:{required:true, message:'不允许为空',trigger:['change','blur']},
        actionNoticeTime:[{required:true, message:'不允许为空',trigger:['change','blur']},{pattern:/^\d+$/,message: '必须为数字',trigger:['change','blur']}],
      },
      addLimitationForm:{limitationOfActionStartDate:'',limitationOfActionEndDate:'',changeDate:'',actionNoticeTime:''},
      addLimitationRules:{
        limitationOfActionStartDate:{required:true, message:'不允许为空',trigger:['change','blur']},
        limitationOfActionEndDate:{required:true, message:'不允许为空',trigger:['change','blur']},
        actionNoticeTime:[{required:true, message:'不允许为空',trigger:['change','blur']},{pattern:/^\d+$/,message: '必须为数字',trigger:['change','blur']}],
      },
      limitation_editLabel:'编辑',
      limitation_edit:false,

      addLimitationDialogShow:false,


      timeOptions:[
        {value:'0',label:'账户查封期限'},
        {value:'1',label:'动产查封期限'},
        {value:'2',label:'不动产查封期限'},
        {value:'3',label:'其它查封期限'},
        {value:'4',label:'执行时效'},
        {value:'5',label:'可申请上述时效'}
      ],
      typeIndex:{
        '0':'账户查封期限',
        '1':'动产查封期限',
        '2':'不动产查封期限',
        '3':'其它查封期限',
        '4':'执行时效',
        '5':'可申请上述时效',
      },
      stateIndex:{'0':'查封','1':'解封'},
      preserveState_options:[
        {value:'0',label:'查封'},
        {value:'1',label:'解封'},
      ],



    }
  },
  created() {
    var _this = this;
    this.query_iou = this.$route.query.iou.replace(/^\s+|\s+$/g,"");
    function getJudical(iou){
      let p1 = new Promise((resolve,reject) => {
        api({
          url: "/Judicial/getJudicature",
          method: "get",
          params:{
            iouId:iou,
          }
        }).then(data => {
          resolve(data.data.datas);
        }).catch(err => {
          reject(err);
        })
      });
      return p1;
    }
    function getCredit(iouList){
      let pList = [];
      for(let i=0;i<iouList.length;i++){
        let p = new Promise(((resolve, reject) => {
          api({
            url: "/CreditInfo/getFundamentalCredit",
            method: "get",
            params:{
              iouId:iouList[i],
            }
          }).then(data => {
            resolve(data.data.datas);
          }).catch(err => {
            reject(err);
          })
        }))
        pList.push(p);
      }
      return Promise.all(pList)
    }
    function getSmortage(iouList){
      let pList = [];
      for(let i=0;i<iouList.length;i++){
        let p = new Promise(((resolve, reject) => {
          api({
            url: "/Secure/getSecure",
            method: "get",
            params:{
              iouId:iouList[i],
            }
          }).then(data => {
            resolve(data.data.datas);
          }).catch(err => {
            reject(err);
          })
        }))
        pList.push(p);
      }
      return Promise.all(pList)
    }

    getJudical(this.query_iou).then(res => {
      //先根据得到司法信息获取所有的公共借据号List
      console.log('judical',res)
      this.origin_judical_data = res;
      if(res===null || res.iouIdList === null){
        this.judicalAllIou = [this.query_iou];
      }
      else{
        this.judicalAllIou = this.iou2List(res.iouIdList).map(item => {return item.value});
      }
      this.jsondata2judical(res);
      //回调获取所有公共借据号对应的借据信息
      return getCredit(this.judicalAllIou);
    }).then(res => {
      console.log('iouList',res)
      this.credit_data = res;
      return getSmortage(this.judicalAllIou);
    }).then(res => {
      console.log('smortage',res)
      this.jsondata2smortgage(res);
      // this.smortgage_data = res;
      this.setTableData();
    }).catch(err => {
      console.log(err)
    })

  },
  methods:{
    //数据获取和解析//////////////////////////////////////////////////////////////////////////////////////////////////////
    //解析司法信息数据,主要包括对judicialInformationList、preservationPeriodList、iouIdList、iouList_length的赋值
    jsondata2judical(data){
      this.judical_data=[{judicialStatusName:'i',statusGenerationDate:'',caseId:'',court:'',chargeJudge:'',layer:'',entrustedLawFirm:'',remarks:'',color:'#E4E7ED'}];
      let new_data = JSON.parse(JSON.stringify(data))
      if(data!==null && data.judicialInformationList !== null){
        for(let i=0;i<data.judicialInformationList.length;i++){
          this.judical_data.push(new_data.judicialInformationList[i]);
          // this.$set(this.judical_data[this.judical_data.length-1],'allow_edit',false)
          // this.$set(this.judical_data[this.judical_data.length-1],'edit_label','编辑')
          this.$set(this.judical_data[this.judical_data.length-1],'color','#E4E7ED')
        }
        this.select_index = this.judical_data.length-1
        this.judical_data[this.select_index].color = '#409EFF';
      }
      if(data!==null && data.preservationPeriodList !== null){
        this.preservationPeriodList = JSON.parse(JSON.stringify(data.preservationPeriodList))
      }
      if(data!==null){
        this.iou_form.iouIdList = this.iou2List(data.iouIdList);
        this.iouList_length = this.iou_form.iouIdList.length;
      }
    },
    //解析担保信息数据，担保信息需要展示所有担保信息。//获取具体的抵押物、质押物、保证信息进行存储，并去除重复,并对每一条信息新增了iouIdList、guaranteeMethod字段
    jsondata2smortgage(data){
      let typeIndex = {'collateralInfo':'collateralList','pledgesInfo':'pledgesList','assuranceInfo':'assuranceList'};
      this.smortgage_data = [];
      data.forEach((value) => {
        for(let info in value){
          if(info!=='guaranteeInfo' && value[info]!==null && value[info][typeIndex[info]]!==null && value[info][typeIndex[info]].length>0){
            value[info][typeIndex[info]].forEach((detail) => {
              let temp = JSON.parse(JSON.stringify(detail));
              temp['guaranteeMethod'] = value[info].guaranteeMethod;
              let count = 0;
              this.smortgage_data.forEach((data) => {
                if(data.id === temp.id){
                  count+=1;
                }
              })
              if(count===0){
                this.smortgage_data.push(temp);
                this.$set(this.smortgage_data[this.smortgage_data.length-1],'iouIdList',this.iou2List(value[info].iouIdList).map(item => {return item.value}));
                // this.$set(this.smortgage_data[this.smortgage_data.length-1],'typeInfo',value[info].guaranteeMethod);
              }
            })
          }
        }
      })
    },
    //设置时效表格timeTableData的值，主要包括抵押期间、质押期间、担保期间、保全时效、执行时效、申请上述时效、诉讼时效（相同诉讼时效会合并）、借款到期日。除了
    //显示的列信息，主要还赋值了时效提醒、以及对应原始保证、司法、时效、借据信息列表的索引index
    setTableData(){
      this.timeTableData = [];
      //担保时效
      this.smortgage_data.forEach((value,index) => {
        let data = {};
        data['StartDate'] = value.guaranteeStartDate;
        data['EndDate'] = value.guaranteeEndDate;
        data['reminderDay'] = value.reminderDay;
        data['guarantor'] = value.guarantor;
        data['info'] = (value.guaranteeMethod === '0')? value.collateralName:(value.guaranteeMethod === '1')?value.pledgesName:'';
        data['type'] = (value.guaranteeMethod === '0')? '抵押期限':(value.guaranteeMethod === '1')?'质押期限':(value.guaranteeMethod === '2')?'担保期间':'';
        data['state'] = (value.timeConversion === '0')? '未催告' : '已催告';
        let endday = this.$moment(data['EndDate'],"YYYY-MM-DD")
        let nowday = this.$moment().format("YYYY-MM-DD")
        let remindays = endday.diff(nowday,'days');
        if(value.timeConversion !== '1' && Number(remindays)>Number(data['reminderDay'])){
          data['state'] = '正常(未催告)';
        }
        else if(value.timeConversion !== '1' && Number(remindays)>=0){
          data['state'] = "剩余"+String(remindays)+"天到期(未催告)";
        }
        else if(value.timeConversion !== '1' && Number(remindays)<0){
          data['state'] = "已超期";
        }
        else if(value.timeConversion === '1'){
          data['state'] = "已催告";
        }
        data['index'] = index;
        data['iouList'] = [];
        this.timeTableData.push(data);
      })
      //保全时效
      if(this.preservationPeriodList !== null){
        this.preservationPeriodList.forEach((value,index) => {
          let data = {};
          let typeIndex = {'0':'账户查封期限','1':'动产查封期限','2':'不动产查封期限','3':'其它查封期限','4':'执行时效','5':'可申请上述时效'};
          data['StartDate'] = value.startDate;
          data['EndDate'] = value.endDate;
          data['reminderDay'] = value.reminderDay;
          data['guarantor'] = '';
          data['info'] = value.info;
          data['type'] = typeIndex[value.type];
          let endday = this.$moment(data['EndDate'],"YYYY-MM-DD")
          let nowday = this.$moment().format("YYYY-MM-DD")
          let remindays = endday.diff(nowday,'days');
          if(Number(remindays)>Number(data['reminderDay'])){
            data['state'] = '正常';
          }
          else if(Number(remindays)>=0){
            data['state'] = "剩余"+String(remindays)+"天到期";
          }
          else if(Number(remindays)<0){
            data['state'] = "已超期";
          }
          data['index'] = index;
          data['iouList'] = [];
          this.timeTableData.push(data);
        })
      }
      //借款到期日
      //如果诉讼时效不为空，则显示诉讼时效，债务人，如果第二个借据的诉讼时效与债务人与之前的相同，则只显示一个，但是要增加一个借据号List，存储内容相同的借据号
      //如果诉讼时效为空，则显示借款到期日
      let limitationList=[];
      this.credit_data.forEach((value,index1) => {
        if(value.urgeDeleteFlag === 0){
          //显示诉讼时效
          let isSame = false;
          limitationList.forEach((limi,index2) => {
            if(value.limitationOfActionStartDate === limi.limitationOfActionStartDate &&
                value.limitationOfActionEndDate === limi.limitationOfActionEndDate &&
                value.obligor === limi.obligor){
              limi.iouList.push(value.id.replace(/^\s+|\s+$/g,""));
              limi.indexList.push(index1);
              isSame = true;
            }
          })
          if(!isSame){
            limitationList.push({
              limitationOfActionStartDate:value.limitationOfActionStartDate,
              limitationOfActionEndDate:value.limitationOfActionEndDate,
              actionNoticeTime:value.actionNoticeTime,
              obligor:value.obligor,
              iouList:[value.id.replace(/^\s+|\s+$/g,"")],
              indexList:[index1]
            })
          }
        }
        else{
          let data = {};
          data['StartDate'] = value.loanCompensationDate;
          data['EndDate'] = value.loanCompensationDueDate;
          data['reminderDay'] ='';
          data['guarantor'] = value.obligor;
          data['info'] = '';
          data['type'] = '借款到期日';
          let endday = this.$moment(data['EndDate'],"YYYY-MM-DD")
          let nowday = this.$moment().format("YYYY-MM-DD")
          let remindays = endday.diff(nowday,'days');
          if(Number(remindays)>=30){
            data['state'] = '正常(未催告)';
          }
          else if(Number(remindays)>0){
            data['state'] = "剩余"+String(remindays)+"天到期(未催告)";
          }
          else{
            data['state'] = "已超期";
          }
          data['index'] = index1;
          data['iouList'] = [];
          this.timeTableData.push(data);
        }
      })
      limitationList.forEach((value,index) => {
        let data = {};
        data['StartDate'] = value.limitationOfActionStartDate;
        data['EndDate'] = value.limitationOfActionEndDate;
        data['reminderDay'] =value.actionNoticeTime;
        data['guarantor'] = value.obligor;
        data['info'] = '';
        data['type'] = '诉讼时效';
        let endday = this.$moment(data['EndDate'],"YYYY-MM-DD")
        let nowday = this.$moment().format("YYYY-MM-DD")
        let remindays = endday.diff(nowday,'days');
        if(Number(remindays)>Number(data['reminderDay'])){
          data['state'] = '正常';
        }
        else if(Number(remindays)>=0){
          data['state'] = "剩余"+String(remindays)+"天到期";
        }
        else if(Number(remindays)<0){
          data['state'] = "已超期";
        }
        data['index'] = value.indexList[0];
        data['iouList'] = value.iouList;
        this.timeTableData.push(data);
      })
      console.log(this.timeTableData);
    },
    //为了去除借据号两端的空格，并解决传来的借据号不为列表的问题，还未借据号加上了key、isorigin等字段
    iou2List(ious){
      let iouList = [];
      if(ious!==null && ious!==''){
        if(ious instanceof Object){
          let iouList_length = ious.length;
          for(let j=0;j<iouList_length;j++){
            let iouValue = ious[j].replace(/^\s+|\s+$/g,"");
            iouList.push({key:this.getTempKey(),value:iouValue,isorigin:true})
          }
        }
        else{
          let iouValue = ious.replace(/^\s+|\s+$/g,"");
          iouList.push({key:this.getTempKey(),value:iouValue,isorigin:true})
        }
      }
      return iouList;
    },
    getTempKey(){
      return this.temp_key++;
    },
    //////////////////////////////////////////////////////////////////////////////////////////////////////////////
    addIou(){
      this.iou_form.iouIdList.push({key:this.getTempKey(),value: '',isorigin:false});
    },
    //如果删除的是原有的借据，会调用删除接口，否则只是在界面上删除
    removeIou(iou){
      if(iou.isorigin){
        api({
          url: "/Judicial/deleteJudicatureIouId",
          method: "post",
          data:{
            iouId:iou.value,
          }
        }).then(data => {
          // console.log(data);
          // this.$router.replace('/creditInfo/creditFinfo/creditMenu');
          location.reload();
        }).catch(err => {
          console.log(err);
        })
      }
      else{
        var i = this.iou_form.iouIdList.indexOf(iou);
        if (i !== -1) {
          this.iou_form.iouIdList.splice(i, 1);
        }
      }
    },
    // 提交新增的借据
    addIouSubmit(){
      this.$refs['iou_form'].validate((valid) => {
        if(valid){
          let send_data = [];
          console.log(this.iou_form.iouIdList)
          for(let i=0;i<this.iou_form.iouIdList.length;i++){
            if(!this.iou_form.iouIdList[i].isorigin){
              send_data.push({
                iouId:this.iou_form.iouIdList[i].value,
                judicialStatusId:this.judical_data[this.select_index].judicialStatusId,
                iouIdList:this.iou_form.iouIdList.filter(item => {return item.isorigin}).map(item => {return item.value})
              })
            }
          }
          console.log(send_data)
          api({
            url: "/Judicial/addJudicatureIouId",
            method: "post",
            data:send_data
          }).then(data => {
            console.log(data);
            if(data.data.success === false){
              this.$message(data.data.msg);
            }
            else{
              location.reload();
            }
            // this.$router.replace('/creditInfo/creditFinfo/creditMenu');

          }).catch(err => {
            console.log(err);
          })
        }else{
          this.$message('请检查提交内容')
        }
      })

    },
    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    //司法编辑按钮事件
    edit(){
      //如果是允许编辑，即是点击放弃修改
      if(this.allow_edit){
        this.allow_edit=false;
        this.jsondata2judical(this.origin_judical_data);
        this.edit_label='编辑';
      }
      else{
        //在已存在新增借据号状态时，不允许编辑
        if(this.iou_form.iouIdList.length > this.iouList_length){
          alert("新增借据号中，不允许编辑");
        }
        else{
          this.allow_edit=true;
          this.edit_label='放弃修改';
        }
      }
    },
    //司法修改信息的提交
    submit(){
      //需要做的事情，先判断内容有无修改，再提交修改过的司法信息
      this.$refs['judical_data'].validate((valid) => {
        if(valid){
          let origin_data = this.origin_judical_data.judicialInformationList[this.select_index-1];
          let update_data = this.judical_data[this.select_index];
          let ischange = false;
          for(let prop in origin_data){
            if(origin_data[prop] !== update_data[prop]){
              ischange = true;
            }
          }
          if(!ischange){
            alert('未发现变动的内容')
          }
          else{
            let send_data = JSON.parse(JSON.stringify(this.judical_data[this.select_index]))
            send_data['iouIdList'] = this.iou_form.iouIdList.map(item => {return item.value})
            api({
              url: "/Judicial/updateJudicature",
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
        }
        else{
          this.$message('请检查提交内容')
        }
      })

    },
    //删除单个司法状态
    deleteJudical(){
      if(this.select_index===1){

      }
      api({
        url: "/Judicial/deleteJudicature",
        method: "get",
        params: {id:this.judical_data[this.select_index].judicialStatusId}
      }).then(data => {
        // console.log(data);
        // this.$router.replace('/creditInfo/creditFinfo/creditMenu');
        location.reload();
      }).catch(err => {
        console.log(err);
      })
    },
    //新增司法，跳转到新增司法页面，主要是传递借据号List、之前司法ID等参数给新增司法页面，
    addJudicature(){
      let ious = [this.query_iou];
      let priId = '';
      let priname = '';
      if(this.judical_data.length>1){
        let final_index = this.judical_data.length-1;
        ious = this.iou_form.iouIdList.map(item => {return item.value});
        priId = this.judical_data[final_index].judicialStatusId;
        priname = this.judical_data[final_index].judicialStatusName;
      }
      let newpage = this.$router.resolve({
        path: '/JudicialProceedings/JudicialInfo',
        query:{
          query_iou:this.query_iou,
          iouIdList:JSON.stringify(ious),
          priJudicialStatusId:priId,
          prejudicialStatusName:priname,
          judicalAllIou:JSON.stringify(this.judicalAllIou),
        }
      })
      window.open(newpage.href, '_blank');
    },
    //司法状态查看事件
    show_judical(index){
      this.select_index = index;
      this.judical_data.forEach((value,index2) => {
        if(index2 === index){
          value.color = '#409EFF'
        }
        else{
          value.color = '#E4E7ED'
        }
      })
    },
    ////////////////////////////////////////////////点击时效表格中的详情/////////////////////////////////////////////////
    //时效表格详情点击事件
    //如果是担保信息，跳转到担保页显示详情
    //如果是司法过程中对应的时效，展示时效详情dialog，并对内部的表单赋值
    //如果对应的借款到期日，就跳转到债权详情页
    //如果是对应的诉讼时效，展示诉讼时效详情页
    timeDetail(row,index){
      // console.log(row)
      //如果是担保信息，跳转到担保页显示详情
      if(row.type==='抵押期限' || row.type==='质押期限' || row.type==='已转变诉讼时效' || row.type==='担保期间'){
        // console.log(this.smortgage_data[index])
        //需要传的参数，借据号、担保方式、质押物或抵押物或保证Id
        let param_iou = '';
        if(this.smortgage_data[row.index].iouIdList.indexOf(this.query_iou)!==-1){
          param_iou = this.query_iou;
        }
        else{
          param_iou = this.smortgage_data[row.index].iouIdList[0];
        }
        let param_method = this.smortgage_data[row.index].guaranteeMethod;
        let param_id = this.smortgage_data[row.index].id;
        this.$router.push({path:'/creditInfo/creditFinfo/xqSmortgage',query:{iou:param_iou,type:param_method,id:param_id}});
      }
      //如果是司法过程中对应的时效，展示时效详情dialog，并对内部的表单赋值
      else if(row.type==='账户查封期限' || row.type==='动产查封期限' ||
          row.type==='不动产查封期限' || row.type==='其它查封期限' ||
          row.type==='执行时效' || row.type==='可申请上述时效'){
        // console.log(this.preservationPeriodList[index-this.smortgage_data.length])
        for(let prop in this.detailTimeForm){
          if(prop === 'index'){
            this.detailTimeForm[prop] = row.index;
          }
          else{
            this.detailTimeForm[prop] = this.preservationPeriodList[row.index][prop];
          }
        }
      this.detailTimeDialogShow = true;
      }
      //如果对应的借款到期日，就跳转到债权详情页
      else if(row.type==='借款到期日'){
        // console.log(this.credit_data[index-this.smortgage_data.length-this.preservationPeriodList.length])
        this.$router.push({path:'/creditInfo/creditFinfo/xqCreditFinfo',query:{iou:this.credit_data[row.index].id.replace(/^\s+|\s+$/g,"")}});
      }
      //如果是对应的诉讼时效，展示诉讼时效详情页
      else if(row.type==='诉讼时效'){
        this.showLimitationDetail(row);
      }
    },
    tableRowClassName({row,rowIndex}){
      // if(row.state.indexOf("剩余") !== -1 || row.state === '已超期'){
      //   return 'warning-row';
      // }
      return '';
    },
    //新增司法与保全时效按钮
    handleAddCommand(command){
      if(command==='a'){
        this.addJudicature();
      }
      else if(command === 'b'){
        //新增保全时效
        this.addTimeDialogShow = true;
      }
    },
    //新增司法过程的时效，传递addTimeForm表单
    addTimeSubmit(){
      this.$refs['addTimeForm'].validate((valid) => {
        if(valid){
          this.addTimeForm.judicialStatusId = this.origin_judical_data.judicialInformationList[0].judicialStatusId;
          api({
            url: "/Judicial/addPreservationPeriod",
            method: "post",
            data:[this.addTimeForm]
          }).then(data => {
            // console.log(data);
            // this.$router.replace('/creditInfo/creditFinfo/creditMenu');
            location.reload();
          }).catch(err => {
            console.log(err);
          })
        }
        else{
          this.$message('请检查提交的内容')
        }
      })

    },
    //关闭新增时效的dialog
    addTimeClose(done){
      let isNull = true;
      for(let prop in this.addTimeForm){
        if(prop!=='judicialStatusId' && this.addTimeForm[prop]!==''){
          isNull=false;
        }
      }
      if(isNull){
        done();
      }
      else{
        this.$confirm('确认关闭并放弃修改').then(_ =>{
          done();
          this.addTimeForm = {judicialStatusId:this.origin_judical_data.judicialInformationList[0].judicialStatusId, type:'', info:'', startDate:'',endDate:'',reminderDay:'',state:''};
        }).catch(_ => {

        })
      }
    },
    //关闭时效详情的dialog
    detailTimeClose(done){
      let isChange = false;
      for(let prop in this.detailTimeForm){
        if(prop !== 'index' && this.detailTimeForm[prop]!==this.preservationPeriodList[this.detailTimeForm.index][prop]){
          isChange = true;
        }
      }
      if(isChange){
        this.$confirm('确认关闭并放弃修改').then(_ => {
          done();
          this.detailTimeForm = {judicialStatusId:'', type:'', info:'', startDate:'',endDate:'',reminderDay:'',state:'',index:''};
        }).catch(_ => {

        })
      }
      else{
        done();
      }
    },
    //时效详情dialog的编辑按钮事件
    timeDetailEdit(){
      let index = this.detailTimeForm.index;
      if(this.timeDetail_edit){
        for(let prop in this.detailTimeForm){
          if(prop !== 'index'){
            this.detailTimeForm[prop] = this.preservationPeriodList[index][prop];
          }
        }
        this.timeDetail_edit = false;
        this.timeDetail_label = '编辑';
      }
      else{
        this.timeDetail_label = '放弃修改';
        this.timeDetail_edit = true;
      }
    },
    //提交修改后的时效信息
    updateTimeSubmit(){
      this.$refs['detailTimeForm'].validate((valid) => {
        if(valid){
          //判断内容有无修改再提交
          let isChange = false;
          for(let prop in this.detailTimeForm){
            if(prop !== 'index' && this.detailTimeForm[prop]!==this.preservationPeriodList[this.detailTimeForm.index][prop]){
              isChange = true;
            }
          }
          if(isChange){
            api({
              url: "/Judicial/updatePreservationPeriod",
              method: "post",
              data:[{
                id:this.preservationPeriodList[this.detailTimeForm.index].id,
                judicialStatusId:this.detailTimeForm.judicialStatusId,
                type:this.detailTimeForm.type,
                info:this.detailTimeForm.info,
                startDate:this.detailTimeForm.startDate,
                endDate:this.detailTimeForm.endDate,
                reminderDay:this.detailTimeForm.reminderDay,
                state:this.detailTimeForm.state,
              }]
            }).then(data => {
              // console.log(data);
              // this.$router.replace('/creditInfo/creditFinfo/creditMenu');
              location.reload();
            }).catch(err => {
              console.log(err);
            })
          }
          else{
            alert('未发现内容修改')
          }
        }
        else{
          this.$message('请检查提交内容')
        }
      })

    },
    //删除时效，直接删除整个时效信息主表记录，相当于丢失了历史表
    deleteTimeInfo(){
      api({
        url: "/Judicial/deletePreservationPeriod",
        method: "post",
        data:[{
          id:this.preservationPeriodList[this.detailTimeForm.index].id,
          judicialStatusId:this.detailTimeForm.judicialStatusId,
          type:this.detailTimeForm.type,
          info:this.detailTimeForm.info,
          startDate:this.detailTimeForm.startDate,
          endDate:this.detailTimeForm.endDate,
          reminderDay:this.detailTimeForm.reminderDay,
          state:this.detailTimeForm.state,
        }]
      }).then(data => {
        // console.log(data);
        // this.$router.replace('/creditInfo/creditFinfo/creditMenu');
        location.reload();
      }).catch(err => {
        console.log(err);
      })
    },
    //获取历史时效信息
    getTimeHistory(){
      api({
        url: "/Judicial/getPreservationHistory",
        method: "get",
        params:{
          id:this.preservationPeriodList[this.detailTimeForm.index].id,}
      }).then(data => {
        console.log(data);
        this.setTimeHistoryTable(data.data.datas);
        this.timeHistoryDialog = true;
        this.origin_TimeHitoryData = data.data.datas;
        // this.$router.replace('/creditInfo/creditFinfo/creditMenu');
        // location.reload();
      }).catch(err => {
        console.log(err);
      })
    },
    //将历史时效以表格方式呈现，对表格进行赋值
    setTimeHistoryTable(data){
      console.log('timehistory',data)
      this.timeHistoryData = JSON.parse(JSON.stringify(data));
      this.timeHistoryData.forEach((value) => {
        this.$set(value,'edit',false);
        this.$set(value,'edit_label','编辑');
      })
    },
    //关闭历史时效详情dialog
    timeHistoryDialogClose(done){
      let isEdit = false;
      this.timeHistoryData.forEach((value) => {
        if(value.edit){
          isEdit = true;
        }
      })

      if(this.isRegister || isEdit){
        this.$confirm('确认放弃修改并关闭？')
            .then(_ => {
              this.isRegister=false;
              this.registerForm = {info:'', startDate:'',endDate:'',reminderDay:'',state:''};
              done();
            })
            .catch(_ => {});
      }
      else{
        done();
      }
    },
    //修改历史时效，修改方式是在表格中的行进行修改
    timeHistoryEdit(row,index){
      if(!row.edit){
        row.edit=true;
        row.edit_label = "放弃修改";
      }
      else{
        row.edit = false;
        row.edit_label="编辑";
        //回复原有的数据
        row.type = this.origin_TimeHitoryData[index].type;
        row.info = this.origin_TimeHitoryData[index].info;
        row.startDate = this.origin_TimeHitoryData[index].startDate;
        row.endDate = this.origin_TimeHitoryData[index].endDate;
        row.reminderDay = this.origin_TimeHitoryData[index].reminderDay;
        row.state = this.origin_TimeHitoryData[index].state;
        row.registerDate = this.origin_TimeHitoryData[index].registerDate;
      }
    },
    //根据表格中的数据删除某一行历史时效记录
    deleteTimeHistoryData(row){
      this.$confirm('确认删除？')
          .then(_ => {
            api({
              url: "/Judicial/deletePreservationHistory",
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
    //重新登记时效按钮
    reRegister(){
      if(this.isRegister){
        this.isRegister = false;
        this.registerLabel = '重新登记';
      }
      else{
        this.isRegister = true;
        this.registerLabel = '取消登记';
      }
    },
    //提交重新登记的时效
    registerSubmit(){
      this.$refs['registerForm'].validate((valid) => {
        if(valid){
          let isNull = true;
          for(let prop in this.registerForm){
            if(this.registerForm[prop] !== ''){
              isNull = false;
            }
          }
          if(isNull){
            alert('提交内容为空');
          }
          else {
            api({
              url: "/Judicial/addPreservationHistory",
              method: "post",
              data: {
                id: this.preservationPeriodList[this.detailTimeForm.index].id,
                judicialStatusId: this.detailTimeForm.judicialStatusId,
                type: this.detailTimeForm.type,
                info: this.registerForm.info,
                startDate: this.registerForm.startDate,
                endDate: this.registerForm.endDate,
                reminderDay: this.registerForm.reminderDay,
                state: this.registerForm.state
              }
            }).then(data => {
              // console.log(data);
              location.reload();
            }).catch(err => {
              console.log(err);
            })
          }
        }
        else{
          this.$message('请检查提交的内容')
        }
      })
    },
    //提交更新后的历史时效信息
    saveHistoryTableData(){
      let send_data = [];
      for(let i=0;i<this.timeHistoryData.length;i++){
        if(this.timeHistoryData[i].edit){
          send_data.push({
            id:this.timeHistoryData[i].id,
            preservationId:this.timeHistoryData[i].preservationId,
            type:this.timeHistoryData[i].type,
            info:this.timeHistoryData[i].info,
            startDate:this.timeHistoryData[i].startDate,
            endDate:this.timeHistoryData[i].endDate,
            reminderDay:this.timeHistoryData[i].reminderDay,
            state:this.timeHistoryData[i].state,
            registerDate:this.timeHistoryData[i].registerDate,
          })
        }
      }
      // console.log(send_data);
      if(send_data.length===0){
        alert("未发现可保存的条目")
      }
      else{
        api({
          url: "/Judicial/updatePreservationHistory",
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
    //////////////////////////////////////与诉讼时效详情与新增有关的函数////////////////////////////////////////////////////////////
    //展示诉讼时效详情，打开诉讼时效对应的详情dialog，并为limitationDetailForm表单赋值，包含了诉讼时效基本信息以及对应的借据号List，以及对应于某一个原始借据号的index
    showLimitationDetail(data){
      //打开诉讼时效的dialog,并对其表单赋值
      this.limitationDialogShow = true;
      this.limitationDetailForm.iouList = data.iouList.map(item => {return {key:this.getTempKey(),value:item}})
      this.limitationDetailForm.limitationOfActionStartDate = this.credit_data[data.index].limitationOfActionStartDate;
      this.limitationDetailForm.limitationOfActionEndDate = this.credit_data[data.index].limitationOfActionEndDate;
      this.limitationDetailForm.changeDate = this.credit_data[data.index].changeDate;
      this.limitationDetailForm.actionNoticeTime = this.credit_data[data.index].actionNoticeTime;
      this.limitationDetailForm.index = data.index;

    },
    //关闭诉讼时效详情dialog
    limitationDialogClose(done){
      done();
    },
    //新增诉讼时效，打开新增诉讼时效的dialog
    addLimitationButton(){
      this.addLimitationDialogShow = true;
    },
    //诉讼时效详情页的编辑按钮
    editLimitation(){
      //
      if(this.limitation_edit){
        this.limitation_edit = false;
        this.limitation_editLabel = '编辑';
        this.limitationDetailForm.limitationOfActionStartDate = this.credit_data[this.limitationDetailForm.index].limitationOfActionStartDate;
        this.limitationDetailForm.limitationOfActionEndDate = this.credit_data[this.limitationDetailForm.index].limitationOfActionEndDate;
        this.limitationDetailForm.changeDate = this.credit_data[this.limitationDetailForm.index].changeDate;
        this.limitationDetailForm.actionNoticeTime = this.credit_data[this.limitationDetailForm.index].actionNoticeTime;
      }
      else{
        this.limitation_editLabel = '放弃修改';
        this.limitation_edit = true;
      }

    },
    //提交更新后的诉讼时效信息（普通更新，不涉及到重新登记，登记对应新增）
    updateLimitationSubmit(){
      this.$refs['limitationDetailForm'].validate((valid) => {
        if(valid){
          //修改诉讼时效，因为获取的是最新诉讼时效，因此需要改变主表中的时效
          let noChange = Boolean(this.limitationDetailForm.limitationOfActionStartDate === this.credit_data[this.limitationDetailForm.index].limitationOfActionStartDate &&
              this.limitationDetailForm.limitationOfActionEndDate === this.credit_data[this.limitationDetailForm.index].limitationOfActionEndDate &&
              this.limitationDetailForm.changeDate === this.credit_data[this.limitationDetailForm.index].changeDate &&
              this.limitationDetailForm.actionNoticeTime === this.credit_data[this.limitationDetailForm.index].actionNoticeTime);
          if(noChange){
            alert('没有发现内容改变');
          }
          else{
            let creditInfos = [];
            this.limitationDetailForm.iouList.forEach((value,index) => {
              let p1 = new Promise((resolve, reject) => {
                api({
                  url: "/CreditInfo/getFundamentalCredit",
                  method: "get",
                  params:{
                    iouId:value.value,
                  }
                }).then(data => {
                  resolve(data);
                }).catch(err => {
                  reject(err);
                })
              })
              creditInfos.push(p1);
            })
            Promise.all(creditInfos).then(res => {
              let send_data = [];
              res.forEach((value,index) => {
                // console.log('getcreditinfo',value.data.datas);
                value.data.datas.limitationOfActionStartDate = this.limitationDetailForm.limitationOfActionStartDate;
                value.data.datas.limitationOfActionEndDate = this.limitationDetailForm.limitationOfActionEndDate;
                value.data.datas.actionNoticeTime = this.limitationDetailForm.actionNoticeTime;
                value.data.datas.changeDate = this.limitationDetailForm.changeDate;
                value.data.datas.limitationDeleteFlag = 0;
                send_data.push(value.data.datas)
              })
              return new Promise((resolve, reject) => {
                api({
                  url: "CreditInfo/updateFundamentalCredit",
                  method: "post",
                  data:send_data
                }).then(data => {
                  // console.log(data);
                  location.reload();
                }).catch(err => {
                  console.log(err);
                })
              })
            }).catch(err => {
              console.log(err)
            })
            // let send_data = [];
            // this.limitationDetailForm.iouList.forEach((value,index) => {
            //   send_data.push({
            //     id:value.value,
            //     limitationOfActionStartDate:this.limitationDetailForm.limitationOfActionStartDate,
            //     limitationOfActionEndDate:this.limitationDetailForm.limitationOfActionEndDate,
            //     actionNoticeTime:this.limitationDetailForm.actionNoticeTime,
            //     changeDate:this.limitationDetailForm.changeDate,
            //     limitationDeleteFlag:0,
            //   })
            // })
            // // console.log('updatelimi',send_data)
            // api({
            //   url: "CreditInfo/updateFundamentalCredit",
            //   method: "post",
            //   data:send_data
            // }).then(data => {
            //   // console.log(data);
            //   location.reload();
            // }).catch(err => {
            //   console.log(err);
            // })
          }
        }
        else{
          this.$message('请检查提交的内容')
        }
      })
    },
    //关闭新增诉讼时效的dialog
    addLimitationDialogClose(done){
      done();
    },
    //提交新增的诉讼时效，根据借据号List进行登记
    addLimitationSubmit(){
      this.$refs['addLimitationForm'].validate((valid) => {
        if(valid){
          api({
            url: "/litigation/addLitigation",
            method: "post",
            data:{
              changeDate:this.addLimitationForm.changeDate,
              limitationOfActionStartDate:this.addLimitationForm.limitationOfActionStartDate,
              limitationOfActionEndDate:this.addLimitationForm.limitationOfActionEndDate,
              actionNoticeTime:this.addLimitationForm.actionNoticeTime,
              limitationDeleteFlag:0,
              iouIdList:this.limitationDetailForm.iouList.map(item => {return item.value}),
            }
          }).then(data => {
            location.reload();
          }).catch(err => {
            console.log(err);
          })
        }
        else{
          this.$message('请检查提交内容')
        }
      })
    },
    //以物抵债执行，法拍
    addPayInKind(row){
      let param_id = this.smortgage_data[row.index].id;
      let param_name = this.smortgage_data[row.index].collateralName;
      let param_caseId = this.judical_data[this.select_index].caseId
      let newpage = this.$router.resolve({
        path: '/totalSearch/addSMAD',
        query:{
          id:param_id.replace(/^\s+|\s+$/g,""),
          name:param_name,
          caseId:param_caseId,
        }
      })
      window.open(newpage.href, '_blank');
    },
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
.state_button{
  padding: 2px 0 10px 0;
}
.el-timeline-item{
  height:58px
}
.el_radio_sort{
  margin-right: 8px;
}
.radio{
  margin-bottom: 25px;
}
</style>