<script lang="ts">
export default {
  data() {
    return {
      loading: false,
    };
  },
  props: {
    class: {
      type: String,
      default: () => "bg-blue-500 text-white hover:bg-blue-600",
    },
  },
  computed: {
    classes() {
      return (
        "border p-2 px-5  font-semibold rounded-md transition-all " + this.class
      );
    },
  },
};
</script>

<template>
  <button :class="classes">
    <slot />
  </button>
</template>
