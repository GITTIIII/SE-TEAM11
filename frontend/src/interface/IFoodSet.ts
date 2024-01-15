import {DessertInterface} from "./IDessert";
import { DrinkInterface } from "./IDrink";
import { SavoryInterface } from "./ISavory";

export interface FoodSetInterface {
    ID?: number;
    Name?: string;
    Count?: number;

    SavoryID?: number;
    Savory?: SavoryInterface;

    DrinkID?: number;
    Drink?: DrinkInterface;
    
    DessertID?: number;
    Dessert?: DessertInterface; 
}