<template>
  <div class="modal close_modal">
    <h1>Menejer yaratish</h1>

    <label>Menejer nomi</label>
    <input type="text" v-model="formdata.username" placeholder="Menejer nomini kiriting">

    <label>Parol</label>
    <input type="password" v-model="formdata.password" placeholder="Parol">




    <button @click="createMeneger">Saqlash</button>
  </div>
</template>



<script>
import api from '../../../Utils/axios';
export default {
  name:"modal",
  data(){
    return{
      formdata:{
        username:"",
        password:""
      }
    }
  },
  methods:{
   createMeneger(){
      const data = api.post("/api/manager",JSON.stringify({username:this.formdata.username,password:this.formdata.password}))
      console.log(data.then((res)=>{
        console.log(res)
      }));
      
      
    }
  }
}


</script>



<style>
.modal{
  width: 110%;
  height: 100vh;
  border-radius: 80px;
  border: 3px solid black;
  background: #fff;
  padding: 30px;
  display: flex;
  flex-direction: column;
}
label{
  margin-top: 30px;
}
input{
  border: 1px solid gray  ;
  margin-top: 10px;
}
  
</style>