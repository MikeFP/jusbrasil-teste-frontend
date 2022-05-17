import { assert, describe, it, expect } from "vitest";
import HomeView from "./HomeView.vue";
import Maska from "maska";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { render, fireEvent, waitFor } from "@testing-library/vue";
import "@testing-library/jest-dom";
import { mount } from "@vue/test-utils";

describe("home page ui", () => {
  it("search bar is autofocused", async () => {
    const wrapper = mount(HomeView, {
      global: {
        plugins: [Maska],
        components: {
          "font-awesome-icon": FontAwesomeIcon,
        },
      },
      attachTo: document.body,
    });
    const input = wrapper.find("input");
    assert(document.activeElement.isSameNode(input.element));
    document.body.innerHTML = "";
  });

  it("error message is hidden initially", () => {
    const { queryByTestId } = render(HomeView, {
      global: {
        plugins: [Maska],
        components: {
          "font-awesome-icon": FontAwesomeIcon,
        },
      },
    });
    const errorMessage = queryByTestId("error-message");
    expect(errorMessage).not.toBeInTheDocument();
  });

  it("error message shows up when invalid input is submitted", async () => {
    const { getByRole, queryByTestId } = render(HomeView, {
      global: {
        plugins: [Maska],
        components: {
          "font-awesome-icon": FontAwesomeIcon,
        },
      },
    });
    const input = getByRole("textbox");
    input.focus();
    await fireEvent.keyDown(input, { key: "Enter", code: "Enter", charCode: 13 });
    await waitFor(() => {
      expect(queryByTestId("error-message")).toBeInTheDocument();
    });
  });
});
