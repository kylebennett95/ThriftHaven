import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { AddListing } from '../../API/ListingAPI';

export const EditListing = () => {
  const { id } = useParams(); // Get the id from the URL

  const [formData, setFormData] = useState(null);
  const [image, setImage] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [location, setLocation] = useState('');
  const [dateTime, setDateTime] = useState('');

  useEffect(() => {
    fetchData(id);
  }, [id]);

  const fetchData = async (id) => {
    try {
      const response = await fetch(`https://localhost:7052/Listings/get/${id}`); // Replace with your actual API endpoint
      if (!response.ok) {
        throw new Error('Failed to fetch listing');
      }

      const data = await response.json();
      setFormData(data);
      setImage(data.image || '');
      setPrice(data.price || '');
      setDescription(data.description || '');
      setCategoryId(data.categoryId || '');
      setLocation(data.location || '');
    } catch (error) {
      console.error('Error fetching listing:', error);
    }
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
  
    const currentDate = new Date();
    const currentDateTime = currentDate.toISOString();
  
    // Prepare the data payload for the POST request
    const data = {
      image,
      price,
      description,
      categoryId,
      location,
      dateTime: currentDateTime // Use currentDateTime instead of dateTime
    };
  
    try {
      // Call the AddListing API function to make the POST request
      const response = await AddListing(data);
      if (response) {
        // Handle the successful response, e.g., show a success message, redirect, etc.
        console.log('Listing added successfully!');
        // Redirect the user to a success page or navigate to another route
        // Example: history.push('/success');
      } else {
        // Handle errors or display error message to the user
        console.error('Failed to add listing');
        // Show an error message or handle the error case
      }
    } catch (error) {
      console.error('Error adding listing:', error);
      // Handle errors or display error message to the user
      // Show an error message or handle the error case
    }
  };
  
    return (
        <div>
          {formData && (
            <form onSubmit={handleFormSubmit}>
              <div className="mb-6">
                <label htmlFor="image-input" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Image
                </label>
                <input
                  type="text"
                  id="image-input"
                  value={image}
                  onChange={(e) => setImage(e.target.value)}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  required
                />
              </div>
              <div className="mb-6">
                <label htmlFor="price-input" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Price
                </label>
                <input
                  type="text"
                  id="price-input"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  required
                />
              </div>
              <div className="mb-6">
                <label htmlFor="description-input" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Description
                </label>
                <input
                  type="text"
                  id="description-input"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  required
                />
              </div>
              <div className="mb-6">
                <label htmlFor="category-input" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Category
                </label>
                <select
                  id="category-input"
                  value={categoryId}
                  onChange={(e) => setCategoryId(e.target.value)}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  required
                >
                  <option value="">Select a category</option>
                  <option value="1">Bed</option>
                  <option value="2">Bookshelf</option>
                  <option value="3">Chair</option>
                  <option value="4">Coffee Table</option>
                  <option value="5">Couch</option>
                  <option value="6">Dresser</option>
                  <option value="7">Nightstand</option>
                  <option value="8">Table</option>
                </select>
              </div>
              <div className="mb-6">
                <label htmlFor="location-input" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Location
                </label>
                <input
                  type="text"
                  id="location-input"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  required
                />
              </div>
              <button
                type="submit"
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                Edit Listing
              </button>
            </form>
          )}
        </div>
      );
}