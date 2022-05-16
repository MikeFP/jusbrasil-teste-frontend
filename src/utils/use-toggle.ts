import { reactive, ref } from "vue";

export default function useToggle() {
  const isToggled = ref(false);
  function toggle() {
    isToggled.value = !isToggled.value;
  }
  return reactive({
    isToggled,
    toggle,
  });
}
