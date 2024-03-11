<script lang="ts">
import HeroTable from './HeroTable/HeroTable.vue';
import KnightTable from './KnightTable/KnightTable.vue';
import { v4 as uuid } from 'uuid';

export default {
    data() {
        return {
            tables: uuid()
        }
    },
    methods: {
        refreshTables() {
            this.tables = uuid()
        }
    },
    components: {
        KnightTable,
        HeroTable
    },
}
</script>
<template>
    <div class="max-w-screen-lg w-full flex flex-col gap-10 p-10" :key="tables">
        <KnightTable @reload="refreshTables"></KnightTable>
        <HeroTable></HeroTable>
    </div>
</template>