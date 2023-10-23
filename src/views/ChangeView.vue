<script setup>

onMounted(() => {
  fetchData(route.params.id);
});

import router from '../router/index'
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';

let route = useRoute();

let datas = ref();

let carName = ref("");
let carBrand = ref("");
let carAirCondition = ref(false);
let carNavigation = ref(false);
let carTransmission = ref("");
let carPerson = ref(0);
let carImg = ref("");
let carPrice = ref(0);
let carReservations = ref(0);
let isSend = ref();
let isPreSaved = ref(false)

const fetchData = async (id) => {
  try {
    const response = await fetch('http://localhost:5500/cars/' + id);
    datas.value = await response.json();
    isPreSaved.value = true;
    carName.value = datas.value.name
    carBrand.value = datas.value.brand ? datas.value.brand : "Non connu"
    carAirCondition.value = datas.value.options.aircondition
    carNavigation.value = datas.value.options.navigation
    carTransmission.value = datas.value.options.transmission
    carPerson.value = datas.value.options.person
    carImg.value = datas.value.image
    carPrice.value = datas.value.price
    carReservations.value = datas.value.reservations
    } catch (error) {
    console.error('Erreur lors de la récupération des données :', error);
  }
};

let changeDatas = async ()=>{
    try {
    const data = {
      name: carName.value,
      brand: carBrand.value,
      options: {
        aircondition: carAirCondition.value,
        navigation: carNavigation.value,
        transmission: carTransmission.value,
        person: carPerson.value
      },
      image: carImg.value,
      price: carPrice.value,
      reservations: carReservations.value
    };

    const response = await fetch('http://localhost:5500/cars/' + route.params.id, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (response.ok) {
      isSend.value = true;
    } else {
        isSend.value = false;
    }

    router.push({ path: '/' })

    setTimeout(() => {
      isSend.value = '';
    }, 10000);
    } catch (error) {
        console.error("Erreur lors de l'envoi de la requête", error);
    }
}
</script>

<template>
    <div v-if="isPreSaved">
        <h1>Modifié</h1>

        <p v-show="isSend && isSend != ''">{{ isSend ? "Données modifiées avec succès" : "Problème" }}</p>


            <form method="POST" @submit.prevent="changeDatas">

            <div>
                <label for="name">Nom de la voiture</label>
                <input type="text" id="name" v-model="carName">
            </div>

            <div>
                <label for="brand">Marque de la voiture</label>
                <input type="text" id="brand" v-model="carBrand">
            </div>

            <div>
                <label for="price">Prix de la voiture</label>
                <input type="number" id="price" v-model="carPrice">
            </div>

            <div>
                <label for="img">Lien de l'image de la voiture</label>
                <input type="text" id="img" v-model="carImg">
            </div>

            <div>
                <label for="img">Nombre de réservation</label>
                <input type="text" id="img" v-model="carReservations">
            </div>

            <div>
                <p>Climatisation:</p>
                <label for="clim-yes">Oui</label>
                <input type="radio" name="clim" id="clim-yes" v-model="carAirCondition" v-bind:value="true">
                <label for="clim-no">Non</label>
                <input type="radio" name="clim" id="clim-no" v-model="carAirCondition" v-bind:value="false">
 
                <p>GPS:</p>
                <label for="gps-yes">Oui</label>
                <input type="radio" name="gps" id="gps-yes" v-model="carNavigation" v-bind:value="true">
                <label for="gps-no">Non</label>
                <input type="radio" name="gps" id="gps-no" v-model="carNavigation" v-bind:value="false">
            </div>

            <div>
                <label for="transmission">Transmission:</label>

                <select name="transmisison" id="transmission" v-model="carTransmission">
                    <option value="manuel">Manuel</option>
                    <option value="automatique">Automatique</option>
                </select>
            </div>

            <div>
                <label for="person">Nombre de personne:</label>
                <input type="number" name="person" id="person" v-model="carPerson">
            </div>

            <input type="submit" value="Valider">

        </form>

    </div>

</template>