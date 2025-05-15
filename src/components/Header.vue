<template>
  <header class="menu-header">
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
      <div style="font-size: 24px; margin-bottom: 10px; cursor: pointer" @click="daoXu">Đào xu</div>
      <div style="font-size: 24px; margin-bottom: 10px; cursor: pointer">Kích xu</div>
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
      <span>{{ user.coin ? user.coin : 0 }}</span>
      <i class="fa-solid fa-coins"></i>
    </div>
    <Toast />
  </header>
</template>

<script setup>
import { useRouter } from "vue-router";
import Drawer from "primevue/drawer";
import { ref, onMounted } from "vue";
import { useToast } from "primevue/usetoast";

const user = ref();
user.value = JSON.parse(localStorage.getItem("user"));

onMounted(async () => {});

const router = useRouter();
const toast = useToast();
const visible = ref(false);
const emit = defineEmits(["goToHome"]);
const goToHome = () => {
  router.push("/home");
};
const handleHome = () => {
  visible.value = true;
};
const logOut = () => {
  localStorage.removeItem("token");
  sessionStorage.removeItem("token");
  localStorage.removeItem("user");
  router.push("/login");
};
const daoXu = () => {
  toast.add({
    severity: "error",
    summary: "",
    detail: " Tính năng đang phát triển, sẽ thông báo đến bạn khi hoàn thiện.",
    life: 3000,
  });
};
const updateCoin = () => {
  user.value = JSON.parse(localStorage.getItem("user"));
};

defineExpose({ updateCoin });
</script>

<style scoped>
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
  /* .menu-header {
    padding: 20px 40px;
    font-size: 20px;
  } */
}
</style>
