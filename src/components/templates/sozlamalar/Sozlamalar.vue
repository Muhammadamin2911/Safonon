<template>
  <div class="sozlamalar">
    <h1>Sozlamalar</h1>
<label for="">Parolni kiriting</label>
<input type="password" placeholder="Password">
<label for="">Parolni qayta kiriting</label>
<input type="password" placeholder="Password">
<button>Yangilash</button>
  </div>
</template>



<script>
export default {
  name: "Sozlamalar"
}
</script>




<style>
.sozlamalar{
  display: flex;
  flex-direction: column;
  gap: 20px;

}
h1{
  margin-bottom: 30px;
}
label{
  color: #555;
}
  input{
    background-color: #fff;
  }
  button{
    width: 400px;
    height: 35px;
    border-radius: 10px;
    border: none;
    background-color: #5f74ff;
    color: #fff;
    font-size: 18px;
  }
</style>