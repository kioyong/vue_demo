<template>
  <div>
    <b-form @submit="onSubmit" @reset="onReset" v-if="show" class="col-md-6 col-sm-6 col-xs-6 form-registe">
      <b-form-group id="registeEmailGroup" label-class="text-right" horizontal label="Email address" label-for="registeEmail">
        <b-form-input id="registeEmail" type="email" v-model="form.email" required placeholder="Enter email"></b-form-input>
      </b-form-group>
      <b-form-group id="userNameGroup" label-class="text-right" horizontal label="User Name" label-for="userName">
        <b-form-input id="userName" type="text" v-model="form.name" required placeholder="Enter name">
        </b-form-input>
      </b-form-group>

      <b-form-group id="passwordGroup" label-class="text-right" horizontal label="Password" label-for="password">
        <b-form-input id="password" type="password" v-model="form.password" required placeholder="Enter Password">
        </b-form-input>
      </b-form-group>
      <b-form-group id="confirmPasswordGroup" label-class="text-right" horizontal label="Confirm password" label-for="confirmPassword">
        <b-form-input id="confirmPassword" type="password" v-model="form.confirmPassword" required placeholder="Enter Confirm Password">
        </b-form-input>
      </b-form-group>
      <b-button class="col-md-9 col-sm-9 col-xs-9" type="submit" variant="primary">Registe</b-button>
    </b-form>
  </div>
</template>

<script>
export default {
  data () {
    return {
      form: {
        email: '',
        name: ''
      },
      show: true
    }
  },
  methods: {
    onSubmit (evt) {
      evt.preventDefault();
      // alert(JSON.stringify(this.form));
      this.$router.push('/login');
    }
  }
}
</script>

<style scoped>
.form-registe {
  margin: 0 auto;
}

.form-registe button {
  float: right;
}
</style>