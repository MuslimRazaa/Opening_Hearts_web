import React, { useEffect, useState } from 'react'
import eye from '../../../../media/images/eye.png'
import apis from '../../../../service'
import Swal from 'sweetalert2'
import { Link } from 'react-router-dom'
import LoadingComponents from '../../../../components/shared/loaders/LoadingComponents';
import VolunterBarChart from '../../../Charts/VolunterBarChart';
import cndr from '../../../../media/images/Calendar.png'
import arr from '../../../../media/images/Vector.png'
import DatePicker from "react-datepicker";
import NoDataFound from '../../../../components/shared/noDataFound/NoDataFound'

const formatDate = (dateString) => {
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are 0-based
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

const PageNumbers = ({
  totalPages,
  page_size,
  volunterManagment,
  pagination,
  date }) => {
  const pageNumbers = Array.from({ length: totalPages }, (_, index) => index + 1);

  return (
    <div className='all-pages'>
      <ul>
        {pageNumbers.map(number => (
          <li key={number}
            className={`${(+pagination?.page) === number ? 'active' : ''}`}
            onClick={() => {
              volunterManagment(
                date,
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

const OrganizationVolunteer = () => {
  const [activeDate, setActiveDate] = useState("");
  const [pendingDate, setPendingDate] = useState("");
  const [pendingVolunter, setPendingVolunter] = useState([]);
  const [activeVolunter, setActiveVolunter] = useState([]);
  const [fullScreenLoader, setFullScreenLoader] = useState(false)
  const [loading, setLoading] = useState(true);
  const [type, setType] = useState("monthly");
  const page_size = 5;
  const [charts, setCharts] = useState("");

  const getOrganizationVolunterActive = async (date, page, page_size) => {
    try {
      const response = await apis.getOrganizationVolunterActive(date, page, page_size);
      setActiveVolunter(response.data.data);
      getOrganizationVolunterPending(pendingDate, 1, page_size)
    } catch (error) {
      setLoading(false)
      setFullScreenLoader(false)
      Swal.fire({
        icon: 'error',
        text: error.response?.data?.message
      });
    }
  };

  const getOrganizationVolunterPending = async (date, page, page_size) => {
    try {
      const response = await apis.getOrganizationVolunterPending(date, page, page_size);
      setPendingVolunter(response.data.data);
      getOrganizationVolunterChart(type)
    } catch (error) {
      setLoading(false)
      setFullScreenLoader(false)
      Swal.fire({
        icon: 'error',
        text: error.response?.data?.message
      });
    }
  };

  const getOrganizationVolunterChart = async (type) => {
    try {
      const response = await apis.getOrganizationVolunterChart(type);
      setCharts(response.data.data);
      setLoading(false)
      setFullScreenLoader(false)
    } catch (error) {
      setLoading(false)
      setFullScreenLoader(false)
      Swal.fire({
        icon: 'error',
        text: error.response?.data?.message
      });
    }
  };

  useEffect(() => {
    getOrganizationVolunterActive(activeDate, 1, page_size)
  }, [])

  const organizationVolunterApproveAndReject = async (body) => {
    try {
      setFullScreenLoader(true)
      const response = await apis.organizationVolunterApproveAndReject(body);
      getOrganizationVolunterActive(activeDate, 1, page_size)
    } catch (error) {
      setFullScreenLoader(true)
      Swal.fire({
        icon: 'error',
        text: error.response?.data?.message
      });
    }
  };
  return (
    <>
      {fullScreenLoader &&
        <div className="full-screen-loader">
          <LoadingComponents />
        </div>
      }
      {
        loading ?
          <LoadingComponents />
          :
          <div>
            <VolunterBarChart
              name={charts?.name}
              value={charts?.bar_chart_volunteer}
              totalOrder={charts?.number_of_volunteer}
              getOrganizationVolunterChart={getOrganizationVolunterChart} />
            <br></br>
            <div className='orders-table-and-tabs'>
              <div className="orders-table-heading d-flex justify-content-between align-items-center">
                <h2>Recent Active Volunteers</h2>
                <div className="clander-js">
                  <div className="calender-dpdown">
                    <img src={cndr} className="calender-icon" />
                    <img src={arr} className="arrow-down" />
                    <DatePicker
                      selected={activeDate}
                      onChange={(date) => { setActiveDate(formatDate(date)); getOrganizationVolunterActive(formatDate(date), 1, page_size) }}
                      dateFormat="yyyy-MM-dd"
                      placeholderText='Enter date'
                    />
                  </div>
                </div>
              </div>
              <div className='table-tabs-main'>
                <div className="table-main-wrapper">
                  <div className='table-main-wrapper'>
                    <div className="order-table">
                      <div className="table-header-vol">
                        <div><p>Date & Time</p></div>
                        <div><p>Name</p></div>
                        <div><p>Email</p></div>
                        <div><p>Duration</p></div>
                        <div><p>Campaign </p></div>
                        <div><p>Event </p></div>
                      </div>
                      {activeVolunter?.volunteer?.length > 0 ?
                        activeVolunter?.volunteer?.map((volunteer, index) => (
                          <div className="table-row-volunteer" key={index}>
                            <div className='rev-table-order-col'>
                              <div className='rev-table-order-col-content'><p>{volunteer.join_date}</p></div>
                            </div>
                            <div className='order-table-user'><p>{volunteer.user.first_name + " " + volunteer.user.last_name}</p></div>
                            <div><p>{volunteer.email}</p></div>
                            <div><p>{volunteer.duration}</p></div>
                            <div><p>{volunteer.campaign.name}</p></div>
                            <div><p>{volunteer.event.name}</p></div>
                          </div>
                        ))
                        :
                        <NoDataFound title={'No dat found'} />
                      }
                    </div>

                  </div>
                </div>
              </div>
              <div className="product-detail-review-pagination">
                {activeVolunter.pagination?.total_pages > 1 &&
                  <div className="page-pagination filter">
                    <div className="previous-page"
                      style={{ pointerEvents: (+activeVolunter.pagination?.page) === 1 ? 'none' : 'auto' }}
                      onClick={() => {
                        getOrganizationVolunterActive(
                          activeDate,
                          (+activeVolunter.pagination?.page) - 1,
                          page_size
                        )
                      }}
                    >Previous</div>
                    {activeVolunter.pagination?.total_pages > 12 ?
                      <div className="all-pages">
                        <ul>
                          <li className={`${(+activeVolunter.pagination?.page) === 1 ? 'active' : ''}`}
                            onClick={() => {
                              getOrganizationVolunterActive(
                                activeDate,
                                1,
                                page_size
                              )
                            }}
                          >1</li>
                          <li className={`${(+activeVolunter.pagination?.page) === 2 ? 'active' : ''}`}
                            onClick={() => {
                              getOrganizationVolunterActive(
                                activeDate,
                                2,
                                page_size
                              )
                            }}
                          >2</li>
                          <li className={`${(+activeVolunter.pagination?.page) === 3 ? 'active' : ''}`}
                            onClick={() => {
                              getOrganizationVolunterActive(
                                activeDate,
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
                          <li className={`${(+activeVolunter.pagination?.page) === activeVolunter.pagination?.total_pages ? 'active' : ''}`}
                            onClick={() => {
                              getOrganizationVolunterActive(
                                activeDate,
                                activeVolunter.pagination?.total_pages,
                                page_size
                              )
                            }}
                          >{activeVolunter.pagination?.total_pages}</li>
                        </ul>
                      </div>
                      :
                      <PageNumbers
                        totalPages={activeVolunter.pagination?.total_pages}
                        page_size={page_size}
                        volunterManagment={getOrganizationVolunterActive}
                        pagination={activeVolunter.pagination}
                        date={activeDate}
                      />
                    }
                    <div className="next-page"
                      style={{ pointerEvents: (+activeVolunter.pagination?.page) === activeVolunter.pagination?.total_pages ? 'none' : 'auto' }}
                      onClick={() => {
                        getOrganizationVolunterActive(
                          activeDate,
                          (+activeVolunter.pagination?.page) + 1,
                          page_size
                        )
                      }}
                    >Next</div>
                  </div>
                }
              </div>
            </div>
            <br></br>
            <div className='orders-table-and-tabs'>
              <div className="orders-table-heading d-flex justify-content-between align-items-center">
                <h2>Recent Volunteers Request</h2>
                <div className="clander-js">
                  <div className="calender-dpdown">
                    <img src={cndr} className="calender-icon" />
                    <img src={arr} className="arrow-down" />
                    <DatePicker
                      selected={pendingDate}
                      onChange={(date) => { setPendingDate(formatDate(date)); getOrganizationVolunterPending(formatDate(date), 1, page_size) }}
                      dateFormat="yyyy-MM-dd"
                      placeholderText='Enter date'
                    />
                  </div>
                </div>
              </div>
              <div className='table-tabs-main'>
                <div className="table-main-wrapper">
                  <div className='table-main-wrapper'>
                    <div className="order-table">
                      <div className="table-header">
                        <div><p>Name</p></div>
                        <div><p>Campaigns and Events</p></div>
                        <div><p>email</p></div>
                        <div><p>Aproval Request</p></div>
                        <div><p>View </p></div>
                      </div>
                      {pendingVolunter?.volunteer.length > 0 ?
                        (pendingVolunter?.volunteer.map((volunteer, index) => (
                          <div className="table-row-vol-req" key={index}>
                            <div className='rev-table-order-col'>
                              <div className='rev-table-order-col-content'>
                                <p>{volunteer.user.first_name + " " + volunteer.user.last_name}</p>
                                <span>{volunteer.join_date}</span>
                              </div>
                            </div>
                            <div className='rev-table-order-col'>
                              <div className='rev-table-order-col-content'>
                                <p>{volunteer.campaign.name}</p>
                                <span>{volunteer.event.name}</span>
                              </div>
                            </div>
                            <div className='rev-table-order-col'>
                              <div className='rev-table-order-col-content'>
                                <p>{volunteer.user.email}</p>
                              </div>
                            </div>
                            <div className="vol-req-buttons">
                              <button onClick={() => { organizationVolunterApproveAndReject({ id: volunteer.id, status: 'approved' }) }}>Approve</button>
                              <button className='vol-req-decline-btn' onClick={() => { organizationVolunterApproveAndReject({ id: volunteer.id, status: 'reject' }) }}>Decline</button>
                            </div>
                            <div>
                              <Link to={`/dashboard/organization-volunteer-detail?id=${volunteer.id}`} style={{ textDecoration: "none" }}>
                                <img src={eye} />
                              </Link>
                            </div>
                          </div>
                        )))
                        :
                        <NoDataFound title={'No dat found'} />
                      }
                    </div>

                  </div>
                </div>
              </div>
              <div className="product-detail-review-pagination">
                {pendingVolunter.pagination?.total_pages > 1 &&
                  <div className="page-pagination filter">
                    <div className="previous-page"
                      style={{ pointerEvents: (+pendingVolunter.pagination?.page) === 1 ? 'none' : 'auto' }}
                      onClick={() => {
                        getOrganizationVolunterPending(
                          pendingDate,
                          (+pendingVolunter.pagination?.page) - 1,
                          page_size
                        )
                      }}
                    >Previous</div>
                    {pendingVolunter.pagination?.total_pages > 12 ?
                      <div className="all-pages">
                        <ul>
                          <li className={`${(+pendingVolunter.pagination?.page) === 1 ? 'active' : ''}`}
                            onClick={() => {
                              getOrganizationVolunterPending(
                                pendingDate,
                                1,
                                page_size
                              )
                            }}
                          >1</li>
                          <li className={`${(+pendingVolunter.pagination?.page) === 2 ? 'active' : ''}`}
                            onClick={() => {
                              getOrganizationVolunterPending(
                                pendingDate,
                                2,
                                page_size
                              )
                            }}
                          >2</li>
                          <li className={`${(+pendingVolunter.pagination?.page) === 3 ? 'active' : ''}`}
                            onClick={() => {
                              getOrganizationVolunterPending(
                                pendingDate,
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
                          <li className={`${(+pendingVolunter.pagination?.page) === pendingVolunter.pagination?.total_pages ? 'active' : ''}`}
                            onClick={() => {
                              getOrganizationVolunterPending(
                                pendingDate,
                                pendingVolunter.pagination?.total_pages,
                                page_size
                              )
                            }}
                          >{pendingVolunter.pagination?.total_pages}</li>
                        </ul>
                      </div>
                      :
                      <PageNumbers
                        totalPages={pendingVolunter.pagination?.total_pages}
                        page_size={page_size}
                        volunterManagment={getOrganizationVolunterPending}
                        pagination={pendingVolunter.pagination}
                        date={pendingDate}
                      />
                    }
                    <div className="next-page"
                      style={{ pointerEvents: (+pendingVolunter.pagination?.page) === pendingVolunter.pagination?.total_pages ? 'none' : 'auto' }}
                      onClick={() => {
                        getOrganizationVolunterPending(
                          pendingDate,
                          (+pendingVolunter.pagination?.page) + 1,
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

export default OrganizationVolunteer
