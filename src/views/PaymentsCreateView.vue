<template>
<v-container>
    <v-row>
        <v-col cols="12">
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
            :to="'/payments'"
            >
            Вернуться к спуску выплат
            </v-btn>
        </v-col>
    </v-row>
    <v-row>
        <v-col cols="12">
            <v-text-field
            v-model="form.fields.login"
            label="Логин"
            :error-messages="form.errors.login"
            @click="resetErrors"
            ></v-text-field>

            <v-text-field
            v-model="form.fields.properties"
            label="Реквизиты"
            :error-messages="form.errors.properties"
            @click="resetErrors"
            ></v-text-field>

            <v-text-field
            v-model="form.fields.sum"
            label="Сумма"
            :error-messages="form.errors.sum"
            @click="resetErrors"
            ></v-text-field>

            <v-select
            v-model="form.fields.currency"
            label="Валюта"
            :items="['RUB', 'USD']"
            :error-messages="form.errors.currency"
            @click="resetErrors"
            ></v-select>

            <v-btn @click="createPayment" block class="mt-2">Сохранить</v-btn>
        </v-col>
    </v-row>
</v-container>
</template>

<script>
export default {
    data() {
        return {
            form: {
                fields: {
                    login: '',
                    properties: '',
                    sum: '',
                    currency: 'RUB'
                },
                errors: {
                    login: '',
                    properties: '',
                    sum: '',
                    currency: ''
                }
            },
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
        createPayment(){
            var headers = new Headers();
            headers.append("Authorization", "Bearer " + this.$store.state.user.token);
            headers.append("Content-Type", "application/json");

            var raw = JSON.stringify({
            "login": "sdfnjknseflk",
            "properties": "lorem impsum",
            "sum": 5000,
            "currency": "RUB"
            });

            var requestOptions = {
                    method: 'POST',
                    headers: headers,
                    body: JSON.stringify({"login": this.form.fields.login, "properties": this.form.fields.properties, "sum": this.form.fields.sum, "currency": this.form.fields.currency}),
                    redirect: 'follow'
            };

            fetch(this.$store.state.global.host + "/api/v1/admin/payments/create", requestOptions)
            .then(response => {
                let status = response.status

                if(status == 200){
                    alert('Выплата успешно создана')
                    this.$router.push('/payments')
                }else if(status == 401){
                    response.json().then(response => {
                        this.alerts.errorAlert.text = response.message
                        this.alerts.errorAlert.active = true
                        setTimeout(() => {
                            this.alerts.errorAlert.active = false
                        }, 2000);
                    })
                }else if(status == 405){
                    response.json().then(response => {
                        for (let key in response.errors) {
                            this.form.errors[key] = response.errors[key][0]
                        }
                    })
                }else{
                    alert('Произошла ошибка')
                }
            })
            .catch(error => alert('Произошла ошибка'))
        },
        resetErrors(){
            this.form.errors = {
                login: '',
                properties: '',
                sum: '',
                currency: ''
            }
        }
    }
}
</script>

<style>

</style>