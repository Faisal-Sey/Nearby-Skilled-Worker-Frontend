

// Function to show the location permission popup
export function showLocationPopup(handleLocationSuccess: PositionCallback, handleLocationError: PositionErrorCallback) {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      handleLocationSuccess,
      handleLocationError
    );
  } else {
    console.error("Geolocation is not supported by this browser.");
    // Handle the lack of geolocation support
  }
}

export const getInitial = (name: string): string => {
  if (name) {
    let initials = "";
    const splittedName = name?.split(" ") || [];
    splittedName.forEach((elt) => {
      initials += elt[0]?.toUpperCase() || "";
    });
    return initials;
  }

  return "";
};