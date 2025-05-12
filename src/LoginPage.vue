<template>
  <div class="login-container">
    <div class="login-box">
      <img :src="logoImg" alt="Penmaster" class="logo" />

      <h1 class="title">PENMASTER</h1>
      <p class="subtitle">Chơi game trí tuệ!</p>

      <div class="input-group">
        <i class="fas fa-user icon"></i>
        <input type="text" placeholder="Username" v-model="username" @keyup.enter="handleLogin" />
      </div>

      <div class="input-group">
        <i class="fas fa-lock icon"></i>
        <input
          type="password"
          placeholder="Password"
          v-model="password"
          @keyup.enter="handleLogin"
        />
      </div>

      <button class="login-button" @click="handleLogin">Đăng nhập</button>

      <p class="hint-text">Bạn chưa có tài khoản? <br />Liên hệ Admin để nhận nhé!</p>

      <p class="version">Ver 1.2<br />Powered by 68Ggaming</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import api from "./utils/axios";
import { useRouter } from "vue-router";
import logoImg from "./assets/images/penmaster-logo.jpg";

const username = ref();
const password = ref();
const router = useRouter();

const handleLogin = async () => {
  try {
    const res = await api.post("/auth/email/login", {
      email: username.value,
      password: password.value,
    });

    const token = res.data?.token;
    if (token) {
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(res.data?.user));
      router.push("/home");
    } else {
      alert(res.data?.message || "Đăng nhập thất bại");
    }
  } catch (error: any) {
    alert(error.response?.data?.message || "Có lỗi xảy ra khi đăng nhập");
  }
};
</script>

<style scoped>
.login-container {
  background: url("./assets/images/bg-mobile.jpg") center center/cover no-repeat #232a34;
  background-size: cover;
  background-position: center;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}

.login-box {
  background-color: rgba(0, 41, 77, 0.85);
  padding: 30px;
  border-radius: 10px;
  text-align: center;
  color: white;
  width: 300px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);
}

.logo {
  width: 50px;
  margin-bottom: 10px;
}

.title {
  font-size: 24px;
  font-weight: bold;
}

.subtitle {
  margin-bottom: 20px;
  font-style: italic;
}

.input-group {
  position: relative;
  margin: 10px 0;
}

.icon {
  position: absolute;
  left: 10px;
  top: 50%;
  transform: translateY(-50%);
  color: black;
}

input {
  width: 100%;
  padding: 10px 10px 10px 35px;
  border: none;
  border-radius: 5px;
  outline: none;
}

.hint-text {
  font-size: 12px;
  margin-top: 15px;
  font-style: italic;
}

.version {
  margin-top: 20px;
  font-size: 12px;
  color: #cccccc;
}

.login-button {
  background-color: #2fa4ff;
  color: white;
  font-weight: bold;
  border: none;
  padding: 10px;
  border-radius: 5px;
  margin-top: 10px;
  width: 100%;
  cursor: pointer;
  transition: background 0.3s;
}

.login-button:hover {
  background-color: #1b8edc;
}
</style>
