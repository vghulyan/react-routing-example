import React, { Component } from 'react';
import './App.css';
import { BrowserRouter as Router, Link, NavLink, Redirect, Prompt } from 'react-router-dom';
import Route from 'react-router-dom/Route';


const OldUser = ({match}) => {
    return (<h1>Welcome User {match.params.username}</h1>)
};

const User = (params) => {
    return (<h1>Welcome User {params.username}</h1>)
};

class App extends Component {
    state = {
        loggedIn: false
    };

    clickHandler = () => {
        this.setState(prevState => ({
            loggedIn: !prevState.loggedIn
        }));
        //this.setState({loggedIn: true});
    };

      render() {
        return (
            <Router>
                <div className="App">

                    <ul>
                        <li>
                            <NavLink to="/" exact activeStyle={{color:'green'}}>Home</NavLink>
                        </li>
                        <li>
                            <NavLink to="/about" exact activeStyle={{color:'green'}}>About</NavLink>
                        </li>
                        <li>
                            <NavLink to="/user/john" exact activeStyle={{color:'green'}}>User John</NavLink>
                        </li>
                        <li>
                            <NavLink to="/user/peter" exact activeStyle={{color:'green'}}>User Peter</NavLink>
                        </li>
                        <li>
                            <NavLink to="/olduser/VG" exact activeStyle={{color:'green'}}>Old User</NavLink>
                        </li>
                    </ul>
                    <Prompt when={!this.state.loggedIn} message={(location) => {
                        return location.pathname.startsWith('/user') ? 'Are you sure?' : true
                    }} />
                    <input type="button" value={this.state.loggedIn ? 'log out' : 'log in'} onClick={this.clickHandler}/>


                    <Route path="/" exact render={
                        () => {
                            return (<h1>Welcome Home</h1>);
                        }
                    }/>
                    <Route path="/about" exact strict render={
                        () => {
                            return (<h1>About Page</h1>);
                        }
                    }/>
                    <Route path="/user/:username" exact strict render={({match}) =>(
                        this.state.loggedIn ? (<User username={match.params.username}/>) : (<Redirect to="/" />)
                    )} />

                    <Route path="/olduser/:username" exact strict component={OldUser} />
                </div>
            </Router>
        );
  }
}

export default App;
