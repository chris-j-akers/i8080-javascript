import React from 'react'
import logo from '../img/logo.png'

function Logo({logoWidth, logoHeight}) {
  return (
    <div className='cabinet-logo'>
        <img src={logo} width={logoWidth} height={logoHeight}/>
    </div>
  )
}

Logo.defaultProps = {
    logoHeight: 50,
    logoWidth: 215,
  }

export default Logo
