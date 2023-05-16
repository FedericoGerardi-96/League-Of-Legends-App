export async function getItems() {
  try {
    const response = await fetch("https://ddragon.leagueoflegends.com/cdn/13.9.1/data/es_AR/item.json");
    const data = await response.json();
    const champions = Object.values(data.data);
    return { data: champions, ok: true, status: 200, message: "Champions list" };
  } catch (error) {
    console.error(error);
    return { data: null, ok: false, status: 400, message: error.message };
  }
}

export async function getItem(name) {
  try {
    const response = await fetch(`https://ddragon.leagueoflegends.com/cdn/13.9.1/data/es_AR/${name}.json`);
    const data = await response.json();
    const champion = Object.values(data.data);
    return { data: champion, ok: true, status: 200, message: "Champions list" };
  } catch (error) {
    return { data: null, ok: false, status: 400, message: error.message };
  }
}
