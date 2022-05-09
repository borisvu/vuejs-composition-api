<template>
  <nav class="is-primary panel">
    <span class="panel-tabs">
      <a
        v-for="period in periods"
        :key="period"
        :class="{ 'is-active': period === currentPeriod }"
        :data-test="period"
        @click="setPeriod(period)"
      >
        {{ period }}
      </a>
    </span>
    <timeline-post
      v-for="post in posts"
      :key="post.id"
      class="panel-block"
      :post="post"
    />
  </nav>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from "vue";
import { isAfter, format, subDays, subWeeks, subMonths } from "date-fns";
import { today, thisWeek, thisMonth } from "../mocks";
import TimelinePost from "./TimelinePost.vue";

type Period = "Today" | "This Week" | "This Month";

export default defineComponent({
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Timeline",

  components: {
    TimelinePost,
  },

  setup() {
    const periods: Period[] = ["Today", "This Week", "This Month"];
    const currentPeriod = ref<Period>("Today");
    const posts = computed(() => {
      return [today, thisWeek, thisMonth].filter((post) => {
        if (currentPeriod.value === "Today") {
          return isAfter(post.created, subDays(new Date(), 1));
        }
        if (currentPeriod.value === "This Week") {
          return isAfter(post.created, subWeeks(new Date(), 1));
        }
        if (currentPeriod.value === "This Month") {
          return isAfter(post.created, subMonths(new Date(), 1));
        }
        return false;
      });
    });

    const setPeriod = (period: Period) => {
      currentPeriod.value = period;
    };

    const formatDate = (date: Date) => {
      return format(date, "do MMMM");
    };

    return {
      periods,
      currentPeriod,
      setPeriod,
      formatDate,
      posts,
    };
  },
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
