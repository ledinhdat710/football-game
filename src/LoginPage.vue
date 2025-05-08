<template>
  <div class="login-bg">
    <div class="login-wrapper">
      <h1 class="main-title">HUNTERS GROUP</h1>
      <div class="login-card">
        <h2 class="login-header">ĐĂNG NHẬP</h2>
        <div class="login-form">
          <input class="login-input" placeholder="Tên đăng nhập" type="text" v-model="username" />
          <input class="login-input" placeholder="Password" type="password" v-model="password" />
          <label class="remember-me">
            <input type="checkbox" />
            <span>Ghi nhớ tài khoản</span>
          </label>
        </div>
      </div>
      <div class="login-btn-group">
        <button class="login-btn gradient" @click="handleLogin">ĐĂNG NHẬP</button>
        <button class="login-btn gradient">ĐĂNG KÝ</button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import api from "./utils/axios";
import { useRouter } from "vue-router";

const username = ref();
const password = ref();
const remember = ref(false);
const router = useRouter();

const handleLogin = async () => {
  try {
    const res = await api.post("/auth/email/login", {
      email: username.value,
      password: password.value,
    });

    const token = res.data?.token;
    if (token) {
      if (remember.value) {
        localStorage.setItem("token", token);
      } else {
        sessionStorage.setItem("token", token);
      }
      // localStorage.setItem("token", token);
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
.login-bg {
  position: relative;
  min-height: 100vh;
  width: 100%;
  background: url("./assets/images/background.jpg") center center/cover no-repeat #232a34;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  flex-direction: column;
}
.login-wrapper {
  width: 100%;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  padding: 0;
}
.main-title {
  font-size: 3rem;
  font-family: "IBM Plex Mono", monospace;
  color: #fff;
  text-align: center;
  padding-top: 2rem;
  font-weight: bold;
  opacity: 0.5;
  letter-spacing: 0.1em;
}
.login-card {
  margin-top: 4rem;
  width: auto;
  max-width: 90vw;
  min-height: 312px;
  border-radius: 1.25rem;
  background: rgba(44, 62, 92, 0.8);
  box-shadow: 0 6px 32px 0 rgba(0, 0, 0, 0.35);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  backdrop-filter: blur(8px);
  padding: 0 0 1.5rem 0;
}
.login-header {
  margin-top: 2.5rem;
  font-size: 2.4rem;
  color: #19d4fa;
  font-weight: bold;
  font-family: "Merriweather", serif;
  letter-spacing: 0.03em;
  margin-bottom: 2.5rem;
}
.login-form {
  display: flex;
  flex-direction: column;
  align-items: stretch;
  gap: 1rem;
  width: 88%;
}
.login-input {
  background: rgba(255, 255, 255, 0.13);
  border: none;
  border-radius: 0.9rem;
  padding: 0.85rem 1.2rem;
  color: #fff;
  font-size: 1.1rem;
  margin-bottom: 0.3rem;
  outline: none;
  transition: background 0.2s;
}
.login-input::placeholder {
  color: #eaf6fc;
  opacity: 1;
}
.remember-me {
  display: flex;
  align-items: center;
  font-size: 1.18rem;
  margin-left: 0.25rem;
  color: #fff;
}
.remember-me input {
  margin-right: 0.5rem;
  accent-color: #4bb8ea;
}
.login-btn-group {
  margin-top: 2.4rem;
  display: flex;
  flex-direction: column;
  gap: 1.1rem;
  align-items: center;
}
.login-btn {
  width: 260px;
  font-size: 1.38rem;
  padding: 0.9rem 0;
  border-radius: 2rem;
  font-weight: 800;
  color: #fff;
  border: 1.5px solid rgba(255, 255, 255, 0.25);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
  outline: none;
  transition: filter 0.17s;
  cursor: pointer;
  margin: 0 auto;
}
.gradient {
  background: linear-gradient(180deg, #3ed9fa 3%, #357ae8 66%, #285cc3 100%);
}
.login-btn:hover {
  filter: brightness(1.12);
}
@media (max-width: 800px) {
  .login-card {
    margin-top: 2rem;
  }
  .main-title {
    font-size: 2.1rem;
  }
  .login-header {
    font-size: 1.5rem;
  }
  .login-btn {
    width: 90vw;
    max-width: 260px;
  }
  .login-card {
    width: 90vw;
    min-width: 200px;
  }
}
@media (max-width: 600px) {
  .login-bg {
    min-height: 100vh;
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    padding: 0;
    background-position: center top;
  }
  .login-wrapper {
    min-height: 100vh;
    height: 100vh;
    width: 100vw;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    /* padding: 0 2vw; */
    box-sizing: border-box;
  }
  .main-title {
    font-size: 1.32rem;
    padding-top: 1rem;
    line-height: 1.2;
  }
  .login-card {
    width: auto;
    max-width: 430px;
    min-width: unset;
    padding: 1.2rem;
    margin-top: 2rem;
    border-radius: 18px;
  }
  .login-header {
    font-size: 1.05rem;
    margin-top: 1.25rem;
    margin-bottom: 1.4rem;
    padding: 0 0.3em;
    line-height: 1.12;
  }
  .login-form {
    gap: 0.8rem;
    width: 100%;
  }
  .login-input {
    font-size: 1rem;
    padding: 0.64rem 0.8rem;
    margin-bottom: 0;
    border-radius: 14px;
  }
  .remember-me {
    font-size: 0.97rem;
    margin-left: 0.15rem;
  }
  .login-btn-group {
    margin-top: 1.3rem;
    gap: 0.82rem;
  }
  .login-btn {
    width: 50vw;
    max-width: 400px;
    font-size: 1rem;
    padding: 0.72rem 0;
    border-radius: 22px;
  }
}
@media (max-width: 400px) {
  .login-card {
    width: 99vw;
  }
  .login-btn {
    width: 99vw;
    max-width: 99vw;
  }
}
</style>
