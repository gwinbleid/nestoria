export interface Employees {
    _id: string,
    index: number,
    guid: string,
    isActive: boolean,
    balance: string,
    picture: string,
    age: number,
    eyeColor: string,
    name: Name
    company: string,
    email: string,
    phone: string,
    address: string,
    about: string,
    registered: string,
    latitude: string,
    longitude: string,
    tags: String[],
    range: Number[],
    friends: Object[],
    greeting: string,
    favoriteFruit: string
}

export interface Name {
    first: string;
    last: string
}