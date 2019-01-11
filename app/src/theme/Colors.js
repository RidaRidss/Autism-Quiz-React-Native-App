// ============ Define Colors Variables here ========== //

import { Platform } from "react-native";

const white = "#FFFFFF";
const black = "#000000";

// app generic colors

const primary = white;

const transparent = "rgba(0,0,0,0)";

// app theme colors

const HanBlue = "#436fcc";

const ash_grey = "rgba(177, 177, 177, 0.9)";

// app generic components colors

const background = {
  primary
};

const text = {
  HanBlue: HanBlue,
  primary: primary
};

const navbar = {
  background: background.primary
};

export default {
  HanBlue,
  ash_grey,
  primary,
  text,
  background,
  navbar,
  white,
  black,
  transparent
};
