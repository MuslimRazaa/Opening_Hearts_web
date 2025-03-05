import React, { useEffect, useState } from 'react'
import ShoppingCartCard from './ShoppingCartCard'
import ShoppingCartRight from './ShoppingCartRight'
import { checkOutBothPrice, checkOutCart, checkOutServiceCart } from '../../utils/api'
import ShoppingCartForService from './ShoppingCartForService';
import { Spinner } from 'react-bootstrap';
import LoadingComponents from '../../components/shared/loaders/LoadingComponents';
import NoDataFound from '../../components/shared/noDataFound/NoDataFound';

function ShoppingCartSectionTwo() {
  const [cartItems, setCartItems] = useState([]);
  const [serviceCartItems, setServiceCartItems] = useState([]);
  const [cartItemPrices, setCartItemPrices] = useState([]);
  const [removeStatus, setRemoveStatus] = useState(false);
  const [cartOptions, setCartOptions] = useState("product");
  const [loading, setLoading] = useState(false);
  const [loading2, setLoading2] = useState(false);

  const fetchCheckOutBothPrice = async () => {
    setLoading(true)
    try {
      const response = await checkOutBothPrice();
      setCartItemPrices(response?.data?.data); // Update state with cart items
      setLoading(false)
    } catch (error) {
      console.error('Error fetching cart items:', error);
      setLoading(false)
    }
  };
  const fetchCartItems = async () => {
    setLoading2(true)
    try {
      const response = await checkOutCart();
      setCartItems(response?.data?.data?.seller_cart); // Update state with cart items
      setLoading2(false)

    } catch (error) {
      console.error('Error fetching cart items:', error);
      setLoading2(false)

    }
  };
  const fetchServiceCartItems = async () => {
    setLoading2(true)
    try {
      const response = await checkOutServiceCart();
      setServiceCartItems(response?.data?.data?.cart); // Update state with cart items
      setLoading2(false)

    } catch (error) {
      console.error('Error fetching cart items:', error);
      setLoading2(false)
    }
  };
  const handleRemoveCart = () => {
    setRemoveStatus((prevStatus) => !prevStatus); // Toggle the remove status
  };
  const handleCartOption = (option) => {
    setCartOptions(option)
  };

  useEffect(() => {
    fetchCartItems();
    fetchServiceCartItems();
    fetchCheckOutBothPrice();
  }, []); // Fetch once on component mount

  useEffect(() => {
    if (removeStatus !== undefined) {
      fetchCartItems();
    }
  }, [removeStatus]); // Refetch when removeStatus changes

  return (
    <div className='container'>
      <div className="ShoppingCartSectionTwo">
        <div className="row">
          <div className="col-lg-8">
            <div className="add-to-cart-tabs">
              <h2 className={cartOptions === "product" ? "ss-cart-title-open" : 'ss-cart-title'} onClick={() => handleCartOption("product")}>Product Cart {`(${cartItems?.length > 0 && cartItems?.length || 0})`}</h2>
              <h2 className={cartOptions === "service" ? "ss-cart-title-open" : 'ss-cart-title'} onClick={() => handleCartOption("service")}>Service Cart {`(${serviceCartItems?.length > 0 && serviceCartItems?.length || 0})`}</h2>
            </div>
            <hr style={{ opacity: "10%" }}></hr>
          </div>
          <div className="col-lg-4"></div>
        </div>

        <div className="row">
          <div className="col-lg-8">
            {cartOptions === "product" ?
              (<>
                {cartItems?.length > 0 ?
                  (<>
                    {cartItems?.map((item, index) => (
                      <>
                        <h2 className='cart-store-name'>{item?.name}</h2>
                        {item?.cart?.map((item, index) => (
                          <ShoppingCartCard item={item} fetchCheckOutBothPrice={fetchCheckOutBothPrice} fetchCartItems={fetchCartItems}  image={item?.product?.media[0]?.original_url} name={item?.product?.title} description={item?.product?.description} Category={item?.product?.category?.name} price={item?.product?.price} discounted_price={item?.product?.discount_price} guid={item?.id} onRemoveStatusChange={handleRemoveCart} />
                        ))}
                      </>
                    ))}
                  </>)
                  :
                  ( <p className="No-review-found">{loading ? <LoadingComponents /> : <NoDataFound title="No Items in cart" />}</p>)
                }
              </>)

              :

              (<>
                {serviceCartItems?.length > 0 ?
                  (<>
                    {serviceCartItems?.map((item, index) => (
                      <>
                        <h2 className='cart-store-name'>{item?.name}</h2>
                        {item?.items?.map((item, index) => (
                          <ShoppingCartForService item={item} fetchServiceCartItems={fetchServiceCartItems} revision={item?.serviceplan?.revision} delivery_time={item?.serviceplan?.delivery_time} image={item?.service_product?.media[0]?.original_url} name={item?.service_product?.name} description={item?.service_product?.description} price={item?.price} type={item?.serviceplan?.plan_type} guid={item?.id} onRemoveStatusChange={handleRemoveCart} />
                        ))}
                      </>
                    ))}
                  </>)
                  :
                  (<p className="No-review-found">{loading2 ? <LoadingComponents /> : <NoDataFound title="No Items in cart" />}</p>)
                }
              </>)}
          </div>
          <div className="col-lg-4">
            <ShoppingCartRight loading={loading}  cartItemPrices={cartItemPrices}/>
          </div>
        </div>
        
      </div>
    </div>
  )
}

export default ShoppingCartSectionTwo
