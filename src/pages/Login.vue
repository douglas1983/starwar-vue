<template>
  <q-layout>
    <q-page-container>
      <q-page class="flex bg-image flex-center">
        <q-card
          v-if="!showcadastro"
          v-bind:style="
            $q.screen.lt.sm
              ? { width: '80%' }
              : $q.screen.lt.md
              ? { width: '55%' }
              : { width: '30%' }
          "
        >
          <q-card-section>
            <q-avatar size="103px" class="absolute-center shadow-10">
              <img src="https://cdn.quasar.dev/img/boy-avatar.png" />
            </q-avatar>
          </q-card-section>
          <q-card-section>
            <div class="text-center q-pt-lg">
              <div class="col text-h6 ellipsis">Log in</div>
            </div>
          </q-card-section>
          <q-card-section>
            <q-form ref="myForm" class="q-gutter-md">
              <q-input
                filled
                v-model="username"
                label="Username"
                lazy-rules
                :rules="emailRules"
              />

              <q-input
                type="password"
                filled
                v-model="password"
                label="Password"
                lazy-rules
                :rules="min"
              />

              <div>
                <q-btn
                  label="Login"
                  @click="logar()"
                  type="button"
                  color="primary"
                />
                <q-space />
                <q-btn
                  label="Cadastrar Usuário"
                  @click="showcadastro = !showcadastro"
                  color="primary"
                  flat
                  size="sm"
                  class="q-my-sm q-px-none q-mx-none"
                ></q-btn>
              </div>
            </q-form>
          </q-card-section>
        </q-card>

        <q-card
          v-else
          v-bind:style="$q.screen.lt.sm ? { width: '80%' } : { width: '30%' }"
        >
          <q-card-section>
            <q-avatar size="103px" class="absolute-center shadow-10">
              <img src="https://cdn.quasar.dev/img/boy-avatar.png" />
            </q-avatar>
          </q-card-section>
          <q-card-section>
            <div class="text-center q-pt-lg">
              <div class="col text-h6 ellipsis">Cadastrar usuário</div>
            </div>
          </q-card-section>
          <q-card-section>
            <q-form ref="myForm2" class="q-gutter-md">
              <q-input
                filled
                v-model="user.name"
                label="Nome"
                lazy-rules
                :rules="[
                  (val) => (val && val.length > 3) || 'Campo obrigatório',
                ]"
              />
              <q-input
                filled
                v-model="user.email"
                label="Email"
                lazy-rules
                :rules="emailRules"
              />
              <q-input
                filled
                v-model="user.telefone"
                label="Telefone"
                lazy-rules
                :rules="[
                  (val) =>
                    val.length == 10 ||
                    val.length == 11 ||
                    'Informe o um telefone válido',
                ]"
              />
              <q-input
                filled
                v-model="user.password"
                label="Password"
                lazy-rules
                type="password"
                :rules="[
                  (val) =>
                    (val.length >= 6 && val.length <= 20) ||
                    'Mínimo de 6 digitos e no máximo 20 digitos',
                ]"
              />
              <q-input
                filled
                v-model="repeatPwd"
                label="Repeat Password"
                lazy-rules
                type="password"
                maxlength="20"
                :rules="[
                  (val) =>
                    (val.length >= 6 && val.length <= 20) ||
                    'Mínimo de 6 digitos e no máximo 20 digitos',
                  ,
                  (val) =>
                    val == user.password ||
                    'A confirmação do da senha não corresponde com o senha digitado',
                ]"
              />

              <div>
                <q-btn
                  label="Cadastrar"
                  @click="createUser()"
                  type="button"
                  color="primary"
                />
              </div>
            </q-form>
          </q-card-section>
        </q-card>
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script>
import { mapActions } from "vuex";

export default {
  data() {
    return {
      user: {
        name: "",
        email: "",
        telefone: "",
        password: "",
      },
      repeatPwd: "",
      showcadastro: false,
      username: "",
      password: "",
      emailRules: [
        (v) => !!v || "E-mail is required",
        (v) => /.+@.+\..+/.test(v) || "E-mail must be valid",
      ],
      min: [(v) => v.length >= 3 || "Min 6 characters"],
    };
  },
  methods: {
    ...mapActions("auth", ["login", "getUserLogin"]),
    ...mapActions("user", ["newUser"]),

    clearLoginData() {
      this.username = "";
      this.password = "";
    },
    clearNewUser() {
      this.user.name = "";
      this.user.email = "";
      this.user.telefone = "";
      this.user.password = "";
      this.repeatPwd = "";
    },
    async createUser() {
      this.$refs.myForm2.validate().then(async (valid) => {
        if (valid) {
          const user = await this.newUser(this.user);
          if (user.error) {
            this.$q.dialog({
              title: "Erro ao cadastrar usuário",
              message: user.error.message,
            });
          } else {
            this.$q
              .dialog({
                title: "Usuário cadastrado com sucesso",
                message: "Agora você pode fazer login",
              })
              .onOk(() => {
                this.showcadastro = false;
                this.clearNewUser();
              });
          }
        }
      });
    },
    async logar() {
      this.$refs.myForm.validate().then(async (valid) => {
        if (valid) {
          const user = {
            username: this.username,
            password: this.password,
          };

          const login = await this.login(user);
          if (login.access_token) {
            await this.getUserLogin();
            this.clearLoginData();
            this.$router.push({ name: "home" });
          } else {
            this.$q.dialog({
              title: "Erro no Login",
              message: "Usuário ou senha inválidos",
            });
          }
        }
      });
    },
  },
};
</script>

<style>
.bg-image {
  background-image: linear-gradient(135deg, #1f11ce 0%, #d0cef5 100%);
}
</style>
