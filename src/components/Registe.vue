<template>
  <el-col :span="12" :offset="4">
    <el-form ref="registeForm" :model="registeForm" :rules="rules" label-width="80px" class="registe-form">
      <el-form-item label="Username:" prop="userName" class="registe-form-item">
        <el-input v-model="registeForm.userName" placeholder="Enter Username" clearable @focus="isShowNameTips=true" @blur="isShowNameTips=false"></el-input>
        <div v-if="isShowNameTips" class="focus-tips">
          <span>Cannot be changed after setting.<br/>Up to 14 characters.</span>
        </div>
      </el-form-item>

      <el-form-item label="Password:" prop="password" class="registe-form-item">
        <el-input type="password" v-model="registeForm.password" placeholder="Enter Password" clearable @focus="isShowPwdTips=true" @blur="isShowPwdTips=false"></el-input>
        <ul v-if="isShowPwdTips" class="focus-tips-ul">
          <span class="pwd-checklist-arrow"><em class="arrowa">◆</em><em class="arrowb">◆</em></span>
          <li>6~14 characters in length.</li>
          <li>Supports digits, uppercase and lowercase letters and punctuation.</li>
          <li>No spaces allowed.</li>
        </ul>
      </el-form-item>
      <el-form-item label="Confirm Password:" prop="confirmPassword" class="registe-form-item">
        <el-input type="password" v-model="registeForm.confirmPassword" placeholder="Re-enter Password" clearable @focus="isShowPwdTips2=true" @blur="isShowPwdTips2=false"></el-input>
        <ul v-if="isShowPwdTips2" class="focus-tips-ul">
          <span class="pwd-checklist-arrow"><em class="arrowa">◆</em><em class="arrowb">◆</em></span>
          <li>6~14 characters in length.</li>
          <li>Supports digits, uppercase and lowercase letters and punctuation.</li>
          <li>No spaces allowed.</li>
        </ul>
      </el-form-item>

      <!-- brithday
        remember
      accept -->

      <el-form-item class="registe-form-button">
        <el-button type="primary" @click="submitForm('registeForm')">Sign up</el-button>
      </el-form-item>
    </el-form>
  </el-col>
</template>

<script>
  export default {
    data() {
      var validateConfirmPassword = (rule, value, callback) => {
        if(value != this.registeForm.password) {
          this.registeForm.confirmPassword = "";
          callback(new Error("两次密码输入不一致"));
        } else {
          callback();
        }
      };
      return {
        isShowNameTips: false,
        isShowPwdTips: false,
        isShowPwdTips2: false,
        registeForm: {
          userName: '',
          password: '',
          confirmPassword: ''
        },
        rules: {
          userName: [
            { required: true, message: 'Please enter username', trigger: 'blur' },
            { min: 5, max: 10, message: '长度在 5 到 10 个字符', trigger: 'blur' }
          ],
          password: [
            { required: true, message: 'Please enter password', trigger: 'blur' },
            { pattern: /^(\w){8,12}$/, message: '只能输入8-12个字母、数字、下划线', trigger: 'blur' }
          ],
          confirmPassword: [
            { required: true, message: 'Please re-enter password', trigger: 'blur' },
            { pattern: /^(\w){8,12}$/, message: '只能输入8-12个字母、数字、下划线', trigger: 'blur' },
            { validator: validateConfirmPassword, trigger: 'blur'}
          ]
        }
      };
    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.$router.push('/login');
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
.registe-form-item {
  margin-right: 270px;
}
.registe-form label {
  width: 150px !important;
}
.registe-form label+div {
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
  text-align: left;
  margin-left: 10px;
}
.focus-tips-ul {
  height: inherit;
  margin: 0 0 0 20px;
  padding: 5px 28px;
  border: 1px solid #ddd;
  box-shadow: 1px 1px 1px #efefef;
  background: #f9f9f9;
}
.focus-tips span {
  padding-top: 6px;
}
.focus-tips-ul li {
  line-height: 20px;
  background: url(/static/passpc-account/img/reg/reg_icons.png) no-repeat -86px -112px;
  color: #666;
  text-align: left;
}
.pwd-checklist-arrow {
  position: absolute;
  left: -10px;
}
.pwd-checklist-arrow .arrowa,
.pwd-checklist-arrow .arrowb {
  position: absolute;
  top: 0;
  font-size: 20px;
  font-style:  normal;
}
.pwd-checklist-arrow .arrowa {
  left: 0;
  color: #ddd;
}
.pwd-checklist-arrow .arrowb {
  color: #f9f9f9;
  left: 1px;
}

.registe-form-button {
  margin: 20px 270px 0 70px;
}
.registe-form-button button{
  width: 100%;
}
</style>
