const GetConfig = {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  }


export const GetListings = async() => {

    const response = await fetch(
        `https://localhost:7052/Listings/GetAll`,GetConfig);

    console.log(response)
    if(response.ok){
        const listings = await response.json();
        return listings;
    }else{
        return false
    }
    
}

export const AddListing = async (listingData) => {
    const response = await fetch(`https://localhost:7052/Listings`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(listingData)
    });
  
    console.log(response);
    if (response.ok) {
      const newListing = await response.json();
      return newListing;
    } else {
      return false;
    }
  };
  



const API = {
    GetListings
}

export default API;