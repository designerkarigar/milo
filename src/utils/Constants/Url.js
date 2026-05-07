/** API base for local development and non-production builds (`npm start`). */
export const BaseUrlDev =
  "https://st40k7zbg3.execute-api.ap-south-1.amazonaws.com/v1";

/** API base for production builds deployed to the live site (`npm run build`). */
export const BaseUrlProd =
  "https://snck1wl3pb.execute-api.ap-south-1.amazonaws.com/v1";

/** Resolved API base: production bundle uses prod; development uses staging/dev. */
export const BaseUrl =
  process.env.NODE_ENV === "production" ? BaseUrlProd : BaseUrlDev;

export const BaseUrlS3 = "https://s3.ap-south-1.amazonaws.com/milo-s3-bucket-25/";

const rawCloudfrontUrl = process.env.REACT_APP_CLOUDFRONT_URL || "";
const defaultCloudfrontUrl = "https://dxs4knkzcnr3x.cloudfront.net";
const normalizedCloudfrontUrl = rawCloudfrontUrl
  ? rawCloudfrontUrl.replace(/\/+$/, "")
  : defaultCloudfrontUrl;

export const StaticMediaBaseUrl = normalizedCloudfrontUrl
  ? `${normalizedCloudfrontUrl}/`
  : BaseUrlS3;