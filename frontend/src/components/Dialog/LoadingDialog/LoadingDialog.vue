<script lang="ts">
import LoadingSpinner from '@views/LoadingPage/LoadingSpinner.vue';
import BlurOverlay from '../Overlays/BlurOverlay.vue';
export default {
    components: {
        BlurOverlay,
        LoadingSpinner
    },
}
</script>
<template>
    <BlurOverlay class="z-20">
        <LoadingSpinner></LoadingSpinner>
    </BlurOverlay>
</template>