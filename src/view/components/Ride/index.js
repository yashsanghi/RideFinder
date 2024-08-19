import React from "react";
import styles from "./styles.module.css";

const Ride = ({
  id = "",
  originStation = "",
  stationPath = "",
  date = "",
  image = "",
  city = "",
  state = "",
  distance = "NA",
}) => {
  return (
    <div className={styles.ride}>
      <div className={styles.image}>
        <img src={image} className={styles.map} alt="map" />
      </div>
      <div className={styles.details}>
        <p className={styles.detail}>Ride Id: {id}</p>
        <p className={styles.detail}>Origin Station: {originStation}</p>
        <p className={styles.detail}>Station Path: {stationPath}</p>
        <p className={styles.detail}>Date: {date}</p>
        <p className={styles.detail} style={{ marginBottom: 0 }}>
          Distance: {distance}
        </p>
      </div>
      <div className={styles.location}>
        <div className={styles.badge}>
          <p>{city}</p>
        </div>
        <div className={styles.badge} style={{ marginLeft: 24 }}>
          <p>{state}</p>
        </div>
      </div>
    </div>
  );
};

export default Ride;
