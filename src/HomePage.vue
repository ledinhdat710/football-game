<template>
  <div class="container">
    <!-- Header -->
    <div class="header">
      <Drawer v-model:visible="visible" header="Xin chào!">
        <div @click="goToHome" style="font-size: 24px; margin-bottom: 10px; cursor: pointer">
          <i class="fas fa-home"></i> Trang chủ
        </div>
        <div @click="logOut" style="font-size: 24px; cursor: pointer">
          <i class="fas fa-sign-out-alt"></i> Đăng Xuất
        </div>
      </Drawer>
      <button class="menu-button" @click="visible = true">☰</button>
      <div class="coin-box">XU : 997241</div>
    </div>

    <!-- Game Title -->
    <div class="title">
      <h2>HUNTERS GROUP</h2>
      <h1>GAME 3D</h1>
    </div>

    <!-- Game Grid -->
    <div class="game-grid">
      <div v-for="game in games" :key="game.title" class="game-card" @click="routeGame(game.title)">
        <img :src="game.image" :alt="game.title" class="game-img" />
        <!-- <div class="game-title">{{ game.title }}</div> -->
      </div>
    </div>
  </div>
</template>

<script setup>
import soccerStrikeImg from "./assets/images/soccer-strike.jpg";
import dapTrauImg from "./assets/images/dap-trau.jpg";
import phaGonImg from "./assets/images/pha-gon.jpg";
import dapChuotImg from "./assets/images/dap-chuot.jpg";
import { useRouter } from "vue-router";
import Drawer from "primevue/drawer";
import { ref } from "vue";

const router = useRouter();
const visible = ref(false);
const games = [
  {
    title: "SOCCER STRIKER",
    image: soccerStrikeImg,
  },
  {
    title: "Đập Trâu",
    image: dapTrauImg,
  },
  {
    title: "Phá cột gôn",
    image: phaGonImg,
  },
  {
    title: "Đập chuột",
    image: dapChuotImg,
  },
];

const routeGame = (title) => {
  if (title === "SOCCER STRIKER") {
    router.push("/soccer-strike");
  }
};

const goToHome = () => {
  visible.value = false;
  router.push("/home");
};

const logOut = () => {
  localStorage.removeItem("token");
  sessionStorage.removeItem("token");
  router.push("/login");
};
</script>

<style scoped>
.container {
  background: url("./assets/images/bg-mobile.jpg") center center/cover no-repeat #232a34;
  color: white;
  min-height: 100vh;
  padding: 0;
  margin: 0;
  font-family: sans-serif;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #005f9e;
  padding: 10px 15px;
}

.menu-button {
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

.title {
  text-align: center;
  margin: 30px 0 20px;
}

.title h2 {
  letter-spacing: 2px;
  font-size: 16px;
  font-weight: bold;
}

.title h1 {
  font-size: 22px;
  font-weight: bold;
  margin-top: 5px;
}

.game-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
  padding: 0 15px 30px;
}

.game-card {
  background-color: #222;
  border-radius: 12px;
  overflow: hidden;
  text-align: center;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.5);
}

.game-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.game-title {
  padding: 8px 0;
  font-size: 14px;
  font-weight: bold;
}
</style>
