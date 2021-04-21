<template>
  <div class="register">
    <el-form ref="form" :rules="rules" :model="form" label-width="80px" class="register-box">
      <h3 class="register-title">用户注册</h3>
      <el-form-item label="用户名" prop="name">
        <el-input v-model="form.name" type="text"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input type="password" v-model="form.password"></el-input>
      </el-form-item>
      <el-form-item label="确认密码" prop="conpassword">
        <el-input type="password" v-model="form.conpassword"></el-input>
      </el-form-item>
      <el-form-item label="身份：" prop="authentic">
        <el-radio v-model="form.au" label="1" border>管理员</el-radio>
        <el-radio v-model="form.au" label="2" border>普通用户</el-radio>
      </el-form-item>
      <el-form-item label="手机" prop="phone">
        <el-input v-model="form.phone"  v-enter-number></el-input>
      </el-form-item>
      <el-form-item>
        <el-button @click="back">返回登录</el-button>
        <el-button type="primary" @click="onRegist('form')">注册</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import {default as api} from "@/utils/api";

export default {
  name: 'Register',
  data () {
    let validatePassword = (rule,value,callback)=>{
      if(value!==''){
        if(value!==this.form.password){
          callback(new Error('两次输入密码不一致'))
          return false
        }
        else {
          callback()
        }
      }
    }
    return {

      form: {
        name: '',
        password: '',
        conpassword: '',
        au: '1',
        phone:''
      },
      rules: {
        name: [
          {
            required: true,
            message: '请输入用户名',
            trigger: 'blur'
          },
          {
            min: 1,
            max: 20,
            message: '长度在 1 到 20 个字符',
            trigger: 'blur'
          }
        ],
        password: [
          {
            required: true,
            message: '密码不能为空',
            trigger: 'blur'
          },
          {
            min: 6,
            max: 50,
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
            max: 50,
            message: '长度在 6 个字符以上',
            trigger: 'blur'
          },
          {
            validator: validatePassword,
            trigger: 'blur'
          }
        ],
        phone: [
          {
            required: true,
            message: '手机号码不能为空',
            trigger: 'blur'
          },
          {
            min: 11,
            max: 11,
            message: '请输入正确的手机号',
            trigger: 'blur'
          }
        ]
      }
    }
  },
  methods: {
    onRegist (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          var _this = this;

          api({
            url: "/user/userRegister",
            method: "post",
            data:{
              username:_this.form.name,
              password:_this.form.password,
              perm:_this.form.au,
              phone:_this.form.phone
            }
          }).then(data => {
            if(data.data.datas==='用户名已存在！'){
              this.$message({
                type:"error",
                message:'用户名已存在！'
              })
            }else {
              console.log(data);
              this.$message({type:"success", message:"注册成功！"});
              this.$router.push({ name: 'Login' });
            }
          }).catch(err => {
            console.log(err);
          })

        } else {
          this.$message({
            showClose: true,
            message: '注册失败',
            type: 'error'})
          return false
        }
      })
    },
    back () {
      this.$router.push('/Login')
    }
  }
}
</script>

<style scoped>
.register-box {
  width: 400px;
  margin: 100px auto;
  border: 1px solid #DCDFE6;
  padding: 40px;
  border-radius: 10px;
  box-shadow: 0 0 50px #DCDFE6;
}

.register-title {
  text-align: center;
}
</style>
