<template>
  <div class="non">
    <div class="non_top">
      <h1>Non turlari</h1>
      <button @click="openModal">Non turini yaratish</button>
    </div>

    <div class="non_blog">
      <header class="non_header">
        <b>№</b>
        <b>Nomi</b>
        <b>Tan Narxi</b>
        <b>Narxi(Do'kon)</b>
        <b>To'yxona</b>
        <b>Qop Narxi</b>
        <b>Holati</b>
        <b>ReturnedModel</b>
      </header>
      <div v-for="(bread, index) in breads" :key="bread._id" class="bread-row">
        <b>{{ index + 1 }}</b>
        <b>{{ bread.breadName }}</b>
        <b>{{ bread.purchasePrice }}</b>
        <b>{{ bread.shopPrice }}</b>
        <b>{{ bread.weddingPrice }}</b>
        <b>{{ bread.bagPrice }}</b>
        <b>{{ bread.status }}</b>
        <b>{{ bread.ReturnedModel }}</b>
      </div>
    </div>

    <!-- Modal -->
    <div v-if="showModal" class="modal-backdrop" @click.self="closeModal">
      <div class="modal-window">
        <div class="top">
          <h2>Non turini qo‘shish</h2>
          <button @click="closeModal">❌</button>
        </div>
        <form @submit.prevent="saveBread">
          <label>Nomi:</label>
          <input v-model="form.breadName" required />

          <label>Tan narxi:</label>
          <input type="number" v-model.number="form.purchasePrice" required />

          <label>Narxi (do‘kon):</label>
          <input type="number" v-model.number="form.shopPrice" required />

          <label>To‘yxona narxi:</label>
          <input type="number" v-model.number="form.weddingPrice" required />

          <label>Qop narxi:</label>
          <input type="number" v-model.number="form.bagPrice" required />

          <label>Holati:</label>
          <select v-model="form.status" required>
            <option value="Bor">Bor</option>
            <option value="Yo‘q">Yo‘q</option>
          </select>

          <label>ReturnedModel:</label>
          <input v-model="form.ReturnedModel" required />

          <button class="saqlash" type="submit">Saqlash</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import api from "../../../Utils/axios";

export default {
  name: "NonTuri",
  data() {
    return {
      showModal: false,
      breads: [],
      form: {
        breadName: "",
        purchasePrice: 0,
        shopPrice: 0,
        weddingPrice: 0,
        bagPrice: 0,
        status: "Bor",         
        ReturnedModel: "DefaultReturned", 
      },
    };
  },
  created() {
    this.getBreads();
  },
  methods: {
    openModal() {
      this.showModal = true;
      // to'g'rilangan form
      this.form = {
        breadName: "",           // avval name deb yuborilayotgan edi, bu to'g'ri bo'ldi
        purchasePrice: 0,
        shopPrice: 0,
        weddingPrice: 0,
        bagPrice: 0,
        status: "Bor",              
        ReturnedModel: "DefaultReturned" 
      };
    },
    closeModal() {
      this.showModal = false;
    },
    async saveBread() {
      try {
        await api.post("/api/returnedPro", this.form);
        alert("Yangi non turi qo‘shildi!");
        this.closeModal();
        this.getBreads();
      } catch (err) {
        console.error("Saqlashda xato:", err);
        alert(
          `Saqlashda xato: ${err.response?.data?.message || err.message}`
        );
      }
    },
    async getBreads() {
      try {
        const res = await api.get("/api/returnedPros"); 
        this.breads = res.data;
        console.log(res.data);
      } catch (err) {
        console.error("Non turlarini olishda xato:", err);
      }
    },
  },
};
</script>


<style scoped>
.non {
  width: 100%;
}
.non_blog {
  width: 100%;
  border: 1px solid rgb(200, 200, 200);
  height: 85vh;
  border-radius: 20px;
  padding: 20px;
}
.non_top {
  display: flex;
  height: 70px;
  justify-content: space-between;
  align-items: center;
}
.non_top h1 {
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
}
.non_top button {
  width: 250px;
  height: 40px;
  background-color: #5565ff;
  border: none;
  border-radius: 10px;
  font-family: Verdana, Geneva, Tahoma, sans-serif;
  font-size: 18px;
  color: #fff;
}
.non_blog header {
  width: 100%;
  display: flex;
  justify-content: space-between;
  background-color: #ddd;
  padding: 20px;
  border-radius: 10px;
}
.non_header b {
  width: 134px;
}
.bread-row {
  display: flex;
  justify-content: space-between;
  padding: 15px 20px;
  border-bottom: 1px solid #ddd;
}
.modal-backdrop {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
}
.modal-window {
  position: absolute;
  right: 10px;
  height: 95vh;
  background: #fff;
  padding: 20px;
  border-radius: 10px;
  border: 1px solid gray;
  width: 77%;
}
.modal-window .top {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 60px;
}
.top button {
  width: 100px;
  background-color: #fff;
  border: none;
  font-size: 20px;
}
.modal-window form {
  display: flex;
  flex-direction: column;
  margin-top: 20px;
}
.modal-window form label {
  margin-top: 10px;
}
.modal-window form input,
.modal-window form select {
  margin-top: 5px;
  padding: 8px;
  border: 1px solid gray;
  border-radius: 5px;
  width: 450px;
}
.modal-window form button {
  margin-top: 20px;
  background-color: #5565ff;
  color: #fff;
  border: none;
  height: 40px;
  border-radius: 5px;
  cursor: pointer;
}
.saqlash{
  width: 450px;
}
</style>
