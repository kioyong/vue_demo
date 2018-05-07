<template>
  <div>
    <el-row>
      <el-col :span="16" :offset="4" id="head">
        <div class="title">Register</div>
        <div class="login-link" id="login-link">
          <span>I have registered,</span>
          <el-button class="login-btn" id="login_btn" size="mini" @click="login">Login</el-button>
          <span>now</span>
        </div>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="12" :offset="4" id="content">
        <el-form ref="registeForm" :model="registeForm" :rules="rules" label-width="80px" class="registe-form" id="registe-form">
          <el-form-item label="Username:" prop="username" class="registe-form-item">
            <el-input v-model="registeForm.username" placeholder="Enter username" clearable
             @focus="isShowNameTips=true" @blur="isShowNameTips=false"></el-input>
            <div v-if="isShowNameTips" class="focus-tips">
              <span>Cannot be changed after setting.<br/>5 to 10 characters in length.</span>
            </div>
          </el-form-item>
          <el-form-item label="Email:" prop="email" class="registe-form-item">
            <el-input v-model="registeForm.email" placeholder="Enter Email" clearable></el-input>
          </el-form-item>
          <el-form-item label="Password:" prop="password" class="registe-form-item">
            <el-input type="password" v-model="registeForm.password" placeholder="Enter Password" clearable
             @focus="isShowPwdTips=true" @blur="isShowPwdTips=false"></el-input>
            <ul v-if="isShowPwdTips" class="focus-tips-ul">
              <i class="el-icon-arrow-left pwd-checklist-arrow"/>
              <li>8~14 characters in length.</li>
              <li>Supports digits, uppercase and lowercase letters and punctuation.</li>
              <li>No spaces allowed.</li>
            </ul>
          </el-form-item>
          <el-form-item label="Confirm Password:" prop="confirmPassword" class="registe-form-item" required>
            <el-input type="password" v-model="registeForm.confirmPassword" placeholder="Re-enter Password" clearable
             @focus="isShowConPwdTips=true"></el-input>
            <ul v-if="isShowConPwdTips" class="focus-tips-ul">
              <i class="el-icon-arrow-left pwd-checklist-arrow"/>
              <li :class="conPwdClass1">8~14 characters in length.</li>
              <li :class="conPwdClass2">Supports digits, uppercase and lowercase letters and punctuation.</li>
              <li :class="conPwdClass3">No spaces allowed.</li>
            </ul>
          </el-form-item>
          <el-form-item label="Brithday" class="registe-form-item">
            <el-date-picker type="date" placeholder="Select date" v-model="registeForm.brithday" style="width: 100%;"
             :picker-options="brithdayOptions" :default-value="defaultBrithday"></el-date-picker>
          </el-form-item>
          <el-form-item class="registe-form-item">
            <el-checkbox v-model="isRemember">Remember me next time</el-checkbox>
          </el-form-item>
          <el-form-item class="registe-form-button">
            <el-button type="primary" @click="submitForm('registeForm')">Sign up</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  export default {
    data() {
      var validateConPwd = (rule, value, callback) => {
        if(!value || value == "") {
          this.resetConPwdClass();
          callback(new Error('confirmPassword is required'));
        } else{
          if(value.length < 8 || value.length > 14) {
            this.conPwdClass1 = 'el-icon-close';
          } else {
            this.conPwdClass1 = 'el-icon-check';
          }
          if(/^[\w\?%&=\-_]+$/.test(value) == false) {
            this.conPwdClass2 = 'el-icon-close';
          } else {
            this.conPwdClass2 = 'el-icon-check';
          }
          if(value.length != value.replace(/\s/g,"").length) {
            this.conPwdClass3 = 'el-icon-close';
          } else {
            this.conPwdClass3 = 'el-icon-check';
          }

          this.isConPwdValid = true;
          if(this.conPwdClass1 == 'el-icon-close' || this.conPwdClass2 == 'el-icon-close' || this.conPwdClass3 == 'el-icon-close') {
            this.isConPwdValid = false;
            callback(new Error('Please enter the correct confirm password.'));
          } else if(value != this.registeForm.password) {
            callback(new Error("The password and the confirmation password must be consistent."));
          } else {
            callback();
          }
        }
      };
      var validateConPwdBlur = (rule, value, callback) =>{
        if(!value || value == "") {
          this.isShowConPwdTips = false;
          this.resetConPwdClass();
          callback(new Error('confirmPassword is required'));
        }else if(!this.isConPwdValid) {
          this.isShowConPwdTips = true;
          callback(new Error('Please enter the correct confirm password.'));
        } else if(value && value != "" && value != this.registeForm.password) {
          this.isShowConPwdTips = false;
          callback(new Error("The password and the confirmation password must be consistent."));
        } else {
          this.isShowConPwdTips = false;
          callback();
        }
      };
      const date = new Date();
      var atLeast18 = date.setFullYear(date.getFullYear() - 18);
      return {
        conPwdClass1: 'el-icon-info',
        conPwdClass2: 'el-icon-info',
        conPwdClass3: 'el-icon-info',
        isShowNameTips: false,
        isShowPwdTips: false,
        isConPwdValid: false,
        isShowConPwdTips: false,
        isRemember: false,
        registeForm: {
          username: '',
          email: '',
          password: '',
          confirmPassword: '',
          brithday: ''
        },
        defaultBrithday: atLeast18,
        brithdayOptions: {
          disabledDate(time) {
            return time.getTime() > atLeast18;
          }
        },
        rules: {
          username: [
            { required: true, message: 'Please enter username', trigger: 'blur' },
            { min: 5, max: 10, message: '5 to 10 characters in length', trigger: 'blur' }
          ],
          email: [
            { required: true, message: 'Please enter email', trigger: 'blur' },
            { pattern: /^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$/, message: 'Please enter the correct email address.', trigger: 'blur' }
          ],
          password: [
            { required: true, message: 'Please enter password', trigger: 'blur' },
            { pattern: /^(\w){8,14}$/, message: '8~14 characters in length.Supports digits, uppercase and lowercase letters and punctuation.', trigger: 'blur' }
          ],
          confirmPassword: [
            { validator: validateConPwd, trigger: 'change' },
            { validator: validateConPwdBlur, trigger: 'blur' }
          ]
        }
      };
    },
    methods: {
      resetConPwdClass() {
        this.conPwdClass1 = 'el-icon-info';
        this.conPwdClass2 = 'el-icon-info';
        this.conPwdClass3 = 'el-icon-info';
      },
      login() {
        this.$router.push('/login');
      },
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.login();
          } else {
            this.$alert('Please check registe input', 'Error', {
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

.registe-form-item {
  margin: 0 270px 32px 0;
}
.registe-form label {
  width: 150px !important;
}
.registe-form .el-form-item__content {
  margin-left: 150px !important;
}

.focus-tips, .focus-tips-ul {
  width: 270px;
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
.focus-tips span {
  padding-top: 6px;
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

.registe-form-button {
  margin: 0 270px 0 70px;
}
.registe-form-button button{
  width: 100%;
}
</style>
