<template>
  <div class="container">
    <!-- Header -->
    <div class="header">
      <button class="menu-button">☰</button>
      <div class="coin-box">XU :</div>
      <button class="back-button">←</button>
    </div>

    <!-- Game Area -->
    <div class="game-section">
      <img src="https://example.com/soccer-striker.png" alt="Game Icon" class="game-icon" />
      <div class="game-info">
        <div class="game-title">GAME</div>
        <button class="predict-button">DỰ ĐOÁN</button>
      </div>
    </div>

    <!-- Middle Area -->
    <div class="middle-section">
      <div class="robot-box">
        <img src="https://example.com/robot.png" alt="Robot" class="robot-img" />
      </div>
      <div class="circle-progress">
        <div class="circle-text">0%</div>
      </div>
    </div>

    <!-- Goalkeeper Area -->
    <div class="goalkeeper-area">
      <img src="https://example.com/goalkeeper.png" alt="Goalkeeper" class="goalkeeper-img" />
    </div>
  </div>
</template>

<script setup>
// No logic yet, purely UI
</script>

<style scoped>
.container {
  background: url("./assets/images/background.jpg") center center/cover no-repeat #232a34;
  min-height: 100vh;
  color: white;
  font-family: sans-serif;
  display: flex;
  flex-direction: column;
  align-items: center;
}

/* Header */
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
