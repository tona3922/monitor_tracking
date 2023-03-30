import React from 'react'
import { PieChart, Pie, Sector, ResponsiveContainer, Legend, Cell } from 'recharts'
import { useState } from 'react'

const DevicesPieChart = () => {
    const [activeIndex, setActiveIndex] = useState(0)
    const data = [
        { name: 'Shut Down', value: 1, color: '#ff99c8' },
        { name: 'Activate', value: 10, color: '#a9def9' },
    ]
    const onPieEnter = (_, index) => {
        setActiveIndex(index)
    }
    const shadeColor = (color, percent) => {

        var R = parseInt(color.substring(1, 3), 16)
        var G = parseInt(color.substring(3, 5), 16)
        var B = parseInt(color.substring(5, 7), 16)

        R = parseInt(R * (100 + percent) / 100)
        G = parseInt(G * (100 + percent) / 100)
        B = parseInt(B * (100 + percent) / 100)

        R = (R < 255) ? R : 255
        G = (G < 255) ? G : 255
        B = (B < 255) ? B : 255

        R = Math.round(R)
        G = Math.round(G)
        B = Math.round(B)

        var RR = ((R.toString(16).length == 1) ? "0" + R.toString(16) : R.toString(16))
        var GG = ((G.toString(16).length == 1) ? "0" + G.toString(16) : G.toString(16))
        var BB = ((B.toString(16).length == 1) ? "0" + B.toString(16) : B.toString(16))

        return "#" + RR + GG + BB
    }

    const renderActiveShape = (props) => {
        const RADIAN = Math.PI / 180
        const { cx, cy, midAngle, innerRadius, outerRadius, startAngle, endAngle, fill, payload, percent, value } = props
        const sin = Math.sin(-RADIAN * midAngle)
        const cos = Math.cos(-RADIAN * midAngle)
        const sx = cx + (outerRadius + 10) * cos
        const sy = cy + (outerRadius + 10) * sin
        const mx = cx + (outerRadius + 30) * cos
        const my = cy + (outerRadius + 30) * sin
        const ex = mx + (cos >= 0 ? 1 : -1) * 22
        const ey = my
        const textAnchor = cos >= 0 ? 'start' : 'end'

        return (
            <g>
                <text x={cx} y={cy} dy={8} textAnchor="middle" fill={'#fff'} font-size="2rem" font-weight="bold">
                    {props.name}
                </text>
                <Sector
                    style={{ filter: `drop-shadow(0px 0px 5px${fill})` }}
                    cx={cx}
                    cy={cy}
                    innerRadius={innerRadius}
                    outerRadius={outerRadius}
                    startAngle={startAngle}
                    endAngle={endAngle}
                    fill={fill}
                />
                <Sector
                    cx={cx}
                    cy={cy}
                    startAngle={startAngle}
                    endAngle={endAngle}
                    innerRadius={outerRadius + 7}
                    outerRadius={outerRadius + 10}
                    fill={fill}
                />
                <path d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`} stroke={fill} fill="none" />
                <circle cx={ex} cy={ey} r={2} fill={fill} stroke="none" />
                <text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} textAnchor={textAnchor} fill={fill} font-weight="bold">{`${payload.name}: ${value}`}</text>
                <text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} dy={18} textAnchor={textAnchor} fill="#eee">
                    {`(Rate ${(percent * 100).toFixed(2)}%)`}
                </text>
            </g>
        )
    }

    // static demoUrl = 'https://codesandbox.io/s/pie-chart-with-customized-active-shape-y93si'


    // state = {
    //     activeIndex: 0,
    // }


    // render() {
    return (
        <ResponsiveContainer width={'99%'} height={450}>
            <PieChart >
                <Pie
                    activeIndex={activeIndex}
                    activeShape={renderActiveShape}
                    data={data}
                    cx="50%"
                    cy="50%"
                    innerRadius={120}
                    outerRadius={150}
                    // fill="#8884d8"
                    dataKey="value"
                    onMouseEnter={onPieEnter}
                    startAngle={-270}
                >
                    {data.map((entry, index) => (
                        <Cell
                            style={{ opacity: 0.8 }}
                            key={`cell-${index}`} fill={entry.color} stroke={`transparent`} strokewidth={8}
                        />
                    ))}

                </Pie>


                {/* <Legend layout="horizontal" verticalAlign="bottom" iconSize={15} iconType="circle" /> */}
                {/* <Legend
                    verticalAlign="middle"
                    height={36}
                    layout="varticle"
                    wrapperStyle={
                        {
                            display: 'flex',
                            flexDirection: 'row',
                        }
                    }
                /> */}
            </PieChart>
        </ResponsiveContainer>
    )
    // // }
    // return (
    //     <div>PieChart</div>
    // )
}

DevicesPieChart.propTypes = {}

export default DevicesPieChart