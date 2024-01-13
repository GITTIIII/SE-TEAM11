import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";

import LoginTourist from "./page/login/loginTourist/loginTourist";
import LoginEmployee from "./page/login/loginEmployee/loginEmployee";
import Register from "./page/register/register";

import EmployeeLayout from "./layout/employeeLayout/employeeLayout";
import CheckIn from "./page/employee/checkIn";
import Destination from "./page/employee/destination";
import CreateDestination from "./page/employee/destination/destinationCreate";
import EditDestination from "./page/employee/destination/destinationEdit";
import Food from "./page/tourist/food";
import Planner from "./page/employee/planner";
import CreatePlanner from "./page/employee/planner/plannerCreate";
import EditPlanner from "./page/employee/planner/plannerEdit";
import Repair from "./page/employee/repair";
import Room from "./page/employee/room";
import CreateRoom from "./page/employee/room/createRoom";
import EditRoom from "./page/employee/room/editRoom";
import Payment from "./page/employee/payment";
import Employee from "./page/employee/employeeCreate";
import Activity from "./page/employee/activity";
import RepairCreate from "./page/employee/repair/repairCreate";
import EmployeeProfile from "./page/employee/employeeProfile";
import FoodSetDashbord from "./page/employee/food/foodSet/foodSetDeshbord";
import FoodSetCreate from "./page/employee/food/foodSet/foodSetCreate";
import FoodSetUpdate from "./page/employee/food/foodSet/foodSetUpdate";
import DessertDashbord from "./page/employee/food/dessert/dessertDashbord";
import DessertCreate from "./page/employee/food/dessert/dessertCreate";
import DessertUpdate from "./page/employee/food/dessert/dessertUpdate";
import DrinkDashbord from "./page/employee/food/drink/drinkDashbord";
import DrinkCreate from "./page/employee/food/drink/drinkCreate";
import DrinkUpdate from "./page/employee/food/drink/drinkUpdate";
import SavoryDashbord from "./page/employee/food/savory/savoryDashbord";
import SavoryCreate from "./page/employee/food/savory/savoryCreate";
import SavoryUpdate from "./page/employee/food/savory/savoryUpdate";

import TouristLayout from "./layout/touristLayout/touristLayout";
import BookPlan from "./page/tourist/bookPlan";
import ShowRoom from "./page/tourist/room";
import TouristProfile from "./page/tourist/touristProfile";
import BookActivity from "./page/tourist/bookActivity";
import BookActivityCreate from "./page/tourist/bookActivity/bookActivityCreate";

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
        <Route path="destination/edit/:id" element={<EditDestination />} />
        <Route path="food" element={<FoodSetDashbord />} />
        <Route path="foodSet/Create" element={<FoodSetCreate/>} />
        <Route path="foodSet/Update" element={<FoodSetUpdate />} />
        <Route path="dessert" element={<DessertDashbord />} />
        <Route path="dessert/Create" element={<DessertCreate/>} />
        <Route path="dessert/Update" element={<DessertUpdate />} />
        <Route path="drink" element={<DrinkDashbord />} />
        <Route path="drink/Create" element={<DrinkCreate/>} />
        <Route path="drink/Update" element={<DrinkUpdate />} />
        <Route path="savory" element={<SavoryDashbord />} />
        <Route path="savory/Create" element={<SavoryCreate/>} />
        <Route path="savory/Update" element={<SavoryUpdate />} />
        <Route path="planner" element={<Planner />} />
        <Route path="planner/create" element={<CreatePlanner />} />
        <Route path="planner/edit/:id" element={<EditPlanner />} />
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
        <Route path="showroom" element={<ShowRoom />} />
        <Route path="bookActivity" element={<BookActivity />} />
        <Route path="bookActivity/bookActivityCreate"element={<BookActivityCreate />}/>
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
