<template>
  <a :key="post.id" class="panel-block">
    <div class="is-flex is-flex-direction-column is-align-items-flex-start">
      <a>{{ post.title }}</a>
      <a>{{ formatDate(post.created) }}</a>
    </div>
  </a>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { format } from "date-fns";
import { Post } from "../store";

export default defineComponent({
  // eslint-disable-next-line vue/multi-word-component-names
  name: "TimelinePost",

  props: {
    post: {
      type: Object as () => Post,
      required: true,
    },
  },

  setup(props) {
    const formatDate = (date: Date) => {
      return format(date, "do MMMM");
    };

    return {
      formatDate,
      props,
    };
  },
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
