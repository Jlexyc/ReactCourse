import React from 'react'
import {
    Switch,
    Route,
    Link,
    useRouteMatch,
    useHistory,
  } from "react-router-dom";

function News() {
    const match = useRouteMatch()
    console.log('news match: ', match)
    return (
        <div>
            This is news page!
        </div>
    )
}


function Contacts() {
    return (
        <div>
            This is contacts page!
        </div>
    )
}

export default function About() {

    const match = useRouteMatch()
    console.log('match: ', match)
    const history = useHistory()
    console.log('history: ', history)

    return (
        <div>
            This is about page
            <div className="Menu">
                <div className="MenuItem">
                    <Link to={match.path + '/news'}>News</Link>
                </div>
                <div className="MenuItem">
                    <Link to={match.path + '/concats'}>Contacts</Link>
                </div>
                <div className="MenuItem">
                    <button onClick={() => { history.push('/list') } }>List</button>
                </div>
            </div>
            <Switch>
                <Route exact path="/about/">
                    Please select some option
                </Route>
                <Route path={match.path + '/news/:id'}>
                    <News />
                </Route>
                <Route path={match.path + '/concats'}>
                    <Contacts />
                </Route>
            </Switch>
        </div>
    )
}



