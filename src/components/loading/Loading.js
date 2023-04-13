import React from 'react'
import './Loading.scss'

export const BouncyLoading = (props) => {
    return (
        <div className="wrapper1">
            <div className="dotscontainer">
                <div className="circle"></div>
                <div className="circle"></div>
                <div className="circle"></div>
                <div className="circle"></div>
                <div className="circle"></div>
            </div>
            <div className="shadowcontainer">
                <div className="shadow"></div>
                <div className="shadow"></div>
                <div className="shadow"></div>
                <div className="shadow"></div>
                <div className="shadow"></div>
            </div>
            <span>{props.text}</span>
        </div>
    )
}
