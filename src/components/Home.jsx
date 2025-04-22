import React from 'react'
import MyNavbar from './Navbar'
import Landing from './pages/Landing'
import CardSection from './pages/Card'
import Info from './pages/Info'
import Isi from './pages/Isi'
import Tecs from './pages/Tecs'
import Testi from './pages/Testi'
import Footer from './Footer'


const Home = () => {
  return (
    <div>
        <MyNavbar />
        <Landing />
        <CardSection/>
        <Info/>
        <Isi/>
        <Tecs/>
        <Testi/>
        <Footer/>
        {/* <div className="container">
            <h1>Welcome to the Home Page</h1>
            <p>This is the home page content.</p>
        </div> */}
    </div>
  )
}

export default Home
