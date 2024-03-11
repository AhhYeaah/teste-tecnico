<template>
    <div class="border rounded-sm overflow-hidden">
        <TableSkeleton v-if="isLoading" />
        <table v-else-if="itemsWithIgnoredKeys.length > 0" class="table-auto w-full">
            <thead>
                <tr>
                    <th v-for="(_value, key) in itemsWithIgnoredKeys[0]" :key="key">
                        {{ formatHeader(key) }}
                    </th>
                    <th v-if="hasChildren" class="w-fit"></th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(item, index) in itemsWithIgnoredKeys" :key="index">
                    <td v-for="(value, key) in item" :key="key">{{ value }}</td>
                    <td v-if="hasChildren" class="flex items-center justify-evenly flex-row gap-3">
                        <slot :item="items[index]" />
                    </td>
                </tr>
            </tbody>
        </table>
        <div v-else class="p-4 text-center">{{ emptyMessage }}</div>
    </div>
</template>

<script lang="ts">
import TableSkeleton from './TableSkeleton.vue';

export default {
    props: {
        items: {
            type: Array as () => Record<string, any>[],
            default: () => [],
        },
        emptyMessage: {
            type: String,
            default: () => "A tabela esta vazia.",
        },
        isLoading: {
            type: Boolean,
            default: () => false,
        },
        ignoredKeys: {
            type: Array as () => string[],
            default: () => [],
        },
    },
    setup(_, { slots }) {
        let hasChildren = false;
        if (slots.default) {
            hasChildren = slots.default().length >= 1;
        }
        return { hasChildren };
    },
    computed: {
        itemsWithIgnoredKeys() {
            return this.items.map((item: Record<string, any>) => {
                const newItem = { ...item };
                this.ignoredKeys.forEach((key) => {
                    delete newItem[key];
                });
                return newItem;
            });
        },
    },
    methods: {
        formatHeader(key: string | number) {
            return String(key).split("_").join(" ").toUpperCase();
        },
    },
    components: {
        TableSkeleton,
    }
};
</script>

<style scoped>
th,
td {
    @apply p-[10px] text-left;
}

thead th {
    @apply bg-gray-100;
}
</style>
