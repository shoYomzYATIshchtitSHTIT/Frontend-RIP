import { Routes, Route } from 'react-router-dom'
import { Container } from 'react-bootstrap'
import Navbar from './components/Navbar/Navbar'
import HomePage from './pages/Home/HomePage'
import IntervalsPage from './pages/Intervals/IntervalsPage'
import IntervalDetailPage from './pages/IntervalDetail/IntervalDetailPage'
import { ROUTES } from './utils/routes'
import './App.css'
import { invoke } from "@tauri-apps/api/core";
import {useEffect} from "react";

function App() {
    useEffect(()=>{
        invoke('tauri', {cmd:'create'})
            .then(() =>{console.log("Tauri launched")})
            .catch(() =>{console.log("Tauri not launched")})
        return () =>{
            invoke('tauri', {cmd:'close'})
                .then(() =>{console.log("Tauri launched")})
                .catch(() =>{console.log("Tauri not launched")})
        }
    }, [])

    return (
        <>
            <Navbar />
            <Container fluid className="app-container">
                <Routes>
                    <Route path={ROUTES.HOME} element={<HomePage />} />
                    <Route path={ROUTES.INTERVALS} element={<IntervalsPage />} />
                    <Route path={ROUTES.INTERVAL_DETAIL} element={<IntervalDetailPage />} />
                </Routes>
            </Container>
        </>
    )
}

export default App