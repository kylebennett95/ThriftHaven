import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { EditUserById } from '../../API/UserAPI';
import { GetUserById } from '../../API/UserAPI';

export const Profile = () => {
  const { id } = useParams(); // Get the id from the URL

  const [formData, setFormData] = useState(null);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [image, setImage] = useState('');
  const [user, setUser] = useState({});

  const UpdateUser = async () => {
    let UpdateUserData = await EditUserById(id, name, email, image);
    if (UpdateUserData !== false) {
      // Handle success, e.g., show a success message
      console.log('User updated successfully.');
      window.location.href = '/'; // Replace '/some-other-url' with the desired URL
    } else {
      // Handle failure, e.g., show an error message
      console.log('Failed to update user.');
    }
  };

  const GetUser = async () => {
    // Retrieve the userId from local storage
    var appUser = localStorage.getItem("project_user");
    var appUserObject = JSON.parse(appUser);
    const userId = appUserObject.userId;

    let UserData = await GetUserById(userId); // Use the retrieved userId
    setUser(UserData);

    if (UserData !== false) {
      setName(UserData[0].name);
      setEmail(UserData[0].email);
      setImage(UserData[0].image);
    }

    console.log('UserData:', UserData);
  };

  useEffect(() => {
    GetUser();
  }, [id]);

  return (
    <div className="flex justify-center items-center h-screen">
      {user && (
        <div>
          <div className="mb-6">
            <label htmlFor="image-input" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Profile Picture
            </label>
            <input
              type="text"
              id="image-input"
              value={image}
              onChange={(e) => setImage(e.target.value)}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-64 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              required
            />
          </div>
          <div className="mb-6">
            <label htmlFor="price-input" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Name
            </label>
            <input
              type="text"
              id="price-input"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-64 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              required
            />
          </div>
          <div className="mb-6">
            <label htmlFor="description-input" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Email
            </label>
            <input
              type="text"
              id="description-input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-64 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              required
            />
          </div>
          <div className="mb-6 flex justify-center"> {/* Added flex justify-center class */}
            <button
              type="submit"
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-64 sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              onClick={() => UpdateUser()}
            >
              Edit Profile
            </button>
          </div>
        </div>
      )}
    </div>
  );
  
};
