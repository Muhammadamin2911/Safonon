<template>
  <div class="non">
    <div class="non_top">
      <h1>Non turlari</h1>
      <button>Non turini yaratish</button>
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
        <b></b>
      </header>
    </div>
  </div>
</template>




<script>
export default {
  name: "NonTuri"
}
</script>




<style>
  .non{
  width: 100%;
}
.non_blog{
  width: 100%;
  border: 1px solid rgb(200, 200, 200);
  height: 85vh;
  border-radius: 20px;
  padding: 20px;
}
.non_top{
  display: flex;
  height: 70px;
  justify-content: space-between;
  align-items: center;
  
}
.non_top h1{
    font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
}
.non_top button{
  width: 250px;
  height: 40px;
    background-color: #5565ff;
    border: none;
    border-radius: 10px;
    font-family: Verdana, Geneva, Tahoma, sans-serif;
font-size: 18px;
color: #fff;
}
.non_blog header{
  width: 100%;
  display: flex;
  justify-content: space-between;
  background-color: #ddd;
  padding: 20px;
  border-radius: 10px;

}
.non_header b{
  width: 134px;
}
</style>