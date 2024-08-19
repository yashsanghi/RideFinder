import React from "react";
import { useSelector } from "react-redux";
import { selectUser } from "../../../selectors";
import styles from "./styles.module.css";

const Header = () => {
  const user = useSelector(selectUser);
  const { name = "", url = "" } = user || {};
  return (
    <div className={styles.header}>
      <div>
        <p className={styles.title}>Edvora</p>
      </div>
      {user ? (
        <div className={styles.user}>
          <p className={styles.name}>{name}</p>
          <img className={styles.profilePic} src={url} alt="profile-pic" />
        </div>
      ) : (
        <div />
      )}
    </div>
  );
};

export default Header;
