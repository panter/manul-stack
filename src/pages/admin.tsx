import React from "react";
import dynamic from "next/dynamic";

const AdminApp = dynamic({
  loader: () => import("../modules/admin"),
  ssr: false,
});

const adminPage = () => <AdminApp />;
adminPage.getLayout = (el: any) => el;
export default adminPage;
