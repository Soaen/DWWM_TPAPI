<script setup>
import { ref, onMounted } from 'vue';
import { RouterLink } from 'vue-router'

const datas = ref(null);

const fetchData = async () => {
  try {
    const response = await fetch('http://localhost:5500/cars');
    datas.value = await response.json();
  } catch (error) {
    console.error('Erreur lors de la récupération des données :', error);
  }
};

async function deleteCar(id) {
  try {
    const response = await fetch('http://localhost:5500/cars/' + id, {
      method: "DELETE"
    });
    datas.value = await response.json();
    fetchData();
  } catch (error) {
    console.error('Erreur lors de la récupération des données :', error);
  }
}

onMounted(() => {
  fetchData();
});
</script>

<template>
  <main>
    <h1>Home</h1>

    <section class="section-car">
      <article v-for="data in datas">
        <img :src="data.image" :alt="'Photo d\'une voiture de modele ' + data.name" srcset="">
        <p>{{ data.name }}</p>
        <div>
          <button>{{ data.price }}€</button>
          <button v-on:click="deleteCar(data._id)">Supprimer</button>
          <RouterLink :to="'modify/' + data._id ">Modifié</RouterLink>
        </div>

      </article>

    </section>

</main>
</template>


<style scoped lang="scss">

.section-car{
  display: flex;
  flex-wrap: wrap;
  article{
    margin: 10px;
    color: white;
    flex-basis: 30%;
    width: 30%;
    font-size: 20px;
    font-family: Verdana, Geneva, Tahoma, sans-serif;
    background-color: gray;
    border-radius: 25px;
    text-align: center;
    padding-bottom: 10px;
    img{
      width: 100%;
      border-radius: 25px 25px 0 0;
    }
    button, a{
      text-decoration: none;
      font-size: 16px;
      border: none;
      background-color: darkred;
      padding: 5px 15px;
      color: white;
      box-shadow: 5px 2px 2px black;
      border-radius: 10px;
      cursor: pointer;
      &:hover{
        background-color: rgb(73, 0, 0);
      }
      &:not(:last-child){
        margin-right: 10px;
      }
    }
  } 
}
</style>