import React from "react"
import Sort from "./Sort.js"
import SearchByGenre from "./SearchByGenre.js";

class App extends React.Component
{
    render()
    {
        return(
            <div>
                <SearchByGenre />
                <Sort />
            </div>
        );
    }
}
export default App;