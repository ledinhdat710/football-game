<template>
  <div class="container">
    <!-- Header -->
    <Header @goToHome="goToHome" />

    <!-- Game Area -->
    <div class="game-section">
      <img :src="soccerStrikeImg" alt="Game Icon" class="game-icon" />
      <div class="game-info">
        <div class="game-title">GAME</div>
        <button @click="kick" class="predict-button">DỰ ĐOÁN</button>
      </div>
    </div>

    <!-- Middle Area -->
    <div class="middle-section">
      <!-- <div class="robot-box">
        <img src="https://example.com/robot.png" alt="Robot" class="robot-img" />
      </div> -->
      <div class="circle-progress">
        <div class="circle-text">30%</div>
      </div>
    </div>

    <!-- Goalkeeper Area -->
    <div class="goalkeeper-area">
      <img v-if="valueKick === 0" :src="goalKeeper" alt="Goalkeeper" class="goalkeeper-img" />
      <img v-if="valueKick === 1" :src="left_kick" alt="Goalkeeper" class="goalkeeper-img" />
      <img v-if="valueKick === 2" :src="center_kick" alt="Goalkeeper" class="goalkeeper-img" />
      <img v-if="valueKick === 3" :src="right_kick" alt="Goalkeeper" class="goalkeeper-img" />
    </div>
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
import Header from "../components/Header.vue";

const router = useRouter();

// No logic yet, purely UI
const goToHome = () => {
  router.push("/home");
};

const valueKick = ref(0);

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

.robot-box {
  border: 2px solid yellow;
  padding: 5px;
  border-radius: 8px;
}

.robot-img {
  width: 80px;
  height: auto;
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
