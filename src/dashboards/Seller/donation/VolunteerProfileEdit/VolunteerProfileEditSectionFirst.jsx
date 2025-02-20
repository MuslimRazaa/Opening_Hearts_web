import React from 'react'
import imgprofile from '../../../../media/images/profile-edit.png'

const VolunteerProfileEditSectionFirst = () => {
  return (
    <>
      <div className="donation-vol-edit-profile-main">
        <div className="row">
          <div className="col-md-12">
            <h1>
              Volunteer Profile
            </h1>
          </div>
        </div>
        <div className="row mt-4">
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
            <div className="row">
              <div className="col-md-12">
                <div className="input-group-volentor">
                  <label htmlFor="">Form Name</label>
                  <input type="text" placeholder='Form Name' className='input-volentor-feild' />
                </div>
              </div>
            </div>
            <div className="row mt-5">
              <div className="col-md-12">
                <div className="head-label-volentor">
                  <h2>Personal Information</h2>
                </div>
              </div>

            </div>
            <div className="row mt-3">
              <div className="col-md-6">
                <div className="input-group-volentor">
                  <input type="text" placeholder='First Name' className='input-volentor-feild' />
                </div>
              </div>
              <div className="col-md-6">
                <div className="input-group-volentor">
                  <input type="text" placeholder='Last Name' className='input-volentor-feild' />
                </div>
              </div>
            </div>
            <div className="row mt-3">
              <div className="col-md-6">
                <div className="input-group-volentor">
                  <input type="text" placeholder='Professional Qualifications' className='input-volentor-feild' />
                </div>
              </div>
              <div className="col-md-6">
                <div className="select-group-volentor">
                  <select name="" className='volentor-select' id="">

                    <option>Gender</option>
                    <option>Male</option>
                    <option>Female</option>
                  </select>
                </div>
              </div>
            </div>
            <div className="row mt-3">
              <div className="col-md-6">
                <div className="select-group-volentor">
                  <select name="" className='volentor-select' id="">
                    <option>Country</option>
                    <option>USA</option>
                    <option>UK</option>
                    <option>Poland</option>
                    <option></option>
                  </select>


                </div>
              </div>
              <div className="col-md-6">
                <div className="select-group-volentor">
                  <select name="" className='volentor-select' id="">
                    <option>City</option>
                    <option>London</option>
                    <option>New York</option>
                  </select>
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
                  <input type="text" placeholder='Phone' className='input-volentor-feild' />
                </div>
              </div>
              <div className="col-md-6">
                <div className="input-group-volentor">
                  <input type="text" placeholder='Email' className='input-volentor-feild' />
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
                  <input type="text" placeholder='Designation' className='input-volentor-feild' />
                </div>
              </div>
              <div className="col-md-6">
                <div className="input-group-volentor">
                  <input type="text" placeholder='Designation' className='input-volentor-feild' />
                </div>
              </div>
            </div>
            <div className="row mt-3">
              <div className="col-md-6">
                <div className="input-group-volentor">
                  <input type="text" placeholder='Area of specialization' className='input-volentor-feild' />
                </div>
              </div>
              <div className="col-md-6">
                <div className="input-group-volentor">
                  <input type="text" placeholder='Area of expertise' className='input-volentor-feild' />
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
                      <button type="button" className="btn duration-btn">Week</button>

                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="row mt-5">
              <div className="col-md-5">
                <button type="button" className="btn-send-vol">Approve</button>
              </div>
              <div className="col-md-5">
                <button type="button" className="btn-reject-vol">Reject</button>
              </div>
            </div>
          </form>
        </div>
      </div>

    </>
  )
}

export default VolunteerProfileEditSectionFirst
