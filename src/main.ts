import { createApp } from "vue";
import axios from "axios";
import App from "@/App.vue";
import { router } from "@/router";
import { today, thisWeek, thisMonth } from "@/mocks";

function delay() {
  return new Promise<void>((resolve) => {
    setTimeout(resolve, 2000);
  });
}

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
axios.get = async (url: string) => {
  if (url === "/posts") {
    await delay();
    return Promise.resolve({
      data: [today, thisWeek, thisMonth],
    });
  }
};

const app = createApp(App);
// Plugins got here.
app.use(router);
app.mount("#app");
