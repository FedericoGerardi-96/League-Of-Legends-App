<script>
  import { onMount } from "svelte";

  import { paginate } from "svelte-paginate";

  import Pagination from "./Pagination.svelte";
  import { getChampions } from "../services/championsServices";
  import Loader from "./Loader.svelte";
  import { createPaginationService } from "../services/paginationServices";

  // Lista campeones
  let champions = [];
  // Mensaje de error si sale mal la petición
  let messageResponse = "";
  // Valor del input de búsqueda
  let valueInput = "";
  // Cargando
  let loading = true;

  // Paginación
  let items = [];
  let currentpage = 1;
  let pageSize = 6;
  let totalpages = 0;
  // Datos de la paginación
  let paginatedItems = [];

  let tookInput = false;
  // Servicio de paginación
  const paginationService = createPaginationService(6);

  // Función para mostrar todos los campeones en caso de tener el input vacio
  $: {
    if (champions !== null && valueInput === "") {
      paginationService.setItems(champions);
    }
    paginationService.goToPage(1);
  }
  $: {
    if (champions !== null && items.length === 0 && tookInput === true) {
      paginationService.setItems(champions);
    }
  }

  onMount(async () => {
    loading = true;
    const { data, ok, message } = await getChampions();
    champions = data;
    items = champions;
    paginationService.setItems(champions);
    if (!ok) {
      messageResponse = message;
      loading = false;
      return;
    }
    loading = false;
  });

  paginationService.subscribe(({ items, currentPage, totalPages }) => {
    // Actualizar los datos en el componente
    items = items;
    currentPage = currentPage;
    totalpages = totalPages;
  });

  // Modifico la paginacion en caso de que se modifique el valor de los campeones
  $: {
    const { items, currentPage } = $paginationService;
    currentpage = currentPage;
    if (items.length > 0) {
      paginatedItems = paginate({ items, pageSize, currentPage });
    }
  }

  // Función para filtrar los campeones
  const filterChampions = (event) => {
    loading = true;
    const value = event.target.value.toLowerCase();
    valueInput = value;
    items = champions.filter((champion) => {
      if (champion.name.toLowerCase().includes(value) || champion.id.toLowerCase().includes(value)) {
        return champion;
      }
    });
    paginationService.setItems(items);
    tookInput = true;
    loading = false;
  };

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

<section class="container mx-auto px-10" id="champions">
  <h1 class="text-primary text-3xl my-6">League Of Legends champions:</h1>
  <input
    on:input={filterChampions}
    value={valueInput}
    type="text"
    placeholder="Buscar campeones..."
    class="input input-bordered input-info w-full"
  />
  {#if loading}
    <Loader />
  {:else if champions === null}
    <div class="my-12">
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
          <span>Error! {messageResponse}</span>
        </div>
      </div>
    </div>
  {:else if paginatedItems.length === 0}
    <div class="my-12">
      <div class="alert alert-info shadow-lg">
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
          <span>No se encontaron campeones con la busqueda de: <b class="text-red-600">{valueInput}</b></span>
        </div>
      </div>
    </div>
  {:else}
    <div class="grid gap-4 grid-cols-1 lg:grid-cols-3 md:grid-cols-2 justify-items-center py-12">
      {#each paginatedItems as item}
        <div class="card xl:w-96 lg:w-72 md:w-64 w-full bg-sky-950 shadow-xl">
          <figure>
            <img
              draggable="false"
              src={"https://ddragon.leagueoflegends.com/cdn/img/champion/splash/" + item.id + "_0.jpg"}
              alt="Movie"
            />
          </figure>
          <div class="card-body">
            <h2 class="card-title">{item.name}</h2>
            <p>{item.title}</p>
            <div class="card-actions justify-end">
              <a href="/champion/{item.id}">
                <button class="btn btn-primary text-[12px]">Más informacion...</button>
              </a>
            </div>
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
</section>
