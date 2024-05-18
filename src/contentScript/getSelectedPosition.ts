export const getSelectedPosition = () => {
  const element = document.activeElement;
  const isInTextField =
    element.tagName === "INPUT" || element.tagName === "TEXTAREA";
  const selectedRect = isInTextField
    ? element.getBoundingClientRect()
    : window.getSelection().getRangeAt(0).getBoundingClientRect();

  let selectedPosition;
  const panelReferencePoint = "bottomSelectedText" as string;
  switch (panelReferencePoint) {
    case "topSelectedText":
      selectedPosition = {
        x: selectedRect.left + selectedRect.width / 2,
        y: selectedRect.top,
      };
      break;
    case "bottomSelectedText":
    default:
      selectedPosition = {
        x: selectedRect.left + selectedRect.width / 2,
        y: selectedRect.bottom,
      };
      break;
  }
  return selectedPosition;
};
