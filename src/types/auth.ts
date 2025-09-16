export interface LoginResponse {
  user: User,
  access_token: string;
}

export interface User {
  id: string;
  email: string;
  isActive: boolean;
  userType: string;
}

export interface Employee {
  id: string;
  positionId: string,
  photoUrl: string,
  authUserId: string,
  createdAt: string,
  updatedAt: string,
  deletedAt: string,
  nik: string,
  name: string,
  phone: string,
  email: string,
  status: string,
}

export interface Position {
  id: string;
  name: string;
  codePosition: string;
  description: string;
}

export interface Attendance {
  nik: string;
  type: string,
  attendanceDate: string,
  id: string,
  createdAt: string
}
