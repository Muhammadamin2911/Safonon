<template>
  <div class="modal">
    <div class="modal_content">
      <div class="modal_header">
        <h2>Chiqim yaratish</h2>
        <button @click="$emit('close')" class="close_btn">✖</button>
      </div>

      <form @submit.prevent="saveChiqim">
        <div class="form_row">
          <label>Omborxona mahsuloti</label>
          <select v-model="formData.productId" required>
            <option disabled value="">Mahsulot tanlang</option>
            <option
              v-for="item in products"
              :key="item._id"
              :value="item._id"
            >
              {{ item.name }}
            </option>
          </select>
        </div>
        <div class="form_row">
          <label>Narxi</label>
          <input type="number" v-model.number="formData.price" required />
        </div>
        <div class="form_row">
          <label>Nonvoy</label>
          <select v-model="formData.bakerId" required>
            <option disabled value="">Nonvoy tanlang</option>
            <option
              v-for="baker in bakers"
              :key="baker._id"
              :value="baker._id"
            >
              {{ baker.name }}
            </option>
          </select>
        </div>
        <div class="form_row">
          <label>Soni (dona)</label>
          <input type="number" v-model.number="formData.count" required />
        </div>
        <div class="form_row">
          <label>Tavsif</label>
          <input
            type="text"
            v-model="formData.description"
            placeholder="Tavsif kiriting"
          />
        </div>
        <div class="modal_footer">
          <button  type="submit">Saqlash</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import api from "../../../Utils/axios";
export default {
  name: "ChiqimModal",
  data() {
    return {
      formData: {
        productId: "",
        bakerId: "",
        price: 0,
        count: 0,
        description: "",
      },
      products: [],
      bakers: [],
    };
  },
  mounted() {
    this.getProducts();
    this.getBakers();
  },
  methods: {
    async getProducts() {
      try {
        const res = await api.get("/api/debt1s");
        this.products = res.data.products;
      } catch (err) {
        console.error(err);
      }
    },
    async getBakers() {
      try {
        const res = await api.get("/api/debt1s");
        this.bakers = res.data.bakers;
      } catch (err) {
        console.error(err);
      }
    },
    async saveChiqim() {
      try {
        await api.post("/api/debt2", this.formData);
        this.$emit("chiqim-updated");
        this.$emit("close");
      } catch (err) {
        console.error(err);
      }
    },
  },
};
</script>

<style scoped>
.modal {
  width: 100%;
  height: 97vh;
  border-radius: 10px;
  border: 1px solid #ccc;
  background: #fff;
  padding: 20px;
  display: flex;
  flex-direction: column;
  transition: 2s;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  position: relative;
  overflow-y: auto;
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
}
.close_btn{
width: 40px;
background-color: transparent;
color: red;
width: 30px;
}
.modal_header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #ddd;
  padding-bottom: 10px;
}
.modal_header h2 {
  margin: 0;
  font-size: 22px;
}
.close_modal {
  position: absolute;
  top: 10px;
  right: -50px;
  background: none;
  border: none;
  font-size: 24px;
  color: crimson;
  cursor: pointer;
}
label {
  margin-top: 20px;
  font-weight: bold;
}
input[type="text"],
input[type="number"],
select {
  width: 500px;
  border: 1px solid #ccc;
  margin-top: 10px;
  padding: 8px;
  border-radius: 4px;
  font-size: 16px;
}
button[type="submit"],
button[type="button"] { 
  margin-top: 20px;
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  color: white;
  cursor: pointer;
  font-size: 16px;
}
button[type="button"] {
  background: #6c757d;
}
button:disabled {
  background: #ccc;
  cursor: not-allowed;
}
.modal_footer {
  margin-top: 30px;
  display: flex;
  gap: 10px;
}
.form_row{
  display: flex;
  flex-direction: column;
}
.modal_footer button{
  width: 500px;
  background-color: #5565ff;
}
</style>
