import React from 'react'

const Button = ({Content, handleClickBtn, name, Style = ''}) => {
  return (
    <button style={{backgroundColor: Style}} name={name} onClick={() => handleClickBtn(name)} className='main-btn'>
        {Content}
    </button>
  )
}

export default Button
