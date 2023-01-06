import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import SignUp from "./Pages/SignUp";
import SignIn from "./Pages/SignIn";
import Tutorials from "./Pages/Tutorials";
import Trainer from "./Pages/Trainer";
import Courses from "./Pages/Courses";
import { Provider } from "react-redux";
import { store } from "./app/store";
import Variations from "./Pages/Variations";
import Footer from "./components/Footer/Footer";
import Layout from "./components/Layout/Layout";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <Layout>
        <App />
      </Layout>
    ),
  },

  {
    path: "signup",
    element: (
      <Layout>
        <SignUp />
      </Layout>
    ),
  },
  {
    path: "signin",
    element: (
      <Layout>
        <SignIn />
      </Layout>
    ),
  },
  {
    path: "tutorials",
    element: (
      <Layout>
        <Tutorials />
      </Layout>
    ),
  },
  {
    path: "/trainer/:variation",
    element: (
      <Layout>
        <Trainer />
      </Layout>
    ),
  },

  {
    path: "/courses/:course",
    element: (
      <Layout>
        <Courses />
      </Layout>
    ),
  },
  {
    path: "/courses/",
    element: (
      <Layout>
        <Courses />
      </Layout>
    ),
  },
  {
    path: "courses/variation",
    element: (
      <Layout>
        <Variations />
      </Layout>
    ),
  },
]);
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
