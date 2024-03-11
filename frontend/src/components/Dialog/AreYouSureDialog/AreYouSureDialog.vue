<script lang="ts">
import DialogComponent from '../DialogComponent.vue';

export default {
    components: {
        DialogComponent,
    },
}
</script>

<template>
    <DialogComponent button-content="Continuar" button-class="bg-red-500 hover:bg-red-600 text-white"
        title="Você tem certeza desta ação?">
        <slot />
    </DialogComponent>
</template>