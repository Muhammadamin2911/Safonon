<template>
  <div class="dashboard">
    <h1>Dashboard</h1>
    <div class="dashboard_blok">
      <div class="top">
        <div class="kirim item">
          <div class="box">
            <Icons :name="'kirim'" />
            <div class="reight">
              <p>Kirimlar</p>
              <b>0</b>
            </div>
          </div>

          <div class="box">
            <Icons :name="'kirim'" />
            <div class="reight">
              <p>Muhammadamin</p>
              <b>0</b>
            </div>
          </div>
        </div>
        <div class="chiqim item">
          <div class="box">
            <Icons :name="'chiqim'" />
            <div class="reight">
              <p>Chiqim</p>
              <b>0</b>
            </div>
          </div>

          <div class="box">
            <Icons :name="'chiqim'" />
            <div class="reight">
              <p>Muhammadamin</p>
              <b>0</b>
            </div>
          </div>
        </div>
        <div class="kutilayotgan item">


        <div class="box">
          <Icons :name="'kutilmoqda'" />
          <div class="reight">
            <p>Kutilayotgan</p>
            <b>0</b>
          </div>
        </div>

        <div class="box">
          <Icons :name="'kutilmoqda'" />
          <div class="reight">
            <p>Muhammadamin</p>
            <b>0</b>
          </div>
        </div>
        </div>
      </div>

      <div class="bottom">
        <h1>Omborxona hisoboti</h1>
        <div class="bottom_blok">
 <div class="box">
            <Icons :name="'kirim'" />
            <div class="reight">
              <p>Kirimlar soni</p>
              <b>1</b>
            </div>
          </div>

 <div class="box">
            <Icons :name="'chiqim'" />
            <div class="reight">
              <p>Omborxonadagi summasi</p>
              <b>30 500 000 </b>
            </div>
          </div>

           <div class="box">
          <Icons :name="'kutilmoqda'" />
          <div class="reight">
            <p>Nonvoy chiqimlari  </p>
            <b>0</b>
          </div>
        </div>
          
        </div>
      </div>
    </div>
  </div>
</template>





<script>
import Icons from "../../materials/icons/Iconss.vue";
export default {
  name: "dashboard",
  components: {
    Icons,
  },
};
</script>



<style>
h1, p,b{
  font-family: Verdana, Geneva, Tahoma, sans-serif;
}
h1{
  font-size: 25px;
  display: flex;
  align-items: center;
  margin-top: 20px;
}

.dashboard_blok {
  width: 100%;
  height: 100%;
  border: 1px solid rgb(200, 200, 200);
  padding: 0;
  border-radius: 15px;
  padding: 20px;
  margin-top: 20px;
}
.top {
  height: 420px;
  display: flex;
  gap: 25px;
}
.item{
  display: flex;
  flex-direction: column;
  gap: 25px;
}
.box {
  width: 354px;
  height: 90px;
  border-radius: 20px;
  background-color: rgb(106, 143, 253);
  padding: 20px;
  display: flex;
  align-items: center;
  gap: 25px;
  color: #fff;
}
.box p {
  color: #fff;
}
.box b {
  font-size: 25px;
}
.bottom_blok{
  display: flex;
  gap: 25px;
  margin-top: 20px;
}
</style>