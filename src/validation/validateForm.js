///  validation form 1

export const validate = (values) => {
    const response = {};
    const REGEX_EMAIL = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@redberry.ge/;
    const REGEX_PHONE = /^(\+?995)?(79\d{7}|5\d{8})$/;
    const REGEX_NAME = /^[ა-ჰ]*$/;

    // username checking
    if (
      !values.name ||
      !REGEX_NAME.test(values.name) ||
      values.name.length < 2
    ) {
      response.name = true;
    } else {
      response.name = '';
    }

    // lastname checking
    if (
      !values.surname ||
      !REGEX_NAME.test(values.surname) ||
      values.surname.length < 2
    ) {
      response.surname = true;
    } else {
      response.surname = '';
    }

    //email checking
    if (!values.email || !REGEX_EMAIL.test(values.email)) {
      response.email = true;
    } else {
      response.email = '';
    }

    //phone chcking
    if (!values.phone_number || !REGEX_PHONE.test(values.phone_number)) {
      response.phone_number = true;
    } else {
      response.phone_number = '';
    }
    
    //team checking
    if (!values.team) {
      response.team = true;
    } else  {
      response.team = '';
    }

    //position checking
    if (!values.position) {
      response.position = true;
    } else {
      response.position = '';
    }

    return response;
  };
