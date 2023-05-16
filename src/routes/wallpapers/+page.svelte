<script>
  import { onMount } from "svelte";
  import { paginate } from "svelte-paginate";
  import Pagination from "../../components/Pagination.svelte";

  import moment from "moment";

  import { createPaginationService } from "../../services/paginationServices";

  import Loader from "../../components/Loader.svelte";
  import { searchDanbooruAnimeImages } from "../../services/danbooru";

  // Valor del input de búsqueda
  let valueInput = "";
  let images = [];
  let loading = false;
  let isButtonClicked = false;
  let clickDate = false;
  let selectedDate = null;
  let isOver18 = false;

  // Paginación
  let items = [];
  let currentpage = 1;
  let pageSize = 6;
  let totalpages = 0;
  // Datos de la paginación
  let paginatedItems = [];

  const paginationService = createPaginationService(9);

  onMount(() => {});

  paginationService.subscribe(({ items, currentPage, totalPages }) => {
    // Actualizar los datos en el componente
    items = items;
    currentPage = currentPage;
    totalpages = totalPages;
  });

  function checkIfOver18() {
    const now = moment();
    const birthDate = moment(selectedDate, "YYYY-MM-DD");
    isOver18 = now.diff(birthDate, "years") >= 18;
    clickDate = true;
  }

  // Modifico la paginacion en caso de que se modifique el valor de los campeones
  $: {
    const { items, currentPage } = $paginationService;
    currentpage = currentPage;
    if (items.length > 0) {
      paginatedItems = paginate({ items, pageSize, currentPage });
    }
  }

  function searchDanbooruImages(e) {
    isButtonClicked = true;
    loading = true;
    const textSearch = valueInput.replace(/\s+/g, "_");
    // Llama a la función de búsqueda de imágenes pasando el nombre del anime
    searchDanbooruAnimeImages(textSearch)
      .then((imagesResp) => {
        images = imagesResp;
        paginationService.setItems(imagesResp);
        loading = false;
      })
      .catch((error) => {
        loading = false;
        console.error("Error al buscar imágenes:", error);
      });
  }

  function handleNextPage() {
    paginationService.goToPage(currentpage + 1);
  }

  function handlePrevPage() {
    paginationService.goToPage(currentpage - 1);
  }
  function handleFirstPage() {
    paginationService.goToPage(1);
  }
  function handlePage(event) {
    paginationService.goToPage(event.detail.page);
  }
  function handleLastPage(event) {
    paginationService.goToPage(event.detail.page);
  }
</script>

<svelte:head>
  <title>League of Legends - Wallpapers</title>
  <meta name="description" content="Svelte demo app" />
</svelte:head>
<section class="mx-auto container min-h-screen px-6 md:px-0">
  {#if clickDate}
    {#if isOver18}
      <h1 class="text-primary text-3xl my-6">League Of Legends Images:</h1>
      <form on:submit|preventDefault={searchDanbooruImages}>
        <div class="w-full flex flex-col md:flex-row gap-8">
          <input
            bind:value={valueInput}
            type="text"
            placeholder="Buscar campeones..."
            class="input input-bordered input-info w-full md:w-[75%]"
          />
          <button type="submit" class="btn btn-primary w-full md:w-[25%]">Buscar...</button>
        </div>
      </form>
      {#key (images, loading)}
        {#if loading}
          <Loader />
        {:else if paginatedItems.length <= 0 && isButtonClicked}
          <div class="alert alert-info shadow-lg my-6">
            <div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                class="stroke-current flex-shrink-0 w-6 h-6"
                ><path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                /></svg
              >
              <span>No se encontraron imagenes con el tag: {valueInput}</span>
            </div>
          </div>
        {:else if paginatedItems.length > 0 && isButtonClicked}
          <div class="grid grid-cols-3 gap-4 my-6">
            {#each paginatedItems as image}
              <div class="card">
                <div class="card-body p-0">
                  <a href={image} target="_blank">
                    <img src={image} alt={valueInput} />
                  </a>
                </div>
              </div>
            {/each}
          </div>
          <Pagination
            {items}
            currentPage={currentpage}
            totalPages={totalpages}
            on:prevPage={handlePrevPage}
            on:nextPage={handleNextPage}
            on:firstPage={handleFirstPage}
            on:lastPage={handleLastPage}
            on:page={handlePage}
          />
        {/if}
      {/key}
    {:else}
      <div class="flex items-center justify-center w-full h-screen ">
        <div class="alert alert-error shadow-lg">
          <div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="stroke-current flex-shrink-0 h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              ><path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
              /></svg
            >
            <span>No eres mayor de 18 años.</span>
          </div>
        </div>
      </div>
    {/if}
  {:else}
    <div class="my-20 flex items-center flex-col gap-10 justify-center w-full h-full">
      <form on:submit|preventDefault={checkIfOver18} class="flex flex-col items-center justify-center gap-8">
        <h1 class="md:text-4xl text-3x1 text-primary">Ingrese su fecha de nacimiento:</h1>
        <div class="relative">
          <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <svg
              class="w-5 h-5 text-gray-500 dark:text-gray-400"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                clip-rule="evenodd"
              />
            </svg>
          </div>
          <input
            bind:value={selectedDate}
            datepicker=""
            datepicker-autohide
            type="date"
            class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 datepicker-input"
            placeholder="Select date"
          />
        </div>
        <button type="submit" class="btn btn-primary">Validar edad...</button>
      </form>
    </div>
  {/if}
</section>
