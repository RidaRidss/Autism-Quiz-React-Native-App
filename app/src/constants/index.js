// ---------------Define your app back scene  ------------------
export const BACK_SCENES = "login";

// ---------------Date Time Formatting  ------------------

export const TIME_ZONE = (-1 * new Date().getTimezoneOffset()) / 60;
export const DATE_FORMAT = "MMMM DD YYYY";
export const DATE_FORMAT_DAY = "MMMM DD YY, HH:mm";
export const TIME_ONLY_FORMAT = "h:mm A";
export const TIME_FORMAT_24_HOUR = "HH:mm";
export const SERVER_DATE_FORMAT = "YYYY-MM-DD HH:mm";
// ---------------------------------

export const MILES_LIMIT = 10;
export const MIN_RADIUS = 10;
export const MAX_RADIUS = 100;
export const Pagination_LIMIT = 10;

// location service constants
// --------------------------------------------
export const LOCATION_TIME_OUT = 10000;
export const LOCATION_MAX_AGE = 1000;
export const LOCATION_DISTANCE_FILTER = 10;
export const LOCATION_HIGH_ACCURACY = false;
// --------------------------------------------

// Google Service

export const GOOGLE_ADDRESS_URL =
  "http://maps.googleapis.com/maps/api/geocode/json?latlng=";
export const GOOGLE_API_KEY = "AIzaSyBY42wGL_XfHp-TmxJdK45z9qVrfilns68";
export const GOOGLE_ADDRESS_URl_END = `&sensor=false&key=${GOOGLE_API_KEY}`;

export const PAGING_SIZE = 15;
