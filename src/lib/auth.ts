import api from "./api";
import { Attendance, Employee, LoginResponse, Position, User } from "@/types/auth";

export async function login(email: string, password: string): Promise<LoginResponse> {
  const res = await api.post<LoginResponse>("/auth/login", { email, password });

  return res.data;
}

export async function register(
  email: string,
  password: string
): Promise<User> {
  const res = await api.post<User>("/auth/register", {
    email,
    password,
  });

  return res.data;
}

export async function getProfile(id: string): Promise<Employee> {
  const res = await api.get<Employee>(`/employees/${id}`);
  
  return res.data;
}

export async function getProfileByEmail(email: string): Promise<Employee> {
  const res = await api.get<Employee>(`/employees/email/${email}`);
  
  return res.data;
}

export async function getPosition(code: string): Promise<Position> {
  const res = await api.get<Position>(`/positions/${code}`);

  return res.data;
}

export async function updateEmployee(
  id: string,
  data: Partial<Employee>
): Promise<Employee> {
  const res = await api.put<Employee>(`/employees/${id}`, data);
  
  return res.data;
}

export async function createEmployee(
  positionId: string,
  photoUrl: string,
  authUserId: string,
  name: string,
  email: string,
  phone: string
): Promise<User> {
  const res = await api.post<User>("/employees", {
    positionId,
    photoUrl,
    authUserId,
    name,
    email,
    phone
  });

  console.log(res);

  return res.data;
}

export async function getEmployees(): Promise<Employee[]> {
  const res = await api.get<Employee[]>(`/employees`);

  return res.data;
}

export async function submitAttendance(
  data: Partial<Attendance>
): Promise<Attendance> {
  const res = await api.post<Attendance>(`/attendances`, data);

  return res.data;
}

export async function getAttendances(): Promise<Attendance[]> {
  const res = await api.get<Attendance[]>(`/attendances`);

  return res.data;
}
