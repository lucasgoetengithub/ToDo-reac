import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Home from '../views/Home';
import Task from '../views/Task';

export default function Routers() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/home' element={<Home/>}/>
                <Route path='/' element={<Home/>}/>
                <Route path='/task' element={<Task/>}/>
            </Routes>
        </BrowserRouter>
    )
}