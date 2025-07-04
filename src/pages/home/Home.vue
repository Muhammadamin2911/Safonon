<template>
  <div class="home" @click.self="aside_off">
    <aside id="sidebar" :class="{ open: isSidebarOpen }">
      <h2><Icons :name="'logo'" /></h2>
      <ul>
        <li @click="clickDashboard()"><Icons :name="'home'" />Dashboard</li>
        <li @click="clickManager()"><Icons :name="'menejer'" />Managerlar</li>
        <li @click="clickNonvoy()"><Icons :name="'people'" />Nonvoylar</li>
        <li @click="clickYetkazuvchi()">
          <Icons :name="'courier'" /> Yertkazuvchilar
        </li>
        <li @click="clickDokon()"><Icons :name="'shopcart'" /> Do'konlar</li>
        <li @click="clickChiqim()"><Icons :name="'cardsend'" /> Chiqimlar</li>
        <li @click="clickOmbor()"><Icons :name="'ombor'" /> Omborxona</li>
        <li @click="clickNonTuri()"><Icons :name="'nonturi'" /> Non turlari</li>
        <li @click="clickSozlamalar()"><Icons :name="'setting'" /> Sozlamalar
        </li>
      </ul>
    <div class="logout" @click="logout">
  <p>Admin</p>
  <Icons :name="'logout'" />
</div>

      <button @click="toggleSidebar" class="on_bar">
        <Icons :name="'arrow_left'" />
      </button>
    </aside>
    <div class="dashboard" v-if="Dashboard"><Dashboard /></div>
    <div class="manager" v-if="Manager"><Manager /></div>
    <div class="nonvoy" v-if="Nonvoy"><Nonvoy /></div>
    <div class="yetkazuvchi" v-if="Yetkazuvchi"><Yetkazuvchi /></div>
    <div class="dokon" v-if="Dokon"><Dokon /></div>
    <div class="chiqim" v-if="Chiqim"><Chiqim /></div>
    <div class="ombor" v-if="Ombor"><Ombor /></div>
    <div class="nonTuri" v-if="NonTuri"><NonTuri /></div>
    <div class="sozlamalar" v-if="Sozlamalar"><Sozlamalar /></div>
  </div>
</template>

<script>
import Icons from "../../components/materials/icons/Iconss.vue";
import Dashboard from "../../components/templates/dashboard/Dashboard.vue";
import Manager from "../../components/templates/menejer/Menejer.vue";
import Nonvoy from "../../components/templates/nonvoy/Nonvoy.vue";
import Yetkazuvchi from "../../components/templates/yetkazuvchi/Yetkazuvchi.vue";
import Dokon from "../../components/templates/dokon/Dokon.vue";
import Chiqim from "../../components/templates/chiqimlar/Chiqimlar.vue";
import Ombor from "../../components/templates/omborxona/Omborxon.vue";
import NonTuri from "../../components/templates/nonTurlari/NonTurlari.vue";
import Sozlamalar from "../../components/templates/sozlamalar/Sozlamalar.vue";

