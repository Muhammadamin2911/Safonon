<template>
   <div class="dokon">
    <div class="dokon_top">
      <h1>Do'konlar</h1>
      <button>Do'kon yaratish</button>
    </div>
      <div class="dokon_blog">
        <header>
          <b>№</b>
          <b>Nomi</b>
          <b>Raqami</b>
          <b>Manzil</b>
          <b>Qarzdorlik</b>
          <b></b>
        </header>
      </div>
  </div>
</template>




<script>
export default {
  name: "Dokon"
}
</script>







<style>
  .dokon{

  width: 88%;
}
.dokon_blog{
  border: 1px solid rgb(200, 200, 200);
  height: 85vh;
  border-radius: 20px;
  padding: 20px;
}
.dokon_top{
  display: flex;
  height: 70px;
  justify-content: space-between;
  align-items: center;
  
}
.dokon_top h1{
    font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
}
.dokon_top button{
  width: 250px;
  height: 40px;
    background-color: #5565ff;
    border: none;
    border-radius: 10px;
    font-family: Verdana, Geneva, Tahoma, sans-serif;
font-size: 18px;
color: #fff;
}
.dokon_blog header{
  display: flex;
  justify-content: space-between;
  background-color: #ddd;
  padding: 20px;
  border-radius: 10px;

}
header b{
  width: 250px;
}
</style>