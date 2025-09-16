import Login from "@/components/auth/LoginForm";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Aplikasi WFH Karyawan",
  description: "Aplikasi karyawan untuk melakukan absensi",
};

export default function SignIn() {
  return <Login />;
}
