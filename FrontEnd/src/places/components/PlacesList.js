import React from "react";
import Card from "../../shared/components/UIElements/Card";
import PlaceItem from "./PlacesItem";

import "./PlaceList.css";

const PlacesList = (props) => {
  if (props.items.length === 0) {
    return (
      <div>
        <Card>
          <h2>No places found.</h2>
          <button>Create Place</button>
        </Card>
      </div>
    );
  }
  return (
    <ul className="place-list">
      {props.items.map((place) => (
        <PlaceItem
          key={place.id}
          id={place.id}
          title={place.title}
          description={place.description}
          image={place.image}
          address={place.address}
          coordinates={place.coordinates}
          creator={place.userId}
        />
      ))}
    </ul>
  );
};

export default PlacesList;
