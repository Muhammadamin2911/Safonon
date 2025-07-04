<template>
  <div class="modal">
    <h1>
      {{ editYetkazuvchi ? "Yetkazuvchi tahrirlash" : "Yetkazuvchi yaratish" }}
    </h1>

    <label>Yetkazuvchi nomi</label>
    <input
      type="text"
      v-model="formdata.username"
      placeholder="Yetkazuvchi nomini kiriting"
      :disabled="loading"
    />

    <label>Telefon raqami</label>
    <input
      type="text"
      v-model="formdata.phone"
      placeholder="Telefon raqami (+998901234567)"
      :disabled="loading"
    />


    <label>Summa (dona)</label>
    <input
      type="number"
      v-model="formdata.price"
      placeholder="Summa kiriting"
      :disabled="loading"
    />

    <button class="saqlash" @click="submitYetkazuvchi" :disabled="loading">
      {{ loading ? "Saqlanmoqda..." : editYetkazuvchi ? "Saqlash" : "Yaratish" }}
    </button>
    <button class="close_modal" @click="$emit('close')">❌</button>
  </div>
</template>

<script>
import api from "../../../Utils/axios";

export default {
  name: "Modal",
  props: {
    editYetkazuvchi: {
      type: Object,
      default: null,
    },
  },
  data() {
    return {
      formdata: {
        username: "",
        phone: "",
        password: "",
        price: "",
      },
      loading: false,
    };
  },
  watch: {
    editYetkazuvchi: {
      immediate: true,
      handler(newValue) {
        if (newValue) {
          this.formdata.username = newValue.username || "";
          this.formdata.phone = newValue.phone || "";
          this.formdata.password = "";
          this.formdata.price = newValue.price || "";
        } else {
          this.formdata.username = "";
          this.formdata.phone = "";
          this.formdata.password = "";
          this.formdata.price = "";
        }
      },
    },
  },
  methods: {
    async submitYetkazuvchi() {
      // oldindan validatsiya
      if (!this.formdata.username) {
        alert("Iltimos, yetkazuvchi nomini kiriting!");
        return;
      }

     

      

      const phoneRegex = /^\+998\d{9}$/;
      if (!phoneRegex.test(this.formdata.phone)) {
        alert("Telefon raqam formati noto‘g‘ri! (+998901234567)");
        return;
      }

      if (
        !this.formdata.price ||
        isNaN(this.formdata.price) ||
        Number(this.formdata.price) <= 0
      ) {
        alert("Iltimos, 0 dan katta summa (dona) kiriting!");
        return;
      }

      this.loading = true;

      try {
        let response;
        if (this.editYetkazuvchi) {
          console.log("Yuborilayotgan (PUT):", {
            username: this.formdata.username,
            phone: this.formdata.phone,
           
            price: Number(this.formdata.price),
          });
          response = await api.put(
            `/api/delivery/${this.editYetkazuvchi._id}`,
            {
              username: this.formdata.username,
              phone: this.formdata.phone,
             
              price: Number(this.formdata.price),
            }
          );
        } else {
          console.log("Yuborilayotgan (POST):", {
            username: this.formdata.username,
            phone: this.formdata.phone,
            price: Number(this.formdata.price),
          });
          response = await api.post("/api/delivery", {
            username: this.formdata.username,
            phone: this.formdata.phone,
            price: Number(this.formdata.price),
          });
        }

        console.log("API javobi:", response.data);
        alert("Yetkazuvchi muvaffaqiyatli saqlandi!");
        this.$emit("yetkazuvchi-updated");
        this.$emit("close");
      } catch (error) {
        console.error(
          "Xatolik:",
          error.response ? error.response.data : error.message
        );
        alert(
          this.errorMessage(
            error,
            this.editYetkazuvchi
              ? "Yetkazuvchi tahrirlashda"
              : "Yetkazuvchi yaratishda"
          )
        );
      } finally {
        this.loading = false;
      }
    },
    errorMessage(error, context) {
      const message =
        error.response && error.response.data && error.response.data.message
          ? error.response.data.message
          : error.message;
      return `${context} xatolik yuz berdi! Xato: ${message}`;
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
.saqlash{
  width: 400px;
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
