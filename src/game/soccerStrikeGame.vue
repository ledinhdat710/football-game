<template>
  <div class="container">
    <!-- Custom Header -->
    <div class="shoot-header">
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
        <span>{{ user.coin }}</span>
        <i class="fa-solid fa-coins"></i>
      </div>
    </div>

    <!-- Game Section -->
    <!-- Game Title Section -->
    <div class="game-title-section">
      <h2 class="title">P.P KHÔNG TRÙNG HƯỚNG</h2>
      <div class="title-bar"></div>

      <div class="info-box">
        <div class="info-text">
          <div>Vốn tối thiểu: 300</div>
          <div>Cấp độ: Basic</div>
          <div>Sút mồi: 10 lượt -5k</div>
          <div>Chốt lãi khuyến khích: Bậc 6</div>
          <div>Sút khai thác: 2 lượt 25k</div>
          <div>Chốt lãi khuyến khích: Bậc 4</div>
          <div>Sút quyết định: 50k</div>
          <div>Chốt lãi khuyến khích: Bậc 3</div>
        </div>
      </div>
    </div>

    <!-- Goalkeeper Area -->
    <div class="goalkeeper-area">
      <img v-if="valueKick === 0" :src="goalKeeper" alt="Goalkeeper" class="goalkeeper-img" />
      <img v-if="valueKick === 1" :src="left_kick" alt="Goalkeeper" class="goalkeeper-img" />
      <img v-if="valueKick === 2" :src="center_kick" alt="Goalkeeper" class="goalkeeper-img" />
      <img v-if="valueKick === 3" :src="right_kick" alt="Goalkeeper" class="goalkeeper-img" />
    </div>

    <button @click="kick" class="shoot-button">SÚT</button>
  </div>
</template>

<script setup>
import { ref } from "vue";
import api from "../utils/axios";
import goalKeeper from "../assets/images/goalkeeper.jpg";
import left_kick from "../assets/images/left_kick.jpg";
import right_kick from "../assets/images/right_kick.jpg";
import center_kick from "../assets/images/center_kick.jpg";
import soccerStrikeImg from "../assets/images/soccer-strike.jpg";
import { useRouter } from "vue-router";
import Drawer from "primevue/drawer";

const router = useRouter();

const valueKick = ref(0);

const visible = ref();

const handleHome = () => {
  visible.value = true;
};

const user = JSON.parse(localStorage.getItem("user")) || {};

const goToHome = () => {
  router.push("/home");
};

const logOut = () => {
  localStorage.removeItem("token");
  sessionStorage.removeItem("token");
  localStorage.removeItem("user");
  router.push("/login");
};

const kick = async () => {
  const res = await api.get("/admins/kick");
  valueKick.value = res.data.value;
};
</script>

<style scoped>
.container {
  background: url("../assets/images/bg-mobile.jpg") center center/cover no-repeat #232a34;
  min-height: 100vh;
  color: white;
  font-family: sans-serif;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.game-title-section {
  text-align: center;
  width: 100%;
  padding: 10px 20px;
  margin-top: 10px;
}

.title {
  font-size: 16px;
  font-weight: bold;
  color: white;
  margin-bottom: 5px;
}

.title-bar {
  width: 100px;
  height: 4px;
  background: linear-gradient(to right, #00ffff, #00aaff, #00ffff);
  border-radius: 4px;
  margin: 0 auto 10px;
}

.info-box {
  background: rgba(0, 0, 0, 0.5); /* Màu đen mờ */
  border-radius: 12px;
  padding: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
}

.icon {
  font-size: 20px;
  color: #00ffff;
}

.info-text {
  font-size: 14px;
  color: white;
  text-align: left;
}

.shoot-button {
  position: absolute;
  bottom: 100px;
  left: 50%;
  transform: translateX(-50%);
  background: #00aaff;
  border: 4px solid #005577;
  border-radius: 50%;
  width: 120px;
  height: 120px;
  color: white;
  font-weight: bold;
  font-size: 18px;
  box-shadow: 0 0 10px #00aaff;
  cursor: pointer;
  text-transform: uppercase;
}

/* ===== Header from PenMaster ===== */
.shoot-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: 15px;
  font-weight: bold;
}

.menu-icon {
  font-size: 20px;
  cursor: pointer;
}

.logo {
  font-size: 18px;
  font-weight: bold;
}

.coin {
  display: flex;
  align-items: center;
  gap: 5px;
  font-size: 16px;
}

/* Game Section */
.game-section {
  display: flex;
  align-items: center;
  margin-top: 20px;
}

.game-icon {
  width: 70px;
  height: 70px;
  border-radius: 8px;
  object-fit: cover;
}

.game-info {
  margin-left: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.game-title {
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 10px;
}

.predict-button {
  background: #2fa4ff;
  border: none;
  padding: 8px 16px;
  border-radius: 8px;
  font-size: 14px;
  color: white;
  cursor: pointer;
  font-weight: bold;
}

/* Middle Section */
.middle-section {
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 100%;
  margin: 20px 0;
}

.circle-progress {
  position: relative;
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background: conic-gradient(#00ff00 0%, #333 0%);
  display: flex;
  align-items: center;
  justify-content: center;
}

.circle-text {
  position: absolute;
  font-weight: bold;
  font-size: 16px;
}

/* Goalkeeper Area */
.goalkeeper-area {
  width: 100%;
  position: relative;
  margin-top: 20px;
}

.goalkeeper-img {
  width: 100%;
  object-fit: cover;
}
</style>
