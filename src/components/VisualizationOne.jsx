/* global d3 */
import React, { Component } from 'react'
import { BarStackChart } from 'react-d3-basic'

export default class Visualization1 extends Component {

  constructor (props) {
    super(props)

    this.state = {
      data: []
    }
  }

  componentDidMount() {
    fetch('http://localhost:3001/api/v1/visualizations/1').then((res) => {
      return res.json()
    }).then((data) => {
      this.setState({ data })
    })
  }

  render () {
  let title = 'Visualization 1'

  let width = 700
  let height = 300
  let margins = {
    left: 100,
    right: 100,
    top: 10,
    bottom: 50
  }

  let chartSeries = [
    {
          field: 'math_algebra_percent_proficient',
          name: 'PSSA Math',
          color: '#828081'
        },
        {
          field: 'reading_lit_percent_proficient_pssa',
          name: 'PSSA Reading',
          color: '#E9C893'
        },
        {
          field: 'scibio_percent_proficient_pssa',
          name: 'PSSA Sci/Bio',
          color: '#3CC47C'
        }
  ]
  const x = d => {
    return Number(d.pupil_expenditure_total)
  },
  xScale = 'ordinal',
  yScale = 'linear',
  xLabel = 'Pupil Expenditure ($)',
  yLabel = 'Total PSSA Score',
  yTickFormat = d3.format('.2s'),
  xTicks = [5, '$']

    return (
      <BarStackChart
        showXGrid= {true}
        showYGrid= {true}
        margins= {margins}
        title={title}
        width={width}
        height={height}
        chartSeries={chartSeries}
        data={this.state.data}
        x= {x}
        xLabel= {xLabel}
        yLabel = {yLabel}
        xScale= {xScale}
        yScale = {yScale}
        xTicks= {xTicks}
        yTickFormat={yTickFormat}

      />
    )
    console.log(this.state.data)
  }
  }