import { mount } from "@vue/test-utils";
import Timeline from "../../src/components/Timeline.vue";
import { today, thisWeek, thisMonth } from "../../src/mocks";
import { format } from "date-fns";

describe("Timeline", () => {
  it("Renders today post default", () => {
    const wrapper = mount(Timeline);

    expect(wrapper.html()).toContain(format(today.created, "do MMMM"));
  });

  it("Updated when the period is clicked", async () => {
    const wrapper = mount(Timeline);

    await wrapper.get('[data-test="This Week"').trigger("click");

    expect(wrapper.html()).toContain(format(today.created, "do MMMM"));
    expect(wrapper.html()).toContain(format(thisWeek.created, "do MMMM"));
  });

  it("Updated when the period is clicked", async () => {
    const wrapper = mount(Timeline);

    await wrapper.get('[data-test="This Month"').trigger("click");

    expect(wrapper.html()).toContain(format(today.created, "do MMMM"));
    expect(wrapper.html()).toContain(format(thisWeek.created, "do MMMM"));
    expect(wrapper.html()).toContain(format(thisMonth.created, "do MMMM"));
  });
});
