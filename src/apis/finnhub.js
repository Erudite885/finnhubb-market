import axios from "axios";

const TOKEN = "cd51i9aad3i7v64c2msgcd51i9aad3i7v64c2mt0";
export default axios.create({
  baseURL: "https://finnhub.io/api/v1",
  params: {
    token: TOKEN
  }
});

// https://finnhub.io/api/v1
// token: cd51i9aad3i7v64c2msgcd51i9aad3i7v64c2mt0