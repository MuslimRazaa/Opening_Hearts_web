import React from 'react'
import BarChart from '../../../Charts/BarChart'
import RevenuTable from '../../../Tabels/RevenuTable'
import DonationRevenueTable from '../Tables/DonationRevenueTable'
import DonationTableTab from '../MainDonationDashboard/DonationTableTab'
import VolunteerTable from '../MainDonationDashboard/VolunteerTable'
import VolTableTab from '../MainDonationDashboard/VolTableTab'
import VolReqTableTab from '../MainDonationDashboard/VolReqTableTab'
import CustomDatePicker from '../../../../components/Main/CalenderDpDown'


const VolunteerForm = () => {
  return (
    <div>
      <div className="edit-form-buton">
        <button>Edit Form</button>
      </div>
        <BarChart />
        <br></br>
        <div className='orders-table-and-tabs'>
                <div className="orders-table-heading">
                    <h2 style={{marginBottom:"50px"}}>Recent Active Volunteers</h2>
                </div>
                <VolTableTab  />
              </div>        <br></br>
        <div className='orders-table-and-tabs'>
                <div className="orders-table-heading d-flex justify-content-between align-items-center">
                    <h2>Recent Volunteers Request</h2>
                    <CustomDatePicker datelabel={false} />
                </div>
                <VolReqTableTab  />
              </div>    </div>
  )
}

export default VolunteerForm
