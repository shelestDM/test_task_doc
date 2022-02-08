import React, { useEffect } from 'react';
import Converter from './components/Converter';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import './styles/App.css'
import {useState} from 'react'
import PostList from './components/PostList';
import axios from 'axios';
import NavBar from './components/NavBar';

function App() {
  
  useEffect(() => {fetchData();}, [])
  
  const [posts, setPosts] = useState([])

  async function fetchData()
  {
    var response = await axios.get('https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?json')
    setPosts(response.data)
  }
  
  return (
    <BrowserRouter>
      <NavBar></NavBar>
      <Routes>
      <Route path="converter" element={<Converter />}></Route>
      <Route path="course" element={<PostList posts={posts}></PostList>}></Route>
      <Route path="/" element={<PostList posts={posts}></PostList>}></Route>
    </Routes>
    </BrowserRouter> 
  );
}

export default App;

