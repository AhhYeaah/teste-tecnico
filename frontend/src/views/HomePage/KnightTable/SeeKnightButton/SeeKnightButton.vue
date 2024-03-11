<script lang="ts">
import ButtonComponent from "@components/ButtonComponent.vue";
import DialogComponent from "@components/Dialog/DialogComponent.vue";
import LoadingDialog from "@components/Dialog/LoadingDialog/LoadingDialog.vue";
import { useApi } from "@api/api";
import AreYouSureDialog from "@components/Dialog/AreYouSureDialog/AreYouSureDialog.vue";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons";
import SeeKnightDialog from "./SeeKnightDialog.vue";
import { KnightEntity } from "@utils/types/KnightEntity";
import EditKnightDialog from "../EditKnightDialog/EditKnightDialog.vue";

export default {
    data() {
        return {
            showDialog: false,
            loading: false,
            faEye,
            data: undefined as any as KnightEntity | undefined,
            showEditDialog: false,
        };
    },
    setup() {
        const { getKnightById, updateKnight } = useApi();
        return {
            getKnightById, updateKnight
        };
    },
    props: {
        id: {
            type: String,
            required: true,
        },
    },
    emits: ["reload"],
    methods: {
        async getInfo() {
            this.loading = true;
            this.getKnightById(this.id)
                .then(({ data }) => {
                    this.loading = false;
                    this.data = data;
                })
                .catch((error) => {
                    this.loading = false;
                    //Desculpa por isso, o tempo pra fazer tava acabando e eu tenho coisas mais importantes para desenvolver pro projeto.
                    window.alert("Erro ao deletar o knight: " + JSON.stringify(error));
                });
        },
        openSeeModal() {
            this.getInfo().then(() => {
                this.showDialog = true;
            });
        },
        openEditModal() {
            this.showEditDialog = true;
        },

        async editKnight(data: { nickname: string }) {
            this.loading = true;
            this.updateKnight(this.id, data)
                .then(() => {
                    this.loading = false;
                    this.showEditDialog = false;
                    this.showDialog = false;
                    this.$emit("reload");
                })
                .catch((error) => {
                    this.loading = false;
                    //Desculpa por isso, o tempo pra fazer tava acabando e eu tenho coisas mais importantes para desenvolver pro projeto.
                    window.alert("Erro ao deletar o knight: " + JSON.stringify(error));
                });
        }
    },

    components: {
        ButtonComponent,
        DialogComponent,
        AreYouSureDialog,
        LoadingDialog,
        FontAwesomeIcon,
        SeeKnightDialog,
        EditKnightDialog
    },
};
</script>

<template>
    <LoadingDialog v-if="loading" />
    <FontAwesomeIcon class="cursor-pointer" :icon="faEye" @click="openSeeModal"></FontAwesomeIcon>
    <SeeKnightDialog v-if="showDialog" @confirm="openEditModal" @close="() => (showDialog = false)"
        :initial-values="data" />
    <EditKnightDialog v-if="showEditDialog" ref="form" @submit="editKnight"></EditKnightDialog>
</template>
