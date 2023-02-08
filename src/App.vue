<template>
<v-app id="inspire">
    <v-navigation-drawer v-model="drawer">
		<MainMenu/>
    </v-navigation-drawer>

    <v-app-bar>
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title>PaymentsApp</v-toolbar-title>
    </v-app-bar>

    <v-main>
      <router-view/>
    </v-main>
</v-app>
</template>

<script>
import MainMenu from '@/components/MainMenu.vue'

export default {
  name: 'App',

  data: () => ({
    drawer: null
  }),

  components: {
	MainMenu
  }
}
</script>
