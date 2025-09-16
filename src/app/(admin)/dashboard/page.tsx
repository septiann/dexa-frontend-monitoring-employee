"use client";

import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";

import ProtectedRoute from "@/components/ProtectedRoute";

import { RootState } from "@/store";
import { setEmployee } from "@/store/employeeSlice";
import { getProfileByEmail } from "@/lib/auth";
import Alert from "@/components/ui/alert/Alert";

export default function DashboardPage() {
  const user = useSelector((state: RootState) => state.user);
  const [isEmployeeExists, setIsEmployeeExists] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    const getProfileEmployee = async () => {
      try {
        if (!user.email) {
          setIsEmployeeExists(false);
        } else {
          const employee = await getProfileByEmail(user.email);
          setIsEmployeeExists(true);
          dispatch(setEmployee(employee));
        }
      } catch {
        setIsEmployeeExists(false);
      }
    };

    getProfileEmployee();
  }, [user.email, dispatch]);
  
  return (
    <ProtectedRoute>
      <div className="rounded-2xl border border-gray-200 bg-white px-5 pb-5 pt-5 dark:border-gray-800 dark:bg-white/[0.03] sm:px-6 sm:pt-6">
        <div className="flex flex-col gap-5 mb-6 sm:flex-row sm:justify-between">
          <div className="w-full">
            {!isEmployeeExists && (
              <Alert
                variant="error"
                title="Data anda belum lengkap"
                message="Silahkan untuk melengkapi data karyawan anda."
                showLink={true}
                linkHref="/profile"
                linkText="Lengkapi data profil"
              />
            )}
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90 mt-5">
              Dashboard
            </h3>
            <p className="mt-1 text-gray-500 text-theme-sm dark:text-gray-400">
              Selamat datang di aplikasi absen karyawan.
            </p>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
}
