<template>
  <div class="manager">
    <div class="manager_top">
      <h1>Boshqaruvchilar</h1>
      <button @click="openCreateModal">Manager yaratish</button>
    </div>

    <div class="manager_blog">
      <header>
        <b>№</b>
        <b>Ismi</b>
        <b>Sana</b>
        <b>Amal</b>
      </header>

      <div
        v-for="(manager, index) in managers"
        :key="manager._id"
        class="manager_row"
      >
        <b>{{ index + 1 }}</b>
        <b>{{ manager.username || "Noma'lum" }}</b>
        <b>{{ manager.createdAt?.slice(0, 10) }}</b>
        <b class="btns">
          <button>👁️</button>
          <button @click="openEditModal(manager._id)">✏️</button>
          <button @click="deleteManager(manager._id)">🗑️</button>
        </b>
      </div>

      <div v-if="!isLoading && managers.length === 0" class="empty-message">
        Hech qanday manager topilmadi
      </div>
    </div>

    <!-- Modal -->
    <Modal
      v-if="isActiveModal"
      @close="closeModal"
      :editManagerId="selectedManagerId"
      @manager-updated="fetchManagers"
      :class="{ opened: isActiveModal, closed: !isActiveModal }"
    />
  </div>
</template>

<script>
import Modal from "./Modal.vue";
import api from "../../../Utils/axios";

export default {
  name: "Manager",
  components: { Modal },
  data() {
    return {
      managers: [],
      isLoading: false,
      isActiveModal: false,
      selectedManagerId: null,
    };
  },
  methods: {
    async fetchManagers() {
      this.isLoading = true;
      try {
        const res = await api.get("/api/managers");
        this.managers = res.data.managers;
      } catch (err) {
        console.error("Xatolik:", err);
      } finally {
        this.isLoading = false;
      }
    },
    openCreateModal() {
      this.selectedManagerId = null;
      this.isActiveModal = true;
    },
    openEditModal(managerId) {
      this.selectedManagerId = managerId;
      this.isActiveModal = true;
    },
    closeModal() {
      this.isActiveModal = false;
      this.selectedManagerId = null;
    },
    async deleteManager(id) {
      const confirmed = confirm("Rostdan ham o‘chirmoqchimisiz?");
      if (!confirmed) return;
      try {
        await api.delete(`/api/manager/${id}`);
        this.fetchManagers();
      } catch (err) {
        console.error("O‘chirishda xatolik:", err);
      }
    },
  },
  mounted() {
    this.fetchManagers();
  },
};
</script>

<style>
.manager {
  width: 110%;
}
.opened {
  position: fixed;
  top: -700px;
  right: 0;
  transition: right 2s ease;
}

.closed {
  position: fixed;
  top: -700px;
  right: -100%;
  transition: right 2s ease;
}

.manager_blog {
  border: 1px solid rgb(200, 200, 200);
  height: 85vh;
  border-radius: 20px;
  padding: 20px;
}
.manager_top {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 70px;
}
.manager_top h1 {
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
}
.manager_top button {
  width: 250px;
  height: 40px;
  background-color: #5565ff;
  color: white;
  border: none;
  border-radius: 10px;
  font-size: 18px;
}
.manager_blog header {
  display: flex;
  justify-content: space-between;
  background-color: #ddd;
  padding: 20px;
  border-radius: 10px;
}
.manager_row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #ddd;
  padding: 15px 20px;
}
.manager_row b {
  width: 250px;
}
.btns {
  display: flex;
  gap: 10px;
  padding-left: 100px;
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
  padding: 20px;
  font-style: italic;
  color: #777;
}
</style>
