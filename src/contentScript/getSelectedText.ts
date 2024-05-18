export const getSelectedText = () => {
  const element = document.activeElement as any;
  const isInTextField =
    element.tagName === "INPUT" || element.tagName === "TEXTAREA";
  const selectedText = isInTextField
    ? element.value.substring(element.selectionStart, element.selectionEnd)
    : window.getSelection()?.toString() ?? "";
  return selectedText;
};
