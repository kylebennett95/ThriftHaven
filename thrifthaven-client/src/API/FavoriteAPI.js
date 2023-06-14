const GetConfig = {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  }

const GetPostConfig = (body) => {
  var config = {
      body : JSON.stringify(body),
      credentials: "include",
      method: "POST",
      headers: { "Content-Type": "application/json" },
    }
    return config
}

export const AddFavorite = async (favoriteData) => {
    console.log("Favorite Data:", favoriteData); // Add this line to log the favoriteData object
    
    const response = await fetch('https://localhost:7052/Favorites/Add', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(favoriteData)
    });
  
    console.log(response, "AddFavorite");
    if (response.ok) {
      const newFavorite = await response.json();
      return newFavorite;
    } else {
      return false;
    }
  };

  export const AddingFavorite = async(UserId, ListingId) => {
    const response = await fetch(
        `https://localhost:7052/Add`, GetPostConfig({UserId, ListingId})
        );
    if(response.ok){
        const AddFavoriteResponse = await response.json();
        return AddFavoriteResponse;
    }else {
        return false
    }   
}

  export const GetFavoritesByUserId = async (userId) => {
    const response = await fetch(`https://localhost:7052/Favorites/user/${userId}`, GetConfig);
  
    if (response.ok) {
      const favorites = await response.json();
      return favorites;
    } else {
      throw new Error('Failed to fetch favorites');
    }
  };
  
  
  
const API = {
    AddFavorite,
    GetFavoritesByUserId
}

export default API;