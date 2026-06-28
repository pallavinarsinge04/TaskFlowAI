import { useEffect, useState } from "react";
import "./Favorites.css";
import { FaStar } from "react-icons/fa";

function Favorites({ taskId }) {

  const storageKey = `favorite_${taskId}`;

  const [isFav, setIsFav] = useState(false);

  useEffect(() => {

    const saved =
      JSON.parse(localStorage.getItem(storageKey));

    if (saved) {
      setIsFav(saved);
    }

  }, [storageKey]);

  const toggleFavorite = () => {

    const updated = !isFav;

    setIsFav(updated);

    localStorage.setItem(
      storageKey,
      JSON.stringify(updated)
    );

  };

  return (

    <button
      className={`fav-btn ${isFav ? "active" : ""}`}
      onClick={toggleFavorite}
    >

      <FaStar />

      {isFav ? "Favorited" : "Add to Favorites"}

    </button>

  );

}

export default Favorites;