<template>
  <div class="manager">
    <div class="manager_top">
      <h1>Boshqaruvchilar</h1>
      <button @click="activeModal">Manager yaratish</button>
    </div>

    <div class="manager_blog">
      <header>
        <b>№</b>
        <b>Ismi</b>
        <b>Sana</b>
        <b>Amal</b>
      </header>

      <!-- Managerlar ro'yxati -->
      <div
        v-for="(manager, index) in managers"
        :key="manager.id"
        class="manager_row"
      >
        <b>{{ index + 1 }}</b>                      
        <b>{{ manager.username || "Noma'lum" }}</b>
        <b>{{ manager.createdAt.slice(0, 10) }}</b>
        <b><button @click="deleteManager(managers.id)">❌</button></b>
      </div>

      <!-- Agar hech qanday manager bo'lmasa -->
      <div v-if="!isLoading && managers.length === 0" class="empty-message">
        Hech qanday manager topilmadi
      </div>
    </div>

    <!-- Modal -->
    <Modal v-if="isActiveModal" @close="activeModal" />
  </div>
</template>

<script>
import Modal from "./Modal.vue";
import api from "../../../Utils/axios";

export default {
  name: "Manager",
  components: {
    Modal,
  },
  
  data() {
    return {
      isActiveModal: false,
      managers: [],
      isLoading: false,
           
    };
  },
  methods: {
    activeModal() {
      this.isActiveModal = !this.isActiveModal;
      if (!this.isActiveModal) {
        this.fetchManagers();
      }
    },
    async fetchManagers() {
      this.isLoading = true;
      try {
        const res = await api.get("/api/managers");
        console.log("Backend dan kelgan ma'lumotlar:", res.data);

        if (res.data) {
          this.managers = res.data.managers;
        }
      } catch (err) {
        console.log(err);
      }
    },
   
    async deleteManager(id) {
      try {
        const confirmed = confirm(
          "Rostdan ham ushbu managerni o'chirmoqchimisiz?"
        );
        if (!confirmed) return;

        await api.delete(`/api/managers/${id}`);
        this.managers = this.managers.filter((item) => item.id !== id);
      } catch (err) {
        console.error("O'chirishda xatolik:", err);
      }
    },
  },
  mounted() {
    console.log("Komponent yuklandi, ma'lumotlar olinmoqda...");
    this.fetchManagers();
  },
};
</script>


<style>
.manager {
  position: relative;
  width: 110%;
}
.modal {
  position: absolute;
  top: -20px;
  left: -10px;
  transform: translatex(0px);
  transition: 2s;
}
.manager_blog {
  border: 1px solid rgb(200, 200, 200);
  height: 85vh;
  border-radius: 20px;
  padding: 20px;
}
.manager_top {
  display: flex;
  height: 70px;
  justify-content: space-between;
  align-items: center;
}
.manager_row {
  display: flex;
  justify-content: space-between;
  padding: 15px 20px;
  border-bottom: 1px solid #ddd;
  align-items: center;
}
.manager_row b {
  width: 250px;
}
.manager_row button {
  background-color: transparent;
  border: none;
  font-size: 18px;
  cursor: pointer;
}

.manager_top h1 {
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
}
.manager_top button {
  width: 250px;
  height: 40px;
  background-color: #5565ff;
  border: none;
  border-radius: 10px;
  font-family: Verdana, Geneva, Tahoma, sans-serif;
  font-size: 18px;
  color: #fff;
}
.manager_blog header {
  display: flex;
  justify-content: space-between;
  background-color: #ddd;
  padding: 20px;
  border-radius: 10px;
}
header b {
  width: 250px;
}

/* Faqat zarur bo'lgan qo'shimcha stillar */
.loading-message,
.empty-message {
  text-align: center;
  padding: 20px;
  color: #666;
  font-style: italic;
}
</style>