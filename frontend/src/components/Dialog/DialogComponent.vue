<script lang="ts">
import ButtonComponent from "@components/ButtonComponent.vue";
import BlackOverlay from "./Overlays/BlackOverlay.vue";

export default {
    props: {
        title: {
            type: String,
            required: true,
        },
        buttonClass: {
            type: String,
            default: () => "bg-blue-500 text-white hover:bg-blue-600",
        },
        buttonContent: {
            type: String,
            default: () => "Criar",
        },

    },
    emits: ["close", 'confirm'],
    components: {
        BlackOverlay,
        ButtonComponent,
    },
    methods: {
        closeModal() {
            this.$emit("close");
        },
        confirmModal() {
            this.$emit("confirm");
        },
    },
};
</script>

<template>
    <BlackOverlay>
        <div class="flex flex-col m-10">
            <div class="bg-white rounded-t-md p-3">
                <span class="text-xl font-bold">
                    {{ title }}
                </span>
            </div>
            <div class="w-[500px] max-h-[600px] bg-white overflow-y-auto p-3">
                <slot />
            </div>
            <!-- Buttons -->
            <div class="bg-white rounded-b-md">
                <div class="flex justify-end gap-4 p-3">
                    <ButtonComponent @click="closeModal" class="bg-gray-100 hover:bg-gray-200">
                        Fechar
                    </ButtonComponent>
                    <ButtonComponent :class="buttonClass" @click="confirmModal">{{ buttonContent }}</ButtonComponent>
                </div>
            </div>
        </div>
    </BlackOverlay>
</template>
