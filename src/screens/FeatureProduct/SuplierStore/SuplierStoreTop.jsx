import React from 'react'
import vendorLogo from '../../../media/images/vendorLogo.png'
import hearts from '../../../media/images/heartsss.png'
import share from '../../../media/images/material-symbols_share-outline.png'
import { Link, useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'
import { createChatRoom, saveProduct } from '../../../utils/api'

function SuplierStoreTop({id, guid , vendor}) {
    const navigate = useNavigate()
    const userData = localStorage.getItem("login-user-data");
    const parsedData = JSON.parse(userData);
    const userId = parsedData?.data?.id;


    const handleSaveVandor = async (e) =>{
        const data =
        {
            "seller_favourite_against_id": e,
            "seller_type": 2   // 2 for store 
        }

        try {
            const response = await saveProduct(data);
            await Swal.fire({
                icon: 'success',
                text: 'Add to Saved Products',
                timer: 1500,
            });

        } catch (error) {
            await Swal.fire({
                icon: 'error',
                text: 'Something Went Wrong',
                timer: 1500,
                confirmButtonText: 'Back',
            });
            console.error('Error fetching categories:', error);
        }
    
    
    
    }

 
    const haandleContactSupplier = async (id) => {

        const formData = {
          uid: userId,
          participants: id,
          status: 1,
          about_vendor_status: 0
        }
      
        try {
          const result = await createChatRoom(formData);
          console.log(result?.data?.data, "chat created");
      
          if (result?.data?.data) {
            const chat = result?.data?.data; // API response se chat details le lo
            console.log(result?.data?.data, "element data ")
            // Local storage me bhi save kar do taki reload ke baad chat selected rahe
            localStorage.setItem("selectedChat", JSON.stringify({
              id: chat?.id,
              name: vendor?.shop_name,
              profileImage: vendor?.main_image,
              participants: chat?.participants
            }));
          }
      
          await Swal.fire({
            icon: 'success',
            text: 'Chat room created',
            timer: 1500,
          });
      
          navigate("/userChat");
        } catch (error) {
          console.error('Error creating chat:', error);
          await Swal.fire({
            icon: 'error',
            text: 'Something Went Wrong',
            timer: 1500,
            confirmButtonText: 'Back',
          });
        }
      };

  return (
    <>
    <div className='container'>
        <div className="suplier-brand-card">
            
      <div className="row mt-4 mb-2">
        <div className="col-lg-2"></div>
        <div className="col-lg-6">
            <div className="save-vendor-text">
                <p onClick={(e) => handleSaveVandor(id)}>Save this Vendor</p>
            </div>
        </div>
        <div className="col-lg-2"></div>
        <div className="col-lg-2"></div>
      </div>
      {/*sec-mid  */}
      <div className="row">
        <div className="col-lg-2">
            <div className="vendor-logo">
                <img src={vendor?.main_image} />
            </div>
        </div>
        <div className="col-lg-6">
            <div className="vendor-middle-box">
                <div className="row">
                    <div className="col-lg-10">
                        <div className="vendor-title">
                        <h2>{vendor?.shop_name}</h2>
                        </div>
                    </div>
                    <div className="col-lg-2">
                        <div className="vendor-box-button">
                            <button>{vendor?.year} <span style={{fontSize:"13px", color:"gray"}}>Years</span></button>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-lg-10">
                        <div className="vendor-title-content">
                            <p><span>Main Categories : </span> 
                            {vendor?.category.map((cat) =>(
                                <span>
                                {cat?.name}
                            </span>))}
                                </p>

                        </div>
                    </div>
                    <div className="col-lg-2">
                        
                    </div>
                </div>
            </div>
        </div>
        <div className="col-lg-2">
            <div className="vendors-button">
                <button onClick={() => haandleContactSupplier(vendor?.user_id)}>Contact</button>
            </div>
            <div className="vendors-button">
                <button>Send Inquery</button>
            </div>
        </div>
        <div className="col-lg-2" style={{position:"relative"}}>
            <div className="vendor-share-icons">
                <img src={share} />
            </div>
            <div className="vendor-heart-icons">
                <img src={hearts} />
            </div>
        </div>
      </div>
      </div>
    </div>
     <div className="suplier-store-navigation">
      <div className="container">
        <ul>
           <Link to="/featureProduct" style={{textDecoration: "none"}}> <li>Home</li></Link>
           <Link to={`/SuplierStoreProduct?guid=${guid}`} style={{textDecoration: "none"}}> <li>Product</li></Link>
        </ul>
      </div>
      </div>
    </>
)
}

export default SuplierStoreTop
