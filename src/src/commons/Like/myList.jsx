import React, { useState } from "react";
import s from "./style.module.scss";

const MyList = ({ movie, addToML, removeToML }) => {
  const [liked, setLiked] = useState(false);

  const toggleFav = () => {
    setLiked(!liked);
  };

  return (
    <button onClick={toggleFav}>
      {liked === false ? (
        <ion-icon
          onClick={() => {
            addToML(movie);
          }}
          name="add-outline"
        ></ion-icon>
      ) : (
        <ion-icon
          onClick={() => {
            removeToML(movie);
          }}
          name="checkmark-outline"
        ></ion-icon>
      )}
    </button>
  );
};

export default MyList;
