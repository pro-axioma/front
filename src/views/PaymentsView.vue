<template>

<v-container>
    <v-row>
        <v-col cols="12">
            <h2>Все выплаты</h2>
            <v-alert
                v-model="alerts.successAlert.active"
                type="success"
                closable
                close-label="Закрыть"
                title="Успех!"
            >
            {{alerts.successAlert.text}}
            </v-alert>
            <v-alert
                v-model="alerts.errorAlert.active"
                type="error"
                closable
                close-label="Закрыть"
                title="Успех!"
            >
            {{alerts.errorAlert.text}}
            </v-alert>
        </v-col>
    </v-row>
    <v-row>
        <v-col cols="12">
            <v-btn
            color="primary"
            :to="'/payments/create'"
            >
            Создать выплату
            </v-btn>
        </v-col>
    </v-row>
    <v-row>
        <v-col cols="12">
            <v-table v-if="this.items.length > 0">
                <thead>
                    <tr>
                    <th class="text-left">
                        ID
                    </th>
                    <th class="text-left">
                        Логин
                    </th>
                    <th class="text-left">
                        Реквизиты
                    </th>
                    <th class="text-left">
                        Сумма
                    </th>
                    <th class="text-left">
                        Валюта
                    </th>
                    <th class="text-left">
                        Статус
                    </th>
                    </tr>
                </thead>
                <tbody>
                    <tr
                    v-for="(item, key) in items"
                    :key="item.id"
                    >
                        <td>{{ item.id }}</td>
                        <td>{{ item.login }}</td>
                        <td>{{ item.properties }}</td>
                        <td>{{ item.sum }}</td>
                        <td>{{ item.currency }}</td>
                        <td>

                            <v-menu>
                            <template v-slot:activator="{ props }">
                                <v-btn
                                color="primary"
                                v-bind="props"
                                >
                                {{paymentStatus(item.status)}}
                                </v-btn>
                            </template>
                            <v-list>
                                <v-list-item
                                v-for="(type, index) in [{name: 'Оплачен', status: true}, {name: 'Не оплачен', status: false}]"
                                :key="index"
                                :value="index"
                                >
                                <v-list-item-title @click="changeStatus(item.id, type.status, key)">{{type.name}}</v-list-item-title>
                                </v-list-item>
                            </v-list>
                            </v-menu>

                        </td>
                    </tr>
                </tbody>
            </v-table>
            <p v-else>
                Выплат не найдено...
            </p>
        </v-col>
    </v-row>
</v-container>

</template>

<script>
export default {
    data() {
        return {
            items: [],
            alerts: {
                successAlert: {
                    active: false,
                    text: ''
                },
                errorAlert: {
                    active: false,
                    text: ''
                }
            }
        }
    },
    methods: {
        getItems(){
            var headers = new Headers()
            headers.append("Authorization", "Bearer " + this.$store.state.user.token)

            var requestOptions = {
                method: 'GET',
                headers: headers,
                redirect: 'follow'
            };

            fetch(this.$store.state.global.host + "/api/v1/admin/payments/get-list", requestOptions)
            .then(response => {
                if(response.ok){
                    response.json().then(response => {
                        this.items = response.result
                    })
                }else{

                }
            })
            .catch(error => alert('Произошла ошибка'));
        },
        paymentStatus(status){
            if(!status){
                return 'Не оплачен'
            }

            return 'Оплачен'
        },
        changeStatus(id, status, key){
            var headers = new Headers()
            headers.append("Authorization", "Bearer " + this.$store.state.user.token)
            headers.append("Content-Type", "application/json")

            var requestOptions = {
                method: 'POST',
                headers: headers,
                body: JSON.stringify({"id": id, "status": status}),
                redirect: 'follow'
            };

            fetch(this.$store.state.global.host + "/api/v1/admin/payments/status-update", requestOptions)
            .then(response => {
                if(response.ok){
                    this.items[key].status = status
                    this.alerts.successAlert.text = 'Статус выплаты успешно изменён'
                    this.alerts.successAlert.active = true
                    setTimeout(() => {
                        this.alerts.successAlert.active = false
                    }, 2000);
                }else{
                    this.alerts.errorAlert.text = 'Не удалось изменить статус выплаты'
                    this.alerts.errorAlert.active = true
                    setTimeout(() => {
                        this.alerts.errorAlert.active = false
                    }, 2000);
                }
            })
            .catch(error => alert('Произошла ошибка'))
        }
    },
    mounted() {
        this.getItems()
    }
}
</script>

<style>

</style>