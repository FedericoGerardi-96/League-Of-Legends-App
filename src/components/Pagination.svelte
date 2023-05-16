<script>
  import { createEventDispatcher } from "svelte";

  // Paginación
  export let items = [];
  export let currentPage;
  export let totalPages;

  let pageRest = 0;

  $: {
    if (totalPages < 4) {
      pageRest = totalPages;
    } else {
      pageRest = 4;
    }
  }

  const dispatch = createEventDispatcher();

  let pageSize = 6;

  function handleNextPage() {
    dispatch("nextPage");
  }
  function handleFirstPage() {
    dispatch("firstPage");
  }
  function handlePage(page) {
    dispatch("page", { page });
  }
  function handleLastPage(page) {
    dispatch("lastPage", { page });
  }

  function handlePrevPage() {
    dispatch("prevPage");
  }
</script>

<div class="mb-12 flex items-center justify-center">
  <div class="btn-group">
    {#if totalPages < 8}
      {#if totalPages === 1}
        <button class="btn" disabled> 1 </button>
      {:else}
        <div class="btn-group grid grid-cols-2">
          <button
            on:click={handlePrevPage}
            disabled={currentPage === 1}
            class:btn-disable={currentPage === 1}
            class="btn btn-outline">Previous page</button
          >
          <button
            on:click={handleNextPage}
            disabled={currentPage === totalPages}
            class:btn-disable={currentPage === totalPages}
            class="btn btn-outline">Next</button
          >
        </div>
      {/if}
    {:else}
      <div class="md:mr-8 mr-4">
        <!-- button next page -->
        <button class:btn-disable={currentPage === 1} disabled={currentPage === 1} class="btn" on:click={handlePrevPage}
          >&lt;</button
        >
      </div>
      {#each Array.from(Array(totalPages).keys()) as page}
        {#if (page === 0 && currentPage > 2) || (page === items.length / pageSize - 1 && currentPage !== totalPages)}
          <button
            disable={currentPage === 1}
            class:btn-disable={currentPage === 1}
            on:click={handleFirstPage}
            class="btn hidden md:block"
          >
            1
          </button>
          <button class="btn hidden md:block" disabled>...</button>
        {:else if Math.abs(currentPage - (page + 1)) <= 1 || page === 0 || page === items.length / pageSize - 1}
          <button disabled={currentPage === page + 1} class="btn" class:btn-active={currentPage === page + 1} on:click={handlePage(page + 1)}>
            {page + 1}
          </button>
        {:else if (page === totalPages - 1 && currentPage < totalPages) || (page === items.length / pageSize - 1 && currentPage !== totalPages)}
          <button class="btn hidden md:block" disabled>...</button>
          <button
            disabled={currentPage === totalPages}
            class:btn-disable={currentPage === totalPages}
            on:click={handleLastPage(totalPages)}
            class="btn hidden md:block">{totalPages}</button
          >
        {/if}
      {/each}
      <div class="md:ml-8 ml-4">
        <!-- button preview page -->
        <button
          class:btn-disable={currentPage === totalPages}
          disabled={currentPage === totalPages}
          class="btn"
          on:click={handleNextPage}>&gt;</button
        >
      </div>
    {/if}
  </div>
</div>