export default {
  name: "Home",
  components: {
    Icons,
    Dashboard,
    Manager,
    Nonvoy,
    Yetkazuvchi,
    Dokon,
    Chiqim,
    Ombor,
    NonTuri,
    Sozlamalar,
  },
  data() {
    return {
      isSidebarOpen: true,
      Dashboard: true,
      Manager: false,
      Nonvoy: false,
      Yetkazuvchi: false,
      Dokon: false,
      Chiqim: false,
      Ombor: false,
      NonTuri: false,
      Sozlamalar: false,
    };
  },
  methods: {
    toggleSidebar() {
      this.isSidebarOpen = !this.isSidebarOpen;
    },
    aside_off() {
      this.isSidebarOpen = false;
    },
    clickDashboard() {
      this.Dashboard = true;
      this.Nonvoy = false;
      this.Manager = false;
      this.Yetkazuvchi = false;
      this.Dokon = false;
      this.Chiqim = false;
      this.Ombor = false;
      this.NonTuri = false;
      this.Sozlamalar = false;
    },
    clickManager() {
      this.Manager = true;
      this.Dashboard = false;
      this.Nonvoy = false;
      this.Yetkazuvchi = false;
      this.Dokon = false;
      this.Chiqim = false;
      this.Ombor = false;
      this.NonTuri = false;
      this.Sozlamalar = false;
    },
    clickNonvoy() {
      this.Nonvoy = true;
      this.Dashboard = false;
      this.Manager = false;
      this.Yetkazuvchi = false;
      this.Dokon = false;
      this.Chiqim = false;
      this.Ombor = false;
      this.NonTuri = false;
      this.Sozlamalar = false;
    },
    clickYetkazuvchi() {
      this.Yetkazuvchi = true;
      this.Nonvoy = false;
      this.Dashboard = false;
      this.Manager = false;
      this.Dokon = false;
      this.Chiqim = false;
      this.Ombor = false;
      this.NonTuri = false;
      this.Sozlamalar = false;
    },
    clickDokon() {
      this.Dokon = true;
      this.Yetkazuvchi = false;
      this.Nonvoy = false;
      this.Dashboard = false;
      this.Manager = false;
      this.Chiqim = false;
      this.Ombor = false;
      this.NonTuri = false;
      this.Sozlamalar = false;
    },
    clickChiqim() {
      this.Chiqim = true;
      this.Dokon = false;
      this.Yetkazuvchi = false;
      this.Nonvoy = false;
      this.Dashboard = false;
      this.Manager = false;
      this.Ombor = false;
      this.NonTuri = false;
      this.Sozlamalar = false;
    },
    clickOmbor() {
      this.Ombor = true;
      this.Chiqim = false;
      this.Dokon = false;
      this.Yetkazuvchi = false;
      this.Nonvoy = false;
      this.Dashboard = false;
      this.Manager = false;
      this.NonTuri = false;
      this.Sozlamalar = false;
    },
    clickNonTuri() {
      this.NonTuri = true;
      this.Ombor = false;
      this.Chiqim = false;
      this.Dokon = false;
      this.Yetkazuvchi = false;
      this.Nonvoy = false;
      this.Dashboard = false;
      this.Manager = false;
      this.Sozlamalar = false;
    },
    clickSozlamalar() {
      this.Sozlamalar = true;
      this.NonTuri = false;
      this.Ombor = false;
      this.Chiqim = false;
      this.Dokon = false;
      this.Yetkazuvchi = false;
      this.Nonvoy = false;
      this.Dashboard = false;
      this.Manager = false;
    },
    logout() {
      localStorage.removeItem("token"); 
      this.$router.push("/login");
    },
  },
};
</script>


<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
.dashboard {
  width: 100%;
  height: 85vh;
  transition: 2s;
}
h2 {
  display: flex;
  justify-content: center;
  margin-top: 15px;
}
.manager {
  width: 100%;
}
.home {
  width: 100%;
  height: 100vh;
  background-color: rgb(245, 245, 245);
  gap: 40px;
  display: flex;
  padding: 20px;
  position: relative;
  overflow: hidden;
}

aside {
  min-width: 300px;
  width: 300px;
  border-radius: 20px;
  background-color: #fff;
  border: 1px solid gray;
  padding: 10px;
  height: auto;
  position: relative;
  top: 0;
  left: -340px;
  z-index: 2;
  transition: left 0.5s ease-in-out;
}
aside .on_bar {
  left: 290px;
  background-color: rgb(0, 255, 0);
  color: #fff;
  transition: 1s;
}
aside.open {
  left: 0px;
  z-index: 1;
}
aside.open .on_bar {
  background-color: rgb(255, 255, 255);
  display: none;
  transition: 1s;
}

.on_bar {
  width: 60px;
  height: 60px;
  position: absolute;
  right: -30px;
  top: 80px;
  z-index: 1;
  background-color: rgb(8, 255, 4);
  padding: 10px;
  border: none;
  border-radius: 50%;
  cursor: pointer;
  display: flex;
  justify-content: end;
}

ul {
  margin-top: 20px;
}

ul li {
  height: 40px;
  display: flex;
  align-items: center;
  margin-top: 10px;
  gap: 15px;
  font-size: 20px;
  padding: 2px 15px;
  border-radius: 10px;
  cursor: pointer;
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
}

ul li:hover {
  background-color: rgb(212, 233, 255);
  transition: 0.2s;
  z-index: 3;
}
ul li:active {
  background-color: rgb(53, 145, 244);
  transition: 0.3s;
}
.logout {
  width: 255px;
  height: 40px;
  position: absolute;
  display: flex;
  bottom: 20px;
  align-items: center;
  font-size: 18px;
  justify-content: space-between;
  padding: 5px 20px;
  border: 1px solid gray;
  border-radius: 10px;
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
}
.logout p {
  width: 200px;
  text-align: center;
  color: #000;
}
</style>