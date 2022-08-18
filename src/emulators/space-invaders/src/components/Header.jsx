import React from 'react'

function Header() {
  return (
    <div id='header-container'>
      <div id='header-title'>
        <h1>JavaScript Intel 8080 Emulator</h1>
      </div>
      <div>
        <p>This page is running a JavaScript Intel 8080 Virtual Machine in your browser.</p> 
        <p>It has been loaded with the original arcade ROM of <i>Space Invaders</i>.</p>
        <p>The emulator and front-end were written by <a href='http://www.linkedin.com/in/chris-akers-1403114'>Chris Akers</a>. For source code and docs, including a quick tutorial on using the components to build your own 8080 Virtual Machine, see: <a href='https://github.com/chris-j-akers/i8080-javascript'>https://github.com/chris-j-akers/i8080-javascript</a></p>
      </div>  
    </div>
  )
}

export default Header
