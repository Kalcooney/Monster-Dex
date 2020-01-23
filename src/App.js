import React, { Component } from "react";

import { CardList } from "./components/card-list/card-list.component.jsx";
import { SearchBox } from "./components/search-box/search-box.component.jsx";

import "./App.css";

// App component
class App extends Component {
  constructor() {
    super();

    this.state = {
      monsters: [],
      searchField: ""
    };
  }

  // Gets called when component loading into DOM (data loading)
  componentDidMount() {
    // Fetch data from url and store in state
    fetch(
      "https://cors-anywhere.herokuapp.com/https://jsonplaceholder.typicode.com/users"
    )
      .then(response => response.json())
      .then(users => this.setState({ monsters: users }));
  }

  // Change the searchField state 
  // Arrow functions auto-bind this
  handleChange = (e) => {
    this.setState({searchField: e.target.value})
  }

  // Render class (all content is displayed here)
  render() {
    // Filter out monsters based on user input
    const { monsters, searchField } = this.state;
    const filteredMonsters = monsters.filter(monster =>
      monster.name.toLowerCase().includes(searchField.toLowerCase())
    );

    return (
      <div className="App">
        <h1>Monsters Rolodex</h1>
        <SearchBox 
          placeholder={'Search Monsters'} 
          handleChange={this.handleChange}
        />
        <CardList monsters={filteredMonsters} />
      </div>
    );
  }
}

export default App;
