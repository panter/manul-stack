import React from "react";
import dynamic from "next/dynamic";
import AdminApp from "../modules/admin";

const adminPage = () => <AdminApp />;
adminPage.getLayout = (el: any) => el;
export default adminPage;
