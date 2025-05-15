<template>
  <div class="menu-container">
    <Header />
    <div class="strategy-page">
      <!-- Header -->
      <button class="back-button" @click="goToHome">
        <i class="fas fa-arrow-left"></i>
      </button>
      <!-- Chiến thuật 1 -->
      <div class="strategy-box">
        <div class="strategy-title">Không trùng hướng liên tiếp</div>
        <div class="strategy-description">
          "Ứng dụng nguyên lý Markov Chain Breaker, chiến thuật này triệt tiêu hoàn toàn hành vi dự
          đoán đơn tầng của AI. Mỗi cú sút là một lần tái lập biến số, không cho phép bất kỳ lối mòn
          hành vi nào bị khai thác."
        </div>
        <button class="start-button" @click="startGame(1)">⚡ BẮT ĐẦU</button>
      </div>

      <!-- Chiến thuật 2 -->
      <div class="strategy-box">
        <div class="strategy-title">Không lặp trong 3–4 cú gần nhất</div>
        <div class="strategy-description">
          "Chiến thuật Multi-layer Randomization – thiết lập hàng rào biến thiên tối thiểu 3–4 lượt,
          phá vỡ toàn bộ chuỗi hồi quy mà hệ thống Deep Learning thủ môn cố gắng học theo. Mỗi lần
          sút, AI như lạc vào ma trận xác suất."
        </div>
        <button class="start-button" @click="startGame(2)">⚡ BẮT ĐẦU</button>
      </div>

      <div class="strategy-box">
        <div class="strategy-title">Fake pattern rồi đảo ngược</div>
        <div class="strategy-description">
          "Sử dụng kỹ thuật Psychological Pattern Baiting, người chơi tạo một mô hình hành vi giả,
          rồi bất ngờ đảo chiều chiến thuật. Cú đánh vào vùng nhận thức sai lệch khiến AI dính bẫy
          'học nhầm', phản xạ sai lầm."
        </div>
        <button class="start-button" @click="startGame(3)">⚡ MỞ KHÓA</button>
      </div>

      <div class="strategy-box">
        <div class="strategy-title">Random có kiểm soát</div>
        <div class="strategy-description">
          "Áp dụng Controlled Entropy Injection, người chơi chủ động phân phối xác suất theo biến ẩn
          (giờ chơi, trạng thái tâm lý). Biến động bề mặt là ngẫu nhiên, nhưng dòng chảy hành vi lại
          tuân theo một seed kín đáo, AI không đọc nổi."
        </div>
        <button class="start-button" @click="startGame(4)">⚡ MỞ KHÓA</button>
      </div>

      <div class="strategy-box">
        <div class="strategy-title">Chơi kiểu ẩn seed</div>
        <div class="strategy-description">
          "Đỉnh cao của Invisible Seed Strategy, biến số nền tảng được mã hóa hoàn toàn ngoài khả
          năng quan sát của AI (ví dụ số dư ví, số comment livestream). Hệ thống học máy không thể
          tiếp cận seed gốc, dẫn tới sai lệch nhận thức dài hạn."
        </div>
        <button class="start-button" @click="startGame(5)">⚡ MỞ KHÓA</button>
      </div>
    </div>
    <Dialog v-model:visible="modalGame" modal header="Nhập số vốn" :style="{ width: '25rem' }">
      <div class="mb-4 flex items-center gap-4" style="margin-bottom: 16px">
        <label style="margin-right: 10px" for="username" class="w-24 font-semibold">Số vốn</label>
        <InputText v-model="soVon" id="username" class="flex-auto" autocomplete="off" />
      </div>
      <div class="flex justify-end gap-2" style="text-align: center">
        <Button type="button" label="Nhập" @click="enterSoVon"></Button>
      </div>
    </Dialog>
    <Toast />
  </div>
</template>

