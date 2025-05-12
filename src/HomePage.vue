<template>
  <div class="menu-container">
    <!-- HEADER -->
    <header class="menu-header">
      <div @click="handleHome">
        <i style="cursor: pointer" class="fas fa-bars menu-icon"></i>
      </div>

      <Drawer v-model:visible="visible" header="Xin chào!">
        <div @click="goToHome" style="font-size: 24px; margin-bottom: 10px; cursor: pointer">
          <i class="fas fa-home"></i> Trang chủ
        </div>
        <div style="font-size: 24px; margin-bottom: 10px; cursor: pointer">Giới thiệu</div>
        <div style="font-size: 24px; margin-bottom: 10px; cursor: pointer">Cộng đồng</div>
        <div style="font-size: 24px; margin-bottom: 10px; cursor: pointer">Tài liệu BCR</div>
        <div style="font-size: 24px; margin-bottom: 80px; cursor: pointer">
          <i
            style="font-size: 24px; cursor: pointer; margin-right: 10px"
            class="fa-brands fa-facebook"
          ></i>
          <i
            style="font-size: 24px; cursor: pointer; margin-right: 10px"
            class="fa-brands fa-telegram"
          ></i>
          <i style="font-size: 24px; cursor: pointer" class="fa-solid fa-phone"></i>
        </div>
        <div @click="logOut" style="font-size: 24px; cursor: pointer;">
          <i class="fas fa-sign-out-alt"></i> Đăng Xuất
        </div>
      </Drawer>
      <div class="logo">PENMASTER</div>
      <div class="coin">
        <span>{{ user.coin ? user.coin : 0 }}</span>
        <i class="fa-solid fa-coins"></i>
      </div>
    </header>

    <!-- LỚP PHỦ TRẮNG MỜ -->
    <div class="white-overlay"></div>

    <!-- GAME GRID -->
    <div class="game-grid">
      <div
        v-for="(game, index) in games"
        :key="index"
        class="game-card"
        @click="routeGame(game.title)"
      >
        <img :src="game.image" :alt="game.title" class="game-image" />
        <p class="title">{{ game.title }}</p>
        <p class="star">{{ game.stars }}<i class="fas fa-star" style="color: gold"></i></p>
        <p class="soon">COMING SOON</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import soccerStrikeImg from "./assets/images/soccer-strike.jpg";
import dapTrauImg from "./assets/images/dap-trau.jpg";
import phaGonImg from "./assets/images/pha-gon.jpg";
import dapChuotImg from "./assets/images/dap-chuot.jpg";
import Drawer from "primevue/drawer";
import { useRouter } from "vue-router";
import { ref } from "vue";

const visible = ref();
const router = useRouter();
const games = [
  {
    title: "SOCCER STRIKER",
    image: soccerStrikeImg,
    stars: 5,
  },
  {
    title: "Đập Trâu",
    image: dapTrauImg,
    stars: 0,
  },
  {
    title: "Phá cột gôn",
    image: phaGonImg,
    stars: 0,
  },
  {
    title: "Đập chuột",
    image: dapChuotImg,
    stars: 0,
  },
];

const user = JSON.parse(localStorage.getItem("user")) || {};

const logOut = () => {
  localStorage.removeItem("token");
  sessionStorage.removeItem("token");
  localStorage.removeItem("user");
  router.push("/login");
};

const goToHome = () => {
  router.push("/home");
};

const handleHome = () => {
  visible.value = true;
};

const routeGame = (title) => {
  if (title === "SOCCER STRIKER") {
    router.push("/soccer-strike");
  }
};
</script>

<style scoped>
.menu-container {
  background: url("./assets/images/bg-mobile.jpg") center center/cover no-repeat #232a34;
  background-size: cover;
  background-position: center;
  min-height: 100vh;
  font-family: sans-serif;
  position: relative;
  overflow: hidden;
}

/* HEADER */
.menu-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px 10px;
  color: white;
  font-weight: bold;
  position: relative;
  z-index: 2;
}

.menu-icon {
  font-size: 22px;
}

.logo {
  font-size: 20px;
  text-transform: uppercase;
}

.coin {
  display: flex;
  align-items: center;
  gap: 5px;
}

/* LỚP PHỦ */
.white-overlay {
  position: absolute;
  top: 60px; /* chiều cao header */
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(255, 255, 255, 0.3); /* Mờ hơn */
  backdrop-filter: blur(6px);
  z-index: 1;
}

/* GRID */
.game-grid {
  position: relative;
  z-index: 2;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  padding: 20px 10px;
}

/* GAME CARD */
.game-card {
  backdrop-filter: blur(6px);
  padding: 14px;
  border-radius: 14px;
  text-align: center;
  cursor: pointer;
  transition: transform 0.2s;
}
.game-card:hover {
  transform: scale(1.02);
}

/* GAME IMAGE TO HƠN */
.game-image {
  width: 100%;
  height: 150px;
  object-fit: cover;
  border-radius: 10px;
}

.title {
  margin-top: 12px;
  font-weight: bold;
  font-size: 15px;
}

.star {
  margin: 6px 0;
  font-size: 14px;
  color: #333;
}

.soon {
  background: red;
  color: white;
  padding: 5px 12px;
  border-radius: 20px;
  font-size: 12px;
  display: inline-block;
  margin-top: 6px;
}
</style>
