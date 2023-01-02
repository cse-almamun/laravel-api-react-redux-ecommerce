export const isEmptyObject = (item) => {
  if (item !== "undefined") {
    if (item) {
      if (item.length <= 0) {
        return true;
      }
    }
  } else {
    return false;
  }
};
