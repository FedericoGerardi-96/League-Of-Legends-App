<script>
  import { onMount } from "svelte";
  import { getChampion } from "../../../services/championsServices";
  import Loader from "../../../components/Loader.svelte";
  import Spells from "../../../components/spells.svelte";
  import Carousel from "../../../components/Carousel.svelte";

  let championName = "";
  let champion;

  onMount(() => {
    championName = window.location.href.split("/")[4];
    champion = getChampion(championName);
  });
</script>

<svelte:head>
  <title>League of Legends - {championName}</title>
  <meta name="description" content="Svelte demo app" />
</svelte:head>
<section id="championInfo" class="min-h-screen mx-auto container my-16 px-6 md:px-0">
  <div class="w-full flex justify-end items-center mb-10">
    <a href="/">
      <button class="btn btn-active btn-secondary">Lista de campeones</button>
    </a>
  </div>
  {#await champion}
    <Loader />
  {:then championData}
    {#if championData}
      <header class="hero relative flex items-end w-full h-[40rem] pb-10">
        <img
          class="w-full h-full object-cover rounded-lg shadow-lg absolute top-0 left-0 z-[1]"
          draggable="false"
          src={"https://ddragon.leagueoflegends.com/cdn/img/champion/splash/" + championData.data[0].id + "_0.jpg"}
          alt="Movie"
        />
        <div class="w-full h-full z-10 absolute top-0 left-0 bg-[rgba(0,0,0,.4)]" />
        <div class="relative flex flex-col items-center justify-center z-20 w-full">
          <div class="flex flex-col items-center justify-center relative top-[-20px]">
            <h2 class="md:text-4xl text-3x1 text-white">{championData.data[0].title}</h2>
            <h1 class="md:text-9xl text-7xl text-white">{championData.data[0].name}</h1>
          </div>
        </div>
      </header>
      <section class="lg:grid lg:grid-cols-2 flex flex-col md:border-b md:border-[.1px] md:border-white">
        <div class="md:p-12 relative flex justify-center lg:flex-row flex-col pb-8 lg:pb-0">
          <div
            class="after:bg-white lg:after:h-1/2 after:h-[.5px] lg:after:left-[100%] after:left-1/4 lg:after:top-1/4 lg:after:w-[.5px] after:w-1/2 after:absolute lg:after:right-0 after:bottom-0 after:block"
          />
          <div class="flex items-center flex-col md:flex-row justify-center gap-8">
            <div class="text-center">
              <h3 class="text-3xl md:pb-5 pb-2">Rol</h3>
              <p class="text-2xl text-primary">{championData.data[0].tags[0]}</p>
            </div>
            <div class="text-center">
              <h3 class="text-3xl md:pb-5 pb-2">Dificultad</h3>
              <progress
                class="progress progress-primary w-56 bg-white"
                value={championData.data[0].info.difficulty * 10}
                max="100"
              />
            </div>
          </div>
        </div>
        <div class="md:p-10 p-2">
          <p>{championData.data[0].lore}</p>
        </div>
      </section>
      <div class="divider" />
      <article class="py-6 card">
        <h1 class="ld:text-5xl md:text-4xl text-3xl">HABILIDADES</h1>
        <Spells pasive={championData.data[0].passive} spells={championData.data[0].spells} />
      </article>
      <div class="divider" />
      <article>
        <h1 class="ld:text-5xl md:text-4xl text-3xl my-6">TIPS CONTRA {championData.data[0].name.toUpperCase()}</h1>
        {#if championData.data[0].enemytips.length === 0}
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
              <span>No hay tips para este campeon</span>
            </div>
          </div>
        {:else}
          {#each championData.data[0].enemytips as tip}
            <div class="flex gap-5 my-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="stroke-current flex-shrink-0 h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                ><path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                /></svg
              >
              <span>{tip}</span>
            </div>
          {/each}
        {/if}
      </article>
      <div class="divider" />
      <article>
        <h1 class="ld:text-5xl md:text-4xl text-3xl my-6">ESTADISTICAS BASE</h1>
        <div class="flex flex-wrap justify-between gap-5">
          <div class="flex flex-col gap-5 my-4">
            {#each Object.entries(championData.data[0].stats) as [key, value], index}
              {#if index <= 5}
                <div class="flex gap-2">
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
                  <p>{key}: {value}</p>
                </div>
              {/if}
            {/each}
          </div>
          <div class="flex flex-col gap-5 my-4">
            {#each Object.entries(championData.data[0].stats) as [key, value], index}
              {#if index > 5 && index <= 10}
                <div class="flex gap-2">
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
                  <p>{key}: {value}</p>
                </div>
              {/if}
            {/each}
          </div>
          <div class="flex flex-col gap-5 my-4">
            {#each Object.entries(championData.data[0].stats) as [key, value], index}
              {#if index > 10 && index <= 15}
                <div class="flex gap-2">
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
                  <p>{key}: {value}</p>
                </div>
              {/if}
            {/each}
          </div>
          <div class="flex flex-col gap-5 my-4">
            {#each Object.entries(championData.data[0].stats) as [key, value], index}
              {#if index > 15}
                <div class="flex gap-2">
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
                  <p>{key}: {value}</p>
                </div>
              {/if}
            {/each}
          </div>
        </div>
      </article>
      <article class="py-12">
        <h1 class="ld:text-5xl md:text-4xl text-3xl my-6">ASPECTOS DISPONIBLES</h1>
        <Carousel idChampion={championData.data[0].id} skins={championData.data[0].skins} />
      </article>
    {:else}
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
            <span>Champions not found</span>
          </div>
        </div>
      </div>
    {/if}
  {/await}
</section>

<style>
  .hero {
    mask-image: linear-gradient(rgb(0, 0, 0) 65%, rgba(0, 0, 0, 0) 98%);
    -webkit-mask-image: linear-gradient(rgb(0, 0, 0) 65%, rgba(0, 0, 0, 0) 98%);
  }
</style>
