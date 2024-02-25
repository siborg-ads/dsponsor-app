
import axios from "axios";

export const fetchDataFromIPFS = async (ipfsLink) => {
  try {
   
    new URL(ipfsLink); 

    const response = await axios.get(ipfsLink);
    return response.data; 
  } catch (error) {
    console.error("Erreur lors de la récupération des données IPFS:", error);
    return null; 
  }
};