import { useNavigate } from "react-router"
import { ListingCard } from "./ListingCard"

export const Home = () => {

    const navigate = useNavigate()



    return (
        <>
          <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'flex-start', position: 'fixed', top: '7%', right: '20%', marginTop: '20px' }}>
      <a
        href="/newlisting"
        className="text-white bg-yellow-400 hover:bg-yellow-500 focus:outline-none focus:ring-4 focus:ring-yellow-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:focus:ring-yellow-900"
      >
        Create New Listing
      </a>
    </div>
          <div style={{ marginTop: '80px' }}>
            <ListingCard />
          </div>
        </>
      );
  
      
}