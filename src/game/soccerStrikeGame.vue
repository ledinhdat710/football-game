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
        <div style="font-size: 24px; margin-bottom: 10px; cursor: pointer">Về 68Gaming</div>
        <div style="font-size: 24px; margin-bottom: 10px; cursor: pointer">Kiến thức Casino</div>
        <div style="font-size: 24px; margin-bottom: 10px; cursor: pointer">Kho tài liệu</div>
        <div style="font-size: 24px; margin-bottom: 10px; cursor: pointer">Vòng quay may mắn</div>
        <div style="font-size: 24px; margin-bottom: 10px; cursor: pointer">Đào xu</div>
        <div style="font-size: 24px; margin-bottom: 10px; cursor: pointer">Liên hệ Admin</div>
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
        <div @click="logOut" style="font-size: 24px; cursor: pointer">
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
      <button class="back-button" @click="backToGame">
        <i class="fas fa-arrow-left"></i>
      </button>
      <h2 class="title">
        {{ getNameGame(type) }}
      </h2>
      <div class="title-bar"></div>

      <div v-if="Number(soVon) >= 200 && Number(soVon) < 500" class="info-box">
        <div class="info-text">
          <div class="fade-line" style="--i: 0">Vốn tối thiểu: 200</div>
          <div class="fade-line" style="--i: 0">Cấp độ: Amateur</div>
          <div class="fade-line" style="--i: 0">Sút mồi (10 lượt/5k) - Chốt lãi level 8</div>
          <div class="fade-line" style="--i: 0">
            Sút khai thác (3 lượt/50k) - Chốt lãi khuyến khích (Bậc 5)
          </div>
        </div>
      </div>
      <div v-else-if="Number(soVon) >= 500 && Number(soVon) < 1000" class="info-box">
        <div class="info-text">
          <div class="fade-line" style="--i: 0">Vốn tối thiểu: 500</div>
          <div class="fade-line" style="--i: 0">Cấp độ: Amateur</div>
          <div class="fade-line" style="--i: 0">Sút mồi (10 lượt/10k) - Chốt lãi level 8</div>
          <div class="fade-line" style="--i: 0">
            Sút khai thác (4 lượt/100k) - Chốt lãi khuyến khích (Bậc 5)
          </div>
        </div>
      </div>
      <div v-else-if="Number(soVon) >= 1000" class="info-box">
        <div class="info-text">
          <div class="fade-line" style="--i: 0">Vốn tối thiểu: 1000</div>
          <div class="fade-line" style="--i: 0">Cấp độ: Amateur</div>
          <div class="fade-line" style="--i: 0">Sút mồi (10 lượt/20k) - Chốt lãi level 8</div>
          <div class="fade-line" style="--i: 0">
            Sút khai thác (4 200k)- Chốt lãi khuyến khích (Bậc 5)
          </div>
        </div>
      </div>
    </div>

    <!-- Goalkeeper Area -->
    <div class="goalkeeper-area">
      <img v-show="valueKick === 0" :src="goalKeeper" alt="Goalkeeper" class="goalkeeper-img" />
      <img v-show="valueKick === 1" :src="left_kick" alt="Goalkeeper" class="goalkeeper-img" />
      <img v-show="valueKick === 2" :src="center_kick" alt="Goalkeeper" class="goalkeeper-img" />
      <img v-show="valueKick === 3" :src="right_kick" alt="Goalkeeper" class="goalkeeper-img" />
    </div>

    <button @click="kick" class="shoot-button">SÚT</button>
    <Toast />
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import api from "../utils/axios";
import goalKeeper from "../assets/images/goalkeeper.jpg";
import left_kick from "../assets/images/left_kick.jpg";
import right_kick from "../assets/images/right_kick.jpg";
import center_kick from "../assets/images/center_kick.jpg";
import soccerStrikeImg from "../assets/images/soccer-strike.jpg";
import center from "../assets/images/center.png";
import { useRouter, useRoute } from "vue-router";
import Drawer from "primevue/drawer";
import { useToast } from "primevue/usetoast";

const router = useRouter();
const route = useRoute();
const toast = useToast();
const valueKick = ref(0);

const visible = ref();

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

const goToHome = () => {
  router.push("/home");
};

const backToGame = () => {
  router.push("/soccer-strike");
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
}

.title {
  font-size: 16px;
  font-weight: bold;
  color: white;
  margin-bottom: 5px;
  text-shadow:
    0 0 5px #fff,
    0 0 10px #ffd700,
    0 0 20px #ffd700; /* nhiều lớp bóng tạo glow */
  transition: transform 0.3s;
}

.title-bar {
  width: 100px;
  height: 4px;
  background: linear-gradient(to right, #00ffff, #00aaff, #00ffff);
  border-radius: 4px;
  margin: 0 auto 50px;
}

.info-box {
  background: rgba(0, 0, 0, 0.5);
  border-radius: 12px;
  padding: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.info-text {
  font-size: 14px;
  color: white;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.fade-line {
  opacity: 0;
  transform: translateY(10px);
  animation: fadeInUp 0.5s forwards;
  animation-delay: calc(var(--i) * 0.3s);
}

@keyframes fadeInUp {
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.icon {
  font-size: 20px;
  color: #00ffff;
}

.shoot-button {
  margin-top: auto;
  margin-bottom: 100px;
  align-self: center;
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
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  background-color: #232a34;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px 10px;
  color: white;
  font-weight: bold;
  z-index: 10; /* đảm bảo luôn nằm trên */
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
  border-radius: 12px;
  border: 4px solid #00aaff;
  box-shadow:
    0 0 20px #00aaff,
    0 0 40px #00aaff88;
  transition:
    transform 0.3s ease,
    box-shadow 0.3s ease;
}

@media (max-width: 380px) {
  .shoot-button {
    width: 80px;
    height: 80px;
    margin-bottom: 30px;
  }
}

@media (min-width: 768px) {
  .container {
    margin: 0 auto;
    border-radius: 12px;
    box-shadow: 0 0 10px rgba(0, 170, 255, 0.3);
  }

  .back-button {
    top: 90px;
  }

  .menu-icon {
    font-size: 24px;
  }

  .logo {
    font-size: 24px;
  }

  .coin {
    font-size: 18px;
  }

  .game-title-section {
    max-width: 400px;
  }

  .title {
    font-size: 24px;
  }

  .info-text {
    font-size: 16px;
  }

  .goalkeeper-area {
    display: flex;
    justify-content: center;
    width: 100%;
    margin-top: 5px; /* chỉnh để nút thấp hoặc cao hơn */
    max-width: 400px;
  }

  .shoot-button {
    width: 80px;
    height: 80px;
    margin-bottom: 30px;
  }

  .goalkeeper-img {
    border-radius: 8px;
  }

  .info-box {
    background: rgba(0, 0, 0, 0.5);
    border-radius: 12px;
    padding: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
  }

  .info-text {
    font-size: 14px;
    color: white;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .fade-line {
    opacity: 0;
    transform: translateY(10px);
    animation: fadeInUp 0.5s forwards;
    animation-delay: calc(var(--i) * 0.3s);
  }

  @keyframes fadeInUp {
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
}
</style>
