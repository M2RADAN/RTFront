export const NAVIGATIONS = {
  REGISTER: {
    ROUTE: "/register",
    ACTION: "REGISTER",
  },
  LOGIN: {
    ROUTE: "/login",
    ACTION: "LOGIN",
  },
  EDIT: {
    ROUTE: "/edit",
    ACTION: "EDIT",
  },
  INFO: {
    ROUTE: "/info",
    ACTION: "INFO",
  },
  LIST: {
    ROUTE: "/list",
    ACTION: "LIST",
  },
  PROFILE: {
    ROUTE: "/profile",
    ACTION: "PROFILE",
  },
} as const;

export const ROUTES = {
  ...NAVIGATIONS,
} as const;
