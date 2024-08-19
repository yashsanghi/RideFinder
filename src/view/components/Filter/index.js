import React, { useEffect, useRef, useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import styles from "./styles.module.css";
import Icon from "../../assets/filter.png";
import { setSelectedCity, setSelectedState } from "../../../reducers/app";
import {
  citiesSelector,
  selectedCitySelector,
  selectedStateSelector,
  statesSelector,
} from "../../../selectors";

const Filter = ({}) => {
  const ref = useRef(null);
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref]);

  const Filters = [
    {
      id: "state",
      placeholder: "State",
      options: useSelector(statesSelector),
      onChange: (e) => {
        dispatch(setSelectedState(e.target.value));
      },
      value: useSelector(selectedStateSelector),
    },
    {
      id: "city",
      placeholder: "City",
      options: useSelector(citiesSelector),
      onChange: (e) => {
        dispatch(setSelectedCity(e.target.value));
      },

      value: useSelector(selectedCitySelector),
    },
  ];

  return (
    <div className={styles.container} ref={ref}>
      <div
        className={styles.button}
        onClick={() => {
          setOpen(true);
        }}
      >
        <img alt="filter" src={Icon} className={styles.icon} />
        <p className={styles.filterText}>Filter</p>
      </div>
      {open ? (
        <div className={styles.popup}>
          <div className={styles.title}>
            <p>Filters</p>
          </div>
          {Filters.map(({ id, options, placeholder, value, onChange }) => {
            return (
              <select
                className={styles.select}
                value={value || ""}
                key={id}
                onChange={onChange}
              >
                <option className={styles.option} key={""} value={""}>
                  {placeholder}
                </option>
                {options && options?.length > 0
                  ? options.map((item) => (
                      <option className={styles.option} key={item} value={item}>
                        {item}
                      </option>
                    ))
                  : null}
              </select>
            );
          })}
        </div>
      ) : null}
    </div>
  );
};

export default Filter;
