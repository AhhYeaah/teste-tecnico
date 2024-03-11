<script lang="ts">
import { useRoute } from 'vue-router';
import LoadingPage from '@views/LoadingPage/LoadingPage.vue';
import { Routes } from './router/Routes';

export default {
  setup() {
    const route = useRoute()
    return {
      route
    }
  },
  computed: {
    layoutToUse() {
      return this.route?.meta?.layout ?? LoadingPage
    }
  },
  mounted() {
    this.$router.push(Routes.HOME)
  },
}
</script>

<template>
  <component :is="layoutToUse">
    <RouterView />
  </component>
</template>