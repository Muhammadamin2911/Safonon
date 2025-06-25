<template>
  <div class="manager">
    <div class="manager_top">
      <h1>Boshqaruvchilar</h1>
      <button @click="Modal()">Manager yaratish</button>
    </div>
    <div class="manager_blog">
      <header>
        <b>№</b>
        <b>Ismi</b>
        <b>Sana</b>
        <b></b>
      </header>
    </div>
    <!-- <div class="modal"><Modal/></div> -->
  </div>
</template>




<script>
import Modal from "./Modal.vue";
export default {
  name: "Manager",
  components: {
    Modal,
  },
 
};
</script>





<style>
.manager {
  position: relative;
  width: 110%;
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
</style>