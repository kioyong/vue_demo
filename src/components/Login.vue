<template>
    <div>
        <b-form class="col-md-4 col-sm-6 col-xs-6 form-signin" @submit="onSubmit">
            <h1 class="h2 mb-4">后台管理系统</h1>
            <b-alert :show="alert" variant="warning">{{alertMessage}}</b-alert>
            <b-form-input v-model="form.username"  @focus="disShowAlert" type="text" placeholder="Enter your username"></b-form-input>
            <b-form-input v-model="form.password" type="password" placeholder="Enter your password"></b-form-input>
            <b-button type="submit" class="col-md-12 col-sm-12 col-xs-12" variant="primary">登录</b-button>
        </b-form>
    </div>
</template>

<script>
import axios from 'axios'
import {userLogin} from '../api/securityService'
export default {
    name: 'HelloWorld',
    data () {
        return {
            form: {
                username: 'aaa',
                password: 'aaa'
            },
            alert:false,
            alertMessage:''
        }
    },
    methods: {
        onSubmit(evt) {
            evt.preventDefault()
            let formdata = new FormData()
            formdata.append('username',this.form.username)
            formdata.append('password',this.form.password)
            formdata.append('grant_type','password')
            axios.defaults.headers.common['Authorization'] = 'Basic eW9uZzpwYXNzdzByZA==';
            userLogin(formdata).then((res) => {
                console.log("login success")
                axios.defaults.headers.common['Authorization'] = 'Bearer ' + res.data.access_token;
                this.$router.push('/home')
            }, (err) => {
                if (err.response.status == 400){
                    this.alert = true
                    this.alertMessage = '用户名或密码错误！'
                }else{
                    this.alert = true
                    this.alertMessage = "后台服务好像挂了。。。请稍候尝试"
                    console.log("login fail ：" + err)
                }
            })
        },
        disShowAlert() {
            this.alert = false
        }
    },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.form-signin {
  width: 100%;
  max-width: 330px;
  padding: 30px;
  margin: auto;
 
}
.form-signin input[type="password"] {
  margin-bottom: 10px;
  border-top-left-radius: 0;
  border-top-right-radius: 0;
}
</style>
