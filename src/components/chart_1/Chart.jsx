import React from 'react';
import ReactApexChart from 'react-apexcharts';

export default function ApexChart(props) {
    const colsPerDay = 2
    const groups = [
        { title: 'Mon', cols: colsPerDay },
        { title: 'Tue', cols: colsPerDay },
        { title: 'Wed', cols: colsPerDay },
        { title: 'Thu', cols: colsPerDay },
        { title: 'Fri', cols: colsPerDay },
        { title: 'Sat', cols: colsPerDay },
        { title: 'Sun', cols: colsPerDay }
      ]
    
    // data should be changed on reload so not necessary to be in state
    const data = [{ 
        x: '9AM',
        y: 400
      }, {
        x: '9PM',
        y: 430
      }, {
        x: '9AM',
        y: 448
      }, {
        x: '9PM',
        y: 470
      }, {
        x: '9AM',
        y: 540
      }, {
        x: '9PM',
        y: 580
      }, {
        x: '9AM',
        y: 690
      }, {
        x: '9PM',
        y: 690
      }, {
        x: '9AM',
        y: 690
      }, {
        x: '9PM',
        y: 690
      }, {
        x: '9AM',
        y: 690
      }, {
        x: '9PM',
        y: 690
      }, {
        x: '9AM',
        y: 690
      }, {
        x: '9PM',
        y: 690
      }]
    const state = {
        series: [{
          name: "Chỉ số gì đó",
          data: data
        }],
        options: {
          chart: {
            type: 'bar',
            height: 380
          },
          xaxis: {
            type: 'category',
            labels: {
              formatter: function(val) {
                return val
              }
            },
            group: {
              style: {
                fontSize: '10px',
                fontWeight: 700
              },
              groups: groups
            }
          },
          title: {
              text: 'Tiêu đề gì đó',
          },
          tooltip: {
            x: {
              formatter: function(val) {
                return val
              }  
            }
          },
        },
      
      
      }

    return (
        <div style={{width: '80%'}}>
            <ReactApexChart options={state.options} series={state.series} type="bar" height={380} />
        </div>
    )
}