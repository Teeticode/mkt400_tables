import dataJson from "../assets/filtered.json";

export const getData = () => {
  if (dataJson) {
    const data = dataJson.slice(0, 40);
    return data;
  }
};
