<template>
  <div class="yetkazuvchi">
    <div class="yetkazuvchi_top">
      <h1>Yetkazuvchilar</h1>
      <button @click="openCreateModal">Yetkazuvchi qo'shish</button>
    </div>

    <div class="yetkazuvchi_blog">
      <header>
        <b style="width: 20px">№</b>
        <b>Ismi</b>
        <b>Raqami</b>
        <b>Summa(dona)</b>
        <b>Umumiy hisob</b>
        <b></b>
      </header>

      <div
        v-for="(yetkazuvchi, index) in yetkazuvchilar"
        :key="yetkazuvchi._id"
        class="seller_row"
      >
        <b class="nomber">{{ index + 1 }}</b>
        <b>{{ yetkazuvchi.username }}</b>
        <b>{{ yetkazuvchi.phone }}</b>
        <b>{{ yetkazuvchi.price }}</b>
        <b>{{ yetkazuvchi.umumiy_hisob || "0 so'm" }}</b>
        <b class="btns">
          <button @click="openViewModal(yetkazuvchi)">👁️</button>
          <button @click="openEditModal(yetkazuvchi)">✏️</button>
          <button @click="deleteYetkazuvchi(yetkazuvchi)">🗑️</button>
        </b>
      </div>

      <div
        v-if="!isLoading && yetkazuvchilar.length === 0"
        class="empty-message"
      >
        Hech qanday yetkazuvchi topilmadi
      </div>
    </div>

    <Modal
      v-if="isActiveModal"
      @close="closeModal"
      :editYetkazuvchi="selectedYetkazuvchi"
      @yetkazuvchi-updated="fetchYetkazuvchilar"
      :class="{ opened: isActiveModal }"
    />
  </div>
</template>

<script>
import Modal from "./Modal.vue";
import api from "../../../Utils/axios";

export default {
  name: "Yetkazuvchi",
  components: { Modal },
  data() {
    return {
      isActiveModal: false,
      yetkazuvchilar: [],
      isLoading: false,
      selectedYetkazuvchi: null,
    };
  },
  mounted() {
    this.fetchYetkazuvchilar();
  },
  methods: {
    openCreateModal() {
      this.selectedYetkazuvchi = null;
      this.isActiveModal = true;
    },
    openEditModal(yetkazuvchi) {
      this.selectedYetkazuvchi = { ...yetkazuvchi, readonly: false };
      this.isActiveModal = true;
    },
    openViewModal(yetkazuvchi) {
      this.selectedYetkazuvchi = { ...yetkazuvchi, readonly: true };
      this.isActiveModal = true;
    },
    closeModal() {
      this.isActiveModal = false;
      this.selectedYetkazuvchi = null;
    },
    async fetchYetkazuvchilar() {
      this.isLoading = true;
      try {
        const res = await api.get("/api/deliveries");
        this.yetkazuvchilar = Array.isArray(res.data.deliveries)
          ? res.data.deliveries
          : [];
          console.log(res.data.deliveries);
          
      } catch (err) {
        console.error("Yetkazuvchilarni olishda xato:", err);
        alert("Yetkazuvchilarni olishda xato yuz berdi");
      } finally {
        this.isLoading = false;
      }
    },
   async deleteYetkazuvchi(yetkazuvchi) {
  const confirmed = confirm(`${yetkazuvchi.username} ni o‘chirmoqchimisiz?`);
  if (!confirmed) return;

  console.log("Delete ID yuborilyapti:", yetkazuvchi._id);

  try {
    const url = `/api/delivery/${yetkazuvchi._id}`;
    console.log("DELETE URL:", url);

    const response = await api.delete(url);
    console.log("Javob:", response);

    alert("Muvaffaqiyatli o‘chirildi");
    this.fetchYetkazuvchilar();
  } catch (err) {
    console.error("O‘chirish xatosi:", err.response?.data || err.message);
    alert(
      `O‘chirishda xato: ${
        err.response?.data?.message || err.message
      }`
    );
  }
},

  },
};
</script>

<style>
.yetkazuvchi {
  width: 100%;
}
.yetkazuvchi_blog {
  border: 1px solid rgb(200, 200, 200);
  height: 85vh;
  border-radius: 20px;
  padding: 20px;
}
.yetkazuvchi_top {
  display: flex;
  height: 70px;
  justify-content: space-between;
  align-items: center;
}
.yetkazuvchi_top h1 {
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
}
.yetkazuvchi_top button {
  width: 250px;
  height: 40px;
  background-color: #5565ff;
  border: none;
  border-radius: 10px;
  font-family: Verdana, Geneva, Tahoma, sans-serif;
  font-size: 18px;
  color: #fff;
}
.yetkazuvchi_blog header {
  display: flex;
  background-color: #ddd;
  border-radius: 10px;
  padding: 20px;
  justify-content: space-between;
}
.yetkazuvchi_blog header b {
  text-align: left;
  width: 130px;
}
.seller_row {
  border-bottom: 1px solid #eee;
}
.seller_row :nth-child(1) {
  width: 30px;
}
.seller_row b {
  display: flex;
  align-items: center;
  width: 140px;
}
.seller_row b button {
  display: flex;
  text-align: left;
}
b.btns {
  cursor: pointer;
  text-align: left;
  padding: 0;
}
.btns button {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 30px;
}
.empty-message {
  text-align: center;
  padding: 20px;
  color: #888;
}
header .nomber {
  width: 30px;
}
</style>
