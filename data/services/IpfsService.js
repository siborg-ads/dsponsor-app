
import axios from "axios";

export const fetchDataFromIPFS = async (ipfsLink) => {
  try {
    const url = ipfsLink;
    const response = await axios.get(url);

    return response.data; // Retourne le contenu du fichier IPFS
  } catch (error) {
    console.error("Erreur lors de la récupération des données IPFS:", error);
    throw error;
  }
};
