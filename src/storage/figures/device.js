import { createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
const qs = require('qs')
// import { useNavigate } from "react-router-dom";

const initialState = {
    AC: [],
    HM: [],
    newResponse: undefined,
}

export const deviceSlice = createSlice({
    name: 'device',
    initialState,
    reducers: {
        addSuccess: (state, device) => {
            device.isAirConditioner
                ?
                state.AC = [
                    ...state.AC,
                    device.payload,
                ]
                :
                state.HM = [
                    ...state.HM,
                    device.payload,
                ]
        },

        load: (state, props) => {

            const listOfdevices = props.payload.data
            const isAC = props.payload.isAC
            if (isAC) {
                state.AC = [
                    ...listOfdevices,
                ]
            } else {
                state.HM = [
                    ...listOfdevices,
                ]
            }
        },

        newestResFromServer: (state, device) => {
            state.newResponse = {
                ...device.payload
            }
        },

        removeNewest: (state, device) => {
            state.newResponse = undefined
        }
    },
})

// Action creators are generated for each case reducer function
export const { addSuccess, load, newestResFromServer, removeNewest } = deviceSlice.actions

export const addDevice = (info) => async dispatch => {
    await axios
        .post("http://localhost:8080/device/add", info)
        .then((res) => {
            dispatch(addSuccess(res.data))
            dispatch(newestResFromServer({ data: res.data }))
        })
}

export const loadDevice = (isAC, email) => async dispatch => {
    const info = {
        email: email,
    }
    await axios
        .get(`http://localhost:8080/device/${isAC ? 'airconditioners' : 'humidifiers'}`,
            {
                params:
                {
                    email: email
                }
            })
        .then((res) => {
            dispatch(load({ data: res.data, isAC: isAC }))
        })
}

export const selectAC = (state) => state.device.AC
export const selectHM = (state) => state.device.HM
export const selectNewestResponse = (state) => state.device.newResponse

export default deviceSlice.reducer