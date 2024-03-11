<script lang="ts">
import DialogComponent from "@components/Dialog/DialogComponent.vue";
import { AttributeType } from "@utils/types/AttributesEntity";
import { KnightEntity } from "@utils/types/KnightEntity";
import { Vueform } from "@vueform/vueform/dist/tailwind";

export type FormValues = KnightEntity;

export default {
    methods: {
        submitEvent({ data }: any) {
            this.$emit("submit", data as KnightEntity);
        },
        submitForm() {
            // @ts-ignore
            this.$refs.form.handleSubmit();
        },
    },
    components: {
        DialogComponent,
    },
};
</script>
<template>
    <DialogComponent @confirm="submitForm" title="Editar um knight">
        <div>
            <Vueform :endpoint="false" :on-submit="submitEvent" ref="form">
                <template #empty>
                    <TextElement :floating="false" name="nickname" label="Apelido" :rules="['required']"
                        placeholder="The Berseker">
                    </TextElement>
                </template>
            </Vueform>
        </div>
    </DialogComponent>
</template>
