<template>
    <div ref="backdrop" class="h-dvh w-full absolute top-0 left-0 z-10 backdrop-blur-[3px] flex-center">
        <slot></slot>
    </div>
</template>

<script lang="ts">
export default {
    mounted() {
        const backdrop = this.$refs.backdrop as HTMLDivElement;

        backdrop.animate([{ opacity: "0" }, { opacity: "1" }], {
            duration: 100,
            easing: "ease-in-out",
        });
    },
};
</script>
