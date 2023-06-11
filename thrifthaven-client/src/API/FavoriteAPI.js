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
  
  
const API = {
    AddFavorite
}

export default API;