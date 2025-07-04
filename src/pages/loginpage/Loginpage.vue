<template>
  <div class="login_page" v-if="!isLoggedIn">
    <div class="left">
      <div class="logo">
        <img src="../../assets//Group 4.png" alt="Logo" />
      </div>
      <h1>Xush kelibsiz</h1>
      <p>Iltimos, login va parolni kiriting</p>
      <form @submit.prevent="handleSubmit">
        <div class="login">
          <input
            type="text"
            v-model="login"
            @input="login = login.replace(/[^A-Za-zЎўҒғҚқҲҳЧчШш]/g, '')"
            placeholder="Loginni kiriting"
            required
            autofocus
          />
          <button type="button">
            <Icons :name="'user'" />
          </button>
        </div>
        <p v-if="loginError" class="error">{{ loginError }}</p>
        <div class="password">
          <input
            :type="showPassword ? 'text' : 'password'"
            v-model="password"
            placeholder="Parolni kiriting"
            required
          />
          <button type="button" @click="togglePassword">
            <Icons :name="showPassword ? 'eye_off' : 'eye'" />
          </button>
        </div>
        <p v-if="passwordError" class="error">{{ passwordError }}</p>
        <button type="submit" class="kirish">Kirish</button>
      </form>
      <div class="ochish">
        <p>
          Akkauntingiz yo‘qmi?
          <router-link to="/register"><span>Akkaunt ochish</span></router-link>
        </p>
      </div>
    </div>
    <div class="right">
      <b>SAFO-NON</b>
    </div>
  </div>
</template>

<script>
import Icons from "../../components/materials/icons/Iconss.vue";
import axios from "axios";

export default {
  name: "LoginPage",
  components: { Icons },
  data() {
    return {
      login: "",
      password: "",
      showPassword: false,
      loginError: "",
      passwordError: "",
      isLoggedIn: false,
    };
  },
  created() {
    this.isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
    if (this.isLoggedIn) {
      this.$router.push("/");
    } else {
      const savedLogin = localStorage.getItem("savedLogin");
      const savedPassword = localStorage.getItem("savedPassword");
      if (savedLogin) this.login = savedLogin;
      if (savedPassword) this.password = savedPassword;
    }
  },
  methods: {
    togglePassword() {
      this.showPassword = !this.showPassword;
    },
    async handleSubmit() {
      this.loginError = "";
      this.passwordError = "";

      if (!this.login) {
        this.loginError = "Login kiritilishi shart!";
        return;
      }
      if (!this.password) {
        this.passwordError = "Parol kiritilishi shart!";
        return;
      }

      try {
        const response = await axios.post("https://api.kodx.uz/api/login", {
          username: this.login,
          password: this.password,
        });

        if (response.data.success) {
          localStorage.setItem("isLoggedIn", "true");
          localStorage.setItem("user", JSON.stringify({ login: this.login }));
          localStorage.setItem("token", response.data.accessToken);

          // 💡 sellerId ni ham saqlaymiz
          localStorage.setItem("sellerId", response.data.sellerId);

          localStorage.setItem("savedPassword", this.password);

          this.isLoggedIn = true;
          this.$router.push("/");
        } else {
          this.loginError = "Login yoki parol xato!";
        }
      } catch (error) {
        this.loginError = "Xatolik yuz berdi, qayta urinib ko‘ring!";
        console.error("Login error:", error);
      }
    },
  },
};
</script>

<style>
/* siz yozgan stil hech o‘zgartirilmagan */
@import url("https://fonts.googleapis.com/css2?family=Zen+Dots&display=swap");
.login_page {
  height: 100vh;
  display: flex;
  gap: 200px;
}
.left {
  width: 40%;
  padding: 120px;
  display: flex;
  flex-direction: column;
}
.login,
.password {
  display: flex;
  align-items: center;
  width: 450px;
  margin-top: 30px;
  background-color: #fff;
  height: 50px;
  border-radius: 10px;
  border: 1px solid gray;
  justify-content: space-between;
}
input {
  border: none;
  outline: none;
  text-indent: 20px;
  font-size: 20px;
  width: 400px;
}
.login:hover,
.password:hover {
  border: 1px solid dodgerblue;
  box-shadow: 0px 0px 2px 2px dodgerblue;
}
.login button,
.password button {
  width: 30px;
  border: none;
  background-color: transparent;
  cursor: pointer;
}
.error {
  color: red;
  font-size: 14px;
  margin-top: 5px;
}
.kirish {
  width: 450px;
  background-color: dodgerblue;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
  border-radius: 10px;
  font-weight: 600;
  color: #fff;
  border: none;
  cursor: pointer;
  font-size: 18px;
}
.ochish {
  display: flex;
  justify-content: center;
  margin-top: 20px;
}
.ochish span {
  color: dodgerblue;
  cursor: pointer;
}
h1 {
  width: 450px;
  font-size: 55px;
  font-family: "Zen Dots", sans-serif;
}
p {
  color: gray;
}
.right {
  width: 50%;
  height: 95%;
  margin: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  border-radius: 40px;
  font-size: 70px;
  background-color: dodgerblue;
  font-family: Verdana, Geneva, Tahoma, sans-serif;
}
.right b {
  font-family: "Zen Dots", sans-serif;
}
</style>
