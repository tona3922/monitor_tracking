
//request
const request = require('request');
const axios = require('axios');

const getTempValue = () => {
  return new Promise((resolve, reject) => {
    const optionsGetTempValue = {
      method: 'GET',
      url: 'https://io.adafruit.com/api/v2/thinhdanghcmut/feeds/cs-ce-dadn.temp-sensor',
      headers: {
        'x-aio-key': 'aio_ewau408xQZaXPY2tlZA374Ylsr4f'
      }
    };
    const errorMessage = { code: 500, error: 'INTERNAL_SERVER_ERROR' };
  
    request(optionsGetTempValue, (error, response, body) => {
        if (error) return reject(errorMessage);
        else if (response.statusCode != 200) return reject(errorMessage);
        return resolve(body);
    });
  })
}

const getHumidValue = () => {
  return new Promise((resolve, reject) => {
    const optionsGetHumidValue = {
      method: 'GET',
      url: 'https://io.adafruit.com/api/v2/thinhdanghcmut/feeds/cs-ce-dadn.humi-sensor',
      headers: {
        'x-aio-key': 'aio_ewau408xQZaXPY2tlZA374Ylsr4f'
      }
    };
    const errorMessage = { code: 500, error: 'INTERNAL_SERVER_ERROR' };
  
    request(optionsGetHumidValue, (error, response, body) => {
        if (error) return reject(errorMessage);
        else if (response.statusCode != 200) return reject(errorMessage);
        return resolve(body);
    });
  })
}


const autoSwitchDeviceMethod= {
  method: 'POST',
  url: '',
  headers: {
    'x-aio-key': 'aio_ewau408xQZaXPY2tlZA374Ylsr4f',
    'Content-Type': 'application/json'
  },
  body: {
    "value": "1"
  },
  json: true
};


const autoSwitchDevice = async() => {
  const URL = 'https://io.adafruit.com/api/v2/thinhdanghcmut/feeds/cs-ce-dadn.'
  //Wait until recieved data from server
  const tempValue = await getTempValue().then((value) => {
    console.log("Temp is:",JSON.parse(value).last_value);
    return JSON.parse(value);
  }).catch((err) => {
    console.error(err);
  })

  const humidValue = await getHumidValue().then((value) => {
    console.log("Humid is:", JSON.parse(value).last_value);
    return JSON.parse(value);
  }).catch((err) => {
    console.error(err);
  })


//switch humidifier
if(humidValue.name === 'humi-sensor'){
  autoSwitchDeviceMethod.url = URL +'humidifier/data'
  if(parseInt(humidValue.last_value) >= 110){
    autoSwitchDeviceMethod.body.value = '3'
    console.log("TOO HUMID");
    console.log("Turn OFF");

    request(autoSwitchDeviceMethod, function (error, response, body) {
      if (error) throw new Error(error);
      console.log(body.value);
    });
  }

  if(parseInt(humidValue.last_value) <= 60){
    autoSwitchDeviceMethod.body.value = '2'
    console.log("TOO DRY")
    console.log("Turn ON");
    request(autoSwitchDeviceMethod, function (error, response, body) {
      if (error) throw new Error(error);
      console.log(body.value);
   });
  }
}
//switch air-condition
if(tempValue.name === 'temp-sensor'){
  autoSwitchDeviceMethod.url = URL + 'button/data'
  if(parseInt(tempValue.last_value) >= 25) {
    autoSwitchDeviceMethod.body.value = '1'
    console.log("TOO HOT");
    console.log("Turn ON");

    request(autoSwitchDeviceMethod, function (error, response, body) {
      if (error) throw new Error(error);
      console.log(body.value);
    });
  }
  if(parseInt(tempValue.last_value) <= 5){
    autoSwitchDeviceMethod.body.value = '0'
    console.log("TOO COLD")
    console.log("Turn OFF");
    request(autoSwitchDeviceMethod, function (error, response, body) {
      if (error) throw new Error(error);
      console.log(body.value);
   });
  }
}

console.log(autoSwitchDeviceMethod.url)

}

autoSwitchDevice();


