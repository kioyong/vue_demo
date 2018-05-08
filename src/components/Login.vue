<template>
  <div>
    <el-row>
      <el-col :span="16" :offset="4" id="head">
        <div class="title">Register</div>
        <div class="login-link" id="login-link">
          <span>I didn't registered,</span>
          <el-button class="login-btn" id="login_btn" size="mini" @click="goRegiste">registe</el-button>
          <span>now</span>
        </div>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="12" :offset="4" id="content">
        <el-form ref="loginForm" :model="loginForm" :rules="rules" label-width="80px" class="login-form" id="login-form">
          <el-form-item label="Username:" prop="username" class="login-form-item">
            <el-input v-model="loginForm.username" placeholder="Enter registed username or email" clearable></el-input>
          </el-form-item>
          <el-form-item label="Password:" prop="password" class="login-form-item" required>
            <el-input type="password" v-model="loginForm.password" placeholder="Enter Password" clearable
             @focus="isShowPwdTips=true"></el-input>
            <ul v-if="isShowPwdTips" class="focus-tips-ul">
              <i class="el-icon-arrow-left pwd-checklist-arrow"/>
              <li :class="pwdClass1">8~14 characters in length.</li>
              <li :class="pwdClass2">Supports digits, uppercase and lowercase letters and punctuation.</li>
              <li :class="pwdClass3">No spaces allowed.</li>
            </ul>
          </el-form-item>
          <el-form-item class="login-form-item">
            <el-checkbox v-model="isRemember">Remember me next time</el-checkbox>
          </el-form-item>
          <el-form-item class="login-form-button">
            <el-button type="primary" @click="submitForm('loginForm')">Login</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  export default {
    data() {
      var validateAllPwdChange = (rule, value, callback) => {
        if(!value || value == "") {
          this.resetPwdClass();
          callback(new Error('password is required'));
        } else{
          if(value.length < 8 || value.length > 14) {
            this.pwdClass1 = 'el-icon-close';
          } else {
            this.pwdClass1 = 'el-icon-check';
          }
          if(/^[\w\?%&=\-_]+$/.test(value) == false) {
            this.pwdClass2 = 'el-icon-close';
          } else {
            this.pwdClass2 = 'el-icon-check';
          }
          if(value.length != value.replace(/\s/g,"").length) {
            this.pwdClass3 = 'el-icon-close';
          } else {
            this.pwdClass3 = 'el-icon-check';
          }

          this.isPwdValid = true;
          if(this.pwdClass1 == 'el-icon-close' || this.pwdClass2 == 'el-icon-close' || this.pwdClass3 == 'el-icon-close') {
            this.isPwdValid = false;
            callback(new Error('Please enter the correct password.'));
          } else {
            callback();
          }
        }
      };
      var validateAllPwdBlur = (rule, value, callback) =>{
        if(!value || value == "") {
          this.isShowPwdTips = false;
          this.resetPwdClass();
          callback(new Error('password is required'));
        }else if(!this.isPwdValid) {
          this.isShowPwdTips = true;
          callback(new Error('Please enter the correct password.'));
        } else {
          this.isShowPwdTips = false;
          callback();
        }
      };
      const date = new Date();
      var atLeast18 = date.setFullYear(date.getFullYear() - 18);
      return {
        pwdClass1: 'el-icon-info',
        pwdClass2: 'el-icon-info',
        pwdClass3: 'el-icon-info',
        isPwdValid: false,
        isShowPwdTips: false,
        isRemember: false,
        loginForm: {
          username: '',
          password: ''
        },
        rules: {
          username: [
            { required: true, message: 'Please enter username', trigger: 'blur' },
            { min: 5, max: 30, message: '5 to 30 characters in length', trigger: 'blur' }
          ],
          password: [
            { validator: validateAllPwdChange, trigger: 'change' },
            { validator: validateAllPwdBlur, trigger: 'blur' }
          ]
        }
      };
    },
    methods: {
      resetPwdClass() {
        this.pwdClass1 = 'el-icon-info';
        this.pwdClass2 = 'el-icon-info';
        this.pwdClass3 = 'el-icon-info';
      },
      goRegiste() {
        this.$router.push('/registe')
      },
      goHomePage() {
        this.$router.push('/home');
      },
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.goHomePage();
          } else {
            this.$alert('Please check login input', 'Error', {
              confirmButtonText: 'OK',
              type: "error",
              center: true
            });
            return false;
          }
        });
      }
    }
  }
</script>

<style>
#head {
  height: 75px;
  padding: 0 10px;
  margin-bottom: 60px;
  line-height: 75px;
  border-bottom: 1px solid #dcdfe6;
  box-shadow: 0px 8px 10px #efefef;
}
#head .title {
  float: left;
  font-size: 30px;
  font-family: fantasy;
}
#head .login-link {
  float: right;
  font-size: 12px;
  color: #666;
}
.login-link .login-btn {
  font-weight: 700;
}

.login-form-item {
  margin: 0 270px 32px 0;
}
.login-form label {
  width: 150px !important;
}
.login-form .el-form-item__content {
  margin-left: 150px !important;
}

.focus-tips-ul {
  width: 350px;
  height: 40px;
  position: absolute;
  top: 0;
  left: 100%;
  color: #666;
  font-size: 12px;
  line-height: 20px;
  margin-left: 10px;
}
.focus-tips-ul {
  height: inherit;
  margin: 0 0 0 20px;
  padding: 5px 0px;
  border: 1px solid #ddd;
  box-shadow: 1px 1px 1px #efefef;
  background: #f9f9f9;
  list-style: none;
}
.pwd-checklist-arrow {
  position: absolute;
  left: -11px;
  color: #ddd;
  font-size: 16px;
}
.focus-tips-ul .el-icon-check:before,
.focus-tips-ul .el-icon-close:before,
.focus-tips-ul .el-icon-info:before {
  margin: 0 5px 0 10px;
  font-weight: 1000;
}
.focus-tips-ul .el-icon-check:before {
  color: green !important;
}
.focus-tips-ul .el-icon-close:before {
  color: red !important;
}

.login-form-button {
  margin: 0 270px 0 70px;
}
.login-form-button button{
  width: 100%;
}
</style>
