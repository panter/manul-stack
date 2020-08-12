import React from "react"
import dynamic from "next/dynamic"

const AdminApp = dynamic({
  loader: () => import("../modules/admin"),
  ssr: false,
})

export default () => <AdminApp />
