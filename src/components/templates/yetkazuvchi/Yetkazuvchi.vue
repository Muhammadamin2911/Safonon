<template>
  <div class="yetkazuvchi">
    <div class="yetkazuvchi_top">
      <h1>Yetkazuvchilar</h1>
      <button>Yetkazuvchi</button>
    </div>
      <div class="yetkazuvchi_blog">
        <header>
          <b>№</b>
          <b>Ismi</b>
          <b>Raqami</b>
          <b>Summa(dona)</b>
          <b>Umumiy hisob</b>
          <b></b>
        </header>
      </div>
  </div>
</template>



<script>
export default {
  name: "yetkazuvchi",
};
</script>





<style>
.yetkazuvchi{

  width: 88%;
}
.yetkazuvchi_blog{
  border: 1px solid rgb(200, 200, 200);
  height: 85vh;
  border-radius: 20px;
  padding: 20px;
}
.yetkazuvchi_top{
  display: flex;
  height: 70px;
  justify-content: space-between;
  align-items: center;
  
}
.yetkazuvchi_top h1{
    font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
}
.yetkazuvchi_top button{
  width: 250px;
  height: 40px;
    background-color: #5565ff;
    border: none;
    border-radius: 10px;
    font-family: Verdana, Geneva, Tahoma, sans-serif;
font-size: 18px;
color: #fff;
}
.yetkazuvchi_blog header{
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