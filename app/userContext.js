import { createContext } from "react";

// export let user = { type: "teacher", id: "Teacher1" }
// export let user = { type: "student", id: "Test1" }
export let user = false

export let UserContext = createContext(user)