import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";

import Login from "./page/login";
import Register from "./page/register";

import CheckIn from "./page/employee/checkIn";
import Destination from "./page/employee/destination";
import Food from "./page/employee/food";
import Planner from "./page/employee/planner";
import Repair from "./page/employee/repair";
import Room from "./page/employee/room";
import Payment from "./page/employee/payment";
import EmployeeLayout from "./layout/employeeLayout";
import Employee from "./page/employee";

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
        <Route index element={<Login />} />
        <Route path="register" element={<Register/>} />

        <Route path="employee" element={<EmployeeLayout/>}>
          <Route path="admin" element={<Employee/>}/>
          <Route path="payment" element={<Payment/>}/>
          <Route path="check-in" element={<CheckIn/>}/>
          <Route path="destination" element={<Destination/>}/>
          <Route path="food" element={<Food/>}/>
          <Route path="planner" element={<Planner/>}/>
          <Route path="repair" element={<Repair/>}/>
          <Route path="room" element={<Room/>}/>
        </Route>

    </>
  )
);
function App() {
  return <RouterProvider router={router} />;
}

export default App;