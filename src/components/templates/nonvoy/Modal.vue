<template>
  <div class="modal">
    <h1>{{ editNonvoy ? "Nonvoy tahrirlash" : "Nonvoy yaratish" }}</h1>

    <label>Nonvoy nomi</label>
    <input
      type="text"
      v-model="formdata.username"
      placeholder="Nonvoy nomini kiriting"
      :disabled="loading"
    />
    <label>Tandir nomi</label>
    <input
      type="text"
      v-model="formdata.ovenId"
      placeholder="Nonvoy nomini kiriting"
      :disabled="loading"
    />
    <label>Telefon raqami</label>
    <input
      type="text"
      v-model="formdata.phonenumber"
      placeholder="Telefon raqami"
      :disabled="loading"
    />
    <label>Parol</label>
    <input
      type="password"
      v-model="formdata.password"
      placeholder="Parol"
      :disabled="loading"
    />

    <button class="saqlash" @click="submitNonvoy" :disabled="loading">
      {{ loading ? "Saqlanmoqda..." : editNonvoy ? "Saqlash" : "Yaratish" }}
    </button>
    <button class="close_modal" @click="$emit('close')">❌</button>
  </div>
</template>

<script>
import api from "../../../Utils/axios";

export default {
  name: "Modal",
  props: {
    editNonvoy: {
      type: Object,
      default: null,
    },
  },
  data() {
    return {
      formdata: {
        username: "",
        phonenumber: "",
        password: "",
        ovenId:""
      },
      loading: false,
    };
  },
  watch: {
    editNonvoy: {
      immediate: true,
      handler(newValue) {
        if (newValue) {
          this.formdata.username = newValue.username || "";
          this.formdata.phonenumber = newValue.phonenumber || "";
          this.formdata.password = "";
        } else {
          this.formdata.username = "";
          this.formdata.phonenumber = "";
          this.formdata.password = "";
        }
      },
    },
  },
  methods: {
    async submitNonvoy() {
      if (!this.formdata.username) {
        alert("Iltimos, nonvoy nomini kiriting!");
        return;
      }
      if (!this.editNonvoy && !this.formdata.password) {
        alert("Iltimos, parolni kiriting!");
        return;
      }
      if (!this.formdata.phonenumber) {
        alert("Iltimos, telefon raqamini kiriting!");
        return;
      }

      this.loading = true;
      try {
        let response;
        if (this.editNonvoy) {
          response = await api.put(`/api/sellers/${this.editNonvoy._id}`, {
            username: this.formdata.username,
            phonenumber: this.formdata.phonenumber,
            ...(this.formdata.password && { password: this.formdata.password }),
            ovenId:this.formdata.ovenId
          });
        } else {
          response = await api.post("/api/seller", {
            username: this.formdata.username,
            phone: this.formdata.phonenumber,
            password: this.formdata.password,
            ovenId:this.formdata.ovenId
          });
        }
        console.log("Yuborilgan ma'lumotlar:", response.data);
        console.log(response.data);

        this.$emit("nonvoy-updated");
        this.$emit("close");
      } catch (error) {
        console.error(
          "Xato:",
          error.response ? error.response.data : error.message
        );
        alert(
          this.editNonvoy
            ? "Nonvoy tahrirlashda xatolik yuz berdi!"
            : "Nonvoy yaratishda xatolik yuz berdi! Xato: " +
                (error.response ? error.response.data.message : error.message)
        );
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
.saqlash {
  width: 400px;
}
.close_modal {
  position: absolute;
  top: 10px;
  right: 10px;
  background: none;
  border: none;
  font-size: 20px;
  cursor: pointer;
}
</style>