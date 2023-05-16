<script>
  import { page } from "$app/stores";
</script>

<header class="relative z-10">
  <div class="navbar bg-base-100">
    <div class="navbar-start">
      <div class="dropdown">
        <!-- svelte-ignore a11y-no-noninteractive-tabindex -->
        <!-- svelte-ignore a11y-label-has-associated-control -->
        <label tabindex="0" class="btn btn-ghost md:hidden">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"
            ><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h8m-8 6h16" /></svg
          >
        </label>
        <!-- svelte-ignore a11y-no-noninteractive-tabindex -->
        <ul tabindex="0" class="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52">
          <li>
            <a
              class={$page.url.pathname === "/" ? "active" : "nada"}
              aria-current={$page.url.pathname === "/" ? "page" : undefined}
              href="/">Home</a
            >
          </li>
          <li>
            <a
              class={$page.url.pathname === "/Hangman" ? "active" : ""}
              aria-current={$page.url.pathname === "/Hangman" ? "page" : undefined}
              href="/Hangman">Ahorcado</a
            >
          </li>
          <li>
            <a
              class={$page.url.pathname === "/wallpapers" ? "active" : ""}
              aria-current={$page.url.pathname === "/wallpapers" ? "page" : undefined}
              href="/wallpapers">Wallpapers</a
            >
          </li>
        </ul>
      </div>
      <a href="/" class="btn btn-ghost normal-case text-xl">League Of Legends</a>
    </div>
    <div class="navbar-center hidden md:flex">
      <ul class="menu menu-horizontal px-1">
        <li>
          <a
            class={$page.url.pathname === "/" ? "active" : ""}
            aria-current={$page.url.pathname === "/" ? "page" : undefined}
            href="/">Home</a
          >
        </li>
        <li>
          <a
            class={$page.url.pathname === "/Hangman" ? "active" : ""}
            aria-current={$page.url.pathname === "/Hangman" ? "page" : undefined}
            href="/Hangman">Ahorcado</a
          >
        </li>
        <li>
          <a
            class={$page.url.pathname === "/wallpapers" ? "active" : ""}
            aria-current={$page.url.pathname === "/wallpapers" ? "page" : undefined}
            href="/wallpapers">Wallpapers</a
          >
        </li>
      </ul>
    </div>
    <div class="navbar-end" />
  </div>
</header>
