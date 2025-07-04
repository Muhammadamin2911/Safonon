<template>
  <div class="chiqim">
    <div class="chiqim_top">
      <h1>Chiqimlar</h1>
      <button @click="openCreateModal">Chiqim yaratish</button>
    </div>

    <div class="chiqim_blog">
      <header>
        <b style="width: 20px">№</b>
        <b>Nomi</b>
        <b>Soni</b>
        <b>Narxi</b>
        <b>Tavsif</b>
        <b>Kimdan</b>
        <b></b>
      </header>

      <div
        v-for="(chiqim, index) in chiqimlar"
        :key="chiqim._id"
        class="chiqim_row"
      >
        <b class="nomber">{{ index + 1 }}</b>
        <b>{{ chiqim.nomi }}</b>
        <b>{{ chiqim.soni }}</b>
        <b>{{ chiqim.narxi }}</b>
        <b>{{ chiqim.tavsif }}</b>
        <b>{{ chiqim.kimdan }}</b>
        <b class="btns">
          <button @click="openViewModal(chiqim)">👁️</button>
          <button @click="openEditModal(chiqim)">✏️</button>
          <button @click="deleteChiqim(chiqim)">🗑️</button>
        </b>
      </div>

      <div
        v-if="!isLoading && chiqimlar.length === 0"
        class="empty-message"
      >
        Hech qanday chiqim topilmadi
      </div>
    </div>

    <Modal
      v-if="isActiveModal"
      @close="closeModal"
      :editChiqim="selectedChiqim"
      @chiqim-updated="fetchChiqimlar"
      :class="{ opened: isActiveModal }"
    />
  </div>
</template>

<script>
import Modal from "./Modal.vue";
import api from "../../../Utils/axios";

export default {
  name: "Chiqim",
  components: { Modal },
  data() {
    return {
      chiqimlar: [],
      isActiveModal: false,
      selectedChiqim: null,
      isLoading: false,
    };
  },
  mounted() {
    this.fetchChiqimlar();
  },
  methods: {
    openCreateModal() {
      this.selectedChiqim = null;
      this.isActiveModal = true;
    },
    openEditModal(chiqim) {
      this.selectedChiqim = { ...chiqim, readonly: false };
      this.isActiveModal = true;
    },
    openViewModal(chiqim) {
      this.selectedChiqim = { ...chiqim, readonly: true };
      this.isActiveModal = true;
    },
    closeModal() {
      this.isActiveModal = false;
      this.selectedChiqim = null;
    },
    async fetchChiqimlar() {
      this.isLoading = true;
      try {
        const res = await api.get("/api/debt1s");
        this.chiqimlar = Array.isArray(res.data.chiqimlar)
          ? res.data.chiqimlar
          : [];
      } catch (err) {
        console.error("Chiqimlarni olishda xato:", err);
        alert("Chiqimlarni olishda xato yuz berdi");
      } finally {
        this.isLoading = false;
      }
    },
    async deleteChiqim(chiqim) {
      const confirmed = confirm(`${chiqim.nomi} chiqimini o‘chirmoqchimisiz?`);
      if (!confirmed) return;

      try {
        await api.delete(`/api/chiqimlar/${chiqim._id}`);
        alert("Muvaffaqiyatli o‘chirildi");
        this.fetchChiqimlar();
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
.chiqim {
  width: 100%;
}
.chiqim_blog {
  border: 1px solid rgb(200, 200, 200);
  height: 85vh;
  border-radius: 20px;
  padding: 20px;
}
.chiqim_top {
  display: flex;
  height: 70px;
  justify-content: space-between;
  align-items: center;
}
.chiqim_top h1 {
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
}
.chiqim_top button {
  width: 250px;
  height: 40px;
  background-color: #5565ff;
  border: none;
  border-radius: 10px;
  font-family: Verdana, Geneva, Tahoma, sans-serif;
  font-size: 18px;
  color: #fff;
}
.chiqim_blog header {
  display: flex;
  background-color: #ddd;
  border-radius: 10px;
  padding: 20px;
  justify-content: space-between;
}
.chiqim_blog header b {
  text-align: left;
  width: 130px;
}
.chiqim_row {
  border-bottom: 1px solid #eee;
}
.chiqim_row :nth-child(1) {
  width: 30px;
}
.chiqim_row b {
  display: flex;
  align-items: center;
  width: 140px;
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
