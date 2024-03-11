<script lang="ts">
import TableComponent from '@components/Table/TableComponent.vue';
import AddKnightButton from './AddKnightButton/AddKnightButton.vue';
import { GetKnightOutput } from '@api/types/GetKnights';
import { useApi } from '@api/api';
import DeleteKnightButton from './DeleteKnightButton/DeleteKnightButton.vue';
import SeeKnightButton from './SeeKnightButton/SeeKnightButton.vue';

export default {
    data() {
        return {
            knights: [] as GetKnightOutput,
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
            this.getKnights().then(({ data }) => {
                this.knights = data;
                this.isLoading = false;
            });
        }
    },
    mounted() {
        this.fetchHeroes();
    },
    components: {
        AddKnightButton,
        TableComponent,
        DeleteKnightButton,
        SeeKnightButton
    },
}

</script>
<template>
    <section class="flex flex-col gap-5">
        <div class="flex flex-col md:flex-row gap-3 justify-between md:items-end">
            <div>
                <h2 class="text-xl font-bold">Knights</h2>
                <span class>Uma lista de todos os knights que ainda não se tornaram heróis.</span>
            </div>
            <div>
                <AddKnightButton @reload="$emit('reload')" />
            </div>
        </div>
        <TableComponent :ignored-keys="['_id']" :items="knights" :isLoading="isLoading">
            <template v-slot="item">
                <DeleteKnightButton @reload="$emit('reload')" :id="item?.item?._id"></DeleteKnightButton>
                <SeeKnightButton :id="item?.item?._id"></SeeKnightButton>
            </template>
        </TableComponent>
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