//import { useState } from 'react'

import './App.css'
import AppRouter from './app/router';
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';

function App() {


    return (
        <>
            <Navbar />
            <AppRouter />
            <Footer />
        </>
    )
}

export default App
