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

export const GetUserById = async (id) => {
    const response = await fetch(`https://localhost:7052/Users/${id}`, GetConfig);
  
    console.log(response);
    if (response.ok) {
      const user = await response.json();
      return [user]; // Wrap the listing object in an array
    } else {
      return []; // Return an empty array if there's an error
    }
  };

  export const EditUserById = async(id, Name, Email, Image, Password) => {
    const response = await fetch(
        `https://localhost:7052/EditUser/${id}`, GetPostConfig({id, Name, Email, Image, Password})
        );
    if(response.ok){
        const EditUserResponse = await response.json();
        return EditUserResponse;
    }else {
        return false
    }   
}

const API = {
    GetUserById,
    EditUserById
}

export default API;