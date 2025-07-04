<template>
  <div class="modal">
    <h1>{{ editManagerId ? "Menejer tahrirlash" : "Menejer yaratish" }}</h1>

    <label>Menejer nomi</label>
    <input
      type="text"
      v-model="formdata.username"
      placeholder="Menejer nomi"
      :disabled="loading"
    />

    <label>Parol</label>
    <input
      type="password"
      v-model="formdata.password"
      placeholder="Parol"
      :disabled="loading"
    />

    <button class="saqlash" @click="submitManager" :disabled="loading">
      {{ loading ? "Saqlanmoqda..." : editManagerId ? "Saqlash" : "Yaratish" }}
    </button>

    <button class="close_modal" @click="$emit('close')">❌</button>
  </div>
</template>

<script>
import api from "../../../Utils/axios";

export default {
  name: "Modal",
  props: {
    editManagerId: {
      type: [String, null],
      default: null,
    },
  },
  data() {
    return {
      formdata: {
        username: "",
        password: "",
      },
      loading: false,
    };
  },
  watch: {
    editManagerId: {
      immediate: true,
      handler(id) {
        if (id) {
          this.fetchManager(id);
        } else {
          this.formdata.username = "";
          this.formdata.password = "";
        }
      },
    },
  },
  methods: {
    async fetchManager(id) {
      this.loading = true;
      try {
        const res = await api.get(`/api/manager/${id}`);
        this.formdata.username = res.data.manager.username || "";
        this.formdata.password = ""; // xavfsizlik uchun parol ko‘rsatilmaydi
      } catch (err) {
        console.error("Ma'lumot olishda xatolik:", err);
        alert("Manager ma'lumotini olishda xatolik yuz berdi");
        this.$emit("close");
      } finally {
        this.loading = false;
      }
    },
    async submitManager() {
      if (!this.formdata.username || (!this.formdata.password && !this.editManagerId)) {
        alert("Iltimos, menejer nomi va parolni kiriting!");
        return;
      }

      this.loading = true;

      try {
        if (this.editManagerId) {
          await api.put(`/api/manager/${this.editManagerId}`, {
            username: this.formdata.username,
            ...(this.formdata.password && { password: this.formdata.password }),
          });
          alert("Menejer muvaffaqiyatli yangilandi");
        } else {
          await api.post("/api/manager", {
            username: this.formdata.username,
            password: this.formdata.password,
          });
          alert("Menejer muvaffaqiyatli yaratildi");
        }
        this.$emit("manager-updated");
        this.$emit("close");
      } catch (err) {
        console.error("Xatolik:", err);
        alert("Saqlashda xatolik yuz berdi");
      } finally {
        this.loading = false;
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
  transition: 2s;
  flex-direction: column;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  position: relative;
}
label {
  margin-top: 20px;
  font-weight: bold;
}
input {
  border: 1px solid #ccc;
  margin-top: 10px;
  padding: 8px;
  border-radius: 4px;
  font-size: 16px;
}
.saqlash{
  width: 400px;
}
button {
  margin-top: 20px;
  padding: 10px;
  border: none;
  border-radius: 4px;
  background: #007bff;
  color: white;
  cursor: pointer;
  font-size: 16px;
}
button:disabled {
  background: #ccc;
  cursor: not-allowed;
}
.close_modal {
  position: absolute;
  top: 10px;
  transition: 2s;
  background: none;
  right: 50px;
  border: none;
  font-size: 20px;
  cursor: pointer;
}
</style>
