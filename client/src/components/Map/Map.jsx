import React from "react";
import GoogleMapReact from "google-map-react";
import { Paper, Typography, useMediaQuery } from "@material-ui/core";
import LocationOnOutlinedIcon from "@material-ui/icons/LocationOnOutlined";
import Rating from "@material-ui/lab/Rating";
import AttractionsIcon from "@mui/icons-material/Attractions";
import RestaurantIcon from "@mui/icons-material/Restaurant";
import SvgIcon from "@mui/material/SvgIcon";

import useStyles from "./styles";

const Map = ({
  setCoordinates,
  setBounds,
  coordinates,
  places,
  setChildClicked,
  type,
}) => {
  const classes = useStyles();
  const isMobile = useMediaQuery("(min-width:600px)");

  const renderMarkerIcon = (placeType) => {
    if (placeType === "attraction") {
      return <AttractionsIcon color="primary" fontSize="large" />;
    } else if (placeType === "restaurant") {
      return <RestaurantIcon color="primary" fontSize="large" />;
    } else {
      return <LocationOnOutlinedIcon color="primary" fontSize="large" />;
    }
  };

  return (
    <div className={classes.mapContainer}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: process.env.REACT_APP_GOOGLE_MAPS_API_KEY }}
        defaultCenter={coordinates}
        center={coordinates}
        defaultZoom={14}
        margin={[50, 50, 50, 50]}
        options={{ disableDefaultUI: true, zoomControl: true }}
        onChange={(e) => {
          setCoordinates({ lat: e.center.lat, lng: e.center.lng });
          setBounds({ ne: e.marginBounds.ne, sw: e.marginBounds.sw });
        }}
        onChildClick={(child) => setChildClicked(child)}
      >
        {places?.map((place, i) => (
          <div
            className={classes.markerContainer}
            lat={Number(place.latitude)}
            lng={Number(place.longitude)}
            key={i}
          >
            {renderMarkerIcon(type)}
            {/* <Typography className={classes.typography} variant="subtitle2" gutterBottom> {place.name}</Typography> */}
          </div>
        ))}
      </GoogleMapReact>
    </div>
  );
};

export default Map;
