import axios from "axios";

const BRANDS_API_URL = `https://pcfy.redberryinternship.ge/api/brands`;
const TEAM_API_URL = `https://pcfy.redberryinternship.ge/api/teams`;
const CPUS_API_URL = `https://pcfy.redberryinternship.ge/api/cpus`;
const POSITION_API_URl = `https://pcfy.redberryinternship.ge/api/positions`;


// A function that takes brand data and sets the team to state
export const getBrandData = async (setBrands) => {
  const response = await axios.get(BRANDS_API_URL);
  setBrands(response.data.data);
};

// A function that takes team data and sets the team to state
export const getTeamData = async (setTeams) => {
  const response = await axios.get(TEAM_API_URL);
  setTeams(response.data.data);
};

// A function that takes cpus data and sets the team to state
export const getCpusData = async (setCpus) => {
  const response = await axios.get(CPUS_API_URL);
  setCpus(response.data.data);
};

// A function that takes cpus data and sets the team to state
export const getPositionData = async (setPositions) => {
    const positons = await axios.get(POSITION_API_URl);
    setPositions(positons.data.data);
  };
