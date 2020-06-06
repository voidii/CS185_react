import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import * as d3 from 'd3';
import { Row, Form } from 'antd';

import { chartReq} from './actionCreator';
import './Chart.less';

const WIDTH = 1900;
const HEIGHT = 580;
const R = 30;

let simulation;

//https://juejin.im/post/5a5755f46fb9a01cb74e4b2a
//https://console.firebase.google.com/u/0/project/cs185-44683/database/cs185-44683/data?hl=zh-cn
//https://bl.ocks.org/mbostock/950642

class Chart extends Component {
  constructor(props, context) {
    super(props, context);
    this.print = this.print.bind(this);
    this.forceChart = this.forceChart.bind(this);
    this.state = {

    };
  }

  componentWillMount() {
    this.props.dispatch(push('/Chart'));
  }

  componentDidMount() {
    this.print();
  }

  print() {
    let callback = (res) => { // callback获取后台返回的数据，并存入state
      //let nodeData = res.data.nodes;
      //let relationData = res.data.rels;
      //this.setState({
      //  nodeData: res.data.nodes,
      //  relationData: res.data.rels,
      //});
      //let nodes = [];
      //for (let i = 0; i < nodeData.length; i++) {
      //  nodes.push({
      //    id: (nodeData[i] && nodeData[i].id) || '',
      //    name: (nodeData[i] && nodeData[i].name) || '',
      //    type: (nodeData[i] && nodeData[i].type) || '',
      //    definition: (nodeData[i] && nodeData[i].definition) || '',
      //  });
      //}
      //let edges = [];
      //for (let i = 0; i < relationData.length; i++) {
      //  edges.push({
      //    id: (relationData[i] && (relationData[i].id)) || '',
      //    source: (relationData[i] && relationData[i].start.id) || '',
      //    target: (relationData[i] && relationData[i].end.id) || '',
      //    tag: (relationData[i] && relationData[i].name) || '',
      //  });
      //}
      const nodeData = [
        { id: 1, name: '中国' },
        { id: 2, name: '北京' },
        { id: 3, name: '天津' },
        { id: 4, name: '上海' },
        { id: 5, name: '重庆' },
        { id: 6, name: '福建' },
        { id: 7, name: '广东' },
        { id: 8, name: '广西' },
        { id: 9, name: '浙江' },
        { id: 10, name: '江苏' },
        { id: 11, name: '河北' },
        { id: 12, name: '山西' },
        { id: 13, name: '吉林' },
        { id: 14, name: '辽宁' },
        { id: 15, name: '黑龙江' },
        { id: 16, name: '安徽' },
        { id: 17, name: '江西' },
        { id: 18, name: '山东' },
        { id: 19, name: '河南' },
        { id: 20, name: '湖南' },
        { id: 21, name: '湖北' },
        { id: 22, name: '海南' },
        { id: 23, name: '贵州' },
        { id: 24, name: '云南' },
        { id: 25, name: '新疆' },
        { id: 26, name: '西藏' },
        { id: 27, name: '台湾' },
        { id: 28, name: '澳门' },
        { id: 29, name: '香港' },
        { id: 30, name: '陕西' },
        { id: 31, name: '甘肃' },
        { id: 32, name: '青海' },
        { id: 33, name: '内蒙古' },
        { id: 34, name: '宁夏' },
        { id: 35, name: '四川' },
        
        { id: 36, name: '福州' },
        { id: 37, name: '厦门' },
        { id: 38, name: '漳州' },
        { id: 39, name: '莆田' },
        { id: 40, name: '南平' },
        { id: 41, name: '龙岩' },
        { id: 42, name: '三明' },
        { id: 43, name: '宁德' },
        { id: 44, name: '泉州' },
    ];
    let nodes = [];
    for (let i = 0; i < nodeData.length; i++) {
      nodes.push({
        id: (nodeData[i] && nodeData[i].id) || '', // 节点id
        name: (nodeData[i] && nodeData[i].name) || '', // 节点名称
      });
    }
    const relData = [
        { id: 1, source: 1, target: 2, tag: '省份' },
        { id: 2, source: 1, target: 3, tag: '省份' },
        { id: 3, source: 1, target: 4, tag: '省份' },
        { id: 4, source: 1, target: 5, tag: '省份' },
        { id: 5, source: 1, target: 6, tag: '省份' },
        { id: 6, source: 6, target: 36, tag: '地级市' },
        { id: 7, source: 6, target: 37, tag: '地级市' },
        { id: 8, source: 6, target: 38, tag: '地级市' },
        { id: 9, source: 6, target: 39, tag: '地级市' },
        { id: 10, source: 6, target: 40, tag: '地级市' },
        { id: 11, source: 6, target: 41, tag: '地级市' },
        { id: 12, source: 6, target: 42, tag: '地级市' },
        { id: 13, source: 6, target: 43, tag: '地级市' },
        { id: 14, source: 6, target: 44, tag: '地级市' },
        { id: 15, source: 1, target: 7, tag: '省份' },
        { id: 16, source: 1, target: 8, tag: '省份' },
        { id: 17, source: 1, target: 9, tag: '省份' },
        { id: 18, source: 1, target: 44, tag: '省份' },
        { id: 19, source: 1, target: 10, tag: '省份' },
        { id: 20, source: 1, target: 11, tag: '省份' },
        { id: 21, source: 1, target: 12, tag: '省份' },
        { id: 22, source: 1, target: 13, tag: '省份' },
        { id: 23, source: 1, target: 14, tag: '省份' },
        { id: 24, source: 1, target: 15, tag: '省份' },
        { id: 25, source: 1, target: 16, tag: '省份' },
        { id: 26, source: 1, target: 17, tag: '省份' },
        { id: 27, source: 1, target: 18, tag: '省份' },
        { id: 28, source: 1, target: 19, tag: '省份' },
        { id: 29, source: 1, target: 20, tag: '省份' },
        { id: 23, source: 1, target: 21, tag: '省份' },
        { id: 31, source: 1, target: 22, tag: '省份' },
        { id: 32, source: 1, target: 23, tag: '省份' },
        { id: 33, source: 1, target: 24, tag: '省份' },
        { id: 34, source: 1, target: 25, tag: '省份' },
        { id: 35, source: 1, target: 26, tag: '省份' },
        { id: 36, source: 1, target: 27, tag: '省份' },
        { id: 37, source: 1, target: 28, tag: '省份' },
        { id: 38, source: 1, target: 29, tag: '省份' },
        { id: 39, source: 1, target: 30, tag: '省份' },
        { id: 40, source: 1, target: 31, tag: '省份' },
        { id: 41, source: 1, target: 32, tag: '省份' },
        { id: 42, source: 1, target: 33, tag: '省份' },
        { id: 43, source: 1, target: 34, tag: '省份' },
    ];
    let edges = [];
    for (let i = 0; i < relData.length; i++) {
      edges.push({
        id: (relData[i] && (relData[i].id)) || '', // 连线id
        source: relData[i].source, // 开始节点
        target: relData[i].target, // 结束节点
        tag: (relData[i].tag) || '', // 连线名称
      });
    }

      this.forceChart(nodes, edges); // d3力导向图内容
    };
    this.props.dispatch(chartReq({ param: param }, callback));
  }

