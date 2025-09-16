import ComponentCard from "@/components/common/ComponentCard";
import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import BasicTableEmployee from "@/components/tables/BasicTableEmployee";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Daftar Karyawan",
  description:
    "Daftar Karyawan",
  // other metadata
};

export default function BasicTables() {
  return (
    <div>
      <PageBreadcrumb pageTitle="Daftar Karyawan" />
      <div className="space-y-6">
        <ComponentCard title="Daftar Karyawan">
          <BasicTableEmployee />
        </ComponentCard>
      </div>
    </div>
  );
}
