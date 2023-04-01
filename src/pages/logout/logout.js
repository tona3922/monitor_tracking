import React from 'react'
import { useDispatch } from 'react-redux'
import { logoutHome } from '../../storage/figures/user'
import { BouncyLoading } from '../../components/loading/Loading'
import { useNavigate } from 'react-router-dom'

import './logout.scss'

const Logout = () => {

    const dispatch = useDispatch()
    dispatch(logoutHome())

    const navigate = useNavigate()
    setTimeout(() => navigate("/"), 1000)

    return (
        <div className="logout-scene">
            <BouncyLoading text="Signing Out" />
        </div>
    )
}

export default Logout