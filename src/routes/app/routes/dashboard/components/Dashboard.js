import React from 'react';
import { Link } from 'react-router';

import APPCONFIG from 'constants/Config';

import QueueAnim from 'rc-queue-anim';
import KPIsChart from './KPIsChart';
import AquisitionChart from './AquisitionChart';
import StatBoxes from './StatBoxes';
import EngagementStats from './EngagementStats';
import BenchmarkChart from './BenchmarkChart';

const Main = () => (
  <div className="row">
    <div className="col-xl-6">
      <div className="box box-default">
        <div className="box-body">
          <KPIsChart />
        </div>
      </div>
    </div>
    <div className="col-xl-6">
      <div className="box box-default">
        <div className="box-body">
          <AquisitionChart />
        </div>
      </div>
    </div>
  </div>
    );

const TimeStats = (props) => (
  <div className="box box-default">
    <div className="box-body">
      <div className="row">
        <div className="col-xl-8">
          <div className="box box-transparent">
            <div className="box-header">{props.title}</div>
            <div className="box-body">
              <div className="row text-center metrics">
                <div className="col-xs-6 col-md-3 metric-box">
                  <span className="metric">{props.stats.getIn([props.type,'day']) || 0}</span>
                  <span className="metric-info">Hari Ini</span>
                </div>
                <div className="col-xs-6 col-md-3 metric-box">
                  <span className="metric">{props.stats.getIn([props.type,'week']) || 0}</span>
                  <span className="metric-info">Pekan Ini</span>
                </div>
                <div className="col-xs-6 col-md-3 metric-box">
                  <span className="metric">{props.stats.getIn([props.type,'month']) || 0}</span>
                  <span className="metric-info">Bulan Ini</span>
                </div>
                <div className="col-xs-6 col-md-3 metric-box">
                  <span className="metric">{props.stats.getIn([props.type,'year']) || 0}</span>
                  <span className="metric-info">Tahun Ini</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export class Dashboard extends React.Component {
  constructor() {
    super();
    this.state = {
      brand: APPCONFIG.brand
    };
  }

  componentWillMount() {
    console.log('componentWillMount', this.state, this.props)

    if ( !this.props.token ) {
      console.log('should change location');
      setTimeout(() => {
        this.props.router.push('/admin/') // XXX hardwired. See XXX
      }, 10)
    }

    this.props.getTimeStats('LaporDiri')
    this.props.getTimeStats('PermohonanPaspor')
    
  }

  componentWillReceiveProps(nextProps) {

    if (!nextProps.apiLoading && this.props.apiLoading) {
      console.log('componentWillReceiveProps', nextProps, this.props)
      // if (nextProps.token && !this.props.token) {
      //   setTimeout(() => {
      //     this.props.router.push('/app')
      //   }, 10)
      // }

      if (nextProps.apiError && nextProps.apiErrorData) {
        // console.log('error', nextProps.apiErrorData)
        switch (nextProps.apiErrorData.code) {
          case 'no token':
            break

          default:
            this.setState({message:'Maaf, ada masalah dengan sistem.'})
        }
      }

    }
  }

  render() {
    return (
  <div className="container-fluid no-breadcrumbs page-dashboard">

    <QueueAnim type="bottom" className="ui-animate">
      <div key="1"><TimeStats title="Lapor Diri" type="LaporDiri" stats={this.props.timeStats} /></div>
      <div key="2"><TimeStats title="Permohonan Paspor" type="PermohonanPaspor" stats={this.props.timeStats} /></div>
    </QueueAnim>

  </div>
    );
  }
}

export default Dashboard
