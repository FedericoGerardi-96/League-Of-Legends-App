<script>
  import Header from "./Header.svelte";
  import "./styles.css";
  import "../app.css";
</script>

<div class="app">
  <Header />

  <main>
    <slot />
  </main>

  <footer class="footer footer-center p-4 bg-base-300 text-base-content">
    <div>
      <p>
        Page designed with <a href="https://svelte.dev/" target="_blank" class="text-primary">svelte</a> by
        <a class="text-primary" target="_blank" href="https://www.linkedin.com/in/federico-gerardi96/">Federico Gerardi</a> ♥
      </p>
    </div>
  </footer>
</div>

<style>
  .app {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
  }
</style>
