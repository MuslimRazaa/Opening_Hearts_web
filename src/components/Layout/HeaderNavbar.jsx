import React, { useEffect, useRef, useState } from 'react';
import humb from '../../media/images/humb.svg';
import blackAero from '../../media/images/Vector (1).png';
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import { Link } from 'react-router-dom';
import { BASE_URL, organizationAllCategories, productAllCategories, serviceAllCategories } from '../../utils/api';
import axios from 'axios';
import SkeletonLoaderForProductsNav from './SkeletonLoaderForProductsNav';

function HeaderNavbar() {
    const [dropdownActive, setDropdownActive] = useState(false);
    const [allCat, setAllCat] = useState();
    const [allCampCat, setAllCampCat] = useState([0]);
    const [allOrgCat, setAllOrgCat] = useState([0]);
    const [selectedType, setSelectedType] = useState(1);
    const [loading2, setLoading2] = useState(true);
    const [subCat, setSubCat] = useState([]);
    const [subSerCat, setSubSerCat] = useState([]);
    const [catProduct, setCatProduct] = useState([]);
    const [catSerProduct, setCatSerProduct] = useState([]);
    const [CategoryId, setCategoryId] = useState();
    const [subCategoryId, setSubCategoryId] = useState();
    const [productById, setProductById] = useState();
    const [productsTitle, setProductsTitle] = useState();

    const dropdownRef = useRef(null);
    const buttonRef = useRef(null); // Reference for the dropdown button

    const handleDropdown = () => {
        setDropdownActive(!dropdownActive);
    };

    // Close dropdown if clicking outside of it
    useEffect(() => {
        function handleClickOutside(event) {
            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(event.target) &&
                buttonRef.current &&
                !buttonRef.current.contains(event.target)
            ) {
                setDropdownActive(false);
            }
        }

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const handleTypeSelected = (id) => {
        setSelectedType(id)
        setSubCategoryId("");
        setProductById("");

    };


    const handleCatSelected = (id, title) => {
        setCategoryId(id);
        setProductById(id);
        setSubCategoryId("");
        setProductsTitle(title);
    };

    const handleSubCatId = (id, title) => {
        setSubCategoryId(id);
        setProductById(id);
        setProductsTitle(title);
    };

    // Fetch all categories
    useEffect(() => {
        const fetchProductAllCategories = async () => {
            try {
                const response = await productAllCategories();
                setAllCat(response?.data?.data?.categories); // Adjust based on API response structure

                // Set default selection to the first category
                if (response.data?.data?.categories.length > 0) {
                    const firstCategory = response[0];
                    setCategoryId(firstCategory.id);
                    setProductById(firstCategory.id);
                    setProductsTitle(firstCategory.name);
                }

            } catch (error) {
                console.error('Error fetching categories:', error);
            }
        };
        fetchProductAllCategories();
    }, []);

    // service
    useEffect(() => {
        const fetchServiceAllCategories = async () => {
            try {
                const response = await serviceAllCategories();
                setAllCampCat(response.data?.data?.categories); // Adjust based on API response structure

            } catch (error) {
                console.error('Error fetching categories:', error);
            }
        };

        fetchServiceAllCategories();
    }, [selectedType]);


    // campaign
    useEffect(() => {
        const fetchOrganizationAllCategories= async () => {
            try {
                const response = await organizationAllCategories();
                setAllOrgCat(response.data?.data?.categories); // Adjust based on API response structure

            } catch (error) {
                console.error('Error fetching categories:', error);
            }
        };

        fetchOrganizationAllCategories();
    }, [selectedType]);


    // Fetch subcategories
    useEffect(() => {
        const fetchSubCatProduct = async () => {
            if (!CategoryId) return;
            setLoading2(true);
            try {
                const response = await axios.get(`${BASE_URL}categories/sub-category/${CategoryId}`);
                setSubCat(response?.data?.data?.sub_categories || []);
            } catch (error) {
                console.error('Error fetching subcategories:', error);
            } finally {
                setLoading2(false);
            }
        };

        fetchSubCatProduct();
    }, [CategoryId]);


    // service
    useEffect(() => {
        const fetchSubCatProduct = async () => {
            if (!CategoryId) return;
            setLoading2(true);
            try {
                const response = await axios.get(`${BASE_URL}service/category-by-subCategory?type=sub_category&category_id=${CategoryId}`);
                setSubSerCat(response?.data?.data?.subCategory || []);
            } catch (error) {
                console.error('Error fetching subcategories:', error);
            } finally {
                setLoading2(false);
            }
        };

        fetchSubCatProduct();
    }, [CategoryId]);

    // Fetch products by category
    useEffect(() => {
        const fetchCatProduct = async () => {
            if (!CategoryId) return;
            setLoading2(true);
            try {
                const response = await axios.get(`${BASE_URL}categories/product/${productById}`);
                setCatProduct(response?.data?.data?.product || []);
            } catch (error) {
                console.error('Error fetching products:', error);
            } finally {
                setLoading2(false);
            }
        };

        fetchCatProduct();
    }, [productById]);


    useEffect(() => {
        const fetchCatProduct = async () => {
            if (!CategoryId) return;
            setLoading2(true);
            try {
                const response = await axios.get(`${BASE_URL}service/service-by-filter?sub_category_id=${productById}&type=category`);
                setCatSerProduct(response?.data?.data?.service || []);
            } catch (error) {
                console.error('Error fetching products:', error);
            } finally {
                setLoading2(false);
            }
        };

        fetchCatProduct();
    }, [productById, subCategoryId]);


    useEffect(() => {
        const fetchCatProduct = async () => {
            if (!CategoryId) return;
            setLoading2(true);
            try {
                const response = await axios.get(`${BASE_URL}organization-user/category-id-by-campaign?category_id=${CategoryId}`);
                setCatSerProduct(response?.data?.data?.campaign || []);
            } catch (error) {
                console.error('Error fetching products:', error);
            } finally {
                setLoading2(false);
            }
        };

        fetchCatProduct();
    }, [productById]);


    return (
        <div className='nav-bar'>
            <div className="container">
                <div className='nav-bar-flex-class'>
                    <div className='nav-bar-nav-items'>
                        <ul>
                            {/* <li className="dropdown" onClick={handleDropdown} ref={buttonRef} >
                                <img src={humb} alt="Menu" /> All Categories
                            </li> */}
                            <Link to='/'><li>Home</li></Link>
                            <Link to='/donation-now'><li>Donate now</li></Link>
                            <Link to='/featureProduct'><li>Featured Products</li></Link>
                            <Link to='/service'><li>Services</li></Link>
                        </ul>
                    </div>
                    <div className='nav-bar-nav-links'>
                        <ul>
                            <li>Get Donation</li>
                            <Link to='/become-seller' style={{ textDecoration: "none", color: "white" }}><li>Become a Seller</li></Link>
                        </ul>
                    </div>
                </div>
             
            </div>
        </div>
    );
}

export default HeaderNavbar;




// {/* <div
// ref={dropdownRef}
// className={`Allcatagories-dropdown ${dropdownActive ? 'active' : 'close'}`}
// >
// <div className="row">
//     <div className="col-lg-2">
//         <div className='dropdown-main-catagories'>
//             <ul>
//                 <li className={selectedType === 1 ? 'active' : ""} onClick={() => handleTypeSelected(1)}>All Product</li>
//                 <li className={selectedType === 2 ? 'active' : ""} onClick={() => handleTypeSelected(2)}>Our Service</li>
//                 <li className={selectedType === 3 ? 'active' : ""} onClick={() => handleTypeSelected(3)}>Donations</li>
//             </ul>
//         </div>
//     </div>

// {selectedType === 1 ? 
//    (<>
//     <div className="col-lg-3">
//         <div className='dropdown-sub-catagories'>
//             <ul>
//                 {allCat?.map((allCat) => (
//                     <li
//                         className={CategoryId === allCat.id ? 'active' : ""}
//                         key={allCat.id}
//                         onClick={() => handleCatSelected(allCat.id, allCat.name)}
//                     >
//                         {allCat.name}
//                     </li>
//                 ))}
//             </ul>
//         </div>
//     </div>
//         {subCat?.length > 0 && (
//             <div className="col-lg-3">
//                 <div className='dropdown-sub-catagories'>
//                     {loading2 ? (
//                         <div className='sub-cat-skeleton'>
//                             {/* <Skeleton count={15} /> */}
//                         </div>
//                     ) : (

//                         <ul>
//                             {subCat?.map((subCat) => (
//                                 <li
//                                     key={subCat.id}
//                                     className={subCategoryId === subCat.id ? 'active' : ""}
//                                     onClick={() => handleSubCatId(subCat.id, subCat.name)}
//                                 >
//                                     {subCat.name}
//                                 </li>
//                             ))}
//                         </ul>
//                     )}
//                 </div>
//             </div>
//         )}
//     <div className={subCat.length > 0 ? "col-lg-4" : "col-lg-7"}>
//         <div className='dropdown-catagories-product'>
//             {loading2 ? (
//                 <div className='sub-cat-skeleton'>
//                     <SkeletonLoaderForProductsNav/>
//                 </div>
//             )
//                 : catProduct.length > 0 ? (
//                     <div className='dropdown-catagories-products-section'>
//                         <h1>{productsTitle} <img src={blackAero} alt="Arrow" /></h1>
//                         <div className='all-products-subSection-three'>
//                             {catProduct?.map((prod) => (
//                                 <div className='dropdown-catagory-product' key={prod.id}>
//                                     <img src={prod?.media[0]?.original_url} alt="Product" />
//                                     <p>{prod?.title}</p>
//                                 </div>
//                             ))}
//                         </div>
//                     </div>
//                 ) : (
//                     <div className='dropdown-catagories-products-section'>
//                         <h3>No products to show</h3>
//                     </div>
//                 )}
//         </div>
//     </div>
//     </>)
// : 
// selectedType === 2 ? 
//    (<>
//     <div className="col-lg-3">
//         <div className='dropdown-sub-catagories'>
//             <ul>
//                 {allCampCat?.map((allCat) => (
//                     <li
//                         className={CategoryId === allCat.id ? 'active' : ""}
//                         key={allCat.id}
//                         onClick={() => handleCatSelected(allCat.id, allCat.name)}
//                     >
//                         {allCat.name}
//                     </li>
//                 ))}
//             </ul>
//         </div>
//     </div>
//         {subSerCat?.length > 0 && (
//             <div className="col-lg-3">
//                 <div className='dropdown-sub-catagories'>
//                     {loading2 ? (
//                         <div className='sub-cat-skeleton'>
//                             {/* <Skeleton count={15} /> */}
//                         </div>
//                     ) : (

//                         <ul>
//                             {subSerCat?.map((subCat) => (
//                                 <li
//                                     key={subCat.id}
//                                     className={subCategoryId === subCat.id ? 'active' : ""}
//                                     onClick={() => handleSubCatId(subCat.id, subCat.name)}
//                                 >
//                                     {subCat.name}
//                                 </li>
//                             ))}
//                         </ul>
//                     )}
//                 </div>
//             </div>
//         )}
//     <div className={subSerCat.length > 0 ? "col-lg-4" : "col-lg-7"}>
//         <div className='dropdown-catagories-product'>
//             {loading2 ? (
//                 <div className='sub-cat-skeleton'>
//                     <SkeletonLoaderForProductsNav/>
//                 </div>
//             )
//                 : catSerProduct.length > 0 ? (
//                     <div className='dropdown-catagories-products-section'>
//                         <h1>{productsTitle} <img src={blackAero} alt="Arrow" /></h1>
//                         <div className='all-products-subSection-three'>
//                             {catSerProduct?.map((prod) => (
//                                 <div className='dropdown-catagory-product' key={prod.id}>
//                                     <img src={prod?.media[0]?.original_url} alt="Product" />
//                                     <p>{prod?.name}</p>
//                                 </div>
//                             ))}
//                         </div>
//                     </div>

//                 ) : (
//                     <div className='dropdown-catagories-products-section'>
//                         <h3>No products to show</h3>
//                     </div>
//                 )}
//         </div>
//     </div>
//     </>) : 
    
//     selectedType === 3 ? 
//     (<>
//      <div className="col-lg-3">
//          <div className='dropdown-sub-catagories'>
//              <ul>
//                  {allOrgCat?.map((allCat) => (
//                      <li
//                          className={CategoryId === allCat.id ? 'active' : ""}
//                          key={allCat.id}
//                          onClick={() => handleCatSelected(allCat.id, allCat.name)}
//                      >
//                          {allCat.name}
//                      </li>
//                  ))}
//              </ul>
//          </div>
//      </div>
//      <div className="col-lg-7">
//          <div className='dropdown-catagories-product'>
//              {loading2 ? (
//                  <div className='sub-cat-skeleton'>
//                     <SkeletonLoaderForProductsNav/>
//                     </div>
//              )
//                  : catSerProduct.length > 0 ? (
//                      <div className='dropdown-catagories-products-section'>
//                          <h1>{productsTitle} <img src={blackAero} alt="Arrow" /></h1>
//                          <div className='all-products-subSection-three'>
//                              {catSerProduct?.map((prod) => (
//                                  <div className='dropdown-catagory-product' key={prod.id}>
//                                      <img src={prod?.media[0]?.original_url} alt="Product" />
//                                      <p>{prod?.name}</p>
//                                  </div>
//                              ))}
//                          </div>
//                      </div>
//                  ) : (
//                      <div className='dropdown-catagories-products-section'>
//                          <h3>No products to show</h3>
//                      </div>
//                  )}
//          </div>
//      </div>
//      </>) : ""}

// </div>
// </div> */}