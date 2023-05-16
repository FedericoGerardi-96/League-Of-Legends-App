<script>
  export let spells = [];
  export let pasive = {};

  let activeTab = "q";

  const championAbilities = {
    pasive: pasive,
    q: spells[0],
    w: spells[1],
    e: spells[2],
    r: spells[3],
  };

  function setActiveTab(tab) {
    activeTab = tab;
  }
</script>

{#if spells && pasive}
  <div class="tabs my-8">
    <ul>
      <li class="tab tab-lg tab-bordered hover:scale-105 {activeTab === 'pasive' ? 'tab-active' : ''}">
        <button class="flex gap-2" on:click={() => setActiveTab("pasive")}>
          <span /> Pasiva
          <img
            class="w-[2rem] h-[2rem]"
            src="https://ddragon.leagueoflegends.com/cdn/13.9.1/img/passive/{pasive.image.full}"
            alt={pasive.image.full}
          />
        </button>
      </li>
      <li class="tab tab-lg tab-bordered hover:scale-105 {activeTab === 'q' ? 'tab-active' : ''}">
        <button class="flex gap-2" on:click={() => setActiveTab("q")}>
          <span /> Q
          <img
            class="w-[2rem] h-[2rem]"
            src="https://ddragon.leagueoflegends.com/cdn/13.9.1/img/spell/{spells[0].image.full}"
            alt={spells[0].image.full}
          />
        </button>
      </li>
      <li class="tab tab-lg tab-bordered hover:scale-105 {activeTab === 'w' ? 'tab-active' : ''}">
        <button class="flex gap-2" on:click={() => setActiveTab("w")}>
          <span />W
          <img
            class="w-[2rem] h-[2rem]"
            src="https://ddragon.leagueoflegends.com/cdn/13.9.1/img/spell/{spells[1].image.full}"
            alt={spells[1].image.full}
          />
        </button>
      </li>
      <li class="tab tab-lg tab-bordered hover:scale-105 {activeTab === 'e' ? 'tab-active' : ''}">
        <button class="flex gap-2" on:click={() => setActiveTab("e")}>
          <span />E
          <img
            class="w-[2rem] h-[2rem]"
            src="https://ddragon.leagueoflegends.com/cdn/13.9.1/img/spell/{spells[2].image.full}"
            alt={spells[2].image.full}
          />
        </button>
      </li>
      <li class="tab tab-lg tab-bordered hover:scale-105 {activeTab === 'r' ? 'tab-active' : ''}">
        <button class="flex gap-2" on:click={() => setActiveTab("r")}>
          <span />R
          <img
            class="w-[2rem] h-[2rem]"
            src="https://ddragon.leagueoflegends.com/cdn/13.9.1/img/spell/{spells[3].image.full}"
            alt={spells[3].image.full}
          />
        </button>
      </li>
    </ul>
  </div>

  <div class="tab-content flex flex-col justify-center md:justify-start">
    <h3 class="text-primary text-2xl lg:text-3xl">{championAbilities[activeTab].name}</h3>
    <p class="mt-2 lg:text-2xl w-1/2">{championAbilities[activeTab].description}</p>
    {#if activeTab !== "pasive"}
      <div class="stats stats-vertical md:stats-horizontal shadow">
        <div class="stat place-items-center">
          <div class="stat-title">Rango</div>
          <div class="stat-value text-2xl lg:text-3xl">{championAbilities[activeTab].cooldownBurn}</div>
        </div>

        <div class="stat place-items-center">
          <div class="stat-title">Cool Down</div>
          <div class="stat-value text-2xl lg:text-3xl text-secondary">{championAbilities[activeTab].cooldownBurn}</div>
        </div>
        {#if championAbilities[activeTab].costType !== "Sin costo"}
          <div class="stat place-items-center">
            <div class="stat-title">Costo de mana</div>
            <div class="stat-value text-2xl lg:text-3xl">{championAbilities[activeTab].costBurn}</div>
          </div>
        {/if}
      </div>
    {/if}
  </div>
{:else}
  <div class="alert alert-error shadow-lg my-10">
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
      <span>Error al traer la informacion</span>
    </div>
  </div>
{/if}
