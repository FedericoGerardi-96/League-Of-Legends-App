// PaginationService.js
import { writable } from 'svelte/store';

export function createPaginationService(itemsPerPage) {
  const { subscribe, set, update } = writable({
    items: [],
    currentPage: 1,
    totalPages: 0
  });

  function setItems(items) {
    update(pagination => {
      const totalPages = Math.ceil(items.length / itemsPerPage);
      const currentPage = Math.min(pagination.currentPage, totalPages);
      return {
        ...pagination,
        items: items,
        currentPage,
        totalPages
      };
    });
  }

  function goToPage(page) {
    update(pagination => {
      const currentPage = Math.min(Math.max(page, 1), pagination.totalPages);
      return {
        ...pagination,
        currentPage: currentPage
      };
    });
  }

  return {
    subscribe,
    setItems,
    goToPage
  };
}
