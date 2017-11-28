import React, { Component } from 'react'
import { browserHistory } from 'react-router'
import { Container, Header, Dropdown, Divider } from 'semantic-ui-react'

import StateMap from './StateMap'
import Vis1Explanation from '../components/Vis1Explanation'
import Vis2Explanation from '../components/Vis2Explanation'
import Vis3Explanation from '../components/Vis3Explanation'
import Visualization1 from '../components/VisualizationOne'
import Visualization2 from '../components/VisualizationTwo'
import Visualization3 from '../components/VisualizationThree'

class Landing extends Component {
  constructor (props) {
    super(props)
    this.state = {
      countyList: []
    }
  }

  componentWillMount() {
    fetch('http://localhost:3001/api/v1/county/list')
    .then(res => res.json())
    .then(data => {
      const countyList = data.map((d) => {
          return {
            key: d,
            value: d,
            text: d
          }
        })
      this.setState({ countyList })
    })
  }

  changeCounty = (county) => {
    browserHistory.push(`/county/${county}`)
  }

  render () {

    return (

      <Container fluid>

        <Container className='district-section' fluid>
          <Header as='h2' className='hint' >TYPE COUNTY NAME</Header>
          <Dropdown
            placeholder='Select a county'
            search
            selection
            options={this.state.countyList}
            className='district-filter'
            onChange={(e, d) => { this.changeCounty(d.value) }}
          />
          <Divider horizontal className='or' >Or</Divider>
          <Header as='h2' className='hint' style={{marginTop: '30px'}} >SELECT COUNTY FROM MAP</Header>
          <StateMap onChange={this.changeCounty}  />
        </Container>

        <Container className='analysis-section' fluid>
          <Vis1Explanation />
          <Visualization1 />
        </Container>

        <Container className='analysis-section' fluid>
          <Visualization2 width={700} height={400} />
        </Container>

        <Container className='analysis-section' fluid>
          <Vis3Explanation />
          <Visualization3 />
        </Container>

      </Container>
    )
  }
}

export default Landing
