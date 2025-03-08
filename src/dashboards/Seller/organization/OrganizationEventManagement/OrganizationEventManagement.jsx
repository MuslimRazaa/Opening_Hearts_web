import React, { useEffect, useState } from 'react'
import recentimg1 from '../../../../media/images/recentimg1.png';
import recentimg2 from '../../../../media/images/recentimg2.png';
import recentimg3 from '../../../../media/images/recentimg3.png';
import recentarrow from '../../../../media/images/recent-arrow.svg';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import apis from '../../../../service';
import NoDataFound from '../../../../components/shared/noDataFound/NoDataFound';
import LoadingComponents from '../../../../components/shared/loaders/LoadingComponents';

const PageNumbers = ({
    totalPages,
    page_size,
    getEvent,
    pagination }) => {
    const pageNumbers = Array.from({ length: totalPages }, (_, index) => index + 1);

    return (
        <div className='all-pages'>
            <ul>
                {pageNumbers.map(number => (
                    <li key={number}
                        className={`${(+pagination?.page) === number ? 'active' : ''}`}
                        onClick={() => {
                            getEvent(
                                number,
                                page_size,
                            )
                        }}>
                        {number}
                    </li>
                ))}
            </ul>
        </div>
    );
};


const OrganizationEventManagement = () => {
    const [recentEvent, setResentEvent] = useState([]);
    const [upcomingEvent, setUpcomingEvent] = useState([]);
    const [endedEvent, setEndedEvent] = useState([]);
    const [loading, setLoading] = useState(true);
    const page_size = 6;

    const getOrganizationRecentEvent = async (page, page_size) => {
        try {
            const response = await apis.getOrganizationRecentEvent(page, page_size);
            setResentEvent(response.data.data);
            getOrganizationUpcomingEvent(1, page_size)
        } catch (error) {
            setLoading(false)
            Swal.fire({
                icon: 'error',
                text: error.response?.data?.message
            });
        }
    };

    const getOrganizationUpcomingEvent = async (page, page_size) => {
        try {
            const response = await apis.getOrganizationUpcomingEvent(page, page_size);
            setUpcomingEvent(response.data.data);
            getOrganizationEndedEvent(1, page_size)
        } catch (error) {
            setLoading(false)
            Swal.fire({
                icon: 'error',
                text: error.response?.data?.message
            });
        }
    };

    const getOrganizationEndedEvent = async (page, page_size) => {
        try {
            const response = await apis.getOrganizationEndedEvent(page, page_size);
            setEndedEvent(response.data.data);
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
        getOrganizationRecentEvent(1, page_size)
    }, [])
    return (
        <>
            {loading ?
                <LoadingComponents />
                :
                <div className='event-main-dash-donation'>
                    <div className="row">
                        <div className="col-md-8">
                            <div className="event-main-dash-donation-text">
                                <h1>Start Uploading Events</h1>
                                <p>This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum,
                                    "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32.</p>
                                {/* <button type='button' className='btn-add-event'>Add a new Events </button> */}
                                <Link to={'/dashboard/organization-add-event'} className='btn-add-event'>Add a new Events </Link>
                            </div>
                        </div>
                    </div>
                    <div className="donation-dash-recent-event">
                        <div className="row mt-5">
                            <div className="col-md-12">
                                <h2>Recent Events</h2>
                            </div>
                        </div>
                        <div className="row mt-3">
                            {recentEvent?.events?.length > 0 ?
                                recentEvent?.events?.map((event, e) => {
                                    return (
                                        <div className="col-md-4" key={e}>
                                            <div className="card-recent-dash-event">
                                                <img src={event?.cover_image} alt="" />
                                                <h3>{event?.name}</h3>
                                                <div className="read-bothdash-event">
                                                    <Link to={`/dashboard/organization-update-event?id=${event?.id}`} style={{ textDecoration: "none" }}>
                                                        <button type='button' className='btn btn-readmore-dash'>Edit</button>
                                                    </Link>
                                                    <button type='button' className='btn btn-readmore-dash'>Delete</button>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                })
                                :
                                <NoDataFound title={'No data found'} />
                            }
                        </div>
                        <div className="product-detail-review-pagination">
                            {recentEvent?.pagination?.total_pages > 1 &&
                                <div className="page-pagination filter">
                                    <div className="previous-page"
                                        style={{ pointerEvents: (+recentEvent?.pagination?.page) === 1 ? 'none' : 'auto' }}
                                        onClick={() => {
                                            getOrganizationRecentEvent(
                                                (+recentEvent?.pagination?.page) - 1,
                                                page_size
                                            )
                                        }}
                                    >Previous</div>
                                    {recentEvent?.pagination?.total_pages > 12 ?
                                        <div className="all-pages">
                                            <ul>
                                                <li className={`${(+recentEvent?.pagination?.page) === 1 ? 'active' : ''}`}
                                                    onClick={() => {
                                                        getOrganizationRecentEvent(
                                                            1,
                                                            page_size
                                                        )
                                                    }}
                                                >1</li>
                                                <li className={`${(+recentEvent?.pagination?.page) === 2 ? 'active' : ''}`}
                                                    onClick={() => {
                                                        getOrganizationRecentEvent(
                                                            2,
                                                            page_size
                                                        )
                                                    }}
                                                >2</li>
                                                <li className={`${(+recentEvent?.pagination?.page) === 3 ? 'active' : ''}`}
                                                    onClick={() => {
                                                        getOrganizationRecentEvent(
                                                            3,
                                                            page_size
                                                        )
                                                    }}
                                                >3</li>
                                                <li>
                                                    <svg width="33" height="3" viewBox="0 0 33 3" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <path d="M0.39853 3V0.202939H2.61842V3H0.39853ZM5.38461 3V0.202939H7.6045V3H5.38461ZM10.3707 3V0.202939H12.5906V3H10.3707ZM15.3568 3V0.202939H17.5767V3H15.3568ZM20.3429 3V0.202939H22.5627V3H20.3429ZM25.3289 3V0.202939H27.5488V3H25.3289ZM30.315 3V0.202939H32.5349V3H30.315Z" fill="#A7A7A7" />
                                                    </svg>
                                                </li>
                                                <li className={`${(+recentEvent?.pagination?.page) === recentEvent?.pagination?.total_pages ? 'active' : ''}`}
                                                    onClick={() => {
                                                        getOrganizationRecentEvent(
                                                            recentEvent?.pagination?.total_pages,
                                                            page_size
                                                        )
                                                    }}
                                                >{recentEvent?.pagination?.total_pages}</li>
                                            </ul>
                                        </div>
                                        :
                                        <PageNumbers
                                            totalPages={recentEvent?.pagination?.total_pages}
                                            page_size={page_size}
                                            getEvent={getOrganizationRecentEvent}
                                            pagination={recentEvent?.pagination}
                                        />
                                    }
                                    <div className="next-page"
                                        style={{ pointerEvents: (+recentEvent?.pagination?.page) === recentEvent?.pagination?.total_pages ? 'none' : 'auto' }}
                                        onClick={() => {
                                            getOrganizationRecentEvent(
                                                (+recentEvent?.pagination?.page) + 1,
                                                page_size
                                            )
                                        }}
                                    >Next</div>
                                </div>
                            }
                        </div>
                    </div>
                    {/* upcoming Event */}
                    <div className="donation-dash-upcoming-event">
                        <div className="row mt-3">
                            <div className="col-md-12">
                                <h2>Upcoming Events</h2>
                            </div>
                        </div>
                        <div className="row mt-3">
                            {upcomingEvent?.events?.length > 0 ?
                                upcomingEvent?.events?.map((event, e) => {
                                    return (
                                        <div className="col-md-4" key={e}>
                                            <div className="card-recent-dash-event">
                                                <img src={event?.cover_image} alt="" />
                                                <h3>{event?.name}</h3>
                                                <div className="read-bothdash-event">
                                                    <Link to="/dashboard/organization-add-event" style={{ textDecoration: "none" }}>
                                                        <button type='button' className='btn btn-readmore-dash'>Edit</button>
                                                    </Link>
                                                    <button type='button' className='btn btn-readmore-dash'>Delete</button>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                })
                                :
                                <NoDataFound title={'No data found'} />
                            }
                        </div>
                        <div className="product-detail-review-pagination">
                            {upcomingEvent?.pagination?.total_pages > 1 &&
                                <div className="page-pagination filter">
                                    <div className="previous-page"
                                        style={{ pointerEvents: (+upcomingEvent?.pagination?.page) === 1 ? 'none' : 'auto' }}
                                        onClick={() => {
                                            getOrganizationUpcomingEvent(
                                                (+upcomingEvent?.pagination?.page) - 1,
                                                page_size
                                            )
                                        }}
                                    >Previous</div>
                                    {upcomingEvent?.pagination?.total_pages > 12 ?
                                        <div className="all-pages">
                                            <ul>
                                                <li className={`${(+upcomingEvent?.pagination?.page) === 1 ? 'active' : ''}`}
                                                    onClick={() => {
                                                        getOrganizationUpcomingEvent(
                                                            1,
                                                            page_size
                                                        )
                                                    }}
                                                >1</li>
                                                <li className={`${(+upcomingEvent?.pagination?.page) === 2 ? 'active' : ''}`}
                                                    onClick={() => {
                                                        getOrganizationUpcomingEvent(
                                                            2,
                                                            page_size
                                                        )
                                                    }}
                                                >2</li>
                                                <li className={`${(+upcomingEvent?.pagination?.page) === 3 ? 'active' : ''}`}
                                                    onClick={() => {
                                                        getOrganizationUpcomingEvent(
                                                            3,
                                                            page_size
                                                        )
                                                    }}
                                                >3</li>
                                                <li>
                                                    <svg width="33" height="3" viewBox="0 0 33 3" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <path d="M0.39853 3V0.202939H2.61842V3H0.39853ZM5.38461 3V0.202939H7.6045V3H5.38461ZM10.3707 3V0.202939H12.5906V3H10.3707ZM15.3568 3V0.202939H17.5767V3H15.3568ZM20.3429 3V0.202939H22.5627V3H20.3429ZM25.3289 3V0.202939H27.5488V3H25.3289ZM30.315 3V0.202939H32.5349V3H30.315Z" fill="#A7A7A7" />
                                                    </svg>
                                                </li>
                                                <li className={`${(+upcomingEvent?.pagination?.page) === upcomingEvent?.pagination?.total_pages ? 'active' : ''}`}
                                                    onClick={() => {
                                                        getOrganizationUpcomingEvent(
                                                            upcomingEvent?.pagination?.total_pages,
                                                            page_size
                                                        )
                                                    }}
                                                >{upcomingEvent?.pagination?.total_pages}</li>
                                            </ul>
                                        </div>
                                        :
                                        <PageNumbers
                                            totalPages={upcomingEvent?.pagination?.total_pages}
                                            page_size={page_size}
                                            getEvent={getOrganizationUpcomingEvent}
                                            pagination={upcomingEvent?.pagination}
                                        />
                                    }
                                    <div className="next-page"
                                        style={{ pointerEvents: (+upcomingEvent?.pagination?.page) === upcomingEvent?.pagination?.total_pages ? 'none' : 'auto' }}
                                        onClick={() => {
                                            getOrganizationUpcomingEvent(
                                                (+upcomingEvent?.pagination?.page) + 1,
                                                page_size
                                            )
                                        }}
                                    >Next</div>
                                </div>
                            }
                        </div>
                    </div>
                    {/* ended Event */}
                    <div className="donation-dash-upcoming-event">
                        <div className="row mt-3">
                            <div className="col-md-12">
                                <h2>Ended Events</h2>
                            </div>
                        </div>
                        <div className="row mt-3">
                            {endedEvent?.events?.length > 0 ?
                                endedEvent?.events?.map((event, e) => {
                                    return (
                                        <div className="col-md-4" key={e}>
                                            <div className="card-recent-dash-event">
                                                <img src={event?.cover_image} alt="" />
                                                <h3>{event?.name}</h3>
                                                <div className="read-bothdash-event">
                                                    <Link to={`organization-update-event?id=${event?.id}`} style={{ textDecoration: "none" }}>
                                                        <button type='button' className='btn btn-readmore-dash'>Edit</button>
                                                    </Link>
                                                    <button type='button' className='btn btn-readmore-dash'>Delete</button>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                })
                                :
                                <NoDataFound title={'No data found'} />
                            }
                        </div>
                        <div className="product-detail-review-pagination">
                            {endedEvent?.pagination?.total_pages > 1 &&
                                <div className="page-pagination filter">
                                    <div className="previous-page"
                                        style={{ pointerEvents: (+endedEvent?.pagination?.page) === 1 ? 'none' : 'auto' }}
                                        onClick={() => {
                                            getOrganizationEndedEvent(
                                                (+endedEvent?.pagination?.page) - 1,
                                                page_size
                                            )
                                        }}
                                    >Previous</div>
                                    {endedEvent?.pagination?.total_pages > 12 ?
                                        <div className="all-pages">
                                            <ul>
                                                <li className={`${(+endedEvent?.pagination?.page) === 1 ? 'active' : ''}`}
                                                    onClick={() => {
                                                        getOrganizationEndedEvent(
                                                            1,
                                                            page_size
                                                        )
                                                    }}
                                                >1</li>
                                                <li className={`${(+endedEvent?.pagination?.page) === 2 ? 'active' : ''}`}
                                                    onClick={() => {
                                                        getOrganizationEndedEvent(
                                                            2,
                                                            page_size
                                                        )
                                                    }}
                                                >2</li>
                                                <li className={`${(+endedEvent?.pagination?.page) === 3 ? 'active' : ''}`}
                                                    onClick={() => {
                                                        getOrganizationEndedEvent(
                                                            3,
                                                            page_size
                                                        )
                                                    }}
                                                >3</li>
                                                <li>
                                                    <svg width="33" height="3" viewBox="0 0 33 3" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <path d="M0.39853 3V0.202939H2.61842V3H0.39853ZM5.38461 3V0.202939H7.6045V3H5.38461ZM10.3707 3V0.202939H12.5906V3H10.3707ZM15.3568 3V0.202939H17.5767V3H15.3568ZM20.3429 3V0.202939H22.5627V3H20.3429ZM25.3289 3V0.202939H27.5488V3H25.3289ZM30.315 3V0.202939H32.5349V3H30.315Z" fill="#A7A7A7" />
                                                    </svg>
                                                </li>
                                                <li className={`${(+endedEvent?.pagination?.page) === endedEvent?.pagination?.total_pages ? 'active' : ''}`}
                                                    onClick={() => {
                                                        getOrganizationEndedEvent(
                                                            endedEvent?.pagination?.total_pages,
                                                            page_size
                                                        )
                                                    }}
                                                >{endedEvent?.pagination?.total_pages}</li>
                                            </ul>
                                        </div>
                                        :
                                        <PageNumbers
                                            totalPages={endedEvent?.pagination?.total_pages}
                                            page_size={page_size}
                                            getEvent={getOrganizationEndedEvent}
                                            pagination={endedEvent?.pagination}
                                        />
                                    }
                                    <div className="next-page"
                                        style={{ pointerEvents: (+endedEvent?.pagination?.page) === endedEvent?.pagination?.total_pages ? 'none' : 'auto' }}
                                        onClick={() => {
                                            getOrganizationEndedEvent(
                                                (+endedEvent?.pagination?.page) + 1,
                                                page_size
                                            )
                                        }}
                                    >Next</div>
                                </div>
                            }
                        </div>
                    </div>
                </div>
            }
        </>
    )
}

export default OrganizationEventManagement
