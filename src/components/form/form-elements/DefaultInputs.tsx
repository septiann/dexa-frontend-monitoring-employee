"use client";
import React, { useState } from 'react';
import ComponentCard from '../../common/ComponentCard';
import Label from '../Label';
import Input from '../input/InputField';
import Select from '../Select';
import { ChevronDownIcon } from '../../../icons';
import Button from '@/components/ui/button/Button';
import { submitAttendance } from '@/lib/auth';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';

export default function DefaultInputs() {
  const employee = useSelector((state: RootState) => state.employee);

  const [form, setForm] = useState({
    nik: employee.nik ?? "",
    type: ""
  });

  const options = [
    { value: "IN", label: "Masuk" },
    { value: "OUT", label: "Pulang" },
  ];

  const handleSelectChange = (value: string) => {
    setForm((prev) => ({ ...prev, type: value }));
    console.log("Selected value:", value);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setForm((prev) => ({ ...prev, nik: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const updated = await submitAttendance(form);
      console.log("Updated employee:", updated);

      alert("Absensi berhasil!");

    } catch (err: unknown) {
      let message = "Terjadi kesalahan";
      if (typeof err === "object" && err !== null && "response" in err) {
        const errorObj = err as { response?: { data?: { message?: string } } };
        message = errorObj.response?.data?.message || message;
      } else if (err instanceof Error) {
        message = err.message;
      }
      alert(message);
    }
  };

  return (
    <ComponentCard title="Pilih Waktu Absen">
      <form onSubmit={handleSubmit}>
        <div className="space-y-6">
          <div>
            <Label>NIK</Label>
            <Input type="text" disabled={true} defaultValue={employee.nik ?? ""} value={form.nik} onChange={handleInputChange} />
          </div>
          
          <div>
            <Label>Pilih Waktu Absen</Label>
            <div className="relative">
              <Select
              options={options}
              placeholder="Select an option"
              onChange={handleSelectChange}
              className="dark:bg-dark-900"
            />
              <span className="absolute text-gray-500 -translate-y-1/2 pointer-events-none right-3 top-1/2 dark:text-gray-400">
                <ChevronDownIcon />
              </span>
            </div>
          </div>

          <Button className="w-full" size="sm">
            Submit
          </Button>
        </div>
      </form>
    </ComponentCard>
  );
}
