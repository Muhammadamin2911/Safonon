<template>
  <div class="modal">
    <h1>
      {{
        editDokon && !editDokon.readonly
          ? "Do‘konni tahrirlash"
          : editDokon
          ? "Do‘kon ma‘lumotlari"
          : "Yangi do‘kon yaratish"
      }}
    </h1>

    <label>Nomi</label>
    <input
      type="text"
      v-model="formdata.title"
      placeholder="Nomi"
      :disabled="editDokon?.readonly || loading"
    />

    <label>Raqami</label>
    <input
      type="text"
      v-model="formdata.phone"
      placeholder="Telefon raqami"
      :disabled="editDokon?.readonly || loading"
    />

    <label>Manzil</label>
    <input
      type="text"
      v-model="formdata.address"
      placeholder="Manzil"
      :disabled="editDokon?.readonly || loading"
    />

    <label>Qarzdorlik</label>
    <input
      type="number"
      v-model="formdata.debt"
      placeholder="Qarzdorlik"
      :disabled="editDokon?.readonly || loading"
    />

    <label>
      Holati (pending)
      <input
        type="checkbox"
        v-model="formdata.pending"
        :disabled="editDokon?.readonly || loading"
      />
      <span v-if="editDokon?.readonly">
        {{ formdata.pending ? "Kutilmoqda" : "Yopilgan" }}
      </span>
    </label>

    <button
    class="saqlash"
      v-if="!editDokon?.readonly"
      @click="submitDokon"
      :disabled="loading"
    >
      {{ loading ? "Saqlanmoqda..." : editDokon ? "Saqlash" : "Yaratish" }}
    </button>

    <button class="close_modal" @click="$emit('close')">❌</button>
  </div>
</template>

<script>
import api from "../../../Utils/axios";

export default {
  name: "Modal",
  props: {
    editDokon: {
      type: [Object, null],
      default: null,
    },
  },
  data() {
    return {
      formdata: {
        title: "",
        phone: "",
        address: "",
        debt: 0,
        pending: false, // boolean ishlatamiz
      },
      loading: false,
    };
  },
  watch: {
    editDokon: {
      immediate: true,
      handler(dokon) {
        if (dokon) {
          this.formdata.title = dokon.title || "";
          this.formdata.phone = dokon.phone || "";
          this.formdata.address = dokon.address || "";
          this.formdata.debt = dokon.debt || 0;
          // agar backend 0/1 jo‘natsa, uni boolean ga aylantiramiz
          this.formdata.pending = dokon.pending === 1 ? true : false;
        } else {
          this.formdata.title = "";
          this.formdata.phone = "";
          this.formdata.address = "";
          this.formdata.debt = 0;
          this.formdata.pending = false;
        }
      },
    },
  },
  methods: {
    async submitDokon() {
  if (
    !this.formdata.title ||
    !this.formdata.phone ||
    !this.formdata.address
  ) {
    alert("Iltimos, barcha maydonlarni to‘ldiring");
    return;
  }

  this.loading = true;

  try {
    const payload = {
      title: this.formdata.title,
      phone: this.formdata.phone,
      address: this.formdata.address,
      pending: this.formdata.pending ? 1 : 0,
      // debt backend qabul qilmasa, yubormaymiz
    };

    if (this.editDokon && !this.editDokon.readonly) {
      await api.put(`/api/magazine/${this.editDokon._id}`, payload);
      alert("Do‘kon muvaffaqiyatli yangilandi");
    } else {
      await api.post("/api/magazine", payload);
      alert("Do‘kon muvaffaqiyatli yaratildi");
    }
    this.$emit("dokon-updated");
    this.$emit("close");
  } catch (err) {
  console.error("Xatolik:", err);

  let message = "Noma’lum xatolik yuz berdi";

  if (err.response) {
    message = err.response.data?.message || `Server xatosi (${err.response.status})`;
  } else if (err.request) {
    message = "Server bilan aloqa o‘rnatilmadi";
  } else {
    message = err.message;
  }

  alert("Saqlashda xatolik yuz berdi: " + message);
}
 finally {
    this.loading = false;
  }
},

  },
};
</script>

<style scoped>
.modal {
  width: 76%;
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
}
label {
  margin-top: 20px;
  font-weight: bold;
}
input[type="text"],
input[type="number"] {
  border: 1px solid #ccc;
  margin-top: 10px;
  padding: 8px;
  border-radius: 4px;
  font-size: 16px;
}
input[type="checkbox"] {
  margin-left: 10px;
  transform: scale(1.5);
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
.saqlash{
  width: 400px;
}
button:disabled {
  background: #ccc;
  cursor: not-allowed;
}
.close_modal {
  position: absolute;
  top: 10px;
  right: 50px;
  background: none;
  border: none;
  font-size: 20px;
  cursor: pointer;
}
</style>
