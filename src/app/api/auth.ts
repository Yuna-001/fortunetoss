import axios from "axios";
import ResponseData from "../models/response-data";

const MOCK_SUCCESS_RESPONSE = {
  data: {
    status: "success",
    message: "Email sent successfully",
    data: null,
    errorDetails: null,
    code: 200,
  },
  headers: { access: "accessToken" },
};

export const requestAccessTokenReissue = async () => {
  // const response = await axios.post<ResponseData>(
  //   "http://localhost:8080/reissue",
  //   {},
  //   { withCredentials: true }
  // );

  const response = MOCK_SUCCESS_RESPONSE;

  return response;
};
