<template>
<v-list>
    <v-list-item
    prepend-avatar="https://cdn.vuetifyjs.com/images/john.png"
    title="Иван Иванов"
    subtitle="Администратор"
    >
        <template v-slot:append>
            <v-btn
            size="small"
            variant="text"
            icon="mdi-menu-down"
            ></v-btn>
        </template>
    </v-list-item>

</v-list>
<v-divider></v-divider>
<v-list
:lines="false"
density="compact"
nav
>
    <v-list-item
    v-for="(item, i) in items"
    :key="i"
    :value="item"
    active-color="primary"
    :to="item.link"
    >
        <template v-slot:prepend>
            <v-icon :icon="item.icon"></v-icon>
        </template>
            <v-list-item-title v-text="item.text"></v-list-item-title>
    </v-list-item>
</v-list>
</template>

<script>
export default {
    data() {
        return {
            selectedItem: 0,
            items: [
                { text: 'Главная', icon: 'mdi-account-multiple', link: '/' },
                { text: 'Выплаты', icon: 'mdi-folder', link: '/payments' }
            ],
        }
    }
}
</script>

<style>

</style>