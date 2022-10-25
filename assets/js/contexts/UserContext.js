import { createContext } from "react";

export const UserContext = createContext({
    firstname: "",
    lastname: "",
    email: "",
    telephone: "",
    roles: [],
});