<script lang="ts">
import ButtonComponent from "@components/ButtonComponent.vue";
import DialogComponent from "@components/Dialog/DialogComponent.vue";
import LoadingDialog from "@components/Dialog/LoadingDialog/LoadingDialog.vue";
import { useApi } from "@api/api";
import AreYouSureDialog from "@components/Dialog/AreYouSureDialog/AreYouSureDialog.vue";
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faTrash } from "@fortawesome/free-solid-svg-icons";

export default {
    data() {
        return {
            showDialog: false,
            loading: false, faTrash
        };
    },
    setup() {
        const { deleteKnight } = useApi();
        return {
            deleteKnight,
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
        deleteKnight() {
            this.loading = true;
            this.deleteKnight(this.id)
                .then(() => {
                    this.loading = false;
                    this.showDialog = false;
                    this.$emit("reload")
                })
                .catch((error) => {
                    this.loading = false;
                    //Desculpa por isso, o tempo pra fazer tava acabando e eu tenho coisas mais importantes para desenvolver pro projeto.
                    window.alert("Erro ao deletar o knight: " + JSON.stringify(error));
                });
        },
    },

    components: {
        ButtonComponent,
        DialogComponent,
        AreYouSureDialog,
        LoadingDialog,
        FontAwesomeIcon,
    },
};
</script>

<template>
    <LoadingDialog v-if="loading" />
    <FontAwesomeIcon class="cursor-pointer" :icon="faTrash" @click="() => (showDialog = true)"></FontAwesomeIcon>
    <AreYouSureDialog v-if="showDialog" @confirm="deleteKnight" @close="() => showDialog = false">
        <p>
            Excluir este knight o enviará para o Hall of Heroes, esta ação não pode ser desfeita.
        </p>
    </AreYouSureDialog>
</template>
