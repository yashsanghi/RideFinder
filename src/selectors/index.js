export const selectRides = (state) => {
  const rides = state.rides.rides || [];
  const user = state.user.user;
  const { selectedState, selectedCity } = state.app;

  return rides
    .map((ride) => {
      const userStationCode = user?.station_code;
      return {
        ...ride,
        distance: getDistance(userStationCode, ride?.station_path),
      };
    })
    .filter((ride) => (selectedState ? ride?.state === selectedState : true))
    .filter((ride) => (selectedCity ? ride?.city === selectedCity : true));
};

export const statesSelector = (state) => state.rides.states;
export const citiesSelector = (state) => {
  const selectedState = state.app.selectedState;
  if (selectedState) {
    const rides = state.rides.rides;
    if (rides && rides.length > 0) {
      return [
        ...new Set(
          rides
            .filter((ride) => ride?.state === selectedState)
            .map((ride) => ride?.city)
        ),
      ];
    }
    return state.rides.cities;
  }
  return state.rides.cities;
};

export const isRidesLoadingSelector = (state) => state.rides.isLoading;

export const selectCurrentTab = (state) => state.app.currentTab;
export const isLoadingSelector = (state) => state.app.isLoading;

export const selectedStateSelector = (state) => state.app.selectedState;
export const selectedCitySelector = (state) => state.app.selectedCity;

export const selectUser = (state) => state.user.user;
export const isUserLoadingSelector = (state) => state.user.isLoading;

export const nearestRidesSelector = (state) => {
  const rides = selectRides(state);
  const user = state.user.user;
  if (user && rides && rides?.length > 0) {
    return rides.sort((a, b) => (a?.distance || 9999) - (b?.distance || 9999));
  }
  return [];
};

export const upcomingRidesSelector = (state) => {
  const rides = selectRides(state);
  if (rides && rides?.length > 0) {
    return rides
      .filter(({ date }) => new Date(date) > new Date())
      .sort((a, b) => new Date(b?.date) - new Date(a?.date));
  }
  return [];
};

export const pastRidesSelector = (state) => {
  const rides = selectRides(state);
  if (rides && rides?.length > 0) {
    return rides
      .filter(({ date }) => new Date(date) < new Date())
      .sort((a, b) => new Date(b?.date) - new Date(a?.date));
  }
  return [];
};

export const getUniqueValues = (array) => {
  if (array && array?.length > 0) {
    return [...new Set(array)].sort();
  }
  return [];
};

export const getDistance = (stationCode, stationPath) => {
  if (
    stationPath &&
    stationPath?.length > 0 &&
    typeof stationCode === "number" &&
    (stationCode || stationCode === 0)
  ) {
    let distance = 9999;
    stationPath.forEach((station) => {
      if (Math.abs(station - stationCode) < distance) {
        distance = Math.abs(station - stationCode);
      }
    });
    return distance;
  }
  return null;
};
