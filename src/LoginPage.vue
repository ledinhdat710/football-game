<template>
  <div class="login-container">
    <img :src="logoCongDong" class="logo-congdong" />
    <div class="login-box">
      <img :src="logoImg" alt="Penmaster" class="logo" />

      <div class="title">PENMASTER</div>
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

      <p class="hint-text">
        Bạn chưa có tài khoản? <br />Liên hệ Admin để nhận nhé! <br />Tele: @vito283 
      </p>
      <!-- <p class="version">Ver 1.2<br />Powered by 68Gaming</p> -->
    </div>
    <!-- <p class="version">Ver 1.2<br />Powered by 68Gaming</p> -->
    <div class="centered-text">
      <p class="version">Ver 1.2<br />Powered by 68Gaming</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import api from "./utils/axios";
import { useRouter } from "vue-router";
import logoImg from "./assets/images/penmaster-logo.png";
import logoCongDong from "./assets/images/logo-congdong.png";

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

.logo-congdong {
  width: 160px;
  display: block;
  position: absolute;
  top: 90px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 2;
  border-radius: 5px;
}

.login-box {
  margin-top: 50px;
  background-color: rgba(0, 41, 77, 0.85);
  padding: 20px 30px 30px 30px;
  border-radius: 10px;
  text-align: center;
  color: white;
  width: 300px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);
}

.logo {
  width: 120px;
  margin-bottom: -25px;
}

.title {
  font-size: 24px;
  font-weight: bold;
  margin-top: 0px;
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

.centered-text {
  position: absolute;
  bottom: 40px;
  left: 50%;
  text-align: center;
  transform: translate(-50%, -50%);
  color: white;
  font-size: 12px;
  font-weight: bold;
  text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.6);
  z-index: 1;
}

.version {
  /* margin-top: 20px;
  font-size: 12px;
  color: #cccccc; */
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

@media (max-width: 400px) {
  .logo-congdong {
    width: 100px;
    display: block;
    position: absolute;
    top: 50px;
    left: 50%;
    transform: translateX(-50%);
    z-index: 2;
    border-radius: 5px;
  }
  .centered-text {
    bottom: -25px;
  }
}

@media (min-width: 1024px) and (max-width: 1440px) {
}

@media (min-width: 768px) {
  .centered-text {
    bottom: -10px;
  }
  .logo-congdong {
    width: 100px;
    display: block;
    position: absolute;
    top: 20px;
    left: 50%;
    transform: translateX(-50%);
    z-index: 2;
    border-radius: 5px;
  }
}

@media (max-width: 400px) {
  .logo-congdong {
    width: 100px;
    display: block;
    position: absolute;
    top: 50px;
    left: 50%;
    transform: translateX(-50%);
    z-index: 2;
    border-radius: 5px;
  }
}

@media (max-width: 376px) {
  .logo-congdong {
    width: 80px;
    display: block;
    position: absolute;
    top: 12px;
    left: 50%;
    transform: translateX(-50%);
    z-index: 2;
    border-radius: 5px;
  }
}
</style>
