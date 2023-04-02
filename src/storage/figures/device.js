import { createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
// import { useNavigate } from "react-router-dom";

const initialState = {
    AC: [],
    HM: [],
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
                console.log('here')
                state.HM = [
                    ...listOfdevices,
                ]
            }
        }
    },
})

// Action creators are generated for each case reducer function
export const { addSuccess, load } = deviceSlice.actions

export const addDevice = (info) => async dispatch => {
    await axios
        .post("http://localhost:8080/device/add", info)
        .then((res) => {
            dispatch(addSuccess(res.data))
        })
}

export const loadDevice = (isAC) => async dispatch => {
    console.log(isAC)
    await axios
        .get(`http://localhost:8080/device/${isAC ? 'airconditioners' : 'humidifiers'}`)
        .then((res) => {
            dispatch(load({ data: res.data, isAC: isAC }))

        })
}

export const selectAC = (state) => state.device.AC
export const selectHM = (state) => state.device.HM

export default deviceSlice.reducer