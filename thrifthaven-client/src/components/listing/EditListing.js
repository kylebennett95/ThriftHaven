import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { EditListingById } from '../../API/ListingAPI';
import { GetListingById } from '../../API/ListingAPI';
import { DeleteListing } from '../../API/ListingAPI';

export const EditListing = () => {
  const { id } = useParams(); // Get the id from the URL

  const [formData, setFormData] = useState(null);
  const [image, setImage] = useState('');
  const [price, setPrice] = useState(0);
  const [description, setDescription] = useState('');
  const [categoryId, setCategoryId] = useState(0);
  const [location, setLocation] = useState('');
  const [listing, setListing] = useState({});


  const UpdateListing = async () => {
    let UpdateListingData = await EditListingById(
      id,
      categoryId,
      location,
      price,
      description,
      image
    );
    if (UpdateListingData !== false) {
      // Handle success, e.g., show a success message
      console.log('Listing updated successfully.');
      window.location.href = '/'; // Replace '/some-other-url' with the desired URL
    } else {
      // Handle failure, e.g., show an error message
      console.log('Failed to update listing.');
    }
  };

  const handleDelete = async () => {
    const isSuccess = await DeleteListing(id);
    if (isSuccess) {
      // Handle success, e.g., show a success message
      console.log('Listing deleted successfully.');
      window.location.href = '/'; // Replace '/some-other-url' with the desired URL
    } else {
      // Handle failure, e.g., show an error message
      console.log('Failed to delete listing.');
    }
  };

  const GetListing = async () => {
    let ListingData = await GetListingById(id);
    setListing(ListingData);

    if (ListingData !== false) {
      setImage(ListingData[0].image);
      setPrice(ListingData[0].price);
      setDescription(ListingData[0].description);
      setCategoryId(ListingData[0].categoryId);
      setLocation(ListingData[0].location);
    }

    console.log(ListingData);
  };

  useEffect(() => {
    GetListing();
  }, []);

  return (
    <div className="flex justify-center items-center h-screen">
      {listing && (
        <div className="w-80">
          <div className="mb-6">
            <label
              htmlFor="image-input"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Image
            </label>
            <input
              type="text"
              id="image-input"
              value={image}
              onChange={(e) => setImage(e.target.value)}
              className="w-full px-3 py-2.5 text-gray-900 text-sm rounded-lg border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              required
            />
          </div>
          <div className="mb-6">
            <label
              htmlFor="price-input"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Price
            </label>
            <input
              type="text"
              id="price-input"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="w-full px-3 py-2.5 text-gray-900 text-sm rounded-lg border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              required
            />
          </div>
          <div className="mb-6">
            <label
              htmlFor="description-input"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Description
            </label>
            <input
              type="text"
              id="description-input"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-3 py-2.5 text-gray-900 text-sm rounded-lg border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              required
            />
          </div>
          <div className="mb-6">
            <label
              htmlFor="category-input"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Category
            </label>
            <select
              id="category-input"
              value={categoryId}
              onChange={(e) => setCategoryId(e.target.value)}
              className="w-full px-3 py-2.5 text-gray-900 text-sm rounded-lg border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
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
            <label
              htmlFor="location-input"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Location
            </label>
            <input
              type="text"
              id="location-input"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="w-full px-3 py-2.5 text-gray-900 text-sm rounded-lg border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              required
            />
          </div>
          <button
            type="submit"
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            onClick={() => UpdateListing()}
          >
            Edit Listing
          </button>
          <button
            type="button"
            className="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800"
            onClick={() => handleDelete()}
          >
            Delete Listing
          </button>
        </div>
      )}
    </div>
  );
};
