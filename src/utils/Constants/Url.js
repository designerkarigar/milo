export const BaseUrl =
  "https://st40k7zbg3.execute-api.ap-south-1.amazonaws.com/v1";

export const BaseUrlS3 = "https://s3.ap-south-1.amazonaws.com/milo-s3-bucket-25/";

const rawCloudfrontUrl = process.env.REACT_APP_CLOUDFRONT_URL || "";
const defaultCloudfrontUrl = "https://dxs4knkzcnr3x.cloudfront.net";
const normalizedCloudfrontUrl = rawCloudfrontUrl
  ? rawCloudfrontUrl.replace(/\/+$/, "")
  : defaultCloudfrontUrl;

export const StaticMediaBaseUrl = normalizedCloudfrontUrl
  ? `${normalizedCloudfrontUrl}/`
  : BaseUrlS3;