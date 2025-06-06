<template>
  <div class="menu-container">
    <Header />

    <div class="video-wrapper">
      <!-- Nền video -->
      <video autoplay muted loop playsinline class="bg-video">
        <source :src="no_hu" type="video/mp4" />
        Trình duyệt không hỗ trợ video.
      </video>

      <!-- Lớp đè giao diện -->
      <div class="overlay">
        <button class="back-button" @click="goToHome">
          <i class="fas fa-arrow-left"></i>
        </button>
        <div class="game-lobby">
          <!-- Tiêu đề -->
          <div class="title-box">
            <span class="title-text">SẢNH GAME</span>
          </div>

          <!-- Lưới logo -->
          <div class="logo-grid">
            <div
              v-for="(item, index) in gameLogos"
              :key="index"
              class="logo-circle"
              @click="startGame(item.name)"
            >
              <img :src="item.logo" :alt="item.name" />
            </div>
          </div>
        </div>
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
import no_hu from "../assets/video/no-hu.mp4";
import { useRouter } from "vue-router";
import Drawer from "primevue/drawer";
import Dialog from "primevue/dialog";
import Button from "primevue/button";
import InputText from "primevue/inputtext";
import { useToast } from "primevue/usetoast";
import { ref } from "vue";
import motsautamImg from "../assets/images/168game/0. Logo sảnh 168G.PNG";
import PGImg from "../assets/images/PG/0. Logo Sảnh PG .JPG";
import JLImg from "../assets/images/Jili/0. Logo Sảnh Jili .JPG";
import fcImg from "../assets/images/fc/0. Logo Sảnh FC .JPG";
import topPlayerImg from "../assets/images/top-player/0. Logo Sảnh TopPlayer.JPG";
import cq9Img from "../assets/images/cq9/0. Logo sảng CQ9.JPG";

const router = useRouter();
const toast = useToast();
const visible = ref();
const user = JSON.parse(localStorage.getItem("user")) || {};

const gameLogos = [
  { name: "PG", logo: PGImg },
  { name: "168Game", logo: motsautamImg },
  { name: "JL", logo: JLImg },
  { name: "FC", logo: fcImg },
  { name: "TopPlayer", logo: topPlayerImg },
  { name: "CQ9", logo: cq9Img },
  { name: "FC", logo: fcImg },
  { name: "TopPlayer", logo: topPlayerImg },
  { name: "CQ9", logo: cq9Img },
];

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
  if (Number(soVon.value) < 200) {
    toast.add({
      severity: "error",
      summary: "Vui lòng nhập lại",
      detail: "Không khả thi cho phương pháp này. Bạn phải có từ 200 trở lên.",
      life: 3000,
    });
  } else {
    router.push("/no-hu-game");
  }
};

const startGame = (value) => {
  if (value === "PG") {
    router.push("/no-hu-pg");
  }
};

const goToHome = () => {
  router.push("/home");
};
</script>

<style scoped>
.menu-container {
  background-size: cover;
  background-position: center;
  min-height: 100vh;
  font-family: sans-serif;
  position: relative;
  overflow: hidden;
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

.video-wrapper {
  position: relative;
  width: 100%;
  min-height: 100vh;
}

.bg-video {
  position: absolute;
  top: 0;
  left: 0;
  min-width: 100%;
  min-height: 100%;
  object-fit: cover;
  z-index: 0;
}

.overlay {
  position: relative;
  z-index: 1;
  color: white;
  padding-top: 60px;
  padding-left: 16px;
  font-family: sans-serif;
}

.game-lobby {
  max-width: 500px;
  margin: auto;
  padding: 20px 0;
  background-image: url("/bg-lobby.jpg"); /* nếu có nền */
  background-size: cover;
  background-position: center;
  min-height: 100vh;
  margin-top: 60px;
}

/* Tiêu đề */
.title-box {
  width: fit-content;
  margin: 0 auto 30px;
  padding: 6px 20px;
  background: linear-gradient(to right, #222, #444);
  border-radius: 6px;
  border: 1px solid #00ff99;
}

.title-text {
  color: white;
  font-size: 1.5rem;
  font-family: monospace;
}

/* Grid logo */
.logo-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 25px;
  justify-items: center;
  padding: 0 16px;
}

.logo-circle {
  background: white;
  border-radius: 50%;
  width: 100px;
  height: 100px;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  box-shadow: 0 0 5px rgba(0, 255, 128, 0.4);
  cursor: pointer;
}

.logo-circle img {
  width: 90%;
  object-fit: contain;
}

@media (min-width: 768px) {
  .back-button {
    grid-column: 1 / -1;
    margin-bottom: 32px;
    font-size: 12px;
    padding: 8px 12px;
    border-radius: 6px;
    max-width: 50px;
  }
}
</style>
