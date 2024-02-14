import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";

import EmployeeLayout from "./layout/employeeLayout/employeeLayout";
import TouristLayout from "./layout/touristLayout/touristLayout";

import LoginTourist from "./page/login/loginTourist/loginTourist";
import LoginEmployee from "./page/login/loginEmployee/loginEmployee";
import Register from "./page/register/register";

import EmployeeManagement from "./page/employee/";
import RegisterEmployee from "./page/employee/employeeCreate";
import CheckIn from "./page/employee/checkIn";
import Destination from "./page/employee/destination";
import CreateDestination from "./page/employee/destination/destinationCreate";
import Planner from "./page/employee/planner";
import CreatePlanner from "./page/employee/planner/plannerCreate";
import ShowPlanner from "./page/tourist/planner";
import Repair from "./page/employee/repair";
import Room from "./page/employee/room";
import CreateRoom from "./page/employee/room/createRoom";
import ShowPayment from "./page/employee/showPayment";
import Activity from "./page/employee/activity";
import RepairCreate from "./page/employee/repair/repairCreate";
import EmployeeProfile from "./page/employee/employeeProfile";
import FoodSetDashbord from "./page/employee/food/foodSet/foodSetDeshbord";
import FoodSetCreate from "./page/employee/food/foodSet/foodSetCreate";
import FoodSetUpdate from "./page/employee/food/foodSet/foodSetUpdate";
import DessertDashbord from "./page/employee/food/dessert/dessertDeshbord";
import DessertCreate from "./page/employee/food/dessert/dessertCreate";
import DessertUpdate from "./page/employee/food/dessert/dessertUpdate";
import DrinkDashbord from "./page/employee/food/drink/drinkDashbord";
import DrinkCreate from "./page/employee/food/drink/drinkCreate";
import DrinkUpdate from "./page/employee/food/drink/drinkUpdate";
import SavoryDashbord from "./page/employee/food/savory/savoryDashbord";
import SavoryCreate from "./page/employee/food/savory/savoryCreate";
import SavoryUpdate from "./page/employee/food/savory/savoryUpdate";

import BookPlan from "./page/tourist/bookPlan";
import BookPlanCreate from "./page/tourist/bookPlan/bookPlanCreate"
import ShowRoom from "./page/tourist/room";
import TouristProfile from "./page/tourist/touristProfile";
import BookActivity from "./page/tourist/bookActivity";
import BookActivityCreate from "./page/tourist/bookActivity/bookActivityCreate";
import Payment from "./page/tourist/payment";
import Reciept from "./page/tourist/bookPlan/reciept";
import EditProfile from "./page/tourist/touristProfile/touristProfileEdit";
import PaymentCreate from "./page/tourist/payment/paymentCreate";
import Main from "./page/tourist/main";
import Food from "./page/tourist/food";
import Review from "./page/tourist/review";

import { PrivateRoutes } from "./utils/PrivateRoute";

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route index path="/" element={<LoginTourist />} />
      <Route path="login/employee" element={<LoginEmployee />} />
      <Route path="register" element={<Register />} />

      <Route element={<PrivateRoutes />}>
        <Route path="employee" element={<EmployeeLayout />}>
          <Route path="employeeProfile" element={<EmployeeProfile />} />
          <Route path="payment" element={<ShowPayment />} />
          <Route path="employee" element={<EmployeeManagement />} />
          <Route path="employeeCreate" element={<RegisterEmployee />} />
          <Route path="check-in/:date" element={<CheckIn />} />
          <Route path="destination" element={<Destination />} />
          <Route path="destination/create" element={<CreateDestination />} />
          <Route path="food" element={<FoodSetDashbord />} />
          <Route path="food/create" element={<FoodSetCreate />} />
          <Route path="food/edit/:id" element={<FoodSetUpdate />} />
          <Route path="food/Savory" element={<SavoryDashbord />} />
          <Route path="food/Savory/create" element={<SavoryCreate />} />
          <Route path="food/Savory/edit/:id" element={<SavoryUpdate />} />
          <Route path="food/Drink" element={<DrinkDashbord />} />
          <Route path="food/Drink/create" element={<DrinkCreate />} />
          <Route path="food/Drink/edit/:id" element={<DrinkUpdate />} />
          <Route path="food/Dessert" element={<DessertDashbord />} />
          <Route path="food/Dessert/create" element={<DessertCreate />} />
          <Route path="food/Dessert/edit/:id" element={<DessertUpdate />} />
          <Route path="planner" element={<Planner />} />
          <Route path="planner/create" element={<CreatePlanner />} />
          <Route path="repair" element={<Repair />} />
          <Route path="repair/create" element={<RepairCreate />} />
          <Route path="room" element={<Room />} />
          <Route path="room/create" element={<CreateRoom />} />
          <Route path="activity" element={<Activity />} />
        </Route>

        <Route path="tourist" element={<TouristLayout />}>
          <Route path="main" element={<Main />} />
          <Route path="bookPlan" element={<BookPlan />} />
          <Route path="bookPlan/bookPlanCreate" element={<BookPlanCreate />} />
          <Route path="reciept" element={<Reciept />} />
          <Route path="food" element={<Food />} />
          <Route path="room" element={<Room />} />
          <Route path="review/:id" element={<Review />} />
          <Route path="showPlanner" element={<ShowPlanner />} />
          <Route path="showroom" element={<ShowRoom />} />
          <Route path="bookActivity" element={<BookActivity />} />
          <Route path="bookActivity/bookActivityCreate"element={<BookActivityCreate />}/>
          <Route path="payment/create/:id" element={<PaymentCreate />} />
          <Route path="payment" element={<Payment />} />
          <Route path="touristProfile" element={<TouristProfile />} />
          <Route path="editProfile" element={<EditProfile />} />
        </Route>
      </Route>
    </>
  )
);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
