import ComponentCard from "@/components/common/ComponentCard";
import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import BasicTableOne from "@/components/tables/BasicTableOne";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Riwayat Absensi",
  description:
    "Riwayat Absensi",
  // other metadata
};

export default function BasicTables() {
  return (
    <div>
      <PageBreadcrumb pageTitle="Riwayat Absensi" />
      <div className="space-y-6">
        <ComponentCard title="Riwayat Absensi">
          <BasicTableOne />
        </ComponentCard>
      </div>
    </div>
  );
}
