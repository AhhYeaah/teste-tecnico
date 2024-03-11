<script lang="ts">
import { useApi } from '@api/api';
import { GetKnightOutput } from '@api/types/GetKnights';
import TableComponent from '@components/Table/TableComponent.vue';

export default {
    data() {
        return {
            heroes: [] as GetKnightOutput,
            isLoading: true
        }
    },
    setup() {
        const { getKnights } = useApi()
        return {
            getKnights
        }
    },
    methods: {
        async fetchHeroes() {
            this.getKnights({ filter: "heroes" }).then(({ data }) => {
                this.heroes = data;
                this.isLoading = false;
            });
        }
    },
    mounted() {
        this.fetchHeroes();
    },
    components: {
        TableComponent
    },
}

</script>
<template>
    <section class="flex flex-col gap-5">
        <div class="flex justify-between items-end">
            <div>
                <h2 class="text-xl font-bold">Hall of Heroes</h2>
                <span class>Uma lista de todos os heróis (knights deletados).</span>
            </div>
        </div>
        <TableComponent :ignored-keys="['_id']" :is-loading="isLoading" :items="heroes" />
    </section>
</template>

<style scoped>
th,
td {
    @apply p-[10px] text-left
}

thead th {
    @apply bg-gray-100
}
</style>