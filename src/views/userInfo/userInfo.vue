<template>
<div>
  <el-breadcrumb separator="/">
    <el-breadcrumb-item to="/Main"><i class="el-icon-s-home"></i></el-breadcrumb-item>
    <el-breadcrumb-item class="el-breadcrumb1">个人信息</el-breadcrumb-item>
    <el-breadcrumb-item class="el-breadcrumb1">基本资料</el-breadcrumb-item>
  </el-breadcrumb>

  <el-row class="el-row1">
    <el-col :span="24"><div class="grid-content">基本资料</div></el-col>
  </el-row>

  <el-row  class="el-row2" type="flex" justify="space-around">
    <el-col :span="8">
      <el-card class="el-card">
        <el-form ref="form" :model="form" label-width="80px">
          <el-form-item label="姓名">
            <el-input v-model="form.name"></el-input>
          </el-form-item>
          <el-form-item label="性别">
            <el-radio-group v-model="form.sex">
              <el-radio label="男"></el-radio>
              <el-radio label="女"></el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="手机">
            <el-input v-model="form.phone"></el-input>
          </el-form-item>
          <el-form-item label="工号">
            <el-input v-model="form.id"></el-input>
          </el-form-item>
          <el-form-item label="邮箱">
            <el-input v-model="form.email"></el-input>
          </el-form-item>
          <el-form-item label="部门">
            <el-input v-model="form.department"></el-input>
          </el-form-item>
          <el-form-item label="账号">
            <el-input v-model="form.account"></el-input>
          </el-form-item>
        </el-form>
      </el-card>
    </el-col>
    <el-col :span="8">
      <el-card>
        <el-form ref="form1" :rules="rules" :model="form1">
          <el-form-item label="原密码" prop="password">
            <el-input type="password" v-model="form1.password"></el-input>
          </el-form-item>
          <el-form-item label="新密码" prop="newpassword">
            <el-input type="password" v-model="form1.newpassword"></el-input>
          </el-form-item>
          <el-form-item label="确认密码" prop="conpassword">
            <el-input type="password" v-model="form1.conpassword"></el-input>
          </el-form-item>
          <el-button type="primary" @click="submit('form1')">确认修改</el-button>
          <el-button @click="reset('form1')">重置</el-button>
        </el-form>
      </el-card>
    </el-col>
  </el-row>

</div>
</template>

<script>
export default {
  name: "userInfo",
  data() {
    let validatePassword = (rule,value,callback)=>{
      if(value!==''){
        if(value!==this.form1.newpassword){
          callback(new Error('两次输入密码不一致'))
          return false
        }
        else {
          callback()
        }
      }
    }
    return{
      form: {
        name: '',
        sex: '',
        phone: '',
        id: '',
        email: '',
        department: '',
        account: ''
      },
      form1:{
        password:'',
        newpassword:'',
        conpassword:''
      },
      rules: {
        newpassword: [
          {
            required: true,
            message: '密码不能为空',
            trigger: 'blur'
          },
          {
            min: 6,
            max: 20,
            message: '长度在 6 个字符以上',
            trigger: 'blur'
          }
        ],
        conpassword: [
          {
            required: true,
            message: '请输入确认密码',
            trigger: 'blur'
          },
          {
            min: 6,
            max: 20,
            message: '长度在 6 个字符以上',
            trigger: 'blur'
          },
          {
            validator: validatePassword,
            trigger: 'blur'
          }
        ]
      }
    }
  },
  methods:{
    submit (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$confirm('检测到未保存的内容，是否在离开页面前保存修改？', '确认信息', {
            distinguishCancelAndClose: true,
            confirmButtonText: '保存修改',
            cancelButtonText: '放弃修改'
          })
              .then(() => {
                this.$message({
                  type: 'success',
                  message: '密码修改成功'
                });
              })
              .catch(action => {
                this.$message({
                  type: 'info',
                  message: action === 'cancel'
                      ? '放弃修改'
                      : '停留在当前页面'
                })
              })
        } else {
          alert('error submit!!')
          return false
        }
      })
    },
    reset(formName){
      this.$refs[formName].resetFields();
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
  margin-top: 30px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
  border-radius: 4px;
  text-align: center;
  height: 50px;
  line-height: 50px;
  font-weight: bold;
  font-family: 黑体;
  font-size: 25px;
}
.el-card{
  margin-top: 30px;
  border-radius: 8px;
}
</style>