  // func
  forceChart(nodes, edges) {
    this.refs['theChart'].innerHTML = '';
    
    const simulation = d3.forceSimulation(nodes) // 指定被引用的nodes数组
    .force('link', d3.forceLink(edges).id(d => d.id).distance(150))
    .force('collision', d3.forceCollide(1).strength(0.1))
    .force('center', d3.forceCenter(WIDTH / 2, HEIGHT / 2))
    .force('charge', d3.forceManyBody().strength(-1000).distanceMax(800));

    const svg = d3.select('#theChart').append('svg') // 在id为‘theChart’的标签内创建svg
      .style('width', WIDTH)
      .style('height', HEIGHT * 0.9)
      .on('click', () => {
        console.log('click', d3.event.target.tagName);
      })
      .call(zoom); // 缩放
    const g = svg.append('g'); // 则svg中创建g



    // 函数内其余代码请看下文的**【拆解代码】**
    
    }

      render() {
        return (
          <Row style={{ minWidth: 900 }}>
            <div className="outerDiv">
              <div className="theChart" id="theChart" ref="theChart">
                
              </div>
            </div>
          </Row>
        );
      }
    }

    Chart.propTypes = {
      dispatch: PropTypes.func.isRequired,
    };
    
    function mapStateToProps(state) {
      return {
          
    
      };
    }
    
    const WrappedChart = Form.create({})(Chart);
    export default connect(mapStateToProps)(WrappedChart);