import "../sass/global.css";
import React, { useState } from "react";

export const UserContext = React.createContext()

const App = ({Component, pageProps}) => {
	const [loggedInUser, setLoggedInUser] = useState(1)
	return <UserContext.Provider value={loggedInUser}><Component {...pageProps}/></UserContext.Provider>
}
export default App;