<script setup>
import Header from "../components/Header.vue";
import { useRouter } from "vue-router";
import Drawer from "primevue/drawer";
import Dialog from "primevue/dialog";
import Button from "primevue/button";
import InputText from "primevue/inputtext";
import { useToast } from "primevue/usetoast";
import { ref } from "vue";

const router = useRouter();
const toast = useToast();
const visible = ref();
const user = JSON.parse(localStorage.getItem("user")) || {};

const handleHome = () => {
  visible.value = true;
};
const modalGame = ref();
const logOut = () => {
  localStorage.removeItem("token");
  sessionStorage.removeItem("token");
  localStorage.removeItem("user");
  router.push("/login");
};
const soVon = ref();
const type = ref();

const enterSoVon = () => {
  modalGame.value = false;
  console.log("số vốn", soVon.value);
  if (Number(soVon.value) < 200) {
    toast.add({
      severity: "error",
      summary: "Vui lòng nhập lại",
      detail: "Không khả thi cho phương pháp này. Bạn phải có từ 200 trở lên.",
      life: 3000,
    });
  } else {
    router.push("/game-strike");
    router.push({
      path: "/game-strike",
      query: {
        type: type.value,
        von: soVon.value,
      },
    });
  }
};

const startGame = (value) => {
  if (value >= 3) {
    return;
  }
  modalGame.value = true;
  type.value = value;
  soVon.value = "";
};

const goToHome = () => {
  router.push("/home");
};
</script>

<style scoped>
.menu-container {
  background: url("../assets/images/bg-mobile.jpg") center center/cover no-repeat #232a34;
  background-size: cover;
  background-position: center;
  min-height: 100vh;
  font-family: sans-serif;
  position: relative;
  overflow: hidden;
}
.strategy-page {
  min-height: 100vh;
  font-family: sans-serif;
  color: white;
  padding: 16px;
  margin-top: 130px;
}

.back-button {
  position: fixed;
  background: #333;
  color: white;
  padding: 8px 16px;
  font-size: 14px;
  top: 90px;
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

.strategy-box {
  background: rgba(0, 0, 0, 0.7);
  border-radius: 12px;
  padding: 16px;
  margin-bottom: 24px;
  box-shadow: 0 0 12px rgba(0, 255, 255, 0.3);
  position: relative;
  text-align: center;
}

.strategy-title {
  background: #e6003f;
  color: white;
  font-weight: bold;
  padding: 6px 12px;
  font-size: 14px;
  border-radius: 6px;
  display: inline-block;
  margin-bottom: 12px;
}

.strategy-description {
  background: rgba(0, 0, 0, 0.85);
  padding: 12px;
  border-radius: 8px;
  box-shadow: 0 0 10px #00f0ff;
  font-size: 13px;
  line-height: 1.4;
  margin-bottom: 12px;
}

.start-button {
  background: #00e676;
  color: black;
  border: none;
  font-weight: bold;
  padding: 10px 20px;
  font-size: 14px;
  border-radius: 30px;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 0 10px rgba(0, 230, 118, 0.5);
}

.start-button:hover {
  background: #00c853;
  transform: scale(1.05);
  box-shadow: 0 0 15px rgba(0, 230, 118, 0.8);
}

/* HEADER */
.menu-header {
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

@media (min-width: 768px) {
  .strategy-page {
    margin-top: 100px;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 24px;
    padding: 32px;
  }

  .strategy-box {
    margin-bottom: 0;
    height: 100%;
  }

  .menu-header {
    padding: 20px 40px;
    font-size: 20px;
  }

  .logo {
    font-size: 26px;
  }

  .coin {
    font-size: 18px;
  }

  .back-button {
    grid-column: 1 / -1;
    margin-bottom: 32px;
    font-size: 12px;
    padding: 8px 12px;
    border-radius: 6px;
    max-width: 50px;
  }

  .strategy-title {
    font-size: 16px;
  }

  .strategy-description {
    font-size: 14px;
  }

  .start-button {
    font-size: 15px;
    padding: 12px 24px;
  }
}
</style>
