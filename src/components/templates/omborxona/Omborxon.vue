<template>
  <div class="omborxona">
    <div class="omborxona_top">
      <h1>Omborxona</h1>
      <button>Mahsulot yaratish</button>
    </div>
    <div class="omborxona_blog">
      <header class="ombor_header">
        <b>№</b>
        <b>Nomi</b>
        <b>Narxi</b>
        <b>Soni</b>
        <b>Jami summasi</b>
        <b>Holati</b>
        <b></b>
      </header>

        <div
        v-for="(manager, index) in managers"
        :key="manager.id"
        class="manager_row"
      >
        <b>{{ index + 1 }}</b>
        <b>{{ manager.username || manager.name || 'Noma\'lum' }}</b>
        <b>{{ formatDate(manager.createdAt) }}</b>
        <b><button @click="deleteManager(manager.id)">❌</button></b>
      </div>

      <!-- Agar hech qanday manager bo'lmasa -->
      <div v-if="!isLoading && managers.length === 0" class="empty-message">
        Hech qanday manager topilmadi
      </div>
    </div>



    </div>
  
</template>
<script>
  import api from "../../../Utils/axios";
export default {
  name: "Omborxona",


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
        const res = await api.get("/api/manager's/warehouse");
        console.log("Backend dan kelgan ma'lumotlar:", res.data);

        if(res.data){
            this.managers=res.data
        }
        
      }
      catch(err){
        console.log(err);
        
      }
    },
    formatDate(date) {
      if (!date) return "Noma'lum";
      try {
        const d = new Date(date);
        return d.toLocaleDateString("uz-UZ");
      } catch (err) {
        console.error("Sanani formatlashda xatolik:", err);
        return "Noma'lum";
      }
    },
    async deleteManager(id) {
      try {
        const confirmed = confirm("Rostdan ham ushbu managerni o'chirmoqchimisiz?");
        if (!confirmed) return;

        await api.delete(`/api/managers/${id}`);
        this.managers = this.managers.filter(m => m.id !== id);
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
 .omborxona{
  width: 100%;
}
.omborxona_blog{
  width: 100%;
  border: 1px solid rgb(200, 200, 200);
  height: 85vh;
  border-radius: 20px;
  padding: 20px;
}
.omborxona_top{
  display: flex;
  height: 70px;
  justify-content: space-between;
  align-items: center;
  
}
.omborxona_top h1{
    font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
}
.omborxona_top button{
  width: 250px;
  height: 40px;
    background-color: #5565ff;
    border: none;
    border-radius: 10px;
    font-family: Verdana, Geneva, Tahoma, sans-serif;
font-size: 18px;
color: #fff;
}
.omborxona_blog header{
  width: 100%;
  display: flex;
  justify-content: space-between;
  background-color: #ddd;
  padding: 20px;
  border-radius: 10px;

}
.ombor_header b{
  width: 155px;
}

</style>