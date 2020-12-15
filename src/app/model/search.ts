import { Employees } from "./employee";

export interface Searches {
    id: string;
    results: Employees[],
    count: number
}