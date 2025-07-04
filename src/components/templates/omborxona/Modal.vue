<template>
  <div class="modal-backdrop" @click.self="close">
    <div class="modal-window">
      <div class="top">
        <h2 v-if="readonly">Mahsulotni ko‘rish</h2>
        <h2 v-else-if="editItem">Mahsulotni tahrirlash</h2>
        <h2 v-else>Mahsulot qo‘shish</h2>
        <button type="button" @click="$emit('close')">❌</button>
      </div>
      <form @submit.prevent="save">
        <label>Mahsulot nomi:</label>
        <input v-model="form.nomi" :readonly="readonly" required />

        <label>Narxi (dona):</label>
        <input type="number" v-model.number="form.narxi" :readonly="readonly" required />

        <label>Mahsulot holati:</label>
        <select v-model="form.holat" :disabled="readonly">
          <option value="Bor">Bor</option>
          <option value="Yo‘q">Yo‘q</option>
        </select>

        <label>Soni:</label>
        <input type="number" v-model.number="form.soni" :readonly="readonly" required />

        <label>Umumiy narxi:</label>
        <input
          type="number"
          :value="form.soni * form.narxi"
          readonly
        />

        <div class="modal-buttons">
          <button v-if="!readonly" type="submit">Saqlash</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import api from "../../../Utils/axios";

export default {
  name: "Modal",
  props: {
    editItem: { type: Object, default: null },
  },
  data() {
    return {
      form: {
        nomi: "",
        narxi: 0,
        holat: "Bor",
        soni: 0,
      },
      readonly: false,
    };
  },
  watch: {
    editItem: {
      immediate: true,
      handler(newVal) {
        if (newVal) {
          this.form = {
            nomi: newVal.nomi || "",
            narxi: newVal.narxi || 0,
            holat: newVal.holat || "Bor",
            soni: newVal.soni || 0,
          };
          this.readonly = newVal.readonly || false;
        } else {
          this.form = {
            nomi: "",
            narxi: 0,
            holat: "Bor",
            soni: 0,
          };
          this.readonly = false;
        }
      },
    },
  },
  methods: {
    close() {
      this.$emit("close");
    },
    async save() {
      try {
        const sellerId = localStorage.getItem("sellerId");
        if (!sellerId) {
          alert("sellerId topilmadi, iltimos tizimga qayta kiring.");
          return;
        }

        const dataToSend = {
          ...this.form,
          sellerId: sellerId
        };

        if (this.editItem && !this.editItem.readonly) {
          // update
          await api.put(`/api/manager's/warehouse/${this.editItem._id}`, dataToSend);
          alert("Muvaffaqiyatli yangilandi");
        } else {
          // create
          await api.post("/api/manager's/warehouse", dataToSend);
          alert("Yangi mahsulot qo‘shildi");
        }
        this.$emit("item-updated");
        this.close();
      } catch (err) {
        console.error("Saqlash xatosi:", err);
        alert(`Saqlashda xato: ${err.response?.data?.message || err.message}`);
      }
    },
  },
};
</script>

<style scoped>
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
  background: #fff;
  padding: 20px;
  border: 1px solid gray;
  border-radius: 12px;
  width: 77%;
  height: 95vh;
  overflow-y: auto;
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
}
.top {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 80px;
}
.top button {
  background: transparent;
  border: none;
  font-size: 24px;
  color: crimson;
  cursor: pointer;
}
.modal-window form {
  display: flex;
  flex-direction: column;
}
.modal-window form label {
  margin-top: 15px;
  font-weight: bold;
}
.modal-window form input,
.modal-window form select {
  width: 500px;
  margin-top: 5px;
  height: 35px;
  border-radius: 8px;
  border: 1px solid #ccc;
  padding: 5px;
  font-size: 15px;
}
.modal-buttons {
  display: flex;
  justify-content: flex-start;
  margin-top: 20px;
}
.modal-buttons button {
  width: 500px;
  padding: 10px;
  background-color: #5565ff;
  color: #fff;
  border: none;
  border-radius: 8px;
}
.modal-buttons button:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}
</style>
