import React from 'react';
import ReactEcharts from 'components/ReactECharts';
import CHARTCONFIG from 'constants/ChartConfig';
import SELECTIONS from 'Forms/selections';

const prefectures = [].concat(SELECTIONS.prefecture)
prefectures.shift()

const areaOptions = (pdata) => {

  // if (pdata)
    return {
      tooltip: {
        trigger: 'axis'
      },
      // legend: {
      //   data: ['Acquisition', 'Revenue'],
      //   textStyle: {
      //     color: CHARTCONFIG.color.text
      //   }
      // },
      toolbox: {
        show: false
      },
      calculable: true,
      yAxis: [
        {
          type: 'category',
          data: prefectures,
          axisLabel: {
            textStyle: {
              color: CHARTCONFIG.color.text
            }
          },
          splitLine: {
            lineStyle: {
              color: CHARTCONFIG.color.splitLine
            }
          }
        }
      ],
      xAxis: [
        {
          // max: 100,
          axisLabel: {
            textStyle: {
              color: CHARTCONFIG.color.text
            }
          },
          splitLine: {
            lineStyle: {
              color: CHARTCONFIG.color.splitLine
            }
          },
          splitArea: {
            show: true,
            areaStyle: {
              color: CHARTCONFIG.color.splitArea
            }
          }
        }
      ],
      series: [
        // {
        //   name: 'Acquisition',
        //   type: 'bar',
        //   data: [17, 11, 22, 35, 76, 40, 28, 25],
        //   itemStyle: {
        //     normal: {
        //       color: CHARTCONFIG.color.info
        //     }
        //   },
        //   lineStyle: {
        //     normal: {
        //       color: CHARTCONFIG.color.info
        //     }
        //   },
        //   areaStyle: {
        //     normal: {
        //       color: CHARTCONFIG.color.info
        //     }
        //   },
        //   symbol: 'diamond'
        // },
        {
          // name: 'Revenue',
          type: 'bar',
          min: 47,
          minInterval: 1,
          // barCategoryGap: '30%',
          barGap: '15%',
          data: prefectures.map((d)=> { return (pdata ? pdata.get(d) : 0); }),
          itemStyle: {
            normal: {
              color: CHARTCONFIG.color.success,
              label : {show: true, position: 'inside'}
            }
          },
          lineStyle: {
            normal: {
              color: CHARTCONFIG.color.success
            }
          },
          areaStyle: {
            normal: {
              color: CHARTCONFIG.color.success
            }
          },
          symbol: 'diamond'
        }
      ]
    }

};

const Chart = (props) => (
  <ReactEcharts style={{height: '850px'}} option={areaOptions(props.stats)} showLoading={false} />
);

module.exports = Chart;
