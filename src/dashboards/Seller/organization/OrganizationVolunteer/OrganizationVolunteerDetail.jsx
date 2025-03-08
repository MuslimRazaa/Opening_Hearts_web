import React, { useEffect, useState } from 'react'
import imgprofile from '../../../../media/images/profile-edit.png'
import { useLocation } from 'react-router-dom';
import LoadingComponents from '../../../../components/shared/loaders/LoadingComponents';
import Swal from 'sweetalert2';
import apis from '../../../../service';

const OrganizationVolunteerDetail = () => {

  const { search } = useLocation();
  const params = new URLSearchParams(search);
  const id = params.get('id');
  const [volunterDetail, setVolunterDetail] = useState("")
  const [loader, setLoader] = useState(true)
  const [fullScreenLoader, setFullScreenLoader] = useState(false)

  const getOrganizationVolunterById = async (id) => {
    try {
      const response = await apis.getOrganizationVolunterById(id);
      setVolunterDetail(response.data.data);
      setLoader(false)
    } catch (error) {
      setLoader(false)
      Swal.fire({
        icon: 'error',
        text: error.response?.data?.message
      });
    }
  };

  useEffect(() => {
    getOrganizationVolunterById(id)
  }, [])

  return (
    <>
      {loader ?
        <LoadingComponents />
        :
        <div className="donation-vol-edit-profile-main">
          <div className="row">
            <div className="col-md-12">
              <h1>
                Volunteer Profile
              </h1>
            </div>
          </div>
          <div className="row mt-2">
            <div className="col-md-12">
              <div className="edit-profile-vol">
                <div className="row">
                  <div className="col-md-2 p-0 text-center">
                    <img src={imgprofile} alt="" />
                  </div>
                  <div className="col-md-8 p-0">
                    <div className="edit-vol-pro-head">
                      <h2>
                        Zaire Herwitz
                      </h2>
                      <p>ID: #w34008</p>
                    </div>
                  </div>
                </div>


              </div>
            </div>
          </div>
          <div className="donation-volunter-form">
            <form action="">
              <div className="row mt-2">
                <div className="col-md-12">
                  <div className="head-label-volentor">
                    <h2>Personal Information</h2>
                  </div>
                </div>

              </div>
              <div className="row mt-3">
                <div className="col-md-6">
                  <div className="input-group-volentor">
                    <span>First Name</span>
                    <input
                      className='input-volentor-feild'
                      value={volunterDetail?.user?.first_name}
                      readOnly
                    />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="input-group-volentor">
                    <span>Last Name</span>
                    <input
                      className='input-volentor-feild'
                      value={volunterDetail?.user?.last_name}
                      readOnly
                    />
                  </div>
                </div>
              </div>
              <div className="row mt-3">
                <div className="col-md-6">
                  <div className="input-group-volentor">
                    <span>Qualification</span>
                    <input
                      className='input-volentor-feild'
                      value={volunterDetail?.professional_qualification}
                      readOnly
                    />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="input-group-volentor">
                    <span>Gender</span>
                    <input
                      className='input-volentor-feild'
                      value={volunterDetail?.gender}
                      readOnly
                    />
                  </div>
                </div>
              </div>
              <div className="row mt-3">
                <div className="col-md-6">
                  <div className="input-group-volentor">
                    <span>Country</span>
                    <input
                      className='input-volentor-feild'
                      value={volunterDetail?.country}
                      readOnly
                    />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="input-group-volentor">
                    <span>City</span>
                    <input
                      className='input-volentor-feild'
                      value={volunterDetail?.city}
                      readOnly
                    />
                  </div>
                </div>
              </div>

              <div className="row mt-5">
                <div className="col-md-12">
                  <div className="head-label-volentor">
                    <h2>Contact Information</h2>
                  </div>
                </div>
              </div>
              <div className="row mt-3">
                <div className="col-md-6">
                  <div className="input-group-volentor">
                    <span>Phone</span>
                    <input
                      className='input-volentor-feild'
                      value={volunterDetail?.phone_code + volunterDetail?.phone}
                      readOnly
                    />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="input-group-volentor">
                    <span>Email</span>
                    <input
                      className='input-volentor-feild'
                      value={volunterDetail?.email}
                      readOnly
                    />
                  </div>
                </div>
              </div>
              <div className="row mt-5">
                <div className="col-md-12">
                  <div className="head-label-volentor">
                    <h2>Past Experience</h2>
                  </div>
                </div>
              </div>
              <div className="row mt-3">
                <div className="col-md-6">
                  <div className="input-group-volentor">
                    <span>Designation</span>
                    <input
                      className='input-volentor-feild'
                      value={volunterDetail?.designation}
                      readOnly
                    />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="input-group-volentor">
                    <span>Organization</span>
                    <input
                      className='input-volentor-feild'
                      value={volunterDetail?.organization?.organization_name}
                      readOnly
                    />
                  </div>
                </div>
              </div>
              <div className="row mt-3">
                <div className="col-md-6">
                  <div className="input-group-volentor">
                    <span>Area of specialization</span>
                    <input
                      className='input-volentor-feild'
                      value={volunterDetail?.area_of_specialization}
                      readOnly
                    />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="input-group-volentor">
                    <span>Area of expertise</span>
                    <input
                      className='input-volentor-feild'
                      value={volunterDetail?.area_of_expertise}
                      readOnly
                    />
                  </div>
                </div>
              </div>
              <div className="row mt-5">
                <div className="col-md-12">
                  <div className="document-upload">
                    <label for="file-upload" className="document-label">Documents:</label>
                    <input type="file" id="file-upload" className="file-input" />
                  </div>
                </div>
              </div>

              <div className="row mt-5">
                <div className="col-md-12">
                  <div className="become-volunter-form-head-text">
                    <h3>Duration</h3>
                  </div>
                  <div class="row">
                    <div class="col-md-6">
                      <div class="sec-duration-info">
                        <button type="button" className="btn duration-btn">{volunterDetail?.duration}</button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="row mt-5">
                <div className="col-md-6">
                  <button type="button" className="btn-send-vol">Approve</button>
                </div>
                <div className="col-md-6">
                  <button type="button" className="btn-reject-vol">Reject</button>
                </div>
              </div>
            </form>
          </div>
        </div>
      }

    </>
  )
}

export default OrganizationVolunteerDetail
