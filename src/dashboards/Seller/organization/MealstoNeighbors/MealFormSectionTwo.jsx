import React from 'react'
import MealFormSec from './MealFormSec'
import SideBar from '../../../../components/Layout/SideBar'

export function MealFormSectionTwo(props) {


    return (
        <>
        <div className="container">
            <div className="dashboard-seller-service">
                <div className="row">
                    <div className="col-lg-4"></div>
                    <div className="col-lg-8">
                        {/* <SearchBar /> */}
                    </div>
                </div>
                <div className="row">
                    <div className="col-lg-4">
                        <SideBar />
                    </div>
                    <div className="col-lg-8">
                        <MealFormSec/>
                    </div>
                </div>
            </div >
            </div>
        </>
    )
}
