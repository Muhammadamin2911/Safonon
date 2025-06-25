<template>
  <div class="nonvoy">
    <div class="nonvoy_top">
<h1>Nonvoylar</h1>
<button>Nonvoy qo'shish</button>
    </div>
    <div class="nonvoy_blog">
      <header>
        <b>№</b>
        <b>Ismi</b>
        <b>Raqami</b>
        <b>Maoshi</b>
        <b></b>
      </header>
    </div>
  </div>
</template>




<script>
export default {
  name: "nonvoy"
}
</script>




<style>
.nonvoy{
  width: 88%;
}
.nonvoy_blog{
  border: 1px solid rgb(200, 200, 200);
  height: 85vh;
  border-radius: 20px;
  padding: 20px;
}
.nonvoy_top{
  display: flex;
  height: 70px;
  justify-content: space-between;
  align-items: center;
  
}
.nonvoy_top h1{
    font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
}
.nonvoy_top button{
  width: 250px;
  height: 40px;
    background-color: #5565ff;
    border: none;
    border-radius: 10px;
    font-family: Verdana, Geneva, Tahoma, sans-serif;
font-size: 18px;
color: #fff;
}
.nonvoy_blog header{
  display: flex;
  justify-content: space-between;
  background-color: #ddd;
  padding: 20px;
  border-radius: 10px;

}
header b{
  width: 195px;
}
</style>