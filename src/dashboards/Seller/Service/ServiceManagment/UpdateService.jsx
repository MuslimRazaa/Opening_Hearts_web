import React, { useEffect, useState } from 'react'
import upload from '../../../../media/images/Tem_Images/upload.png'
import { useLocation, useNavigate } from 'react-router-dom';
import Select from 'react-select';
import vid from '../../../../media/images/Tem_Images/basil_video-outline.png'
import img from '../../../../media/images/Tem_Images/mdi_images-outline.png'
import doc from '../../../../media/images/Tem_Images/ion_documents-outline.png'
import apis from '../../../../service';
import Swal from 'sweetalert2';
import { MdDelete } from 'react-icons/md';
import { CiEdit } from 'react-icons/ci';
import LoadingComponents from '../../../../components/shared/loaders/LoadingComponents';

function UpdateService() {

    const handleAddFaqs = () => {
        setFormData((prev) => ({ ...prev, faqs: [...formData.faqs, { question: "", answer: "" }] }))
    };

    const handleDeleteFaqs = (index) => {
        const updatedFaqs = formData.faqs.filter((_, i) => i !== index);
        setFormData((prev) => ({ ...prev, faqs: updatedFaqs }))
    };

    const handleFaqsChange = (index, field, value) => {
        const updatedFaqs = [...formData.faqs];
        updatedFaqs[index][field] = value;
        setFormData((prev) => ({ ...prev, faqs: updatedFaqs }))
    };

    const handlePackageChange = (index, field, value) => {
        const updatedPackages = [...formData.service_plan];
        updatedPackages[index][field] = value;
        setFormData((prev) => ({ ...prev, service_plan: updatedPackages }))
    };

    const [keyword, setKeyword] = useState("");
    const [categorys, setCategorys] = useState([]);
    const [subCategorys, setSubCategorys] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [selectedSubCategory, setSelectedSubCategory] = useState(null);
    const [inputError, setInputError] = useState(false);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const { search } = useLocation();
    const params = new URLSearchParams(search);
    const id = params.get('id');
    const [formLoading, setFromLoading] = useState(false);
    const [imageIds, setImageIds] = useState([]);
    const [formData, setFormData] = useState({
        name: "",
        description: "",
        category_id: "",
        sub_category_id: "",
        delivery_time: "",
        set_price: "",
        cover_image: "",
        edit_cover_image: false,
        other_images: "",
        video: "",
        edit_video: "",
        documents: "",
        keywords: [],
        service_plan: [
            { name: "Basic", file_formate: "", concetps: "", revision: "", delivery_time: "", price: "", detail: "" },
            { name: "Standard", file_formate: "", concetps: "", revision: "", delivery_time: "", price: "", detail: "" },
            { name: "Advance", file_formate: "", concetps: "", revision: "", delivery_time: "", price: "", detail: "" },
        ],
        faqs: [{ question: "", answer: "" }],
        is_fixed: 0,
        is_packages: 0,
    })

    const getSellerServiceById = async (id) => {
        setLoading(true)
        try {
            const response = await apis.getSellerServiceById(id);
            const service = response.data.data;

            setFormData({
                name: service.name,
                description: service.description,
                delivery_time: service.is_fixed == 0 ? "" : +service.delivery_time,
                set_price: service.is_fixed == 0 ? "" : +service.set_price,
                cover_image: service.cover_image,
                edit_cover_image: service.cover_image ? true : false,
                is_fixed: service.is_fixed,
                is_packages: service.is_packages,
                video: service.video,
            });

            if (service.is_packages != 0) {
                let tempServicePlain = []
                for (let i = 0; i < service.service_plan.length; i++) {
                    tempServicePlain.push(
                        {
                            name: service.service_plan[i].plan_type,
                            file_formate: service.service_plan[i].file_formate,
                            concetps: service.service_plan[i].concetps,
                            revision: service.service_plan[i].revision,
                            delivery_time: service.service_plan[i].delivery_time,
                            price: service.service_plan[i].plan_price,
                            detail: service.service_plan[i].detail
                        }
                    )
                }
                setFormData((prev) => ({ ...prev, service_plan: tempServicePlain }))
            } else {
                setFormData((prev) => ({
                    ...prev, service_plan: [
                        { name: "Basic", file_formate: "", concetps: "", revision: "", delivery_time: "", price: "", detail: "" },
                        { name: "Standard", file_formate: "", concetps: "", revision: "", delivery_time: "", price: "", detail: "" },
                        { name: "Advance", file_formate: "", concetps: "", revision: "", delivery_time: "", price: "", detail: "" },
                    ]
                }))
            }

            if (service.service_f_a_q_s?.length > 0) {
                let tempFaqs = []
                for (let i = 0; i < service.service_f_a_q_s.length; i++) {
                    tempFaqs.push({ question: service.service_f_a_q_s[i].question, answer: service.service_f_a_q_s[i].answer })
                }
                setFormData((prev) => ({ ...prev, faqs: tempFaqs }))
            } else {
                setFormData((prev) => ({
                    ...prev, faqs: [{ question: "", answer: "" }]
                }))
            }

            if (service.key_words?.length > 0) {
                let tempKeywords = []
                for (let i = 0; i < service.key_words.length; i++) {
                    tempKeywords.push(service.key_words[i].name)
                }
                setFormData((prev) => ({ ...prev, keywords: tempKeywords }))
            } else {
                setFormData((prev) => ({
                    ...prev, tempKeywords: []
                }))
            }

            if (service?.documents?.length > 0) {
                let tempDoc = [];
                for (let i = 0; i < service?.documents.length; i++) {
                    tempDoc.push({ id: service?.documents[i].id, url: service?.documents[i].document , name : service?.documents[i].name})
                }
                setFormData((prev) => ({ ...prev, documents: tempDoc }))
            } else {
                setFormData((prev) => ({ ...prev, documents: "" }))
            }

            if (service?.images?.length > 0) {
                let tempImages = [];
                for (let i = 0; i < service?.images.length; i++) {
                    tempImages.push({ id: service?.images[i].id, image: service?.images[i].image })
                }
                setFormData((prev) => ({ ...prev, other_images: tempImages }))
            } else {
                setFormData((prev) => ({ ...prev, other_images: "" }))
            }

            handlerCategoryChange({ value: response?.data?.data?.category?.id, label: response?.data?.data?.category?.name, guid: response?.data?.data?.category?.guid }, null)
            if (service?.sub_category_id != 0) {
                setSelectedSubCategory({ value: response?.data?.data?.sub_category?.id, label: response?.data?.data?.sub_category?.name })
            }

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
        getSellerServiceById(id)
    }, [])

    const addKeyword = () => {
        if (keyword.trim() !== "" && !formData.keywords.includes(keyword)) {
            setFormData((prev) => ({
                ...prev,
                keywords: [...prev.keywords, keyword],
            }));
            setKeyword("");
        }
    };

    const removeKeyword = (index) => {
        setFormData((prev) => ({
            ...prev,
            keywords: prev.keywords.filter((_, i) => i !== index),
        }));
    };

    const handleChange = (e) => {
        const { name, type, value, files } = e.target;
        setFormData({
            ...formData,
            [name]: type === "file" ? files[0] : value,
        });
    };

    const getServiceCategory = async (type) => {
        try {
            const response = await apis.getServiceCategory(type);
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

    useEffect(() => {
        getServiceCategory('service')
    }, [])

    const getServiceSubCategories = async (id, guid) => {
        try {
            const response = await apis.getServiceSubCategories(id, "service");
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
            }
        } catch (error) {
            Swal.fire({
                icon: 'error',
                text: error.response?.data?.message
            });
        }
    };

    const handlerCategoryChange = (event) => {
        setSubCategorys([]);
        setSelectedCategory(event);
        getServiceSubCategories(event?.value, event?.guid);
    };

    const handlerSubCategoryChange = (event) => {
        setSelectedSubCategory(event);
    };

    const handleOtherImageChange = (event) => {
        const files = Array.from(event.target.files);

        if (formData?.other_images.length + files.length > 3) {
            Swal.fire({
                icon: 'error',
                text: "Can't upload more then 3 images."
            });
            return;
        }
        setFormData((prev) => ({ ...prev, other_images: [...formData?.other_images, ...files] }))
    };

    const handleDeleteOtherImage = (index) => {
        const imageToDelete = formData?.other_images[index]
        const images = formData?.other_images.filter((_, i) => i !== index);
        setFormData((prev) => ({ ...prev, other_images: images }))
        if (imageToDelete?.id) {
            setImageIds((prev) => [...prev, imageToDelete?.id]);
        }
    };

    const handleDocumentChange = (event) => {
        const files = Array.from(event.target.files);

        if (formData?.documents.length + files.length > 3) {
            Swal.fire({
                icon: 'error',
                text: "Can't upload more then 2 document."
            });
            return;
        }
        setFormData((prev) => ({ ...prev, documents: [...formData?.documents, ...files] }))
    };

    const handleDeleteDocument = (index) => {
        const docToDelete = formData?.documents[index];
        const documents = formData?.documents.filter((_, i) => i !== index);
        setFormData((prev) => ({ ...prev, documents: documents }));
        if (docToDelete?.id) {
            setImageIds((prev) => [...prev, docToDelete?.id]);
        }
    };


    const handleVideoChange = (e) => {
        const file = e.target.files[0];
        if (file && file.size > 5 * 1024 * 1024) {
            Swal.fire({
                icon: 'error',
                text: "File size must be less than 5MB"
            });
            e.target.value = null;
            return;
        }

        setFormData({ ...formData, video: file, edit_video: true });
        e.target.value = null;
    };

    const deleteSelectedVideo = () => {
        setFormData({ ...formData, video: "", edit_video: false });
    }

    const updateService = async () => {
        setInputError(true);
        setFromLoading(true);

        if (formData.cover_image === "" && formData.description === "" && formData.name === "" &&
            formData.category_id === "" && formData.keywords.length === 0 && formData.is_fixed === 0 &&
            formData.is_packages === 0) {
                setFromLoading(false);
            return false
        }

        if (formData.faqs.length > 0) {
            for (let i = 0; i < formData.faqs.length; i++) {
                if (formData.faqs[i].question === "" || formData.faqs[i].answer === "") {
                    setFromLoading(false);
                    return false
                }
            }
        }

        if (formData.is_fixed === 1) {
            if (formData.set_price === "" && formData.delivery_time === "") {
                setFromLoading(false);
                return false
            }
        }

        if (formData.is_packages === 1) {
            for (let i = 0; i < formData.is_packages.length; i++) {
                if (formData.is_packages[i].file_formate === "" || formData.is_packages[i].concetps === "" ||
                    formData.is_packages[i].revision === "" || formData.is_packages[i].delivery_time === "" ||
                    formData.is_packages[i].price === "" || formData.is_packages[i].detail === ""
                ) {
                    setFromLoading(false);
                    return false
                }
            }
        }

        const data = new FormData();
        data.append('name', formData.name);
        data.append('description', formData.description);
        data.append('category_id', selectedCategory.value);

        if (selectedSubCategory != null) {
            data.append('sub_category_id', selectedSubCategory?.value)
        }

        if (formData.is_fixed === 1) {
            data.append('delivery_time', formData.delivery_time)
            data.append('set_price', formData.set_price)
        }

        data.append('cover_image', formData.cover_image)

        if (formData.other_images.length > 0) {
            for (let i = 0; i < formData.other_images.length; i++) {
                if (formData.other_images[i]?.id) { }
                else {
                    data.append('other_images[]', formData.other_images[i])
                }
            }
        }

        if (formData.documents.length > 0) {
            for (let i = 0; i < formData.documents.length; i++) {
                if (formData?.documents[i]?.id) { }
                else {
                    data.append('documents[]', formData.documents[i])
                }
            }
        }

        if (formData.video != "") {
            data.append('video', formData.video)
        }

        data.append('keywords', JSON.stringify(formData.keywords))

        if (formData.is_packages === 1) {
            data.append('service_plan', JSON.stringify(formData.service_plan))
        }

        data.append('faqs', JSON.stringify(formData.faqs))

        data.append('is_fixed', formData.is_fixed);
        data.append('is_packages', formData.is_packages);
        data.append('deleted_files', JSON.stringify(imageIds));


        try {
            const response = await apis.updateService(id ,data);
            navigate(`/dashboard/service-managment`);
            setFromLoading(false)
        } catch (error) {
            setFromLoading(false)
            Swal.fire({
                icon: 'error',
                text: error.response?.data?.message
            });
        }
    };
    return (
        <>
            {loading
                ? <LoadingComponents />
                :
                <div className='add-service-wrapper'>
                    <div className="add-service-specific-item">
                        <div className="add-service-describe-service-heading">
                            <h2>Add Cover Image</h2><div className='line'></div>
                        </div>
                    </div>

                    <div className="add-service-cover-image">
                        <div className="add-service-cover-image-input">
                            {!formData?.cover_image ?
                                <>
                                    <img src={upload} />
                                    <input
                                        type="file"
                                        name='cover_image'
                                        accept="image/*"
                                        onChange={handleChange}
                                    />
                                    <p>Upload Image</p>
                                </>
                                :
                                <>
                                    {typeof formData?.cover_image === 'string' && formData?.cover_image.includes('http') ?
                                        <img src={formData?.cover_image} className='cover-i' />
                                        :
                                        <img src={URL.createObjectURL(formData?.cover_image)} className='cover-i' />
                                    }
                                    <input
                                        type="file"
                                        name='cover_image'
                                        accept="image/*"
                                        onChange={handleChange}
                                    />
                                </>
                            }
                        </div>
                    </div>
                    {formData.cover_image === '' && inputError && (<p className="error-input">Cover image is required</p>)}
                    <div className="add-service-describe-your-service">
                        <div className="add-service-describe-service-heading">
                            <h2>Describe Your Service</h2><div className='line'></div>
                        </div>
                        <div className="add-service-describe-service-input">
                            <textarea
                                name='description'
                                value={formData?.description}
                                onChange={handleChange}
                                placeholder='Write something......'
                            />
                        </div>

                    </div>
                    {formData.description === '' && inputError && (<p className="error-input">Description is required</p>)}
                    <div className="add-service-specific-item">
                        <div className="add-service-describe-service-heading">
                            <h2>Item Specifics</h2><div className='line'></div>
                        </div>
                    </div>
                    <div className="add-service-title-input">
                        <input
                            name='name'
                            value={formData?.name}
                            onChange={handleChange}
                            placeholder='Service Title'
                        />
                    </div>
                    {formData.description === '' && inputError && (<p className="error-input-reg">Title is required</p>)}

                    <div className="add-service-title-input">
                        <input
                            placeholder='Keywords'
                            value={keyword}
                            onChange={(e) => setKeyword(e.target.value)}
                        />
                        <button className='add' onClick={addKeyword}>ADD</button>
                    </div>
                    {formData.keywords?.length === 0 && inputError && (<p className="error-input-reg">keywords is required</p>)}
                    {formData?.keywords?.length > 0 ?
                        <div className="service-keywords-listing">
                            <ul>
                                {formData?.keywords?.map((keyword, kw) => {
                                    return (
                                        <li key={kw}>{keyword} <span onClick={() => removeKeyword(kw)}>x</span></li>
                                    )
                                })}
                            </ul>
                        </div>
                        :
                        null
                    }

                    <div className="add-service-catagory-sub-catagory">
                        <div className="add-service-cat-dropdown">
                            <Select
                                options={categorys}
                                defaultValue={selectedCategory}
                                value={selectedCategory}
                                onChange={handlerCategoryChange}
                                placeholder="Select Category"
                            />
                            {selectedCategory === null && inputError && (<p className="error-input">Category is required</p>)}
                        </div>
                        {subCategorys.length > 0 &&
                            <div className="add-service-cat-dropdown">
                                <Select
                                    options={subCategorys}
                                    defaultValue={selectedSubCategory}
                                    value={selectedSubCategory}
                                    onChange={handlerSubCategoryChange}
                                    placeholder="Select Sub Category"
                                />
                            </div>
                        }
                        {/* <div className="add-service-cat-dropdown" onClick={handleDropdown2}>
                        <button> {selectedSubCategory || "Select A Category"} <span><img src={arr} /></span></button>
                        {dropdownStatus2 && <ul>
                            {subCategories.map((category, index) => (
                                <li
                                    key={index}
                                    onClick={() => setSelectedSubCategory(category)}
                                >
                                    {category}
                                </li>
                            ))}
                        </ul>}
                    </div> */}
                    </div>

                    <div className="add-service-specific-item">
                        <div className="add-service-describe-service-heading">
                            <h2>Fixed</h2>
                            <div className='line'></div>
                        </div>
                    </div>
                    <div className="add-service-Price-Dropdown">
                        <ul>
                            <div className="hourly-toggle" onClick={() => { setFormData((prev) => ({ ...prev, is_fixed: formData?.is_fixed === 0 ? 1 : 0 })) }}>
                                <li>Fixed</li>
                                <div className="toggle-price">
                                    <div className={formData?.is_fixed ? "toggle-price-toggle-switch" : "toggle-price-toggle-switch-off"}>
                                        <div className={`toggle-price-switch ${formData?.is_fixed ? "on" : "off"}`}></div>
                                    </div>
                                </div>
                            </div>
                        </ul>
                    </div>
                    {formData.is_fixed === 0 && formData.is_packages === 0 && inputError && (<p className="error-input-reg">Either Fixed or Packages must be selected.</p>)}
                    {formData?.is_fixed ?
                        <>
                            <div className="add-service-title-input">
                                <input
                                    name='set_price'
                                    value={formData?.set_price}
                                    onChange={handleChange}
                                    placeholder='Fixed Price'
                                />
                            </div>
                            {formData.set_price === '' && inputError && (<p className="error-input-reg">Price is required</p>)}
                            <div className="add-service-title-input">
                                <input
                                    name='delivery_time'
                                    value={formData?.delivery_time}
                                    onChange={handleChange}
                                    placeholder='Fixed Delivery Time'
                                />
                            </div>
                            {formData.delivery_time === '' && inputError && (<p className="error-input-reg">Delivery time is required</p>)}
                        </>
                        :
                        null
                    }

                    <div className="add-service-specific-item">
                        <div className="add-service-describe-service-heading">
                            <h2>Packages</h2>
                            <div className='line'></div>
                        </div>
                    </div>
                    <div className="add-service-Price-Dropdown">
                        <ul>
                            <div className="hourly-toggle" onClick={() => { setFormData((prev) => ({ ...prev, is_packages: formData?.is_packages === 0 ? 1 : 0 })) }}>
                                <li>Packages</li>
                                <div className="toggle-price">
                                    <div className={formData?.is_packages ? "toggle-price-toggle-switch" : "toggle-price-toggle-switch-off"}>
                                        <div className={`toggle-price-switch ${formData?.is_packages ? "on" : "off"}`}></div>
                                    </div>
                                </div>
                            </div>
                        </ul>
                    </div>
                    {formData?.is_packages ?
                        <>
                            <div className="add-service-set-packages">
                                <div className="row">
                                    <div className="col-lg-3">
                                        <div className="add-service-set-pack-6-input">
                                            <p>Packages</p>
                                        </div>
                                    </div>
                                    <div className="col-lg-3">
                                        <div className="add-service-set-pack-input">
                                            <p>Basic</p>
                                        </div>
                                    </div>
                                    <div className="col-lg-3">
                                        <div className="add-service-set-pack-input">
                                            <p>Standard</p>
                                        </div>
                                    </div>
                                    <div className="col-lg-3">
                                        <div className="add-service-set-pack-input">
                                            <p>Advance</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="detail-table-for-fixed-price">
                                <div className="row">
                                    <div className="col-lg-3 my-auto">
                                        <p>Price</p>
                                    </div>
                                    <div className="col-lg-3 my-auto">
                                        <input
                                            type="number"
                                            placeholder='Enter Price'
                                            value={formData?.service_plan?.[0]?.price}
                                            onChange={(e) => handlePackageChange(0, "price", e.target.value)}
                                        />
                                        {formData?.service_plan?.[0]?.price === '' && inputError && (<p className="error-input">Price is required</p>)}
                                    </div>
                                    <div className="col-lg-3 my-auto">
                                        <input
                                            type="number"
                                            placeholder='Enter Price'
                                            value={formData?.service_plan?.[1]?.price}
                                            onChange={(e) => handlePackageChange(1, "price", e.target.value)}
                                        />
                                        {formData?.service_plan?.[1]?.price === '' && inputError && (<p className="error-input">Price is required</p>)}
                                    </div>
                                    <div className="col-lg-3 my-auto">
                                        <input
                                            type="number"
                                            placeholder='Enter Price'
                                            value={formData?.service_plan?.[2]?.price}
                                            onChange={(e) => handlePackageChange(2, "price", e.target.value)}
                                        />
                                        {formData?.service_plan?.[2]?.price === '' && inputError && (<p className="error-input">Price is required</p>)}
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-lg-3 my-auto">
                                        <p>Delivery Time</p>
                                    </div>
                                    <div className="col-lg-3">
                                        <input
                                            type="number"
                                            placeholder='Enter Delivery Time'
                                            value={formData?.service_plan?.[0]?.delivery_time}
                                            onChange={(e) => handlePackageChange(0, "delivery_time", e.target.value)}
                                        />
                                        {formData?.service_plan?.[0]?.delivery_time === '' && inputError && (<p className="error-input">Time is required</p>)}
                                    </div>
                                    <div className="col-lg-3">
                                        <input
                                            type="number"
                                            placeholder='Enter Delivery Time'
                                            value={formData?.service_plan?.[1]?.delivery_time}
                                            onChange={(e) => handlePackageChange(1, "delivery_time", e.target.value)}
                                        />
                                        {formData?.service_plan?.[1]?.delivery_time === '' && inputError && (<p className="error-input">Time is required</p>)}
                                    </div>
                                    <div className="col-lg-3">
                                        <input
                                            type="number"
                                            placeholder='Enter Delivery Time'
                                            value={formData?.service_plan?.[2]?.delivery_time}
                                            onChange={(e) => handlePackageChange(2, "delivery_time", e.target.value)}
                                        />
                                        {formData?.service_plan?.[2]?.delivery_time === '' && inputError && (<p className="error-input">Time is required</p>)}
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-lg-3 my-auto">
                                        <p>Revisions</p>
                                    </div>
                                    <div className="col-lg-3">
                                        <input
                                            type="number"
                                            placeholder='Enter Revision'
                                            value={formData?.service_plan?.[0]?.revision}
                                            onChange={(e) => handlePackageChange(0, "revision", e.target.value)}
                                        />
                                        {formData?.service_plan?.[0]?.revision === '' && inputError && (<p className="error-input">Revision is required</p>)}
                                    </div>
                                    <div className="col-lg-3">
                                        <input
                                            type="number"
                                            placeholder='Enter Revision'
                                            value={formData?.service_plan?.[1]?.revision}
                                            onChange={(e) => handlePackageChange(1, "revision", e.target.value)}
                                        />
                                        {formData?.service_plan?.[1]?.revision === '' && inputError && (<p className="error-input">Revision is required</p>)}
                                    </div>
                                    <div className="col-lg-3">
                                        <input
                                            type="number"
                                            placeholder='Enter Revision'
                                            value={formData?.service_plan?.[2]?.revision}
                                            onChange={(e) => handlePackageChange(2, "revision", e.target.value)}
                                        />
                                        {formData?.service_plan?.[2]?.revision === '' && inputError && (<p className="error-input">Revision is required</p>)}
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-lg-3 my-auto">
                                        <p>Concetps</p>
                                    </div>
                                    <div className="col-lg-3">
                                        <input
                                            type="number"
                                            placeholder='Enter Concetp'
                                            value={formData?.service_plan?.[0]?.concetps}
                                            onChange={(e) => handlePackageChange(0, "concetps", e.target.value)}
                                        />
                                        {formData?.service_plan?.[0]?.concetps === '' && inputError && (<p className="error-input">Concetp is required</p>)}
                                    </div>
                                    <div className="col-lg-3">
                                        <input
                                            type="number"
                                            placeholder='Enter Concetp'
                                            value={formData?.service_plan?.[1]?.concetps}
                                            onChange={(e) => handlePackageChange(1, "concetps", e.target.value)}
                                        />
                                        {formData?.service_plan?.[1]?.concetps === '' && inputError && (<p className="error-input">Concetp is required</p>)}
                                    </div>
                                    <div className="col-lg-3">
                                        <input
                                            type="number"
                                            placeholder='Enter Concetp'
                                            value={formData?.service_plan?.[2]?.concetps}
                                            onChange={(e) => handlePackageChange(2, "concetps", e.target.value)}
                                        />
                                        {formData?.service_plan?.[2]?.concetps === '' && inputError && (<p className="error-input">Concetp is required</p>)}
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-lg-3 my-auto">
                                        <p>File Formate</p>
                                    </div>
                                    <div className="col-lg-3">
                                        <input
                                            type="text"
                                            placeholder='Pdf,word,svg ...'
                                            value={formData?.service_plan?.[0]?.file_formate}
                                            onChange={(e) => handlePackageChange(0, "file_formate", e.target.value)}
                                        />
                                        {formData?.service_plan?.[0]?.file_formate === '' && inputError && (<p className="error-input">Formate is required</p>)}
                                    </div>
                                    <div className="col-lg-3">
                                        <input
                                            type="text"
                                            placeholder='Pdf,word,svg ...'
                                            value={formData?.service_plan?.[1]?.file_formate}
                                            onChange={(e) => handlePackageChange(1, "file_formate", e.target.value)}
                                        />
                                        {formData?.service_plan?.[1]?.file_formate === '' && inputError && (<p className="error-input">Formate is required</p>)}
                                    </div>
                                    <div className="col-lg-3">
                                        <input
                                            type="text"
                                            placeholder='Pdf,word,svg ...'
                                            value={formData?.service_plan?.[2]?.file_formate}
                                            onChange={(e) => handlePackageChange(2, "file_formate", e.target.value)}
                                        />
                                        {formData?.service_plan?.[2]?.file_formate === '' && inputError && (<p className="error-input">Formate is required</p>)}
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-lg-3">
                                        <p>Details</p>
                                    </div>
                                    <div className="col-lg-3">
                                        <textarea
                                            placeholder='Enter Detail'
                                            value={formData?.service_plan?.[0]?.detail}
                                            onChange={(e) => handlePackageChange(0, "detail", e.target.value)}
                                        />
                                        {formData?.service_plan?.[0]?.detail === '' && inputError && (<p className="error-input">Detail is required</p>)}
                                    </div>
                                    <div className="col-lg-3">
                                        <textarea
                                            placeholder='Enter Detail'
                                            value={formData?.service_plan?.[1]?.detail}
                                            onChange={(e) => handlePackageChange(1, "detail", e.target.value)}
                                        />
                                        {formData?.service_plan?.[1]?.detail === '' && inputError && (<p className="error-input">Detail is required</p>)}
                                    </div>
                                    <div className="col-lg-3">
                                        <textarea
                                            placeholder='Enter Detail'
                                            value={formData?.service_plan?.[2]?.detail}
                                            onChange={(e) => handlePackageChange(2, "detail", e.target.value)}
                                        />
                                        {formData?.service_plan?.[2]?.detail === '' && inputError && (<p className="error-input">Detail is required</p>)}
                                    </div>
                                </div>
                            </div>
                        </>
                        :
                        null
                    }
                    <div className='add-faq-service-wrapper'>
                        <div className="add-service-specific-item">
                            <div className="add-service-describe-service-heading">
                                <h2>Frequently Asked Questions</h2>
                                <div className="line"></div>
                            </div>
                            <div className="add-faqs-service-questions-answers">
                                <div className="add-service-faq-container">
                                    {formData?.faqs.map((faq, index) => (
                                        <div key={index} className="add-service-faq-item">
                                            <div className="add-service-faq-inputs">
                                                <input
                                                    type="text"
                                                    className="add-service-faq-question"
                                                    placeholder="Add Question"
                                                    value={faq.question}
                                                    onChange={(e) =>
                                                        handleFaqsChange(index, "question", e.target.value)
                                                    }
                                                />
                                                <textarea
                                                    className="add-service-faq-answer"
                                                    placeholder="Answer"
                                                    value={faq.answer}
                                                    onChange={(e) =>
                                                        handleFaqsChange(index, "answer", e.target.value)
                                                    }
                                                />
                                            </div>
                                            {faq.question === '' && faq.answer === '' && inputError && (<p className="error-input-reg">Question & answer is required</p>)}
                                            <button
                                                className="add-service-faq-delete"
                                                onClick={() => handleDeleteFaqs(index)}
                                                disabled={formData?.faqs.length < 2 ? true : false}
                                            > Remove </button>
                                        </div>
                                    ))}
                                    <button className="add-service-faq-add-more" onClick={handleAddFaqs}>+ Add More</button>
                                </div>
                            </div>
                        </div>
                        <div className="add-service-specific-item">
                            <div className="add-service-describe-service-heading">
                                <h2>Showcase your Service</h2>
                                <div className='line'></div>
                            </div>

                            <div className="step-one-other-images">
                                <div className="input-image-video-document">
                                    {/* <div className="add-video-wrapper">
                                        {!formData?.edit_video ?
                                            <div className="add-video-icon-text">
                                                <img src={vid} />
                                                <p>Add Video</p>
                                                <span>Browze</span>
                                                <input
                                                    type="file"
                                                    accept="video/*"
                                                    onChange={handleVideoChange}
                                                />
                                            </div>
                                            :
                                            <div className="s-s-v-b">
                                                <video width="100%" controls>
                                                    <source src={URL.createObjectURL(formData?.video)} />
                                                    Your browser does not support the video tag.
                                                </video>
                                                <span onClick={() => { deleteSelectedVideo() }}><CiEdit /></span>
                                            </div>
                                        }

                                    </div> */}
                                    {formData?.other_images?.length > 2 ? null :
                                        <div className="add-video-wrapper">
                                            <div className="add-video-icon-text">
                                                <img src={img} />
                                                <p>Add Other Images</p>
                                                <span>Browze</span>
                                                <input
                                                    type="file"
                                                    multiple
                                                    accept="image/*"
                                                    onChange={handleOtherImageChange}
                                                />
                                            </div>
                                        </div>
                                    }
                                    {formData?.other_images?.length > 0 ?
                                        <div className="other-service-images">
                                            <div className="row">
                                                {formData?.other_images?.map((image, img) => {
                                                    return (
                                                        <div className="col-lg-4">
                                                            <div className="s-o-i" key={img}>
                                                                <button type="button" onClick={() => handleDeleteOtherImage(img)}> <MdDelete /></button>
                                                                {image?.id ? <img src={image.image} /> : <img src={URL.createObjectURL(image)} />}

                                                            </div>
                                                        </div>

                                                    )
                                                })}
                                            </div>
                                        </div>
                                        :
                                        null
                                    }
                                    {formData?.documents?.length > 1 ? null :
                                        <div className="add-video-wrapper">
                                            <div className="add-video-icon-text">
                                                <img src={doc} />
                                                <p>Add Documents</p>
                                                <span>Browze</span>
                                            </div>
                                            <input
                                                type="file"
                                                multiple
                                                accept="application/pdf, application/msword, application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                                                onChange={handleDocumentChange}
                                            />
                                        </div>
                                    }
                                    {formData?.documents?.length > 0 ?
                                        <div className="s-d-u">
                                            <ul>
                                                {formData?.documents?.map((document, doc) => {
                                                    return (
                                                        <li key={doc}>
                                                            <span>{document?.name}</span>
                                                            <span className='delete-s-d' onClick={() => { handleDeleteDocument(doc) }}><MdDelete /></span></li>
                                                    )
                                                })}
                                            </ul>
                                        </div>
                                        :
                                        null}
                                </div>

                            </div>

                        </div>

                        <div className="step-one-button">
                            <div className="seller-service-dashboard-main-right-button">
                                <button style={{ width: "100%" }} disabled={formLoading} onClick={() => { updateService() }}>
                                    {formLoading ? "Laoding..." : "Create Service"}</button>
                            </div>
                        </div>
                    </div>
                </div>
            }
        </>
    )
}

export default UpdateService
