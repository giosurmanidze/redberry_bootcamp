///  validation form 2

export const validate2 = (values) => {
    const response = {};
    const REGEX_ONLY_NUMBER = /^[0-9]*$/;
    const REGEX_LAPTOP_NAME = /^[a-zA-Z0-9!@#$%^&*()_+=]*$/;

    
    //checking image
    if (!values.iamge) {
      response.image = true;
    } else {
      response.image = "";
    }

    //checking latpop name
    if (!values.laptop_name ||  !REGEX_LAPTOP_NAME.test(values.laptop_name)) {
      response.laptop_name = true;
    } else {
      response.laptop_name = "";
    }

    //checking brand
    if (!values.brand) {
      response.brand = true;
    } else {
      response.brand = "";
    }

    //checking cpu
    if (!values.cpu) {
      response.cpu = true;
    } else {
      response.cpu = "";
    }

    //checking cpu_threads,cpu_core,ram
    if (!values.ram || !REGEX_ONLY_NUMBER.test(values.ram)) {
      response.ram = true;
    } else {
      response.ram = "";
    }
    if (!values.cpu_cores || !REGEX_ONLY_NUMBER.test(values.cpu_cores)) {
      response.cpu_cores = true;
    } else {
      response.cpu_cores = "";
    }
    if (!values.cpu_threads || !REGEX_ONLY_NUMBER.test(values.cpu_threads)) {
      response.cpu_threads = true;
    } else {
      response.cpu_threads = "";
    }

    // checking hard dirve type
    if (!values.hard_drive_type) {
      response.hard_drive_type = true;
    } else {
      response.hard_drive_type = "";
    }

    // checking hard dirve type
    if (!values.state) {
      response.state = true;
    } else {
      response.state = "";
    }

    // checking laptop price
    if (!values.price || !REGEX_ONLY_NUMBER.test(values.price))  {
      response.price = true;
    } else {
      response.price = "";
    }

    // checking date
    if (!values.purchase_date ) {
      response.purchase_date = true;
    } else {
      response.purchase_date = "";
    }

    return response;
  };
