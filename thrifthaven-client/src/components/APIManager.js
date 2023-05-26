
export const AddListing = async (newListing) => {
    const options = {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(newListing)
    }
}

export const FetchListings = async () => {
    const response = await fetch(`https://localhost:7052/Listings`);
    const listingsArray = await response.json();
    return listingsArray
}

export const FetchListing = async (listingId) => {
    const response = await fetch(`https://localhost:7052/Listings/${listingId}`);
    const listingsArray = await response.json();
    return listingsArray
}

export const FetchListingsBySearch = async (criterion) => {
    const response = await fetch(`https://localhost:7052/Listings/?searchCriterion=${criterion}`)
    const listingsArray = await response.json()
    return listingsArray
}

export const UpdateListing = async (id, listing) => {
    const options = {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(listing)
    }
    await fetch(`https://localhost:7052/Listings/${id}`, options)
}

export const AddUser = async (userObj) => {
    // event.preventDefault()

    const options = {
        method: "POST",
        headers: {
        "Content-Type": "application/json"
        },
        body: JSON.stringify(userObj)
    }

    await fetch(`https://localhost:7052/Users`, options)
}

export const UpdateUser = async (id, user) => {
    const options = {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(user)
    }
    await fetch(`https://localhost:7052/Users/${id}`, options)
}

export const GetCategories = async () => {
    const response = await fetch(`https://localhost:7052/Categories`)
    const categories = await response.json()
    return categories
}

export const FetchListingsByCategory = async(categoryId) => {
    const response = await fetch(`https://localhost:7052/Items/?categoryId=${categoryId}`);
    const listingsByCategoryArray = await response.json();
    return listingsByCategoryArray
}