import { beforeEach, describe, expect, it } from "vitest";
import { mount } from "@vue/test-utils";
import HomeView from "./HomeView.vue";

describe("home page ui", () => {
  it("search bar should be autofocused", () => {
    const wrapper = mount(HomeView, {
      props: {},
    });
    // expect(document.activeElement).equals(wrapper.find("input"));
  });
});
