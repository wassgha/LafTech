import React, { Component } from 'react'
import { Container, Header } from 'semantic-ui-react'
//import * as d3 from 'd3'
import {hierarchy, partition, style} from 'd3-hierarchy'
import {select, selectAll} from 'd3-selection'
import {arc} from 'd3-shape'
import {color} from 'd3-color'

class Visualization2 extends Component {
  constructor (props) {
    super(props)
    this.root = null
    this.state = {
      hovered: null,
      selected: null,
    }
  }

  componentWillMount () {
    fetch('../data/data_02_process.json')
      .then(response => {
        if (response.status !== 200) {
          console.log(`There was a problem: ${response.status}`)
          return
        }
        response.json().then(data => {

          this.root = hierarchy(data)
              .sum(function (d) { return d.size })

          this.setState({
            hovered: null,
            selected: this.root,
            selectedIntact: this.root
          })
        })
      })
  }

  render () {

    if(!this.state.selected){
      return (<div className="visContainer"></div>);
    }
    let radius = Math.min(this.props.width, this.props.height) / 2;

    const colors = {
            'CTC': '#38c742',
            'CS': '#303ce3',
            'PS': '#114183',
            'A': '#259ee7',
            'P': '#7ab6db',
            'B': '#d8d8d8',
            'BB': '#db7712',
            'Math': '#c35b48',
            'Reading': '#e5c027',
            'Writing': '#458962',
            'SciBio': '#125592'
          }

    // Data strucure
    this.state.selected.sum(function (d) { return d.size });
    let partitionGraph = partition().size([2 * Math.PI, radius]);
    partitionGraph(this.state.selected)

    let arcGenerator = arc()
        .startAngle(function (d) { return d.x0 })
        .endAngle(function (d) { return d.x1 })
        .innerRadius(function (d) { return d.y0 })
        .outerRadius(function (d) { return d.y1 });

    let sequenceArray = this.state.hovered != null ? this.getAncestors(this.state.hovered) : [];

    return (

      <div className="visContainer">
        <svg
          className="vis2svg"
          width={ this.props.width }
          height={ this.props.height }
          viewBox={`0 0 ${this.props.width} ${this.props.height}`}
        >
          <g className="vis2"
            transform={"translate(" + this.props.width/2 + "," + this.props.height/2 + ")"}>
            {
              this.state.selected.descendants().map((d,i) => (
                <path
                  key = { `path-${ i }` }
                  display = {function (d) { return d.depth ? null : 'none'; }}
                  d = {arcGenerator(d)}
                  onMouseOver = {() => {this.mouseover(d)}}
                  onClick ={() => {this.onClick(d)}}
                  fill = {color(colors[d.data.name])}
                  opacity = {
                    sequenceArray.indexOf(d) >= 0 ? 1.0 : 0.3
                  }
                />
              ))
            }
          </g>
          <text textAnchor="middle" x={this.props.width/2} y={this.props.height/2 - 30}>
            {this.state.testTopic}
          </text>
          <text textAnchor="middle" x={this.props.width/2} y={this.props.height/2 -10}>
            {this.state.profLevel}
          </text>
          <text textAnchor="middle" x={this.props.width/2} y={this.props.height/2 + 10}>
            {this.state.schoolType}
          </text>
          <text textAnchor="middle" x={this.props.width/2} y={this.props.height/2 + 30}>
            {Math.ceil(this.state.percentage * 100) / 100}
          </text>
        </svg>
      </div>
    )
  }

  getAncestors = (node) => {
    let path = [];
    let current = node;
    while (current.parent) {
      path.unshift(current);
      current = current.parent;
    }
    return path;
  }

  isTopicNode = (d) => {
    return d.height == 2;
  }

  isProficiencyNode = (d) => {
    return d.height == 1;
  }

  isSchoolNode = (d) => {
    return d.height == 0;
  }

  onClick = (d) =>{
    let newRoot = null;
    if(d === this.state.selected){
      if(!this.state.selectedIntact.parent){
        return;
      } else {
        newRoot = this.state.selectedIntact.parent
      }
    } else {
      newRoot = d;
    }
    this.setState({
      selected: newRoot.copy(),
      selectedIntact: newRoot
    })
    this.render()
  }

  mouseover = (d) => {
     if(this.isTopicNode(d)){
       this.setState({
         testTopic: d.data.name,
         percentage: '',
         profLevel: '',
         schoolType: ''
       })
     } else if(this.isProficiencyNode(d)) {
       this.setState({
         testTopic: this.state.selectedIntact.data.name,
         percentage: d.value/this.state.selectedIntact.value,
         profLevel: d.data.name,
         schoolType: ''
       })
     } else if(this.isSchoolNode(d)) {
       this.setState({
         testTopic: this.state.selectedIntact.data.name,
         percentage: d.value/this.state.selectedIntact.value,
         profLevel: d.parent.data.name,
         schoolType: d.data.name
       })
     }
     this.setState({
       hovered: d
     })
     this.render()
   }

}

export default Visualization2