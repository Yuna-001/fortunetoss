interface ResponseData {
  status: string;
  message: string;
  data: any | null;
  errorDetails: null | {
    message: string;
    details: string;
  };
  code: number;
}

export default ResponseData;
