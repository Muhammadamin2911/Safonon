<template>
  <div class="sozlamalar">
    <h1>Sozlamalar</h1>

    <label for="password">Parolni kiriting</label>
    <input
      type="password"
      id="password"
      name="password"
      placeholder="Yangi parol"
      v-model="password"
      required
    />

    <label for="confirmPassword">Parolni qayta kiriting</label>
    <input
      type="password"
      id="confirmPassword"
      name="confirmPassword"
      placeholder="Parolni tasdiqlang"
      v-model="confirmPassword"
      required
    />

    <button @click="updatePassword">Yangilash</button>
  </div>
</template>

<script>
export default {
  name: "Sozlamalar",
  data() {
    return {
      password: "",
      confirmPassword: "",
    };
  },
  methods: {
    updatePassword() {
      if (this.password !== this.confirmPassword) {
        alert("Parollar bir xil emas!");
        return;
      }

      if (this.password.length < 6) {
        alert("Parol kamida 6 ta belgidan iborat bo‘lishi kerak.");
        return;
      }

      // bu yerda backendga POST qilish
      // masalan:
      // await api.post('/api/change-password', {password: this.password})
      alert("Parol muvaffaqiyatli yangilandi!");
    },
  },
};
</script>

<style scoped>
.sozlamalar {
  display: flex;
  flex-direction: column;
  gap: 20px;
}
h1 {
  margin-bottom: 30px;
}
label {
  color: #555;
}
input {
  width: 450px;
  height: 40px;
  border-radius: 10px;
  background-color: #fff;
  border: 1px solid gray;
  padding: 0 10px;
}
button {
  width: 450px;
  height: 35px;
  border-radius: 10px;
  border: none;
  background-color: #5f74ff;
  color: #fff;
  font-size: 18px;
  cursor: pointer;
}
</style>
