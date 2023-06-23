import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { CategoryCard } from "./CategoryCard";
import { GetListingsByCategoryId } from "../../API/ListingAPI";

export const Chairs = () => {
  const navigate = useNavigate();
  const [listings, setListings] = useState([]);
  const categoryId = 6; // Replace with the selected categoryId

  const fetchListings = async (categoryId) => {
    try {
      const allListings = await GetListingsByCategoryId(categoryId);
      const uniqueListings = allListings.filter(
        (listing, index, self) =>
          self.findIndex((l) => l.categoryId === listing.categoryId) === index
      );
      setListings(uniqueListings);
    } catch (error) {
      console.error("Error fetching listings:", error);
      setListings([]);
    }
  };

  useEffect(() => {
    fetchListings(categoryId);
  }, [categoryId]);

  return (
    <div style={{ marginTop: '80px' }}>
      {listings.map(listing => (
        <CategoryCard categoryId={6} />
      ))}
    </div>
  );
};
