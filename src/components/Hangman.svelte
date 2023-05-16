<script>
  import { onMount } from "svelte";
  import Keyboard from "svelte-keyboard";
  import { getChampions, getChampion } from "../services/championsServices";
  import { celebrate } from "../util/Confetti";

  let championList = []; // Lista de campeones
  let selectedChampion = {}; // Campeón seleccionado
  let selectedChampionMoreInfo = {}; // Campeón seleccionado
  let championNameSelectied = ""; // Nombre del campeón seleccionado
  let guessedLetters = []; // Letras adivinadas
  let letterSelected = ""; // Letra seleccionada
  let attempts = 0; // Intentos realizados
  let maxAttempts = 6; // Máximo de intentos permitidos
  let gameWon = false; // Bandera para indicar si se ganó el juego
  let gameLost = false; // Bandera para indicar si se perdió el juego
  const keys = [
    { row: 0, value: "Q" },
    { row: 0, value: "W" },
    { row: 0, value: "E" },
    { row: 0, value: "R" },
    { row: 0, value: "T" },
    { row: 0, value: "Y" },
    { row: 0, value: "U" },
    { row: 0, value: "I" },
    { row: 0, value: "O" },
    { row: 0, value: "P" },
    { row: 1, value: "A" },
    { row: 1, value: "S" },
    { row: 1, value: "D" },
    { row: 1, value: "F" },
    { row: 1, value: "G" },
    { row: 1, value: "H" },
    { row: 1, value: "J" },
    { row: 1, value: "K" },
    { row: 1, value: "L" },
    { row: 2, value: "Z" },
    { row: 2, value: "X" },
    { row: 2, value: "C" },
    { row: 2, value: "V" },
    { row: 2, value: "B" },
    { row: 2, value: "N" },
    { row: 2, value: "M" },
  ];

  const images = {
    0: "images/HangMan.png",
    1: "images/HangMan-2.png",
    2: "images/HangMan-3.png",
    3: "images/HangMan-4.png",
    4: "images/HangMan-5.png",
    5: "images/HangMan-6.png",
    6: "images/HangMan-7.png",
  };

  onMount(async () => {
    startGame();
  });

  async function setNewChampionRandom() {
    const { data, ok, message } = await getChampions();
    if (ok) {
      championList = data;
      selectedChampion = championList[Math.floor(Math.random() * championList.length)];
      if (selectedChampion) {
        championNameSelectied = selectedChampion.name.toUpperCase();
        selectedChampionMoreInfo = await getChampion(selectedChampion.id);
      }
    } else {
      console.error(message);
    }
  }

  function startGame() {
    setNewChampionRandom();
    guessedLetters = [];
    attempts = 0;
    gameWon = false;
    gameLost = false;
  }

  function checkGameStatus() {
    if (isGameWon()) {
      gameWon = true;
      return;
    }
    gameLost = true;
  }

  function isValidLetter(letter) {
    // Expresión regular para filtrar letras válidas (solo sin acento)
    const validLettersRegex = /^[A-Za-z]+$/;
    return validLettersRegex.test(letter);
  }

  function isGameWon() {
    for (let letter of championNameSelectied) {
      // Ignorar letras inválidas
      if (isValidLetter(letter)) {
        if (!guessedLetters.includes(letter.toUpperCase())) {
          return false;
        }
      }
    }
    celebrate();
    return true;
  }

  function isGameLost() {
    return attempts >= maxAttempts;
  }

  const onKeydown = (event) => {
    if (gameWon || gameLost) return;
    if (guessedLetters.includes(event.detail)) return;
    if (championNameSelectied.includes(event.detail.toUpperCase())) {
      guessedLetters = [...guessedLetters, event.detail.toUpperCase()];
      letterSelected = event.detail;
      if (isGameWon()) checkGameStatus();
      return;
    }
    if (attempts < 6) {
      attempts++;
    }
  };

  function letterInclude(letter) {
    let include = false;
    guessedLetters.forEach((element) => {
      if (element.toUpperCase() == letter.toUpperCase()) {
        include = true;
        return true;
      }
    });
    return include;
  }

  $: {
    if (attempts >= 6) {
      checkGameStatus();
    }
  }
</script>

