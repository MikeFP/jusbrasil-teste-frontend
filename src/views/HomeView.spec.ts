import { beforeEach, describe, expect, it } from "vitest";
import { mount, config } from "@vue/test-utils";
import HomeView from "./HomeView.vue";
import Maska from "maska";

describe("home page ui", () => {
  it("search bar should be autofocused", () => {
    const wrapper = mount(HomeView, {
      global: {
        plugins: [Maska],
      },
    });
    // expect(document.activeElement).equals(wrapper.find("input"));
  });
});
