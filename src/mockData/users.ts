export type UserRole = "admin" | "operator";

export interface User {
  email: string;
  password: string;
  name: string;
  role: UserRole;
  allowedScadas: number[];
}

export const users: User[] = [
  {
    email: "Vijayakumar@orchidpharma",
    password: "1234",
    name: "Vijayakumar",
    role: "admin",
    allowedScadas: [1, 2, 3, 4, 5, 6, 7, 8],
  },
  {
    email: "operator@orchidpharma",
    password: "1234",
    name: "Operator",
    role: "operator",
    allowedScadas: [1, 2, 3],
  },
];
