<template>
  <div class="nonvoy">
    <div class="nonvoy_top">
      <h1>Nonvoylar</h1>
      <button @click="openCreateModal">Nonvoy qo'shish</button>
    </div>
    <div class="nonvoy_blog">
      <header>
        <b>№</b>
        <b>Ismi</b>
        <b>Raqami</b>
        <b>Maoshi</b>
        <b></b>
      </header>

      <div
        v-for="(nonvoy, index) in sellers"
        :key="nonvoy._id"
        class="seller_row"
      >
        <b>{{ index + 1 }}</b>
        <b>{{ nonvoy.username || "Noma'lum" }}</b>
        <b>{{ nonvoy.phone || "N/A" }}</b>
        <b>{{ nonvoy.salary || "N/A" }}</b>
        <b class="btns">
          <button>👁️</button>
          <button @click="openEditModal(nonvoy._id)">✏️</button>
          <button @click="deleteNonvoy(nonvoy._id)">🗑️</button>
        </b>
      </div>

      <div v-if="!isLoading && sellers.length === 0" class="empty-message">
        Hech qanday nonvoy topilmadi
      </div>
    </div>
    <Modal
      v-if="isActiveModal"
      @close="closeModal"
      :editNonvoy="selectedNonvoy"
      @nonvoy-updated="fetchSellers"
      :class="{ opened: isActiveModal, closed: !isActiveModal }"
    />
  </div>
</template>

<script>
import Modal from "./Modal.vue";
import api from "../../../Utils/axios";

export default {
  name: "Nonvoy",
  components: {
    Modal,
  },
  data() {
    return {
      isActiveModal: false,
      sellers: [],
      isLoading: false,
      selectedNonvoy: null,
    };
  },
  mounted() {
    this.fetchSellers();
  },
  methods: {
    openCreateModal() {
      this.selectedNonvoy = null;
      this.isActiveModal = true;
    },
    openEditModal(_Id) {
      const nonvoy = this.sellers.find((item) => item._id === _Id);
      this.selectedNonvoy = { ...nonvoy };
      this.isActiveModal = true;
    },
    closeModal() {
      this.isActiveModal = false;
      this.selectedNonvoy = null;
    },
    async fetchSellers() {
      this.isLoading = true;
      try {
        const res = await api.get("/api/sellers");
        this.sellers = res.data.sellers || [];
        console.log("Nonvoylar:", res.data);
      } catch (err) {
        console.error("Nonvoylarni olishda xato:", err);
      } finally {
        this.isLoading = false;
      }
    },
    async deleteNonvoy(_Id) {
      if (confirm("Bu nonvoyni o'chirishni xohlaysizmi?")) {
        try {
          await api.delete(`/api/sellers/${_Id}`);
          this.fetchSellers();
        } catch (err) {
          console.error("Nonvoyni o'chirishda xato:", err);
        }
      }
    },
  },
};
</script>

<style>
.nonvoy {
  width: 98%;
}
.nonvoy_blog {
  border: 1px solid rgb(200, 200, 200);
  height: 85vh;
  border-radius: 20px;
  padding: 20px;
}
.nonvoy_top {
  display: flex;
  height: 70px;
  align-items: center;
  justify-content: space-between;
}
.nonvoy_top h1 {
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
}
.nonvoy_top button {
  width: 250px;
  height: 40px;
  background-color: #5565ff;
  border: none;
  border-radius: 10px;
  font-family: Verdana, Geneva, Tahoma, sans-serif;
  font-size: 18px;
  color: #fff;
}
.nonvoy_blog header {
  display: flex;
  justify-content: space-between;
  background-color: #ddd;
  padding: 20px;
  border-radius: 10px;
}
header b {
  width: 195px;
}
.seller_row {
  display: flex;
  justify-content: space-between;
  padding: 10px 20px;
  border-bottom: 1px solid #eee;
}
.btns button {
  margin: 0 5px;
  cursor: pointer;
  width: 30px;
  height: 30px;
}
.empty-message {
  text-align: center;
  padding: 20px;
  color: #888;
}
</style>