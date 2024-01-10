import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";

import Register from "./page/register/register";
import CheckIn from "./page/employee/checkIn";
import Destination from "./page/employee/destination";
import CreateDestination from "./page/employee/destination/destinationCreate";
import Food from "./page/employee/food";
import Planner from "./page/employee/planner";
import Repair from "./page/employee/repair";
import Room from "./page/employee/room";
import CreateRoom from "./page/employee/room/createRoom";
import EditRoom from "./page/employee/room/editRoom";
import Payment from "./page/employee/payment";
import EmployeeLayout from "./layout/employeeLayout/employeeLayout";
import Employee from "./page/employee/employeeCreate";
import LoginEmployee from "./page/login/loginEmployee/loginEmployee";
import TouristLayout from "./layout/touristLayout/touristLayout";
import BookPlan from "./page/tourist/bookPlan";
import BookActivity from "./page/tourist/bookActivity";
import Activity from "./page/employee/activity";
import LoginTourist from "./page/login/loginTourist/loginTourist";
import RepairCreate from "./page/employee/repair/repairCreate";
import TouristProfile from "./page/tourist/touristProfile";
import EmployeeProfile from "./page/employee/employeeProfile";
import BookActivityCreate from "./page/tourist/bookActivity/bookActivityCreate";
import BookActivityUpdate from "./page/tourist/bookActivity/bookActivityUpdate";

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route index path="/" element={<LoginTourist />} />
      <Route path="login/employee" element={<LoginEmployee />} />
      <Route path="register" element={<Register />} />

      <Route path="employee" element={<EmployeeLayout />}>
        <Route path="employeeProfile" element={<EmployeeProfile />} />
        <Route path="admin" element={<Employee />} />
        <Route path="payment" element={<Payment />} />
        <Route path="check-in" element={<CheckIn />} />
        <Route path="destination" element={<Destination />} />
        <Route path="destination/create" element={<CreateDestination />} />
        <Route path="food" element={<Food />} />
        <Route path="planner" element={<Planner />} />
        <Route path="repair" element={<Repair />} />
        <Route path="repair/create" element={<RepairCreate />} />
        <Route path="room" element={<Room />} />
        <Route path="room/create" element={<CreateRoom />} />
        <Route path="room/edit/:id" element={<EditRoom />} />
        <Route path="activity" element={<Activity />} />
      </Route>

      <Route path="tourist" element={<TouristLayout />}>
        <Route path="bookPlan" element={<BookPlan />} />
        <Route path="food" element={<Food />} />
        <Route path="planner" element={<Planner />} />
        <Route path="room" element={<Room />} />
        <Route path="bookActivity" element={<BookActivity />} />
        <Route path="bookActivity/bookActivityCreate" element={<BookActivityCreate />}/>
        <Route path="bookActivity/bookActivityUpdate" element={<BookActivityUpdate />}/>
        <Route path="payment" element={<Payment />} />
        <Route path="touristProfile" element={<TouristProfile />} />
        <Route path="destination" element={<Destination />} />
      </Route>
    </>
  )
);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
