<template>
  <CContainer class="d-flex content-center min-vh-100">
    <CRow>
      <CCol>
        <CCardGroup>
          <CCard class="p-4">
            <CCardBody>
              <CForm @submit="onSubmit">
                <h1>Login</h1>
                <p class="text-muted">Sign In to your account</p>
                <CInput
                  placeholder="Username"
                  autocomplete="username email"
                  v-model="email"
                >
                  <template #prepend-content><CIcon name="cil-user"/></template>
                </CInput>
                <CInput
                  placeholder="Password"
                  type="password"
                  v-model="password"
                  autocomplete="curent-password"
                >
                  <template #prepend-content><CIcon name="cil-lock-locked"/></template>
                </CInput>
                <CRow>
                  <CCol col="6" class="text-left">
                    <CButton type="submit" :disabled="getLogInState.initial" color="primary" class="px-4">Login</CButton>
                  </CCol>
                  <CCol col="6" class="text-right">
                    <!-- <CButton color="link" class="d-md-none">Register now!</CButton> -->
                  </CCol>
                </CRow>
              </CForm>
            </CCardBody>
          </CCard>
          <CCard
            color="primary"
            text-color="white"
            class="text-center py-5 d-sm-down-none"
            body-wrapper
          >
            <h2>Technical Exam</h2>
            <p>Ordering System Sample Application.</p>
            <!-- <CButton
              color="primary"
              class="active mt-3"
            >
              Register Now!
            </CButton> -->
          </CCard>
        </CCardGroup>
      </CCol>
    </CRow>
  </CContainer>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'Login',
  data() {
    return {
      email: "",
      password: "",
    }
  },
  computed: {
    ...mapGetters([
      "getLogInState",
    ])
  },
  watch: {
    getLogInState({ initial, success, fail }) {
      if(fail) {
        this.$swal('Oh No!', 'Invalid Credentials', 'error')
      }
    }
  },
  methods: {
    ...mapActions([
      "authenticate"
    ]),
    onSubmit(e) {
      e.preventDefault()
      const data = {
        email: this.email,
        password: this.password
      }
      this.authenticate(data)
    }
  }
}
</script>
