import React, { Component } from 'react';
import Link_Search from './Movie_node_add'
import * as firebase from 'firebase';
import config from './config';
var d3 = require("d3");

if (!firebase.apps.length) {
  firebase.initializeApp(config)
} 

function uniqueArray(array, key){
  if(array === null){return array;}
  var result = [array[0]];
  for(var i = 1; i < array.length; i++){
    var item = array[i];
    var repeat = false;
    if(item === undefined){continue;}
    for (var j = 0; j < result.length; j++) {
      
      if (item[key] === result[j][key]) {
        repeat = true;
        break;
      }
    }
    if (!repeat) {
      result.push(item);
    }
  }
  return result;
}

let data = {};

class Links extends Component{

  constructor( props ){
    super( props );
    this.state = {
      movie: [],
      nodes: [],
      edges: []
    };
  }

  setData(){
    let nodes = [];
    let edges = [];

    for (let i = 0; i < this.state.movie.length; i++) {


      nodes.push({
        id: this.state.movie[i].IMDBID,
        poster: this.state.movie[i].Poster,
        name: this.state.movie[i].Title || '',
        type: 'movie' || '',
      });

      for(var j = 0 ; j < this.state.movie[i].Actors.length; j++)
      { 
        nodes.push({
          poster: '',
          name: this.state.movie[i].Actors[j] || '',
          type: 'Actor' || '',
        });
        
        edges.push({
          source: this.state.movie[i].Actors[j] || '',
          target: this.state.movie[i].Title || '',
          value: 1,
        });
      }
    }
    nodes = uniqueArray(nodes, 'name')
    console.log(edges);
    this.setState({
      nodes: nodes,
      edges: edges
    }, () => {this.render_result()})
  }

  getUserData () {
    let ref = firebase.database().ref('/GraphViz');
    ref.on('value', snapshot => {
      if(snapshot.val() === null) return;
      const movies = snapshot.val();
      console.log(movies);
      this.setState({
        movie: movies,
      }, () => {this.setData()});
    });
    console.log('Movie DATA RETRIEVED');
  }


  drag = (simulation) => {
    function dragStarted(d){
      if (!d3.event.active) simulation.alphaTarget(0.3).restart();
      d.fx = d.x;
      d.fy = d.y;
    }

    function dragged(d){
      d.fx = d3.event.x;
      d.fy = d3.event.y;
    }

    function dragEnded(d){
      if(!d3.event.active) simulation.alphaTarget(0);
      d.fx = null;
      d.fy = null;
    }

    return d3.drag()
      .on("start", dragStarted)
      .on("drag", dragged)
      .on("end", dragEnded);
  }



  chart(nodes, links){
    const width = 1920;
    const height = 1080;

    const obj_links = links.map(d => Object.create(d));
    const obj_nodes = nodes.map(d => Object.create(d));

    const svg = d3.create("svg")
      .attr("viewBox", [0,0,width,height]);
    
    const link = svg.append("g")
      .attr("stroke", "black")
      .attr("stroke-opacity", 0.6)
      .selectAll("line")
      .data(obj_links)
      .join("line")
      .attr("stroke-width", d => Math.sqrt(d.value));

    const color = (node) => {
      if(node.type == 'movie')
        return d3.color("steelblue");
      return d3.color("pink");
    }
    const radius = (node) => {
      if(node.type == 'movie')
        return 60;
      return 25;
    }

    const simulation = d3.forceSimulation(obj_nodes)
      .force('link', d3.forceLink().links(links).id(d => {return d.name}).distance(200))
      .force('collision', d3.forceCollide(1).strength(0.1))
      .force('center', d3.forceCenter(width / 2, height / 2))
      .force('charge', d3.forceManyBody());

      const img = (node) => {
        if(node.type == 'movie') {
            defs.append('pattern')
                .attr('id', 'id' + node.id)
                .attr('patternUnits', 'objectBoundingBox')
                .attr('width', 1.2)
                .attr('height', 1.2)
                .append('image')
                .attr('xlink:href', node.poster)
                .attr('width', 225)
                .attr('height', 225)
                .attr('x', -40)
                .attr('y', -20)
            return 'url(#id' + node.id + ')'
        }
        return d3.color(" #FFA07A")
    }
    var defs = svg.append('defs')


  const node = svg.append("g")
    .attr("stroke", "#fff")
    .attr("stroke-opacity", 1.5)
    .selectAll(".node")
    .data(obj_nodes)
    .join("circle")
    .attr("r", radius)
    .attr("fill", img)
    .call(this.drag(simulation))
    .on('mouseover', function(d) {
      if(d.type == 'Actor') { 
          svg.append('text')
              .attr('stroke', 'black')
              .text(d.name)
              .attr('x', d3.select(this).attr("cx") + 10)
              .attr('y', d3.select(this).attr("cy") + 10)
      }
  })
  .on('mouseout', function(d) {
      if(d.type == 'Actor') {
          d3.select('text').remove();
      }
  });

   

  node.append("title")
    .text(function(d) {
        return d.name;
    });
    var defs = svg.append('svg:defs');


    simulation.on('tick', () => {
      link 
        .attr("x1", d => d.source.x)
        .attr("y1", d => d.source.y)
        .attr("x2", d => d.target.x)
        .attr("y2", d => d.target.y);
      
      node
        .attr("cx", d => d.x)
        .attr("cy", d => d.y);

    });
    
    
    return svg.node();
  }

  render_result(){
    const elem = document.getElementById("mysvg");
    console.log(this.state.nodes)
    elem.appendChild(this.chart(this.state.nodes, this.state.edges));
  }

  componentDidMount(){
    this.getUserData();
  }

  render(){
    return (
      <div id = "mysvg">
        <Link_Search/>
      </div>
    );
  }



}export default Links;