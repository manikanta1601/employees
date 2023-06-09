import React from 'react'
import NavbarMain from "../navbar/NavbarMain"
import Footer from "../footer/Footer"
import { Outlet } from 'react-router-dom'
function RootLayout() {
  return (
    <div style={{
      minHeight: "100vh",
      display: "flex",
      flexDirection: "column",
      backgroundImage: "url(https://img.freepik.com/free-vector/gradient-background-vector-spring-green_53876-117272.jpg?size=626&ext=jpg&ga=GA1.2.539893135.1686191687&semt=ais)",
      backgroundSize: "cover",
      backgroundPosition: "center",
    }}>
     <NavbarMain/>
     {/* placeholder */}
     <div >
     <Outlet/>
     </div>
     <div style={{marginTop:"auto"}}>
     <Footer/>
     </div>
     
    </div>
  )
}

export default RootLayout