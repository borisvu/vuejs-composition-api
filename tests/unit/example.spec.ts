import { mount, flushPromises } from "@vue/test-utils";
import Timeline from "@/components/Timeline.vue";
import { today, thisWeek, thisMonth } from "@/mocks";
import { format } from "date-fns";

jest.mock("axios", () => ({
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  get: (url: string) => {
    return Promise.resolve({
      data: [today, thisWeek, thisMonth],
    });
  },
}));

async function loadTemplate() {
  const wrapper = mount({
    components: { Timeline },
    template: `
        <suspense>
          <template #default>
            <timeline />
          </template>
          <template #fallback>
            Loading...
          </template>
        </suspense>
      `,
  });

  await flushPromises();
  return wrapper;
}

describe("Timeline", () => {
  test("Renders today post default", async () => {
    const wrapper = await loadTemplate();

    expect(wrapper.html()).toContain(format(today.created, "do MMMM"));
  });

  test("Updated when the period is clicked for this week", async () => {
    const wrapper = await loadTemplate();

    await wrapper.get('[data-test="This Week"').trigger("click");

    expect(wrapper.html()).toContain(format(today.created, "do MMMM"));
    expect(wrapper.html()).toContain(format(thisWeek.created, "do MMMM"));
  });

  test("Updated when the period is clicked for this month", async () => {
    const wrapper = await loadTemplate();

    await wrapper.get('[data-test="This Month"').trigger("click");

    expect(wrapper.html()).toContain(format(today.created, "do MMMM"));
    expect(wrapper.html()).toContain(format(thisWeek.created, "do MMMM"));
    expect(wrapper.html()).toContain(format(thisMonth.created, "do MMMM"));
  });
});
