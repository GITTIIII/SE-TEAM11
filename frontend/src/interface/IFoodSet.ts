import {SavoryInterface} from "./ISavory";
import { DessertInterface } from "./IDessert";
import { DrinkInterface } from "./IDrink";

export interface FoodSetInterface {
    ID?: number;

    SavoryID?: number;
    Savory?: SavoryInterface;

    DessertID?: number;
    Dessert?: DessertInterface;

    DrinkID?: number;
    Drink?: DrinkInterface;
}