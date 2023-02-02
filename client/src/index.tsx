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
import Onboarding from "./Pages/onBoarding";
import AllCourses from "./Pages/AllCourses";
import { useAppSelector } from "./app/hooks";
import Cookies from "js-cookie";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
console.log(Cookies.get("token"));

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <Layout isLoggedIn={Cookies.get("token") ? true : false}>
        <App />
      </Layout>
    ),
  },

  {
    path: "signup",
    element: (
      <Layout isLoggedIn={Cookies.get("token") ? true : false}>
        <SignUp />
      </Layout>
    ),
  },
  {
    path: "login",
    element: (
      <Layout isLoggedIn={Cookies.get("token") ? true : false}>
        <SignIn />
      </Layout>
    ),
  },
  {
    path: "tutorials",
    element: (
      <Layout isLoggedIn={Cookies.get("token") ? true : false}>
        <Tutorials />
      </Layout>
    ),
  },
  {
    path: "onboarding",
    element: (
      <Layout isLoggedIn={Cookies.get("token") ? true : false}>
        <Onboarding />
      </Layout>
    ),
  },
  {
    path: "/trainer/:variation",
    element: (
      <Layout isLoggedIn={Cookies.get("token") ? true : false}>
        <Trainer />
      </Layout>
    ),
  },

  {
    path: "/courses/:course",
    element: (
      <Layout isLoggedIn={Cookies.get("token") ? true : false}>
        <Courses />
      </Layout>
    ),
  },
  {
    path: "/courses/",
    element: (
      <Layout isLoggedIn={Cookies.get("token") ? true : false}>
        <Courses />
      </Layout>
    ),
  },
  {
    path: "courses/variation",
    element: (
      <Layout isLoggedIn={Cookies.get("token") ? true : false}>
        <Variations />
      </Layout>
    ),
  },
  {
    path: "allcourses",
    element: (
      <Layout isLoggedIn={Cookies.get("token") ? true : false}>
        <AllCourses />
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
