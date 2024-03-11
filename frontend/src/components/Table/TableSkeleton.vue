<script lang="ts">
export default {
    props: {
        rows: {
            type: Number,
            default: () => 3,
        },
        columns: {
            type: Number,
            default: () => 5,
        },
    }
}
</script>

<template>
    <div class="border rounded-sm overflow-hidden">
        <table class="table-auto w-full">
            <thead>
                <tr>
                    <th v-for="n in columns" :key="n">
                        <div class="animate-pulse h-5 bg-slate-200"></div>
                    </th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="n in rows" :key="n">
                    <td v-for="n in columns" :key="n">
                        <div class="animate-pulse h-5 bg-slate-200"></div>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<style scoped>
th,
td {
    @apply p-[10px] text-left;
}

thead th {
    @apply bg-gray-100;
}
</style>
