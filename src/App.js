import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import { Container } from "@material-ui/core";
import { gapi } from "gapi-script";

import Navbar from "./components/Navbar/Navbar";
import Home from "./components/Home/Home";
import Auth from "./components/Auth/Auth";
import PostDetails from "./components/PostDetails/PostDetails";

window.gapi.load("client:auth2", () => {
  window.gapi.auth2.init({
    clientId:
      "615336271581-h9arvq5nb8hm7fdsb0ssmdc22pkrqft2.apps.googleusercontent.com",
    plugin_name: "chat",
  });
});

export default function App() {
  const user = JSON.parse(localStorage.getItem("profile"));

  return (
    <BrowserRouter>
      <Container maxWidth="xl">
        <Navbar />
        <Switch>
          <Route path="/" exact component={() => <Redirect to="/posts" />} />
          <Route
            path="/auth"
            exact
            component={() => (!user ? <Auth /> : <Redirect to="/posts" />)}
          />
          <Route path="/posts" exact component={Home} />
          <Route path="/posts/search" exact component={Home} />
          <Route path="/posts/:id" component={PostDetails} />
        </Switch>
      </Container>
    </BrowserRouter>
  );
}