<section class="hangman-container mx-auto container">
  {#if gameWon}
    <div class="flex justify-center flex-col items-center lg:px-0 px-5">
      <h2 class="text-4xl text-primary">¡Ganaste!</h2>
      <p class="text-3xl text-primary">{championNameSelectied}</p>
      <div class="divider" />
      <div class="w-full h-[20rem] mt-12">
        <img
          class="w-full mask mask-hexagon-2 md:h-full h-[15rem] object-contain md:object-cover rounded-lg shadow-lg"
          draggable="false"
          src={"https://ddragon.leagueoflegends.com/cdn/img/champion/splash/" +
            selectedChampionMoreInfo.data[0].id +
            "_0.jpg"}
          alt="Movie"
        />
      </div>
    </div>
    <div class="flex md:flex-row flex-col gap-8 justify-center items-center mt-10">
      <a href="/champion/{selectedChampion.id}">
        <button class="btn btn-wide text-[12px]">Más informacion...</button>
      </a>
      <button class="btn btn-wide" on:click={startGame}>Jugar de nuevo</button>
    </div>
  {:else if gameLost}
    <div class="flex justify-center flex-col items-center">
      <h2 class="text-4xl text-primary">¡Perdiste!</h2>
      <p class="text-3xl text-primary">El campeón era: {championNameSelectied}</p>
      <div class="divider" />
      <div class="w-full h-[20rem] mt-12">
        <img
          class="w-full mask mask-hexagon-2 md-h-full h-[15rem] object-contain md:object-cover rounded-lg shadow-lg"
          draggable="false"
          src={"https://ddragon.leagueoflegends.com/cdn/img/champion/splash/" +
            selectedChampionMoreInfo.data[0].id +
            "_0.jpg"}
          alt="Movie"
        />
      </div>
    </div>
    <div class="flex md:flex-row flex-col gap-8 justify-center items-center mt-10">
      <a href="/champion/{selectedChampion.id}">
        <button class="btn btn-wide text-[12px]">Más informacion...</button>
      </a>
      <button class="btn btn-wide " on:click={startGame}>Jugar de nuevo</button>
    </div>
  {:else}
    <h2 class="text-6xl text-primary px-8 md:px-0">Adivina al campeón</h2>
    <div class="mt-8 text-start px-8 md:px-0">
      <h3 class="">¡Bienvenido(a) a mi juego del ahorcado de campeones del League of Legends!</h3>
      <p class="mt-4">
        El objetivo del juego es adivinar el nombre del campeón oculto antes de que se complete el dibujo del ahorcado.
        Cada vez que adivines una letra correcta, se mostrará en su posición correspondiente en la palabra. Pero, ¡ten
        cuidado! Si te equivocas, se dibujará una parte del cuerpo del ahorcado.
      </p>
      <div class="collapse">
        <input type="checkbox" />
        <div class="collapse-title text-xl font-medium"><p>Click aquí para leer las reglas básicas del juego:</p></div>
        <div class="collapse-content">
          <ol>
            <li>1. Elige una letra: Haz clic en una letra en el teclado virtual para adivinarla.</li>
            <li>
              2. Adivina la palabra: Intenta adivinar la palabra oculta ingresando letras una por una. Puedes hacer clic
              en las letras en cualquier orden.
            </li>
            <li>
              3. Aciertos y errores: Si la letra que has elegido está en la palabra, se revelará en su posición
              correspondiente. Si la letra no está en la palabra, se dibujará una parte del cuerpo del ahorcado.
            </li>
            <li>
              4. Gana o pierde: Si adivinas todas las letras de la palabra antes de que se complete el dibujo del
              ahorcado, ¡has ganado! Pero si se completa el dibujo del ahorcado antes de adivinar la palabra, ¡has
              perdido!
            </li>
            <p>
              Recuerda que las palabras ocultas son nombres de campeones del League of Legends. Si eres un fanático del
              juego, ¡seguro disfrutarás mucho de este desafío!
            </p>
            <p>
              ¡Diviértete jugando al ahorcado de campeones del League of Legends y demuestra tus conocimientos sobre los
              campeones más populares!
            </p>
          </ol>
        </div>
      </div>
      <p>¡Buena suerte y que te diviertas!</p>
    </div>
    <div class="flex md:flex-row flex-col justify-between items-start gap-20 mt-20">
      <div class="flex flex-col items-center justify-center">
        <div class="champion-word tracking-widest">
          {#each championNameSelectied.split("") as letter}
            {#key guessedLetters}
              {#if letterInclude(letter)}
                <span>{letter}</span>
              {:else if letter == "" || letter == "'"}
                &nbsp
              {:else}
                <span>_</span>
              {/if}
            {/key}
          {/each}
        </div>
        <div class="hangman-image">
          {#key attempts}
            <!-- svelte-ignore a11y-img-redundant-alt -->
            <img src={images[attempts]} alt="Hangman Image" />
          {/key}
        </div>
      </div>
      <div>
        <div class="guessed-letters">
          <div class="flex md:items-start items-center md:justify-start justify-center flex-col">
            <p>Letras adivinadas:</p>
            <div class="flex flex-wrap">
              {#each guessedLetters as letterCorrect}
                <div class="badge badge-lg badge-primary">{letterCorrect}</div>
              {/each}
            </div>
          </div>
          <div class="letter-buttons my-10">
            <Keyboard custom={keys} on:keydown={onKeydown} />
          </div>

          {#key attempts}
            <div class="flex flex-col items-start justify-center gap-4">
              <h1 class="text-4xl text-primary">Vidas restantes:</h1>
              <div class="rating gap-1">
                <input
                  checked={attempts + 1 === 6 ? true : false}
                  type="radio"
                  id="health-5"
                  name="rating-3"
                  class="mask mask-heart bg-green-400"
                />
                <input
                  checked={attempts + 1 === 5 ? true : false}
                  type="radio"
                  id="health-4"
                  name="rating-3"
                  class="mask mask-heart bg-lime-400"
                />
                <input
                  checked={attempts + 1 === 4 ? true : false}
                  type="radio"
                  id="health-3"
                  name="rating-3"
                  class="mask mask-heart bg-yellow-400"
                />
                <input
                  checked={attempts + 1 === 3 ? true : false}
                  type="radio"
                  id="health-2"
                  name="rating-3"
                  class="mask mask-heart bg-orange-400"
                />
                <input
                  checked={attempts + 1 === 2 ? true : false}
                  type="radio"
                  id="health-1"
                  name="rating-3"
                  class="mask mask-heart bg-red-400"
                />
                <input
                  checked={attempts + 1 === 1 ? true : false}
                  type="radio"
                  id="health-1"
                  name="rating-3"
                  class="mask mask-heart bg-red-400"
                />
              </div>
            </div>
            {#if attempts > 0}
              <h1 class="text-4xl text-primary mt-4">Ayudas:</h1>
              <div class="grid grid-rows-2 grid-cols-2 gap-6 pb-8">
                {#if attempts >= 2}
                  <div class="flex flex-row gap-4 mt-6">
                    <h3>Rol:</h3>
                    <div>
                      <p>✔{selectedChampion.tags[0]}</p>
                      <p>✔{selectedChampion.tags[1]}</p>
                    </div>
                  </div>
                {/if}
                {#if attempts >= 3}
                  <div>
                    <h3>Habilidad definitiva del campeon:</h3>
                    <div class="avatar">
                      <div class="w-24 rounded">
                        <img
                          class="w-[4rem] h-[4rem]"
                          src="https://ddragon.leagueoflegends.com/cdn/13.9.1/img/spell/{selectedChampionMoreInfo
                            .data[0].spells[3].image.full}"
                          alt={selectedChampionMoreInfo.data[0].spells[3].image.full}
                        />
                      </div>
                    </div>
                  </div>
                {/if}
                {#if attempts >= 4}
                  <div class="flex gap-6">
                    <h3>Titulo:</h3>
                    <p>{selectedChampion.title}</p>
                  </div>
                {/if}
                {#if attempts >= 5}
                  <div class="flex gap-6">
                    <h3>Pasiva del campeon:</h3>
                    <p>{selectedChampionMoreInfo.data[0].passive.name}</p>
                  </div>
                {/if}
              </div>
            {/if}
          {/key}
        </div>
      </div>
    </div>
  {/if}
</section>

<style>
  .hangman-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin-top: 2rem;
  }

  .champion-word {
    font-size: 2rem;
    margin-bottom: 1rem;
  }
</style>
