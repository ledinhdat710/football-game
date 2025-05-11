<template>
  <div class="header">
    <Drawer v-model:visible="visible" header="Xin chào!">
      <div @click="goToHome" style="font-size: 24px; margin-bottom: 10px; cursor: pointer">
        <i class="fas fa-home"></i> Trang chủ
      </div>
      <div @click="logOut" style="font-size: 24px; cursor: pointer">
        <i class="fas fa-sign-out-alt"></i> Đăng Xuất
      </div>
    </Drawer>
    <button @click="visible = true" class="menu-button">☰</button>
    <div class="coin-box">XU : {{ user.coin ? user.coin : 0 }}</div>
    <button @click="goToHome" class="back-button">←</button>
  </div>
</template>

<script setup>
import { useRouter } from "vue-router";
import Drawer from "primevue/drawer";
import { ref } from "vue";

const user = JSON.parse(localStorage.getItem("user"));
const router = useRouter();
const visible = ref(false);
const emit = defineEmits(["goToHome"]);
const goToHome = () => {
  emit("goToHome");
};
const logOut = () => {
  localStorage.removeItem("token");
  sessionStorage.removeItem("token");
  localStorage.removeItem("user");
  router.push("/login");
};
</script>

<style scoped>
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #005f9e;
  width: 100%;
  padding: 10px 15px;
}
.menu-button,
.back-button {
  font-size: 24px;
  background: none;
  color: white;
  border: none;
  cursor: pointer;
}
.coin-box {
  background-color: #0074cc;
  padding: 6px 12px;
  border-radius: 20px;
  font-weight: bold;
  font-size: 14px;
}
</style>
