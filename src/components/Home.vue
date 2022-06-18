<template>
  <suspense>
    <template #default>
      <timeline />
    </template>
    <template #fallback>
      <wait-spinner />
    </template>
  </suspense>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Timeline from "@/components/Timeline.vue";
import WaitSpinner from "@/components/WaitSpinner.vue";

export default defineComponent({
  name: "App",
  components: {
    Timeline,
    WaitSpinner,
  },
});
</script>
