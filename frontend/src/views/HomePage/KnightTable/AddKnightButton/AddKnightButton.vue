<script lang="ts">
import ButtonComponent from "@components/ButtonComponent.vue";
import DialogComponent from "@components/Dialog/DialogComponent.vue";
import AddKnightDialog from "./AddKnightDialog.vue";
import { FormValues } from "./AddKnightDialog.vue";
import LoadingDialog from "@components/Dialog/LoadingDialog/LoadingDialog.vue";
import { useApi } from "@api/api";

export default {
    data() {
        return {
            showDialog: false,
            loading: false,
        };
    },
    setup() {
        const { createKnight } = useApi();
        return {
            createKnight,
        };
    },
    emits: ["reload"],
    methods: {
        formatData(data: FormValues) {
            return {
                ...data,
                birthday: new Date(data.birthday).toISOString(),
                weapons: data.weapons.map((weapon, index) => {
                    return {
                        ...weapon,
                        equipped: index === 0,
                    }
                })
            };
        },
        submitModal(data: FormValues) {
            this.loading = true;
            this.createKnight(this.formatData(data))
                .then(() => {
                    this.loading = false;
                    this.showDialog = false;
                    this.$emit("reload")
                })
                .catch((error) => {
                    this.loading = false;
                    //Desculpa por isso, o tempo pra fazer tava acabando e eu tenho coisas mais importantes para desenvolver pro projeto.
                    const errorMessage = error.response.data.message;
                    window.alert("Erro ao criar knight: " + errorMessage);
                });
        },
    },

    components: {
        ButtonComponent,
        DialogComponent,
        AddKnightDialog,
        LoadingDialog,
    },
};
</script>

<template>
    <LoadingDialog v-if="loading" />
    <ButtonComponent class="bg-blue-500 text-white hover:bg-blue-600 w-full lg:w-auto"
        @click="() => (showDialog = true)">Novo
        Knight</ButtonComponent>
    <AddKnightDialog v-if="showDialog" ref="form" @submit="submitModal" @close="() => (showDialog = false)" />
</template>
