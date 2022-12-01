<template>
  <div class="d-flex justify-center align-center fill-height">
    <div>
      <v-card width="400px">
        <v-card-text>
          <div class="d-flex justify-center align-center">
            <img src="icon.png" width="50px" />
          </div>
          <template v-if="!showRegistration">
            <v-text-field
              outlined
              persistent-placeholder
              label="Email"
              class="my-5"
              hide-details
              block
              v-model="form.email"
            ></v-text-field>
            <v-text-field
              outlined
              persistent-placeholder
              label="Password"
              class="my-5"
              hide-details
              block
              v-model="form.password"
            ></v-text-field>
            <v-btn
              class="elevation-0 gradient-bg mb-5"
              block
              x-large
              @click="login"
              :class="{ shake: failed }"
              :disabled="failed"
              >Login</v-btn
            >
            <p class="red--text" v-if="failed">{{errorMessage}}</p>
            <div class="d-flex justify-space-between mt-5">
              <div class="d-flex align-center">Dont Have An Account?</div>
              <div>
                <v-btn text @click="showRegistration = true">Register</v-btn>
              </div>
            </div>
          </template>
          <template v-else>
            <v-text-field
              outlined
              persistent-placeholder
              label="Email"
              class="my-5"
              hide-details
              block
              v-model="register.email"
            ></v-text-field>
            <v-text-field
              outlined
              persistent-placeholder
              label="Password"
              class="my-5"
              hide-details
              block
              v-model="register.password"
            ></v-text-field>
            <v-text-field
              outlined
              persistent-placeholder
              label="Confirm Password"
              class="my-5"
              hide-details
              block
              v-model="confirmPassword"
            ></v-text-field>
            <v-text-field
              outlined
              persistent-placeholder
              label="Organization Name"
              class="my-5"
              hide-details
              block
              v-model="register.organizationName"
            ></v-text-field>
            <v-btn
              class="elevation-0 gradient-bg mb-5"
              block
              x-large
              @click="registerAccount"
              :class="{ shake: failedRegister }"
              :disabled="failedRegister"
              >Login</v-btn
            >
            <p class="red--text" v-if="failedRegister">{{errorMessage}}</p>

            <div class="d-flex align-center justify-center mt-5">
              <v-btn text @click="showRegistration = false">
                <v-icon>mdi-chevron-left</v-icon> Go Back To Login
              </v-btn>
            </div>
          </template>
        </v-card-text>
      </v-card>
    </div>
  </div>
</template>

<script>
import Requests from "../utils/requests";
export default {
  data: () => ({
    form: {
      email: "",
      password: "",
    },
    register: {
      email: "",
      password: "",
      organizationName: "",
    },
    confirmPassword: "",
    failed: false,
    showRegistration: false,
    failedRegister: false,
    errorMessage: ""
  }),
  mounted() {
    console.log(localStorage.getItem("token"));
  },
  methods: {
    async login() {
      try {
        const requests = new Requests();
        const { data } = await requests.post("/api/accounts/login", {
          ...this.form,
        });
        requests.setToken(data.token);
        this.$emit("authenticated");
      } catch (error) {
        this.failed = true;
        this.errorMessage = error.message
        setTimeout(() => {
          this.failed = false;
        }, 1000);
        console.log(error);
      }
    },
    async registerAccount() {
      try {
        if(this.register.password !== this.confirmPassword) throw new Error('passwords do not match')
        const requests = new Requests();
        await requests.post("/api/accounts/register", {
          ...this.register,
        });
        this.showRegistration = false


      } catch (error) {
        console.log(error);
        this.errorMessage = error.message
        this.failedRegister = true;
        setTimeout(() => {
          this.failedRegister = false;
        }, 1000);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.shake {
  animation: shake 0.82s cubic-bezier(0.36, 0.07, 0.19, 0.97);
}
@keyframes shake {
  10%,
  90% {
    transform: translate3d(-1px, 0, 0);
  }
  20%,
  80% {
    transform: translate3d(2px, 0, 0);
  }
  30%,
  50%,
  70% {
    transform: translate3d(-4px, 0, 0);
  }
  40%,
  60% {
    transform: translate3d(4px, 0, 0);
  }
}
</style>