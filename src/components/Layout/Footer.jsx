import React from 'react'
import logo from '../../media/images/logo.svg'

function Footer() {
    return (
        <>
            <div className='footer'>
                <div className="container d-flex justify-content-between  align-items-center gap-20">

                    <div className='footer-logo'>
                        <a href='/'><img src={logo} /></a>
                    </div>

                    <div className='footer-Activity'>
                        <h2>Recent Activity</h2>
                        <ul>
                            <li>Home</li>
                            <li>Get Started</li>
                            <li>About Us</li>
                        </ul>
                    </div>

                    <div className='footer-pages'>
                        <h2>Pages</h2>
                        <ul>
                            <li>About Us</li>
                            <li>How We work</li>
                            <li>Catogories</li>
                        </ul>
                    </div>

                    <div className='footer-legal'>
                        <h2>Legal</h2>
                        <ul>
                            <li>Privacy Policy</li>
                            <li>Terms of Use</li>
                            <li>Contact</li>
                        </ul>
                    </div>

                    <div className='footer-social'>
                        <h2>Social</h2>
                        <ul>
                            <li>Facebook</li>
                            <li>Instagram</li>
                            <li>Twitter</li>
                        </ul>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Footer
