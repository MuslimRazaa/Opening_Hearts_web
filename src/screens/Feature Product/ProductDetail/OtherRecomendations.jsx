import React from 'react'
import SliderOneDetailPage from './slider_other-recomendations/SliderOneDetailPage'
import SliderTwoDetailPage from './slider_other-recomendations/SliderTwoDetailPage'
import SliderThreeDetailPage from './slider_other-recomendations/SliderThreeDetailPage'

function OtherRecomendations() {
    return (
        <div className='container'>
            <div className="sliderOne">
                <h2>Others recommandations for you</h2>
                <SliderOneDetailPage />
            </div>

            <div className="sliderTwo">
                <h2>Others Related Services</h2>
                <SliderTwoDetailPage />
            </div>


            <div className="sliderThree">
                <h2>Others Related NGO Campaigns</h2>
                <SliderThreeDetailPage />
            </div>

        </div>
    )
}

export default OtherRecomendations
