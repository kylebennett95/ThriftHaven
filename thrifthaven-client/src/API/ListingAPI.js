const GetConfig = {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  }


export const GetListings = async() => {

    const response = await fetch(
        `https://localhost:7052/Listings/GetAll`,GetConfig);

    
    if(response.ok){
        const listings = await response.json();
        return listings;
    }else{
        return false
    }
    
}

const API = {
    GetListings
}

export default API;