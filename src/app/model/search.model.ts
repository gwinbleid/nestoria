import Employees from './employee.model';

export default interface Searches {
    id: string;
    results: Employees[],
    count: number
}