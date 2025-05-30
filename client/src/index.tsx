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

import Layout from "./components/Layout/Layout";
import Onboarding from "./Pages/onBoarding";
import AllCourses from "./Pages/AllCourses";
import Cookies from "js-cookie";
import UserProfile from "./Pages/UserProfile";
import UserProfileSettings from "./Pages/UserProfileSettings";
import Course from "./Pages/Course";
import ShoppingCart from "./Pages/ShoppingCart";
import Payment from "./Pages/Payment";
import CourseContent from "./Pages/CourseContent";
import WishList from "./Pages/WishList";
import Payments from "./Pages/Payments";
import EditCourse from "./Pages/EditCourse";
import AddCourse from "./Pages/AddCourse";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
console.log(Cookies.get("token"));

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
    path: "login",
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
    path: "onboarding",
    element: (
      <Layout>
        <Onboarding />
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
        <Course />
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
  {
    path: "allcourses",
    element: (
      <Layout>
        <AllCourses />
      </Layout>
    ),
  },
  {
    path: "profile",
    element: (
      <Layout>
        <UserProfile />
      </Layout>
    ),
  },
  {
    path: "shoppingCart",
    element: (
      <Layout>
        <ShoppingCart />
      </Layout>
    ),
  },

  {
    path: "profilesettings",
    element: (
      <Layout>
        <UserProfileSettings />
      </Layout>
    ),
  },
  {
    path: "course",
    element: (
      <Layout>
        <Course />
      </Layout>
    ),
  },
  {
    path: "payment",
    element: (
      <Layout>
        <Payment />
      </Layout>
    ),
  },
  {
    path: "courses/:course/coursecontent",
    element: (
      <Layout>
        <CourseContent />
      </Layout>
    ),
  },
  {
    path: "wishlist",
    element: (
      <Layout>
        <WishList />
      </Layout>
    ),
  },
  {
    path: "payments",
    element: (
      <Layout>
        <Payments />
      </Layout>
    ),
  },
  {
    path: "editcourse",
    element: (
      <Layout>
        <EditCourse />
      </Layout>
    ),
  },
  {
    path: "addcourse",
    element: (
      <Layout>
        <AddCourse />
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
