import "../sass/global.css";
import React, { useState } from "react";

export const UserContext = React.createContext({
	loggedInUser: null,
	setLoggedInUser: () => {} //update context from within application
})

const App = ({Component, pageProps}) => {
	const [loggedInUser, setLoggedInUser] = useState()
	const value = {loggedInUser, setLoggedInUser}
	return <UserContext.Provider value={value}><Component {...pageProps}/></UserContext.Provider>
}
export default App;