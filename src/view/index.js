import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import styles from "./styles.module.css";
import { fetchRidesAsync } from "../reducers/rides";
import { fetchUserAsync } from "../reducers/user";
import Header from "./components/Header";
import Ride from "./components/Ride";
import { changeTab, setLoading } from "../reducers/app";
import {
  isLoadingSelector,
  nearestRidesSelector,
  pastRidesSelector,
  selectCurrentTab,
  selectRides,
  upcomingRidesSelector,
} from "../selectors";
import Filter from "./components/Filter";

const Tab = ({
  id,
  title,
  isActive,
  setActiveTab,
  showCount = false,
  count = null,
}) => {
  return (
    <div
      className={`${styles.tab} ${isActive ? styles.activeTab : ""}`}
      onClick={() => {
        setActiveTab(id);
      }}
    >
      <p>{`${title}${showCount ? ` (${count})` : ""}`}</p>
      {isActive ? <div className={styles.indicator} /> : null}
    </div>
  );
};

const App = () => {
  const dispatch = useDispatch();

  const rides = useSelector(selectRides);

  const currentTab = useSelector(selectCurrentTab);
  const isLoading = useSelector(isLoadingSelector);

  useEffect(() => {
    const getInitialData = async () => {
      await Promise.all([
        dispatch(fetchRidesAsync()),
        dispatch(fetchUserAsync()),
      ]);
      dispatch(setLoading(false));
    };

    if (!isLoading) {
      dispatch(setLoading(true));
      getInitialData();
    }
  }, []);

  const Tabs = [
    {
      id: 0,
      title: "Nearest rides",
      selector: useSelector(nearestRidesSelector),
      showCount: false,
    },
    {
      id: 1,
      title: "Upcoming Rides",
      selector: useSelector(upcomingRidesSelector),
      showCount: true,
    },
    {
      id: 2,
      title: "Past Rides",
      selector: useSelector(pastRidesSelector),
      showCount: true,
    },
  ];

  const handleTabChange = (id) => {
    dispatch(changeTab(id));
  };

  return (
    <div className={styles.container}>
      <Header />
      <div className={styles.body}>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <div className={styles.tabs}>
            {Tabs.map(({ id, title, showCount }) => {
              return (
                <Tab
                  id={id}
                  key={id}
                  title={title}
                  isActive={currentTab === id}
                  setActiveTab={handleTabChange}
                  showCount={showCount}
                  count={Tabs[id]?.selector ? Tabs[id]?.selector?.length : null}
                />
              );
            })}
          </div>
          {rides && rides.length > 0 ? <Filter /> : null}
        </div>
        {rides && rides?.length > 0 ? (
          <div style={{ marginTop: 24 }}>
            <div>
              {Tabs[currentTab] && Tabs[currentTab]?.selector
                ? Tabs[currentTab].selector.map(
                    (
                      {
                        id,
                        origin_station_code,
                        station_path,
                        date,
                        city,
                        state,
                        map_url,
                        distance,
                      },
                      index
                    ) => {
                      return (
                        <Ride
                          id={id}
                          key={index}
                          originStation={origin_station_code}
                          date={date}
                          city={city}
                          state={state}
                          image={map_url}
                          distance={distance}
                          stationPath={JSON.stringify(station_path)}
                        />
                      );
                    }
                  )
                : null}
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default App;
