export const get_details_From_storage = () => {
  const data = sessionStorage.getItem("DETAILS");
  if (data) {
    return JSON.parse(data);
  } else {
    return [];
  }
};


