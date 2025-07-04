<template>
  <div class="dokon">
    <div class="dokon_top">
      <h1>Do'konlar</h1>
      <button @click="openCreateModal">Do'kon yaratish</button>
    </div>
    <div class="dokon_blog">
      <header>
        <b>№</b>
        <b>Nomi</b>
        <b>Raqami</b>
        <b>Manzil</b>
        <b>Qarzdorlik</b>
        <b></b>
      </header>
      <div
        v-for="(dokon, index) in dokonlar"
        :key="dokon._id"
        class="dokon_row"
      >
        <b>{{ index + 1 }}</b>
        <b>{{ dokon.title }}</b>
        <b>{{ dokon.phone }}</b>
        <b>{{ dokon.address }}</b>
        <b>{{ dokon.debt || "0 so'm" }}</b>
        <b class="btns">
          <button @click="openViewModal(dokon)">👁️</button>
          <button @click="openEditModal(dokon)">✏️</button>
          <button @click="deleteDokon(dokon._id)">🗑️</button>
        </b>
      </div>
      <div v-if="!isLoading && dokonlar.length === 0" class="empty-message">
        Hozircha do'kon topilmadi
      </div>
    </div>

   <Modal
  v-if="isModalActive"
  @close="closeModal"
  :editDokon="selectedDokon"
  @dokon-updated="fetchDokonlar"
  :class="{ opened: isModalActive, closed: !isModalActive }"
/>

  </div>
</template>

<script>
import api from "../../../Utils/axios";
import Modal from "./Modal.vue";

export default {
  name: "Dokon",
  components: { Modal },
  data() {
    return {
      dokonlar: [],
      isLoading: false,
      isModalActive: false,
      selectedDokon: null,
    };
  },
  mounted() {
    this.fetchDokonlar();
  },
  methods: {
    async fetchDokonlar() {
      this.isLoading = true;
      try {
        const res = await api.get("/api/magazines");
        this.dokonlar = res.data.magazines || [];
      } catch (err) {
        console.error("Dokonlarni olishda xato:", err);
        alert("Dokonlarni olishda xato yuz berdi");
      } finally {
        this.isLoading = false;
      }
    },
    openCreateModal() {
      this.selectedDokon = null;
      this.isModalActive = true;
    },
    openEditModal(dokon) {
      this.selectedDokon = { ...dokon, readonly: false };
      this.isModalActive = true;
    },
    openViewModal(dokon) {
      this.selectedDokon = { ...dokon, readonly: true };
      this.isModalActive = true;
    },
    closeModal() {
      this.isModalActive = false;
      this.selectedDokon = null;
    },
    async deleteDokon(id) {
      if (confirm("Haqiqatan ham o‘chirmoqchimisiz?")) {
        try {
          await api.delete(`/api/magazine/${id}`);
          alert("Do‘kon muvaffaqiyatli o‘chirildi");
          this.fetchDokonlar();
        } catch (err) {
          console.error("O‘chirishda xatolik:", err);
          alert("Do‘konni o‘chirishda xato yuz berdi");
        }
      }
    },
  },
};
</script>

<style scoped>
.dokon {
  width: 100%;
}
.opened {
  position: fixed;
  top: 15px;
  right: 20px;
  transition: right 2s ease;
}

.closed {
  position: fixed;
  top: -700px;
  right: -100%;
  transition: right 2s ease;
}
.dokon_top {
  display: flex;
  height: 70px;
  justify-content: space-between;
  align-items: center;
}
.dokon_top h1 {
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
}
.dokon_top button {
  width: 250px;
  height: 40px;
  background-color: #5565ff;
  border: none;
  border-radius: 10px;
  font-family: Verdana, Geneva, Tahoma, sans-serif;
  font-size: 18px;
  color: #fff;
}
.dokon_blog {
  border: 1px solid rgb(200, 200, 200);
  height: 85vh;
  border-radius: 20px;
  padding: 20px;
}
.dokon_blog header {
  display: flex;
  justify-content: space-between;
  gap: 10px;
  background-color: #ddd;
  padding: 20px;
  border-radius: 10px;
}
header b {
  width: 190px;
}
header :nth-child(1) {
  width: 70px;
}
.dokon_row {
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid #eee;
  padding: 10px 20px;
}
.dokon_row b {
  width: 160px;
}
.dokon_row :nth-child(1) {
  width: 30px;
}
.btns{
  justify-content: center;
}
.btns button {
  cursor: pointer;
  width:35px;
  background-color: #5565ff;
  border-radius: 5px;
  border: none;
}
.btns :nth-child(3){
  background-color: red;
}
.empty-message {
  text-align: center;
  margin-top: 20px;
  color: #888;
}
</style>
