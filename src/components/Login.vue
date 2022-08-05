<template>
  <div class="login_form bg-primary">
    <div class="q-pa-none" v-if="show_login_form">
      <form class="form" @submit.prevent="login">
        <div class="form_item">
          <label class="login_labels ">Email</label>
          <input type="text" placeholder="Enter email" v-model="login_form.email" />
        </div>
        <div class="form_item">
          <label class="login_labels">password</label>
          <input type="password" placeholder="Enter password " v-model="login_form.password" />
        </div>
        <div class="q-mt-md q-mb-md text-center submit_button">
          <q-btn
            filled
            rounded
            color="white"
            text-color="primary"
            label="Login"
            style="width:180px;height:30px;"
          />
        </div>
      </form>
      <div class="q-pl-md q-pb-md call_to_signup text-white">
        Dont have an account?
        <span style="color:white;cursor:pointer;" @click="show_sign_up"
          >Sign-up</span
        >
      </div>
    </div>
    <div class="q-pa-none" v-if="!show_login_form">
      <form class="form" @submit.prevent="sign_up">
        <div class="form_item">
          <label class="login_labels ">Email Address</label>
          <input type="text" placeholder="Enter Email Address" v-model="register_form.email" />
        </div>
        <div class="form_item">
          <label class="login_labels">Password</label>
          <input type="password" placeholder="Enter password " v-model="register_form.password" />
        </div>
        <div class="form_item">
          <label class="login_labels">Confirm password</label>
          <input type="password" placeholder="confirm password " v-model="register_form.confirm_password" />
        </div>
        <div class="q-mt-md q-mb-md submit_button">
          <q-btn
            filled
            rounded
            color="white"
            text-color="primary"
            label="Signup"
            style="width:175px;height:30px;margin-left:13%;"
          />
        </div>
      </form>
      <div class="q-pl-md q-pb-md  call_to_signup text-grey-3">
        I have an account ?
        <span style="color:white;cursor:pointer;" @click="show_login"
          >Login</span
        >
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      login_form: {
        email: "",
        password: ""
      },
      register_form: {
        email: "",
        password: "",
        confirm_password: "",
      },
      show_login_form: false
    };
  },
  methods: {
    show_sign_up() {
      this.show_login_form = false;
    },
    show_login() {
      this.show_login_form = true;
    },
    sign_up() {},
    login() {}
  }
};
</script>

<style scoped>
.login_form {
  z-index: 3001;
  position: absolute;
  top: 80px;
  right: 150px;
  width: 230px;
  border-radius: 20px;
  font-size: 15px;
}
.login_labels {
  font-family: Montserrat;
  font-size: 15px;
  font-weight: bold;
  font-stretch: normal;
  font-style: normal;
  /* line-height: 1.3; */
  letter-spacing: normal;
  text-align: left;
  color: #ffffff;
}
input {
  border-radius: 20px;
  border: 1px solid #ffff;
  color: white;
  background-color: steelblue;
  height: 30px;
  padding-left: 10px;
}

input:focus {
  outline: none;
  border: 1px solid #ffff;
}
.form {
  margin-top: 40px;
}
::placeholder {
  color: #ffffff;
  opacity: 0.5;
}
.submit_button >>> .q-btn__content {
  margin-bottom: 5px;
}
.call_to_signup {
  font-family: Montserrat;
  font-size: 11px;
  font-weight: bold;
  margin-left: 6%;
}
.form_item {
  margin-left: 12%;
}
</style>
