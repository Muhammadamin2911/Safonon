<template>
  <div class="omborxona">
    <div class="omborxona_top">
      <h1>Omborxona</h1>
      <button>Mahsulot yaratish</button>
    </div>
    <div class="omborxona_blog">
      <header class="ombor_header">
        <b>№</b>
        <b>Nomi</b>
        <b>Narxi</b>
        <b>Soni</b>
        <b>Jami summasi</b>
        <b>Holati</b>
        <b></b>
      </header>
    </div>
  </div>
</template>
<script>
export default {
  name: "Omborxona",
};
</script>



<style>
 .omborxona{
  width: 100%;
}
.omborxona_blog{
  width: 100%;
  border: 1px solid rgb(200, 200, 200);
  height: 85vh;
  border-radius: 20px;
  padding: 20px;
}
.omborxona_top{
  display: flex;
  height: 70px;
  justify-content: space-between;
  align-items: center;
  
}
.omborxona_top h1{
    font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
}
.omborxona_top button{
  width: 250px;
  height: 40px;
    background-color: #5565ff;
    border: none;
    border-radius: 10px;
    font-family: Verdana, Geneva, Tahoma, sans-serif;
font-size: 18px;
color: #fff;
}
.omborxona_blog header{
  width: 100%;
  display: flex;
  justify-content: space-between;
  background-color: #ddd;
  padding: 20px;
  border-radius: 10px;

}
.ombor_header b{
  width: 155px;
}

</style>