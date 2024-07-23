function optimistic(item, data) {
  return {
    showNewItem(cb) {
      cb;
    },
    filterDeletedItem(id) {
      return data.filter((item) => item.id !== id);
    },
  };
}
export default optimistic;
