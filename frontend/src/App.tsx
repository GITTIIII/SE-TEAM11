import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";

import Register from "./page/register/register";
import CheckIn from "./page/employee/checkIn";
import Destination from "./page/employee/destination";
import Food from "./page/employee/food";
import Planner from "./page/employee/planner";
import Repair from "./page/employee/repair";
import Room from "./page/employee/room";
import CreateRoom from "./page/employee/room/createRoom";
import Payment from "./page/employee/payment";
import EmployeeLayout from "./layout/employeeLayout/employeeLayout";
import Employee from "./page/employee";
import LoginEmployee from "./page/login/loginEmployee/loginEmployee";
import TouristLayout from "./layout/touristLayout/touristLayout";
import Profile from "./page/tourist/profile";
import BookPlan from "./page/tourist/bookPlan";
import BookActivity from "./page/tourist/bookActivity";
import Activity from "./page/employee/activity";
import ActivityCreate from "./page/employee/activity/activityCreate";
import LoginTourist from "./page/login/loginTourist/loginTourist";
import RepairCreate from "./page/employee/repair/repairCreate";

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route index path="/" element={<LoginTourist />} />
      <Route path="login/employee" element={<LoginEmployee />} />
      <Route path="register" element={<Register />} />

      <Route path="employee" element={<EmployeeLayout />}>
        <Route path="admin" element={<Employee />} />
        <Route path="payment" element={<Payment />} />
        <Route path="check-in" element={<CheckIn />} />
        <Route path="destination" element={<Destination />} />
        <Route path="food" element={<Food />} />
        <Route path="planner" element={<Planner />} />
        <Route path="repair" element={<Repair />} />
        <Route path="repair/create" element={<RepairCreate />} />
        <Route path="room" element={<Room />} />
        <Route path="room/create" element={<CreateRoom />} />
        <Route path="activity" element={<Activity />} />
        <Route path="activity/create" element={<ActivityCreate />} />
      </Route>

      <Route path="tourist" element={<TouristLayout />}>
        <Route path="bookPlan" element={<BookPlan />} />
        <Route path="food" element={<Food />} />
        <Route path="planner" element={<Planner />} />
        <Route path="room" element={<Room />} />
        <Route path="bookActivity" element={<BookActivity />} />
        <Route path="payment" element={<Payment />} />
        <Route path="profile" element={<Profile />} />
      </Route>
    </>
  )
);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
