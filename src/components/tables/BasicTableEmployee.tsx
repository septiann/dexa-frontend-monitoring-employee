"use client";

import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "../ui/table";

import { useSelector } from "react-redux";
import { getEmployees, updateEmployee } from "@/lib/auth";
import { Employee } from "@/types/auth";
import { RootState } from "@/store";
import { useModal } from "@/hooks/useModal";
import { Modal } from "../ui/modal";
import Label from "../form/Label";
import Input from "../form/input/InputField";
import Select from "../form/Select";
import { ChevronDownIcon } from "@/icons";
import Button from "../ui/button/Button";

export default function BasicTableEmployee() {
  const { isOpen, openModal, closeModal } = useModal();
  const employee = useSelector((state: RootState) => state.employee);
  const [listEmployee, setListEmployees] = useState<Employee[]>([]);
  const [loading, setLoading] = useState(true);
  const [idEmp, setIdEmp] = useState("");
  const [formData, setFormData] = useState({
    name: employee.name ?? "",
    email: employee.email ?? "",
    phone: employee.phone ?? "",
    positionId: employee.positionId ?? "",
    status: employee.status ?? "",
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getEmployees();
        setListEmployees(data);
      } catch (error) {
        console.error("Failed to fetch attendances:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [employee.nik]);

  if (loading) {
    return (
      <div className="p-4 text-center text-gray-500 dark:text-gray-400">
        Loading...
      </div>
    );
  }

  const handleEdit = (emp: Employee) => {
    setIdEmp(emp.id);
    openModal();
    setFormData({
      name: emp.name ?? "",
      email: emp.email ?? "",
      phone: emp.phone ?? "",
      positionId: emp.positionId ?? "",
      status: emp.status ?? "",
    });

    // contoh: router.push(`/employees/edit/${emp.id}`)
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const updated = await updateEmployee(idEmp ?? "", formData);

      console.log("Updated employee:", updated);
      alert("Update berhasil!");

      closeModal();
    } catch (error) {
      console.error("Error updating employee:", error);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChangePosition = (value: string) => {
    setFormData((prev) => ({ ...prev, positionId: value }));
  };

  const handleSelectChangeStatus = (value: string) => {
    setFormData((prev) => ({ ...prev, status: value }));
  }

  const options = [
    { value: "1", label: "Direktur Utama" },
    { value: "2", label: "Wakil Direktur" },
    { value: "3", label: "Direktur Divisi" },
    { value: "4", label: "Kepala Departemen" },
    { value: "5", label: "Manajer" },
    { value: "6", label: "Supervisor" },
    { value: "7", label: "Senior Staff" },
    { value: "8", label: "Staff" },
    { value: "9", label: "Admin / Support" },
  ];

  const optionStatus = [
    { value: "active", label: "Active" },
    { value: "inactive", label: "Inactive" },
  ]

  return (
    <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]">
      <div className="max-w-full overflow-x-auto">
        <div className="min-w-[1102px]">
          <Table>
            {/* Table Header */}
            <TableHeader className="border-b border-gray-100 dark:border-white/[0.05]">
              <TableRow>
                <TableCell
                  isHeader
                  className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                >
                  NIK
                </TableCell>
                <TableCell
                  isHeader
                  className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                >
                  Name
                </TableCell>
                <TableCell
                  isHeader
                  className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                >
                  Email
                </TableCell>
                <TableCell
                  isHeader
                  className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                >
                  Phone
                </TableCell>
                <TableCell
                  isHeader
                  className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                >
                  Position
                </TableCell>
                <TableCell
                  isHeader
                  className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                >
                  Status
                </TableCell>
                <TableCell
                  isHeader
                  className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                >
                  Created At
                </TableCell>
                <TableCell
                  isHeader
                  className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                >
                  Action
                </TableCell>
              </TableRow>
            </TableHeader>

            {/* Table Body */}
            <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
              {listEmployee.map((emp) => (
                <TableRow key={emp.id}>
                  <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                    {emp.nik}
                  </TableCell>
                  <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                    {emp.name}
                  </TableCell>
                  <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                    {emp.email}
                  </TableCell>
                  <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                    {emp.phone}
                  </TableCell>
                  <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                    {emp.positionId}
                  </TableCell>
                  <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                    {emp.status}
                  </TableCell>
                  <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                    {new Date(emp.createdAt).toLocaleString("id-ID")}
                  </TableCell>
                  <TableCell className="px-4 py-3 text-start">
                    <button
                      onClick={() => handleEdit(emp)}
                      className="rounded-md bg-amber-400 px-3 py-1 text-sm text-white hover:bg-amber-300"
                    >
                      Edit
                    </button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>

      <Modal isOpen={isOpen} onClose={closeModal} className="max-w-[700px] m-4">
        <div className="no-scrollbar relative w-full max-w-[700px] overflow-y-auto rounded-3xl bg-white p-4 dark:bg-gray-900 lg:p-11">
          <div className="px-2 pr-14">
            <h4 className="mb-2 text-2xl font-semibold text-gray-800 dark:text-white/90">
              Edit Personal Information
            </h4>
            <p className="mb-6 text-sm text-gray-500 dark:text-gray-400 lg:mb-7">
              Update your details to keep your profile up-to-date.
            </p>
          </div>
          <form className="flex flex-col" onSubmit={handleSave}>
            <div className="custom-scrollbar h-[450px] overflow-y-auto px-2 pb-3">
              <div className="mt-7">
                <h5 className="mb-5 text-lg font-medium text-gray-800 dark:text-white/90 lg:mb-6">
                  Personal Information
                </h5>

                <div className="grid grid-cols-1 gap-x-6 gap-y-5 lg:grid-cols-2">
                  <div className="col-span-2">
                    <Label>Name</Label>
                    <Input 
                      type="text" 
                      defaultValue={formData.name}
                      onChange={handleInputChange}
                      name="name"
                    />
                  </div>

                  <div className="col-span-2 lg:col-span-1">
                    <Label>Email Address</Label>
                    <Input 
                      type="text" 
                      defaultValue={formData.email}
                      onChange={handleInputChange}
                      name="email"
                    />
                  </div>

                  <div className="col-span-2 lg:col-span-1">
                    <Label>Phone</Label>
                    <Input 
                      type="text" 
                      defaultValue={formData.phone} 
                      onChange={handleInputChange}
                      // value={formData.phone}
                      name="phone"
                    />
                  </div>

                  <div className="col-span-2">
                    <Label>Position</Label>
                    <div className="relative">
                      <Select
                        options={options}
                        placeholder="Select an option"
                        onChange={handleSelectChangePosition}
                        className="dark:bg-dark-900"
                      />
                      <span className="absolute text-gray-500 -translate-y-1/2 pointer-events-none right-3 top-1/2 dark:text-gray-400">
                        <ChevronDownIcon />
                      </span>
                    </div>
                  </div>

                  <div className="col-span-2">
                    <Label>Status</Label>
                    <div className="relative">
                      <Select
                        options={optionStatus}
                        placeholder="Select an option"
                        onChange={handleSelectChangeStatus}
                        className="dark:bg-dark-900"
                      />
                      <span className="absolute text-gray-500 -translate-y-1/2 pointer-events-none right-3 top-1/2 dark:text-gray-400">
                        <ChevronDownIcon />
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-3 px-2 mt-6 lg:justify-end">
              <Button size="sm" variant="outline" onClick={closeModal}>
                Close
              </Button>
              <Button size="sm">
                Save Changes
              </Button>
            </div>
          </form>
        </div>
      </Modal>
    </div>
  );
}
