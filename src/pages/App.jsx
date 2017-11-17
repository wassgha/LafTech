import React, { Component } from 'react'
import { Container, Image, Header, Icon, Dropdown, Divider } from 'semantic-ui-react'
import Visualization1 from './Visualization1'
import Visualization3 from './Visualization3'
import Visualization2 from './Visualization2'
import PAMap from './Map'
class App extends Component {
  constructor (props) {
    super(props)
  }

  render () {
    const districtOptions = [ { key: 'AL', value: 'AL', text: 'Alabama' } ]

    return (

      <Container fluid>

        <Container className='index-header' fluid>
          <Container className='content' fluid>
            <Image src='../images/logo.png' className='logo' />
            <Header as='h1' className='title' >LAFTECH PA SCHOOL DATA</Header>
            <Header as='h3' className='hint' >EXPLORE OUR ANALYSIS</Header>
            <Icon name='angle down' size='huge' className='down' />
          </Container>
        </Container>

        <Container className='district-section' fluid>
          <Header as='h2' className='hint' >TYPE SCHOOL / DISTRICT NAME</Header>
          <Dropdown placeholder='Select a school / district'
          search selection options={districtOptions} className='district-filter'/>
          <Divider horizontal className='or' >Or</Divider>
          <Header as='h2' className='hint' style={{marginTop: '30px'}} >SELECT DISTRICT FROM MAP</Header>
          <PAMap width='960' height='600' />
        </Container>

        {/*
        <Container className='analysis-section' fluid>
          <Visualization1 />
        </Container>
        <Container className='analysis-section' fluid>
          <Visualization3 />
        </Container>
        */}
        <Container className = 'analysis-section' fluid>
          <Visualization2 />
        </Container>
      </Container>
    )
  }
}

export default App
