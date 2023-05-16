import axios from "axios";

// Función para hacer la petición GET a Danbooru
export async function searchDanbooruAnimeImages(animeName) {
  try {
    let response;
    response = await axios.get(
      `https://danbooru.donmai.us/posts.json?limit=1000&api_key=afi5YyexRx5rntw33kgSfdYi&login=FedericoGerardi&tags=${animeName}_(league_of_legends) `
    );
    if (response.data.length === 0) {
      response = await axios.get(
        `https://danbooru.donmai.us/posts.json?limit=1000&api_key=afi5YyexRx5rntw33kgSfdYi&login=FedericoGerardi&tags=${animeName}`
      );
    }
    const images = response.data.map((post) => post.file_url);
    return images;
  } catch (error) {
    console.error("Error al buscar imágenes en Danbooru:", error);
    return [];
  }
}
