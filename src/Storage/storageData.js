export const get_details_From_storage = () => {
  const data = sessionStorage.getItem("DETAILS");
  if (data) {
    return JSON.parse(data);
  } else {
    return [];
  }
};


export const saveStep = () => {
    const data = sessionStorage.getItem("STEP");
    if (data) {
      return data;
    }
  };