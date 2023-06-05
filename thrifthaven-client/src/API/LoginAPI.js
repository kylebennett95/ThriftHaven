const GetConfig = {
    credentials: "include",
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

export const Register = async(Name, Image, Email, Password) => {

    const response = await fetch(
        `https://localhost:7052/AddUser`, GetPostConfig({Name,Image,Email,Password})
        );

    if(response.ok){
        const RegisterResponse = await response.json();
        return RegisterResponse;
    }else {
        return false
    }    
}


export const LoginUser = async(Email,Password) => {

    const response = await fetch(
        `https://localhost:7052/Users/Login/${Email}/${Password}`,GetConfig);

    
    if(response.ok){
        const loginResponse = await response.json();
        return loginResponse;
    }else{
        return false
    }
    
}


const API = {
    LoginUser,
    Register
}

export default API;