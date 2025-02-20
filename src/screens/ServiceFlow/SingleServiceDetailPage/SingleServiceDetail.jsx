import React, { useEffect } from 'react'
import Header from '../../../components/Layout/Header'
import SearchBar from '../../../components/Main/SearchBar'
import SingleServiceBanner from './SingleServiceBanner'
import SingleServiceTopButtonsSlider from './SingleServiceTopButtonsSlider'
import Footer from '../../../components/Layout/Footer'
import SingleServiceFaqs from './SingleServiceFaqs'
import { useLocation } from 'react-router-dom'
import {BASE_URL} from '../../../utils/api'
import axios from 'axios'
import { useState } from 'react'

function SingleServiceDetail() {
    const [subSerCat, setSubSerCat] = useState([]);
    const [loading2, setLoading2] = useState(true);

  const location = useLocation();

  const queryParams = new URLSearchParams(location.search);
  const id = queryParams.get('id');


  const fetchSubCatProduct = async () => {
    if (!id) return;
    setLoading2(true);
    try {
        const response = await axios.get(`${BASE_URL}service/category-by-subCategory?type=sub_category&category_id=${id}`);
        setSubSerCat(response?.data?.data?.subCategory);
    } catch (error) {
        console.error('Error fetching subcategories:', error);
    } finally {
        setLoading2(false);
    }
};

  useEffect(() => {
    fetchSubCatProduct();
}, [id]);



  return (
    <>
      <Header/>
      <SearchBar/>
      <SingleServiceBanner data={subSerCat} id={id}/>
      <SingleServiceTopButtonsSlider data={subSerCat} id={id}/>
      <SingleServiceFaqs />
      <Footer/>
      
    </>
  )
}

export default SingleServiceDetail
