import React, {useState} from 'react';
import {render} from "react-dom";
import {
  HashRouter as Router,
  Routes,
  Route,
  Link
} from "react-router-dom";

import AddStudent from "./AddStudent";
import AddLesson from "./AddLesson";
import SchoolClassesTable from "./SchoolClassesTable";
import {Message} from "semantic-ui-react";
import Schedule from "./Schedule";
import Lesson from "./Lesson";
import SchoolClass from "./SchoolClass";

export default function App() {
  const [message, setMessage] = useState(null);

  function renderMessage(type, messageHeader, message) {
    return (<Message {...type} className="my-3" style={{maxWidth: "400px", margin: "0 auto"}}>
        <Message.Header>{messageHeader}</Message.Header>
        <p>{JSON.stringify(message, null, 2)}</p>
    </Message>);
  }

  function messageCallback(message) {
    setMessage(message);
  }

  return (<>
    <Router>
      <div>
        <nav className="navbar navbar-expand-sm navbar-light bg-light justify-content-center">
          <ul className="navbar-nav">
            <li className="nav-item px-3">
              <Link to="/classes">Класи</Link>
            </li>
            <li className="nav-item px-3">
              <Link to="/add_student">Додати студента</Link>
            </li>
            <li className="nav-item px-3">
              <Link to="/add_lesson">Додати урок</Link>
            </li>
            <li className="nav-item px-3">
              <Link to="/schedule">Розклад</Link>
            </li>
          </ul>
        </nav>
        { message ? renderMessage(message.type, message.header, message.message) : null}

        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <Routes>
          <Route path="/add_student"  element={<AddStudent renderMessageCallback={messageCallback} />}></Route>
          <Route path="/classes" element={<SchoolClassesTable renderMessageCallback={messageCallback} />}></Route>
          <Route path="/add_lesson" element={<AddLesson renderMessageCallback={messageCallback} />}></Route>
          <Route path="/lesson/:id" element={<Lesson renderMessageCallback={messageCallback} />}></Route>
          <Route path="/schedule" element={<Schedule renderMessageCallback={messageCallback} />}></Route>
          <Route path="/classes/:id" element={<SchoolClass renderMessageCallback={messageCallback} />}></Route>
          {/*<Route path="/">*/}
          {/*  <Home />*/}
          {/*</Route>*/}
        </Routes>
      </div>
    </Router>
  </>);
}

const container = document.getElementById("app");
render(<App/>, container);