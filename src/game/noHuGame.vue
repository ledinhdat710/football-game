<template>
  <div class="container">
    <video autoplay muted loop playsinline class="background-video">
      <source :src="nenGame" type="video/mp4" />
    </video>
    <!-- Custom Header -->
    <Header ref="headerRef" />

    <!-- Game Section -->
    <div class="game-title-section">
      <button class="back-button" @click="backToGame">
        <i class="fas fa-arrow-left"></i>
      </button>
    </div>

    <!-- Game UI Inspired by Video -->
    <div class="game-ui">
      <div class="game-header">
        <img class="game-logo" src="../assets/images/background.jpg" alt="Game Logo" />
        <div class="game-header-right">
          <h2 class="game-title">CON ĐƯỜNG MẠC<br />CHƯỢC 2</h2>
          <div class="timer-bar">
            <img :src="load" />
          </div>
          <div class="timer-box">
            <img :src="khungTime" class="timer-overlay" />
            <div class="timer-range">16:20 - 16:32</div>
          </div>
        </div>
      </div>

      <div class="info-box">
        <div class="marquee-wrapper">
          <img class="marquee-frame" :src="trickquayImg" alt="Frame" />
          <div class="marquee">
            <p>QUAY MỖI: 10 VÒNG - MIN 5K</p>
            <p>QUAY AUTO: 30 VÒNG - MIN 10</p>
          </div>
        </div>
      </div>

      <div class="robot-section">
        <img class="robot-img" :src="robot" alt="Robot" />
        <div class="percentage-box">
          <img class="circle-bg" :src="valueImg" alt="Circle Background" />
          <div class="percentage-circle">90%</div>
        </div>
      </div>
    </div>

    <Toast />
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import api from "../utils/axios";
import { useRouter, useRoute } from "vue-router";
import { useToast } from "primevue/usetoast";
import Header from "../components/Header.vue";
import robot from "../assets/video/bot.gif";
import load from "../assets/video/load.gif";
import khungTime from "../assets/images/khung-time.png";
import nenGame from "../assets/video/nen-game.mp4";
import valueImg from "../assets/images/value.png";
import trickquayImg from "../assets/images/trick-quay.png";

const router = useRouter();
const route = useRoute();
const toast = useToast();
const valueKick = ref(0);
const visible = ref();
const showText = ref(false);

const handleHome = () => {
  visible.value = true;
};

const type = ref("");
const soVon = ref();
onMounted(async () => {
  type.value = route.query.type;
  soVon.value = route.query.von;
});

const user = JSON.parse(localStorage.getItem("user")) || {};

const headerRef = ref(null);

const goToHome = () => {
  router.push("/home");
};

const backToGame = () => {
  router.push("/no-hu");
};

const getNameGame = (value) => {
  const names = {
    1: "Không trùng hướng liên tiếp",
    2: "Không lặp trong 3–4 cú gần nhất",
    3: "Fake pattern rồi đảo ngược",
    4: "Random có kiểm soát",
    5: "Chơi kiểu ẩn seed",
  };

  return names[Number(value)] || "Không xác định";
};

const logOut = () => {
  localStorage.removeItem("token");
  sessionStorage.removeItem("token");
  localStorage.removeItem("user");
  router.push("/login");
};

const kick = async () => {
  try {
    const res = await api.get(`/admins/kick/${route.query.type}`);
    if (!res) {
      toast.add({
        severity: "error",
        summary: "Lỗi",
        detail: "Lỗi hệ thống, vui lòng thử lại.",
        life: 3000,
      });
    }
    valueKick.value = res.data.value;
    if (res) {
      const user = JSON.parse(localStorage.getItem("user"));
      user.coin = res.data.new_coin;
      localStorage.removeItem("user");
      localStorage.setItem("user", JSON.stringify(user));
      headerRef.value.updateCoin();
    }
    showText.value = true;
    setTimeout(() => {
      showText.value = false;
    }, 1000);
  } catch (e) {
    toast.add({
      severity: "error",
      summary: "Lỗi",
      detail: "Lỗi hệ thống, vui lòng thử lại.",
      life: 3000,
    });
  }
};
</script>

<style scoped>
.background-video {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  z-index: -1;
}
.container {
  min-height: 100vh;
  color: white;
  font-family: sans-serif;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
}

.container::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  backdrop-filter: blur(1px);
  background-color: rgba(35, 42, 52, 0.4);
  z-index: 0;
}

.back-button {
  position: fixed;
  background: #333;
  color: white;
  padding: 8px 16px;
  font-size: 14px;
  top: 70px;
  left: 10px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  box-shadow: 0 0 8px rgba(255, 255, 255, 0.2);
  transition: background 0.3s ease;
  z-index: 3;
}

.back-button:hover {
  background: #555;
}

.game-title-section {
  text-align: center;
  width: 100%;
  padding: 10px 20px;
  margin-top: 70px;
  margin-bottom: 40px;
  z-index: 1;
}

.game-ui {
  text-align: center;
  z-index: 1;
}

.game-header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  width: 100%;
  padding: 0 20px;
  box-sizing: border-box;
  gap: 15px;
}

.game-logo {
  width: 120px;
  height: 120px;
  border: 4px solid white;
  border-radius: 50%;
  background-color: transparent;
  box-shadow: 0 0 30px 10px rgba(0, 255, 0, 0.4);
}

.game-header-right {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 10px;
  flex: 1;
  width: 100%;
}

.game-title {
  font-size: 20px;
  color: #00ff7f;
  font-weight: bold;
  text-align: right;
  margin: 0;
}

.timer-box {
  position: relative;
  padding: 12px 12px;
  box-sizing: border-box;
  width: 100%;
  display: inline-block;
}

.timer-overlay {
  position: absolute;
  top: -63px;
  transform: translateX(-50%);
  width: 100%;
  opacity: 0.6;
  z-index: 0;
  pointer-events: none;
}

.timer-bar {
  width: 100%;
  height: 10px;
  margin-bottom: 20px;
}

.timer-bar img {
  height: 30px;
  width: 100%;
  object-fit: cover;
  display: block;
}

.timer-range {
  position: relative;
  z-index: 1;
  font-size: 18px;
  color: #ffffff;
  text-align: center;
}

.info-box {
  padding: 12px;
  font-size: 16px;
  line-height: 1.6;
  margin-bottom: 10px;
}

.marquee-wrapper {
  position: relative;
  width: 100%;
  max-width: 400px;
}

.marquee-frame {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: auto;
  z-index: 0;
  pointer-events: none;
}

.marquee {
  position: relative;
  z-index: 1;
  text-align: center;
  padding-top: 110px;
  color: white;
  font-weight: bold;
  font-size: 16px;
  margin-top: -50px;
}

.robot-section {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 20px;
}

.robot-img {
  width: 150px;
  height: auto;
}

.percentage-box {
  /* background-color: #000;
  border: 2px solid #00ff90;
  padding: 10px 20px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center; */
  position: relative;
  width: 150px;
  height: 150px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.circle-bg {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: contain;
  pointer-events: none;
  z-index: 0;
}

.percentage-circle {
  /* color: #00ff90;
  font-size: 20px;
  font-weight: bold; */
  position: relative;
  z-index: 1;
  color: #00ff90;
  font-size: 20px;
  font-weight: bold;
  text-align: center;
  margin-bottom: 30px;
  margin-left: 9px;
}
</style>
