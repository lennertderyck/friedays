<template>
  <div class="about p-5">
    <h3 class="mb-3">Gebruiker</h3>
    <h5>Voorkeuren</h5>
    <p class="mb-0">Probeer de heerlijk rustigevende dark mode</p>
    <SwitchVue label="Dark mode" :onChange="setDarkMode" :checked="darkMode"/>
  </div>
</template>

<script>
import SwitchVue from '../components/Switch.vue'
import { darkMode } from '../utils'

export default {
  name: 'User',
  components: {
    SwitchVue
  },
  data: () => ({
    darkMode: window.localStorage.getItem('bogan') === 'true' ? true : false
  }),
  methods: {
    setDarkMode({ checked }) {
      darkMode().set(checked);
    }
  }
}
</script>