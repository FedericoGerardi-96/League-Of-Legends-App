<script>
  import { onMount } from "svelte";
  import { each } from "svelte/internal";
  export let skins = [];
  export let idChampion = "";

  let totalSkins = 0;

  onMount(() => {
    if (skins.length > 0) {
      totalSkins = skins.length;
    }
  });
</script>

<div class="carousel w-full">
  {#each skins as skin, index}
    <div id="slide{index}" class="carousel-item relative w-full">
      <div class="w-full h-full z-10 absolute top-0 left-0 bg-[rgba(0,0,0,.2)]" />
      <img
        src="https://ddragon.leagueoflegends.com/cdn/img/champion/splash/{idChampion}_{skin.num}.jpg"
        alt="skin {index}"
        class="w-full"
      />
      <footer class="absolute bottom-0 w-full">
        <div class="relative w-full flex justify-center items-center">
          <div class="blur-md bg-[rgba(0,0,0,.5)] absolute h-full w-full" />
          <h1 class="sm:text-4xl pb-5 md:text-5xl relative z-50 lg:text-7xl text-3xl">{skin.name} {index + 1}/{totalSkins}</h1>
        </div>
      </footer>
      <div class="absolute z-10 flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
        <a href="#slide{index == 0 ? totalSkins - 1 : index - 1}" class="btn btn-circle">❮ </a>
        <a href="#slide{index == totalSkins - 1 ? 0 : index + 1}" class="btn btn-circle">❯ </a>
      </div>
    </div>
  {/each}
</div>
