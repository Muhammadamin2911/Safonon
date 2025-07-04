<template>
  <div class="ombor">
    <div class="ombor_top">
      <h1>Omborxona</h1>
      <button @click="openCreateModal">Maxsulot qo‘shish</button>
    </div>

    <div class="ombor_blog">
      <header>
        <b style="width: 20px">№</b>
        <b>Nomi</b>
        <b>Soni</b>
        <b>Narxi</b>
        <b>Tavsif</b>
        <b>Kim qo‘shgan</b>
        <b></b>
      </header>

      <div
        v-for="(item, index) in mahsulotlar"
        :key="item._id"
        class="ombor_row"
      >
        <b>{{ index + 1 }}</b>
        <b>{{ item.nomi }}</b>
        <b>{{ item.soni }}</b>
        <b>{{ item.narxi }}</b>
        <b>{{ item.tavsif }}</b>
        <b>{{ item.kim }}</b>
        <b class="btns">
          <button @click="openViewModal(item)">👁️</button>
          <button @click="openEditModal(item)">✏️</button>
          <button @click="deleteItem(item)">❌</button>
        </b>
      </div>

      <div
        v-if="!isLoading && mahsulotlar.length === 0"
        class="empty-message"
      >
        Omborda hech qanday maxsulot yo‘q
      </div>
    </div>

    <Modal
      v-if="isActiveModal"
      @close="closeModal"
      :editItem="selectedItem"
      @item-updated="fetchMahsulotlar"
      :class="{ opened: isActiveModal }"
    />
  </div>
</template>

<script>
import Modal from "./Modal.vue";
import api from "../../../Utils/axios";

export default {
  name: "Ombor",
  components: { Modal },
  data() {
    return {
      mahsulotlar: [],
      isActiveModal: false,
      selectedItem: null,
      isLoading: false,
    };
  },
  mounted() {
    this.fetchMahsulotlar();
  },
  methods: {
    openCreateModal() {
      this.selectedItem = null;
      this.isActiveModal = true;
    },
    openEditModal(item) {
      this.selectedItem = { ...item, readonly: false };
      this.isActiveModal = true;
    },
    openViewModal(item) {
      this.selectedItem = { ...item, readonly: true };
      this.isActiveModal = true;
    },
    closeModal() {
      this.isActiveModal = false;
      this.selectedItem = null;
    },
    async fetchMahsulotlar() {
      this.isLoading = true;
      try {
        const res = await api.get("/api/manager's/warehouse");
        this.mahsulotlar = Array.isArray(res.data.mahsulotlar)
          ? res.data.mahsulotlar
          : [];
      } catch (err) {
        console.error("Ombor ma'lumotlarini olishda xato:", err);
        alert("Ma'lumotlarni olishda xato yuz berdi");
      } finally {
        this.isLoading = false;
      }
    },
    async deleteItem(item) {
      const confirmed = confirm(`${item.nomi} maxsulotini o‘chirmoqchimisiz?`);
      if (!confirmed) return;

      try {
        await api.delete(`/api/manager's/warehouse${item._id}`);
        alert("O‘chirildi");
        this.fetchMahsulotlar();
      } catch (err) {
        console.error("O‘chirish xatosi:", err);
        alert(
          `O‘chirishda xato: ${err.response?.data?.message || err.message}`
        );
      }
    },
  },
};
</script>

<style>
.ombor {
  width: 100%;
}
.ombor_top {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 70px;
}
.ombor_top h1 {
  font-family: Verdana, Geneva, Tahoma, sans-serif;
}
.ombor_top button {
  width: 250px;
  height: 40px;
  background-color: #5565ff;
  color: #fff;
  border: none;
  border-radius: 10px;
  font-size: 16px;
}
.ombor_blog {
  border: 1px solid #ddd;
  border-radius: 20px;
  padding: 20px;
  height: 85vh;
}
.ombor_blog header {
  display: flex;
  justify-content: space-between;
  background-color: #ddd;
  border-radius: 10px;
  padding: 15px;
}
.ombor_blog header b {
  width: 130px;
  text-align: left;
}
.ombor_row {
  border-bottom: 1px solid #eee;
  display: flex;
  align-items: center;
  padding: 10px 0;
}
.ombor_row b {
  width: 130px;
  display: flex;
  align-items: center;
}
b.btns button {
  margin-right: 5px;
}
.empty-message {
  text-align: center;
  padding: 20px;
  color: #777;
}
</style>
