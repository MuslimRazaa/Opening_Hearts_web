import React, { useEffect, useState } from 'react';
import upload from '../../../../media/images/uploadicon.png';
import arrd from '../../../../media/images/arrowDown.png'
import { Link, useLocation, useNavigate } from 'react-router-dom';
import apis from '../../../../service';
import Swal from 'sweetalert2';
import { MdDelete } from 'react-icons/md';
import Select from 'react-select';
import { IoIosAddCircleOutline } from 'react-icons/io';
import LoadingComponents from '../../../../components/shared/loaders/LoadingComponents';

function UpdateProduct() {
    const [priceToggle, setPriceToggle] = useState(false);
    const [shippingToggle, setShippingToggle] = useState(false);
    const [categorys, setCategorys] = useState([]);
    const [subCategorys, setSubCategorys] = useState([]);
    const [brands, setBrands] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [selectedSubCategory, setSelectedSubCategory] = useState(null);
    const [attributes, setAttributes] = useState([]);
    const [inputError, setInputError] = useState(false);
    const [loading, setLoading] = useState(true);
    const [formLoading, setFromLoading] = useState(false);
    const [fullScreenLoader, setFullScreenLoader] = useState(false);
    const [deletedImageIds, setDeletedImageIds] = useState([]);
    const [images, setImages] = useState([]);
    const user_data = localStorage.getItem('user_data');
    const user = JSON.parse(user_data);
    const [imageIds, setImageIds] = useState([]);
    const { search } = useLocation();
    const params = new URLSearchParams(search);
    const id = params.get('id');
    const navigate = useNavigate();

    const handlePriceDropdown = () => { setPriceToggle(!priceToggle) }
    const handleShippingDropdown = () => { setShippingToggle(!shippingToggle) }

    function generateRandomId() {
        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let id = '';
        for (let i = 0; i < 5; i++) {
            id += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        return id;
    }

    const [productDetails, setProductDetails] = useState({
        title: "",
        stock: "",
        category_id: null,
        brand_id: "",
        price: "",
        weight: "",
        width: "",
        height: "",
        length: "",
        deliver_domestic: 0,
        deliver_international: 0,
        images: "",
        product_attributes: [],
        hot_deal_discount: "",
        product_lead_time: [{ quantity: "", lead_Day: "" }],
        packaging_price: "",
        description: "",
        sale_price_type: "",
        discount_price: "",
        hot_Deals: "",
    });


    const getSellerCategory = async () => {
        try {
            const response = await apis.getSellerCategory();
            let tempCategory = [];
            for (let i = 0; i < response.data.data.length; i++) {
                tempCategory.push({
                    value: response.data.data[i]?.id,
                    label: response.data.data[i]?.name,
                    guid: response.data.data[i]?.guid,
                });
            }
            setCategorys(tempCategory);
        } catch (error) {
            Swal.fire({
                icon: 'error',
                text: error.response?.data?.message
            });
        }
    };

    const getBrands = async () => {
        try {
            const response = await apis.getBrands();
            const temp = [];
            for (let i = 0; i < response.data.data.length; i++) {
                temp.push({ value: response.data.data[i].id, label: response.data.data[i].name })
            }
            setBrands(temp);
        } catch (error) {
            Swal.fire({
                icon: 'error',
                text: error.response?.data?.message
            });
        }
    };

    const getSellerProductById = async (sellerGuid, guid) => {
        setLoading(true)
        try {
            const response = await apis.getSellerProductById(sellerGuid, guid);
            const product = response.data.data?.products || {};
            let tempLeadTime = [];
            for (let i = 0; i < response.data.data?.products.lead_time.length; i++) {
                tempLeadTime.push({ quantity: response.data.data?.products.lead_time[i].quantity, lead_Day: response.data.data?.products.lead_time[i].lead_Day })
            }
            setProductDetails({
                id: product.id,
                title: product.title,
                stock: product.stock,
                price: product.price,
                discount_price: product.discount_price,
                height: product.height,
                width: product.width,
                length: product.length,
                weight: product.weight,
                description: product.description,
                brand_id: { value: product.brand?.id, label: product.brand?.name },
                deliver_domestic: product.deliver_domestic,
                deliver_international: product.deliver_international,
                hot_deal_discount: product.hot_deal_discount,
                product_lead_time: tempLeadTime,
                packaging_price: product.packaging_price,
                // sale_price_type: "",
            });

            if (product?.category?.parent_id) {
                handlerCategoryChange({ value: response?.data?.data?.products?.category?.parent_id, label: response?.data?.data?.products?.category?.parent_name, guid: response?.data?.data?.products?.category?.guid }, null)
                handlerSubCategoryChange({ value: response?.data?.data?.products?.category?.id, label: response?.data?.data?.products?.category?.name, guid: response?.data?.data?.products?.category?.guid }, response?.data?.data?.products?.attributes)
            } else {
                handlerCategoryChange({ value: response?.data?.data?.products?.category?.id, label: response?.data?.data?.products?.category?.name, guid: response?.data?.data?.products?.category?.guid }, response?.data?.data?.products?.attributes)
            }
            // setSelectedBrand(product.brand?.id);

            if (product.new_sale_price?.length > 0) {
                if (product.new_sale_price[0] == 0) {
                    setProductDetails((prev) => ({ ...prev, sale_price_type: product.new_sale_price[0], hot_Deals: product.new_sale_price[1] }))
                }
                else if (product.new_sale_price[0] == 1) {
                    setProductDetails((prev) => ({ ...prev, sale_price_type: product.new_sale_price[0] }))
                }
                else {
                    setProductDetails((prev) => ({ ...prev, sale_price_type: product.new_sale_price[0], discount_price: product.new_sale_price[1] }))
                }

            } else {
                setProductDetails((prev) => ({ ...prev, sale_price_type: "", discount_price: "", hot_Deals: "", }));
            }
            setImages(response.data.data?.products?.media?.map((img) => img.original_url) || []);
            setImageIds(product?.media?.map((img) => img.id) || []);
            setFromLoading(false);
            setLoading(false)
        } catch (error) {
            setLoading(false)
            Swal.fire({
                icon: 'error',
                text: error.response?.data?.message
            });
        }
    };

    useEffect(() => {
        getSellerProductById(user?.seller?.guid, id)
    }, [])

    useEffect(() => {
        getSellerCategory();
        getBrands();
    }, []);


    const getSubCategories = async (id, guid, att) => {
        try {
            const response = await apis.getSubCategories(id);
            if (response.data.data.length > 0) {
                let tempCategory = [];
                for (let i = 0; i < response.data.data.length; i++) {
                    tempCategory.push({
                        value: response.data.data[i]?.id,
                        label: response.data.data[i]?.name,
                        guid: response.data.data[i]?.guid,
                    });
                }
                setSubCategorys(tempCategory);
            } else {
                getCategoriesAttributes(guid, att);
            }
        } catch (error) {
            Swal.fire({
                icon: 'error',
                text: error.response?.data?.message
            });
        }
    };

    const getCategoriesAttributes = async (guid, apiAttributes) => {

        if (apiAttributes == null) {
            try {
                const response = await apis.getCategoriesAttributes(guid);
                if (response.data.data.attributes.length > 0) {
                    const categoryAddons = response.data.data.attributes?.map(
                        (attribute) => ({
                            name: attribute.name,
                            selected: null,
                            attributeId: attribute.id,
                            options: attribute.options.map((option, index) => ({
                                value: index + 1,
                                label: option,
                                id: generateRandomId(),
                                colorCode: attribute.options_code[index] ? attribute.options_code[index] : null,
                            })),
                            selectToSend: [],
                        }),
                    );
                    setAttributes(categoryAddons);

                } else {
                    setAttributes([]);
                }
            } catch (error) {
                Swal.fire({
                    icon: 'error',
                    text: error.response?.data?.message
                });
            }
        } else {
            try {
                const response = await apis.getCategoriesAttributes(guid);
                if (response.data.data.attributes.length > 0) {
                    const categoryAddons = response.data.data.attributes?.map((category) => ({
                        name: category.name,
                        selected: null,
                        attributeId: category.id,
                        options: category.options.map((option, index) => ({
                            value: index + 1,
                            label: option,
                            id: generateRandomId(),
                            colorCode: category.options_code[index] ? category.options_code[index] : null,
                        })),
                        selectToSend: [],
                    }),
                    );
                    setAttributes(categoryAddons);

                    if (categoryAddons?.[0]?.selected === null) {
                        let updateAddons = [];
                        let selectedd = [];
                        let selectToSendd = [];
                        for (let i = 0; i < categoryAddons?.length; i++) {
                            for (let j = 0; j < categoryAddons[i].options?.length; j++) {
                                for (let k = 0; k < apiAttributes?.length; k++) {
                                    if (apiAttributes[k].name === categoryAddons[i].options[j].label
                                    ) {
                                        selectedd.push({
                                            value: j + 1,
                                            label: apiAttributes[k].name,
                                            id: apiAttributes[k].id,
                                            colorCode: apiAttributes[k].color_code ? apiAttributes[k].color_code : null,
                                            selectToSendImage: apiAttributes[k].image_url ? apiAttributes[k].image_url : null,
                                        });
                                        selectToSendd.push(apiAttributes[i].name);
                                    }
                                }
                            }
                            updateAddons.push({
                                name: categoryAddons[i].name,
                                attributeId: categoryAddons[i].attributeId,
                                selected: selectedd,
                                options: categoryAddons[i].options,
                                selectToSend: selectToSendd,
                            });
                            selectedd = [];
                            selectToSendd = [];
                        }
                        setAttributes(updateAddons);

                    }
                } else {
                    setAttributes([]);
                }
            } catch (error) {
                Swal.fire({
                    icon: 'error',
                    text: error.response?.data?.message
                });
            }

        }
    };

    const handleInputChange = (e) => {
        setProductDetails({
            ...productDetails,
            [e.target.name]: e.target.value,
        });
    };

    const handleImageChange = (event) => {
        const files = Array.from(event.target.files);

        if (images.length + files.length > 10) {
            Swal.fire({
                icon: 'error',
                text: "Can't upload more then 10 images."
            });
            return;
        }

        const newImages = [];

        files.forEach((file) => {
            const reader = new FileReader();
            reader.onloadend = () => {
                newImages.push({ src: reader.result, file });
                if (newImages.length === files.length) {
                    setImages((prevImages) => [...prevImages, ...newImages]);
                }
            };
            reader.readAsDataURL(file);
        });
    };

    const handleDeleteImage = (index) => {
        const imageToDelete = imageIds[index];
        setImages(images.filter((_, i) => i !== index));
        setDeletedImageIds((prev) => [...prev, imageToDelete]);
    };

    const handleAttributeChange = (e, data, index) => {
        const updatedArray = [...attributes];
        const labelsArray = e.map((option) => option.label);
        console.log(e, 'data e');
        console.log(data, 'data e');

        updatedArray[index] = {
            name: data.name,
            attributeId: data.attributeId,
            selected: e,
            options: data?.options,
            selectToSend: labelsArray
        };
        setAttributes(updatedArray);
    };

    const updateProduct = async (e) => {
        e.preventDefault();
        setInputError(true);
        setFromLoading(true);
        if (productDetails.title === "" && productDetails.weight === "" && productDetails.height === "" &&
            productDetails.length === "" && productDetails.stock === "" && productDetails.price === "" &&
            productDetails.description === "" && productDetails.brand_id === "" && selectedCategory === null &&
            images.length === 0 && productDetails.packaging_price === "") {
            setFromLoading(false);
            return false
        }

        if (attributes.length > 0) {
            for (let i = 0; i < attributes.length; i++) {
                if (attributes[i].selected === null) {
                    setFromLoading(false);
                    return false
                }
            }
        }

        if (colorAttribute) {
            for (let j = 0; j < attributes[colorAttributeIndex].selected.length; j++) {
                if (!attributes[colorAttributeIndex].selected[j].selectToSendImage) {
                    setFromLoading(false);
                    return false
                }

            }
        }

        if (productDetails.sale_price_type === 0) {
            if (productDetails.hot_Deals === "") {
                setFromLoading(false);
                return false
            }
        }

        if (productDetails.sale_price_type === 1) { }

        if (productDetails.sale_price_type === 2) {
            if (productDetails.discount_price === "") {
                setFromLoading(false);
                return false
            }
        }

        if (productDetails.deliver_domestic === 0 && productDetails.deliver_international === 0) {
            setFromLoading(false);
            return false
        }

        for (let i = 0; i < productDetails?.product_lead_time.length; i++) {
            if (productDetails?.product_lead_time[i]?.quantity === "" && productDetails?.product_lead_time[i]?.lead_Day === "") {
                setFromLoading(false);
                return false
            }
        }

        const formData = new FormData();
        formData.append('id', productDetails.id);
        formData.append('title', productDetails.title);
        formData.append('weight', productDetails.weight);
        formData.append('height', productDetails.height);
        formData.append('length', productDetails.length);
        formData.append('width', productDetails.width);
        formData.append('stock', productDetails.stock);

        if (deletedImageIds.length > 0) {
            formData.append('deleted_files', JSON.stringify(deletedImageIds));
        }

        if (selectedSubCategory != null) {
            formData.append('category_id', selectedSubCategory.value);
        } else { formData.append('category_id', selectedCategory.value); }

        formData.append('brand_id', productDetails?.brand_id?.value);

        formData.append('price', productDetails.price);
        formData.append('packaging_price', productDetails.packaging_price);

        if (productDetails?.sale_price_type === 0) {
            formData.append('sale_price', JSON.stringify([productDetails?.sale_price_type, parseInt(productDetails?.hot_Deals)]));
        } else if (productDetails?.sale_price_type === 1) {
            formData.append('sale_price', JSON.stringify([productDetails?.sale_price_type]));
        } else if (productDetails?.sale_price_type === 2) {
            formData.append('sale_price', JSON.stringify([productDetails?.sale_price_type, parseInt(productDetails?.discount_price)]));
        } else { }

        formData.append('description', productDetails.description);
        formData.append('deliver_domestic', productDetails.deliver_domestic);
        formData.append('deliver_international', productDetails.deliver_international);

        images.forEach((image, index) => {
            if (typeof img === 'string') {

            } else (
                formData.append(`images[]`, image.file)
            )
        });

        let tempAtt = [];
        for (let i = 0; i < attributes.length; i++) {
            setLoading(false)
            for (let j = 0; j < attributes[i].selected.length; j++) {
                tempAtt.push({
                    name: attributes[i].selected[j].label,
                    // id: attributes[i].selected[j].id,
                    attribute_id: attributes[i].attributeId,
                    image_url: attributes[i].selected[j].selectToSendImage ? attributes[i].selected[j].selectToSendImage : '',
                    color_code: attributes[i].selected[j].colorCode ? attributes[i].selected[j].colorCode : '',
                });
            }
        }

        formData.append('product_attributes', JSON.stringify(tempAtt));


        let tempLeadTime = [];
        for (let i = 0; i < productDetails?.product_lead_time.length; i++) {
            tempLeadTime.push(
                { quantity: productDetails?.product_lead_time[i]?.quantity, lead_Day: productDetails?.product_lead_time[i]?.lead_Day }
            );
        }

        formData.append('product_lead_time', JSON.stringify(tempLeadTime));

        try {
            const response = await apis.updateProduct(formData);
            navigate(`/dashboard/product-managment`);
            setFromLoading(false)
        } catch (error) {
            setFromLoading(false)
            Swal.fire({
                icon: 'error',
                text: error.response?.data?.message
            });
        }
    };

    useEffect(() => {
        getSellerCategory();
        getBrands();
    }, []);

    const handlerCategoryChange = (event, att) => {
        setAttributes([]);
        setSubCategorys([]);
        setSelectedCategory(event);
        getSubCategories(event?.value, event?.guid, att);
        getCategoriesAttributes(event?.guid, att);
    };

    const handlerSubCategoryChange = (event) => {
        setAttributes([]);
        setSelectedSubCategory(event);
        getCategoriesAttributes(event?.guid);
    };

    // Function to handle input change for product lead time
    const handleLeadTimeChange = (index, event) => {
        const { name, value } = event.target;
        const updatedLeadTime = [...productDetails.product_lead_time];
        updatedLeadTime[index][name] = value;

        setProductDetails({
            ...productDetails,
            product_lead_time: updatedLeadTime,
        });
    };

    // Function to add a new lead time entry
    const addLeadTime = () => {
        setProductDetails({
            ...productDetails,
            product_lead_time: [
                ...productDetails.product_lead_time,
                { quantity: "", lead_Day: "" },
            ],
        });
    };

    // Function to remove a lead time entry
    const removeLeadTime = (index) => {
        const updatedLeadTime = [...productDetails.product_lead_time];
        updatedLeadTime.splice(index, 1);

        setProductDetails({
            ...productDetails,
            product_lead_time: updatedLeadTime,
        });
    };

    // Find the index and object for the "Colors" attribute
    const colorAttributeIndex = attributes?.findIndex(attr => attr?.name === "Colors");
    const colorAttribute = colorAttributeIndex !== -1 ? attributes[colorAttributeIndex] : null;

    const handleImageFileChange = async (e, index) => {
        try {
            setFullScreenLoader(true)
            const formData = new FormData();
            formData.append('image', e.target.files[0]);
            const response = await apis.storeColorAttributeImage(formData)
            const updatedAttributes = [...attributes];
            const colorAttribute = { ...updatedAttributes[colorAttributeIndex] };
            const selectedFiles = response?.data?.data?.image;
            const updatedSelected = [...colorAttribute.selected];
            updatedSelected[index] = {
                ...updatedSelected[index],
                selectToSendImage: selectedFiles
            };
            colorAttribute.selected = updatedSelected;
            updatedAttributes[colorAttributeIndex] = colorAttribute;
            setAttributes(updatedAttributes);
            setFullScreenLoader(false)
        } catch (error) {
            setFullScreenLoader(false)
            Swal.fire({
                icon: 'error',
                text: error.response?.data?.message
            });
        }
    };
    return (
        <>
            {
                loading ?
                    <LoadingComponents />
                    :
                    <div className="add-product-main">
                        <form onSubmit={updateProduct}>
                            <div className="product-images-upload-main">
                                <div className="add-product-heading">
                                    <h2>Describe Your Product</h2>
                                </div>
                                <div className="upload-cover-images-here">
                                    <div className="upload-icon-text">
                                        <img src={upload} alt="Upload Icon" />
                                        <input
                                            type="file"
                                            multiple
                                            accept="image/*"
                                            onChange={handleImageChange}
                                        />
                                        <p>Upload Images</p>
                                    </div>
                                    {images.length === 0 && inputError && (<p className="error-input">Select at least one image</p>)}
                                    <p className="suggestion-message">Add upto 10 images covering all angles of the item that describes well</p>
                                </div>

                                {images.length > 0 && (
                                    <div className="image-preview">
                                        <div className="row">
                                            {id ?
                                                <>
                                                    {images.map((image, index) => (
                                                        <div className="col-lg-3" key={index}>
                                                            <div className="image-wrapper">
                                                                <img src={typeof image === 'string' ? image : image.src} alt={`Preview ${index + 1}`} />
                                                                <button type="button" onClick={() => handleDeleteImage(index)}> <MdDelete /></button>
                                                            </div>
                                                        </div>
                                                    ))}
                                                </>
                                                :
                                                <>
                                                    {images.map((image, index) => (
                                                        <div className="col-lg-3" key={index}>
                                                            <div className="image-wrapper">
                                                                <img src={image.src} alt={`Preview ${index + 1}`} />
                                                                <button type="button" onClick={() => handleDeleteImage(index)}> <MdDelete /></button>
                                                            </div>
                                                        </div>
                                                    ))}
                                                </>
                                            }
                                        </div>
                                    </div>
                                )}
                            </div>
                            {/* item specific */}
                            <div className="product-form-main">
                                <div className="product-form-item-heading">
                                    <h2>ITEM SPECIFICS</h2>
                                </div>
                                <div className="row">
                                    <div className="col-md-12">
                                        <div className="input-product-name">
                                            <input
                                                type="text"
                                                name="title"
                                                placeholder="Product Name"
                                                value={productDetails.title}
                                                onChange={handleInputChange}
                                            />
                                            {productDetails.title === '' && inputError && (<p className="error-input-reg">Product name is required</p>)}
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-3">
                                        <div className="input-product-weight">
                                            <input
                                                type="number"
                                                name="weight"
                                                placeholder="Product weight"
                                                value={productDetails.weight}
                                                onChange={handleInputChange}
                                                style={{ padding: '16px', border: 'none', borderRadius: "12px" }}
                                            />
                                            {productDetails.weight === '' && inputError && (<p className="error-input-reg">Product weight is required</p>)}
                                        </div>
                                    </div>
                                    <div className="col-md-3">
                                        <div className="input-product-weight">
                                            <input
                                                type="number"
                                                name="width"
                                                placeholder="Product width"
                                                value={productDetails.width}
                                                onChange={handleInputChange}
                                                style={{ padding: '16px', border: 'none', borderRadius: "12px" }}
                                            />
                                            {productDetails.width === '' && inputError && (<p className="error-input-reg">Product width is required</p>)}
                                        </div>
                                    </div>
                                    <div className="col-md-3">
                                        <div className="input-product-height">
                                            <input
                                                type="number"
                                                name="height"
                                                placeholder="Product height"
                                                value={productDetails.height}
                                                onChange={handleInputChange}
                                                style={{ padding: '16px', border: 'none', borderRadius: "12px" }}
                                            />
                                            {productDetails.height === '' && inputError && (<p className="error-input-reg">Product height is required</p>)}
                                        </div>
                                    </div>
                                    <div className="col-md-3">
                                        <div className="input-product-width">
                                            <input
                                                type="number"
                                                name="length"
                                                placeholder="Product length"
                                                value={productDetails.length}
                                                onChange={handleInputChange}
                                                style={{ padding: '16px', border: 'none', borderRadius: "12px" }}
                                            />
                                            {productDetails.length === '' && inputError && (<p className="error-input-reg">Product length is required</p>)}
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-12">
                                        <div className="input-product-brand">
                                            <Select
                                                options={brands}
                                                defaultValue={productDetails?.brand_id}
                                                value={productDetails?.brand_id}
                                                onChange={(e) => { setProductDetails((prev) => ({ ...prev, brand_id: e })) }}
                                                placeholder="Select Brand"
                                                className="select-brand"
                                            />
                                            {productDetails?.brand_id === '' && inputError && (
                                                <p className="error-input-reg">Brand is required</p>
                                            )}
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-12">
                                        <div className="input-product-category">
                                            <Select
                                                options={categorys}
                                                defaultValue={selectedCategory}
                                                value={selectedCategory}
                                                onChange={handlerCategoryChange}
                                                placeholder="Select Category"
                                                className="select-brand"
                                            />
                                            {selectedCategory === null && inputError && (
                                                <p className="error-input-reg">Category name is required</p>
                                            )}
                                        </div>
                                    </div>
                                </div>
                                {subCategorys.length > 0 &&
                                    <div className="row">
                                        <div className="col-md-12">
                                            <div className="input-product-category">
                                                <Select
                                                    options={subCategorys}
                                                    defaultValue={selectedSubCategory}
                                                    value={selectedSubCategory}
                                                    onChange={handlerSubCategoryChange}
                                                    placeholder="Select Sub Category (Optional)"
                                                    className="select-brand"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                }
                                {attributes?.length > 0 ? (
                                    <>
                                        {attributes?.map((data, index) => {
                                            return (
                                                <div className="row">
                                                    <div className="col-md-12">
                                                        <div className="input-product-category">
                                                            <Select
                                                                value={data?.selected}
                                                                className="select-brand"
                                                                onChange={(e) => {
                                                                    handleAttributeChange(e, data, index);
                                                                }}
                                                                options={attributes?.[index]?.options}
                                                                placeholder={`Select ${data?.name}`}
                                                                isMulti
                                                            />
                                                            {attributes?.[index]?.selectToSend?.length === 0 &&
                                                                inputError && (
                                                                    <div className="error-input">
                                                                        {data?.name} is required
                                                                    </div>
                                                                )}
                                                        </div>
                                                    </div>
                                                </div>
                                            );
                                        })}
                                    </>
                                ) : null}

                                {colorAttribute ?
                                    attributes?.[colorAttributeIndex]?.selected?.length > 0 ?
                                        <div className='sm:col-span-12'>
                                            <div className="color-attribute-image">
                                                <div className="c-a-i-w">
                                                    {attributes?.[colorAttributeIndex]?.selected.map((data, z) => {
                                                        return (
                                                            <div key={z} className='c-a-i-w-w'>
                                                                <h4>{data?.label}</h4>
                                                                <div className="c-i">
                                                                    {data?.selectToSendImage ?
                                                                        <div className="c-i-i-u" style={{ position: 'relative' }}>
                                                                            <img src={data?.selectToSendImage} alt="" />
                                                                            <input
                                                                                type="file"
                                                                                accept="image/*"
                                                                                style={{
                                                                                    position: 'absolute',
                                                                                    opacity: 0,
                                                                                    cursor: 'pointer',
                                                                                    width: '100%',
                                                                                    height: '100%',
                                                                                    zIndex: 1,
                                                                                    top: 0
                                                                                }}
                                                                                onChange={(e) => handleImageFileChange(e, z)}
                                                                            />
                                                                        </div>
                                                                        :
                                                                        <div className="c-i-u-i" style={{ position: 'relative' }}>
                                                                            <IoIosAddCircleOutline size={55} className="mr-1" />
                                                                            Upload {data?.label} color images
                                                                            <input
                                                                                type="file"
                                                                                accept="image/*"
                                                                                style={{
                                                                                    position: 'absolute',
                                                                                    opacity: 0,
                                                                                    cursor: 'pointer',
                                                                                    width: '100%',
                                                                                    height: '100%',
                                                                                    zIndex: 1,
                                                                                    top: 0
                                                                                }}
                                                                                onChange={(e) => handleImageFileChange(e, z)}
                                                                            />
                                                                        </div>
                                                                    }
                                                                    {!data?.selectToSendImage && inputError && (
                                                                        <p className="error-input">Image is required</p>
                                                                    )}
                                                                </div>
                                                            </div>
                                                        )
                                                    })}

                                                </div>
                                            </div>
                                        </div>
                                        :
                                        null
                                    :
                                    null
                                }
                                <div className="row">
                                    <div className="col-md-12">
                                        <div className="input-product-stock">
                                            <input
                                                type="number"
                                                name="stock"
                                                placeholder="Product stock capacity"
                                                value={productDetails.stock}
                                                onChange={handleInputChange}
                                                style={{ padding: '16px', border: 'none', borderRadius: "12px" }}
                                            />
                                            {productDetails.stock === '' && inputError && (<p className="error-input-reg">Product stock is required</p>)}
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="input-product-textarea">
                                        <textarea
                                            placeholder='Description'
                                            name="description"
                                            value={productDetails.description}
                                            onChange={handleInputChange}
                                        />
                                        {productDetails.description === '' && inputError && (<p className="error-input-reg">Description is required</p>)}
                                    </div>

                                </div>
                            </div>

                            {/* picing */}
                            <div className="product-pricing-form-main">
                                <div className="pricing-form-heading">
                                    <h2>Pricings</h2>
                                </div>

                                <div className="add-service-set-price-input">
                                    <p>Set Price</p>
                                    <input
                                        type='number'
                                        name='price'
                                        placeholder='0'
                                        value={productDetails.price}
                                        onChange={handleInputChange}
                                        style={{ margin: 0, border: 'none', padding: "0px 15px 0px 0px" }}
                                    />
                                </div>
                                {productDetails.length === '' && inputError && (<p className="error-input-reg">Product length is required</p>)}

                                <div className="add-service-Price-Dropdown">
                                    <div className="price-toggle-button">
                                        <button>Sale price</button>
                                        <img src={arrd} />
                                    </div>
                                    <ul>
                                        <div className="fixed-price-toggle">
                                            <li>Hot Deals</li>
                                            <div className="toggle-price">
                                                <div className={productDetails?.sale_price_type === 0 ? "toggle-price-toggle-switch" : "toggle-price-toggle-switch-off"}
                                                    onClick={() => { setProductDetails((prev) => ({ ...prev, sale_price_type: productDetails?.sale_price_type === 0 ? "" : 0 })) }}>
                                                    <div className={`toggle-price-switch ${productDetails?.sale_price_type === 0 ? "on" : "off"}`}></div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="hourly-toggle">
                                            <li>Free Delivery</li>
                                            <div className="toggle-price">
                                                <div className={productDetails?.sale_price_type === 1 ? "toggle-price-toggle-switch" : "toggle-price-toggle-switch-off"}
                                                    onClick={() => { setProductDetails((prev) => ({ ...prev, sale_price_type: productDetails?.sale_price_type === 1 ? "" : 1 })) }}>
                                                    <div className={`toggle-price-switch ${productDetails?.sale_price_type === 1 ? "on" : "off"}`}></div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="hourly-toggle">
                                            <li>Discount</li>
                                            <div className="toggle-price">
                                                <div className={productDetails?.sale_price_type === 2 ? "toggle-price-toggle-switch" : "toggle-price-toggle-switch-off"}
                                                    onClick={() => { setProductDetails((prev) => ({ ...prev, sale_price_type: productDetails?.sale_price_type === 2 ? "" : 2 })) }}>
                                                    <div className={`toggle-price-switch ${productDetails?.sale_price_type === 2 ? "on" : "off"}`}></div>
                                                </div>
                                            </div>
                                        </div>
                                    </ul>
                                </div>

                                <div className="add-service-set-price-input">
                                    <p>Packaging Price</p>
                                    <input
                                        type='number'
                                        name='packaging_price'
                                        placeholder='0'
                                        value={productDetails.packaging_price}
                                        onChange={handleInputChange}
                                        style={{ margin: 0, border: 'none', padding: "0px 15px 0px 0px" }}
                                    />
                                </div>
                                {productDetails.packaging_price === '' && inputError && (<p className="error-input-reg">Packaging price is required</p>)}
                            </div>
                            {productDetails.sale_price_type === 0 ?
                                <div className="product-pricing-form-main">
                                    <div className="add-service-set-price-input">
                                        <p>Hot Deals %</p>
                                        <input
                                            type='number'
                                            name='hot_Deals'
                                            placeholder='0'
                                            value={productDetails.hot_Deals}
                                            onChange={handleInputChange}
                                            style={{ margin: 0, border: 'none', padding: "0px 15px 0px 0px" }}
                                        />
                                    </div>
                                    {productDetails.hot_Deals === '' && inputError && (<p className="error-input">Hot deals is required</p>)}
                                </div>
                                :
                                null
                            }
                            {productDetails.sale_price_type === 2 ?
                                <div className="product-pricing-form-main">
                                    <div className="add-service-set-price-input">
                                        <p>Discount Price</p>
                                        <input
                                            type='number'
                                            name='discount_price'
                                            placeholder='0'
                                            value={productDetails.discount_price}
                                            onChange={handleInputChange}
                                            style={{ margin: 0, border: 'none', padding: "0px 15px 0px 0px" }}
                                        />
                                    </div>
                                    {productDetails.discount_price === '' && inputError && (<p className="error-input">Discount price is required</p>)}
                                </div>
                                :
                                null}

                            {/* shipping */}
                            <div className="product-pricing-form-main">
                                <div className="pricing-form-heading">
                                    <h2>Shipping</h2>
                                </div>

                                <div className="add-service-Price-Dropdown">
                                    <div className="price-toggle-button">
                                        <button>Deliver Type</button>
                                        <img src={arrd} />
                                    </div>
                                    <ul>
                                        <div className="fixed-price-toggle">
                                            <li>Deliver Domestically</li>
                                            <div className="toggle-price">
                                                <div
                                                    className={productDetails.deliver_domestic === 1 ? "toggle-price-toggle-switch" : "toggle-price-toggle-switch-off"}
                                                    onClick={() => { setProductDetails((prev) => ({ ...prev, deliver_domestic: productDetails.deliver_domestic === 1 ? 0 : 1 })) }}>
                                                    <div className={`toggle-price-switch ${productDetails.deliver_domestic === 1 ? "on" : "off"}`}></div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="hourly-toggle">
                                            <li>Deliver Internationally</li>
                                            <div className="toggle-price">
                                                <div
                                                    className={productDetails.deliver_international === 1 ? "toggle-price-toggle-switch" : "toggle-price-toggle-switch-off"}
                                                    onClick={() => { setProductDetails((prev) => ({ ...prev, deliver_international: productDetails.deliver_international === 1 ? 0 : 1 })) }}>
                                                    <div className={`toggle-price-switch ${productDetails.deliver_international === 1 ? "on" : "off"}`}></div>
                                                </div>
                                            </div>
                                        </div>

                                    </ul>
                                </div>

                            </div>
                            {productDetails.deliver_domestic === 0 && productDetails.deliver_international === 0 && inputError && (<p className="error-input">Select at least one type</p>)}
                            {/* lead time */}
                            <div className='add-product-main-lead-time'>
                                <div className="lead-time-heading">
                                    <h3>Lead Time</h3>
                                </div>
                                <div className="lead-time-values">
                                    {productDetails?.product_lead_time?.length > 1 ?
                                        <div className="row">
                                            <div className="col-lg-5">
                                                <p>Quantity</p>
                                            </div>
                                            <div className="col-lg-5">
                                                <p>Lead Time</p>
                                            </div>
                                            <div className="col-lg-2">
                                                <p>Action</p>
                                            </div>
                                        </div>
                                        :
                                        <div className="row">
                                            <div className="col-lg-6">
                                                <p>Quantity</p>
                                            </div>
                                            <div className="col-lg-6">
                                                <p>Lead Time</p>
                                            </div>
                                        </div>
                                    }
                                </div>
                                {productDetails?.product_lead_time?.length > 1 ?
                                    productDetails.product_lead_time?.map((item, index) => {
                                        return (
                                            <div className="lead-time-values-amswer" key={index}>
                                                <div className="row">
                                                    <div className="col-md-5">
                                                        <input
                                                            type="text"
                                                            name="quantity"
                                                            value={item.quantity}
                                                            onChange={(e) => handleLeadTimeChange(index, e)}
                                                            placeholder='Enter quantity like 1-100'
                                                        />
                                                        {item.quantity === '' && inputError && (<p className="error-input-reg">Quantity is required</p>)}
                                                    </div>
                                                    <div className="col-md-5">
                                                        <input
                                                            type="text"
                                                            name="lead_Day"
                                                            value={item.lead_Day}
                                                            onChange={(e) => handleLeadTimeChange(index, e)}
                                                            placeholder='Enter days' />
                                                        {item.lead_Day === '' && inputError && (<p className="error-input-reg">Days is required</p>)}
                                                    </div>
                                                    <div className="col-md-2">
                                                        <button onClick={() => removeLeadTime(index)}>Remove</button>
                                                    </div>
                                                </div>
                                            </div>
                                        )
                                    })
                                    :
                                    productDetails?.product_lead_time?.map((item, index) => {
                                        return (
                                            <div className="lead-time-values-amswer" key={index}>
                                                <div className="row">
                                                    <div className="col-md-6">
                                                        <input
                                                            type="text"
                                                            name="quantity"
                                                            value={item?.quantity}
                                                            onChange={(e) => handleLeadTimeChange(index, e)}
                                                            placeholder='Enter quantity like 1-100'
                                                        />
                                                        {item?.quantity === '' && inputError && (<p className="error-input-reg">Quantity is required</p>)}
                                                    </div>
                                                    <div className="col-md-6">
                                                        <input
                                                            type="text"
                                                            name="lead_Day"
                                                            value={item?.lead_Day}
                                                            onChange={(e) => handleLeadTimeChange(index, e)}
                                                            placeholder='Enter days' />
                                                        {item?.lead_Day === '' && inputError && (<p className="error-input-reg">Days is required</p>)}
                                                    </div>
                                                </div>
                                            </div>
                                        )
                                    })
                                }
                                <div className="seller-service-dashboard-main-right-button" style={{ display: 'flex', justifyContent: 'end', }}>
                                    <button onClick={addLeadTime} style={{ padding: '12px 30px', borderRadius: '6px' }}>Add More</button>
                                </div>
                            </div>
                            {/* button */}
                            <div className="seller-service-dashboard-main-right-button">
                                <button type='submit' style={{ width: "100%" }} disabled={formLoading}>{formLoading ? "Loading..." : "Submit"}</button>
                            </div>
                        </form>
                    </div>
            }
        </>
    );
}

export default UpdateProduct;
