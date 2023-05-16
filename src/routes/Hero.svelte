<script>
  import { scrollto } from "svelte-scrollto";
</script>

<section id="hero" class="w-full">
  <div class="hero" style="background-image: url(images/Hero.jpg);">
    <div class="hero-overlay bg-opacity-60" />
    <div class="hero-content text-center text-neutral-content">
      <div class="max-w-md">
        <h1 class="text-5xl font-bold">League Of Legends</h1>
        <h1 class="mb-5 text-4xl font-bold">Wiki</h1>
        <p class="mb-5">Lee informacion sobre tu campeon favorito, items, runas, y mas!</p>
        <button use:scrollto={'#champions'} class="btn btn-primary">Empezar !</button>
      </div>
    </div>
  </div>
</section>

<style>
  .hero {
    min-height: calc(100vh - 4rem);
  }
</style>
