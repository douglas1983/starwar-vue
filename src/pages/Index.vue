<template>
  <q-page class="flex flex-center">
    <div class="row q-ma-lg content-center itens-center">
      <div class="col-12">
        <q-table
          grid
          :rows="people"
          :columns="columns"
          :pagination="pagination"
          hide-header
          hide-pagination
          ß
        >
        </q-table>
      </div>
      <div class="col-12 itens-center">
        <q-pagination
          class="full-width row q-ma-lg justify-center items-start content-center"
          v-model="page"
          :max="9"
        />
      </div>
    </div>
  </q-page>
</template>

<script>
import { defineComponent, ref, watch, computed } from "vue";
const columns = [
  {
    name: "name",
    required: true,
    label: "Name",
    align: "left",
    field: "name",
    sortable: true,
  },
  {
    name: "gender",
    align: "left",
    label: "Gender",
    field: "gender",
  },
  { name: "birth_year", label: "Birth Year", field: "birth_year" },
  { name: "height", label: "Height (cm)", field: "height" },
];

import { useStore } from "vuex";
export default defineComponent({
  name: "PageIndex",
  setup() {
    const store = useStore();
    const page = ref(1);
    watch(page, (page, prevPage) => {
      store.dispatch("people/getPeople", page);
    });
    const pagination = ref({
      rowsPerPage: 10,
    });
    store.dispatch("people/getPeople", 1);

    return {
      pagination,
      page,
      people: computed(() => store.state.people.people),
      columns,
    };
  },
});
</script>
