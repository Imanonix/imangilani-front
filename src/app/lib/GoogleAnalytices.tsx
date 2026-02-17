import ReactGA from "react-ga4";

const MEASUREMENT_ID = "G-PX3LJ0B29N"; // 👈 Measurement ID خودت

export const initGA = () => {
  ReactGA.initialize(MEASUREMENT_ID);
};

export const trackPageView = (path: string) => {
  ReactGA.send({ hitType: "pageview", page: path });
};
