const GetConfig = {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  }


export const GetListings = async() => {

    const response = await fetch(
        `https://localhost:7052/Listings/GetAll`,GetConfig);

    console.log(response, "GetListings")
    if(response.ok){
        const listings = await response.json();
        return listings;
    }else{
        return false
    }
};

export const GetListingById = async (id) => {
  const response = await fetch(`https://localhost:7052/Listings/get/${id}`, GetConfig);

  console.log(response);
  if (response.ok) {
    const listing = await response.json();
    return [listing]; // Wrap the listing object in an array
  } else {
    return []; // Return an empty array if there's an error
  }
};




export const AddListing = async (listingData) => {
    const response = await fetch(`https://localhost:7052/Listings`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(listingData)
    });
  
    console.log(response, "AddListing");
    if (response.ok) {
      const newListing = await response.json();
      return newListing;
    } else {
      return false;
    }
  };
  



const API = {
    GetListings,
    AddListing,
    GetListingById
}

export default API;