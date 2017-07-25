import React from 'react';
import { Link } from 'react-router';

import APPCONFIG from 'constants/Config';

import Converter from 'utils/converter'

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
  <div className="box box-default" key={props.key}>
    <div className="box-body">
      <div className="row">
        <div className="col-xl-8">
          <div className="box box-transparent">
            <div className="box-header">{ Converter.camelCasetoTitle(props.type) }</div>
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

    this.dashboardForms = ['LaporDiri']

    try {
      switch(this.props.fungsi) {
        case 'admin':
          this.dashboardForms = ['LaporDiri', 'PermohonanPaspor', 'LaporanKemajuanStudi', 'LaporanKelulusan', 'LaporanKepulangan', 'PemilikBarangPindahan']
          break
        case 'keuangan':
          this.dashboardForms = ['LaporanKepulangan', 'PemilikBarangPindahan']
          break
        case 'dikbud':
          this.dashboardForms = ['LaporDiri', 'LaporanKemajuanStudi', 'LaporanKelulusan' ]
          break
        case 'imigrasi':
          this.dashboardForms = ['LaporDiri', 'PermohonanPaspor', 'LaporanKepulangan']
          break
        default:
          this.dashboardForms = ['LaporDiri', 'LaporanKepulangan']
      }
    } catch(e) {}

    this.dashboardForms.forEach((v) => this.props.getTimeStats(v))
    
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

    if (nextProps.fungsi != this.props.fungsi) {
      console.log('nextProps fungsi', nextProps)
      try {
        switch(nextProps.fungsi) {
          case 'admin':
            this.dashboardForms = ['LaporDiri', 'PermohonanPaspor', 'LaporanKemajuanStudi', 'LaporanKelulusan', 'LaporanKepulangan', 'PemilikBarangPindahan']
            break
          case 'keuangan':
            this.dashboardForms = ['LaporanKepulangan', 'PemilikBarangPindahan']
            break
          case 'dikbud':
            this.dashboardForms = ['LaporDiri', 'LaporanKemajuanStudi', 'LaporanKelulusan' ]
            break
          case 'imigrasi':
            this.dashboardForms = ['LaporDiri', 'PermohonanPaspor', 'LaporanKepulangan']
            break
          default:
            this.dashboardForms = ['LaporDiri', 'LaporanKepulangan']
        }
      } catch(e) {}

      this.dashboardForms.forEach((v) => this.props.getTimeStats(v))
    }
  }

      // <div key="1"><TimeStats title="Lapor Diri" type="LaporDiri" stats={this.props.timeStats} /></div>
      // <div key="2"><TimeStats title="Permohonan Paspor" type="PermohonanPaspor" stats={this.props.timeStats} /></div>
      // <div key="３"><TimeStats title="Laporan Kemajuan Studi" type="LaporanKemajuanStudi" stats={this.props.timeStats} /></div>
      // <div key="4"><TimeStats title="Laporan Kelulusan" type="LaporanKelulusan" stats={this.props.timeStats} /></div>
      // <div key="5"><TimeStats title="Laporan Kepulangan" type="LaporanKepulangan" stats={this.props.timeStats} /></div>
      // <div key="6"><TimeStats title="Barang Pindahan" type="PemilikBarangPindahan" stats={this.props.timeStats} /></div>

  render() {
    return (
  <div className="container-fluid no-breadcrumbs page-dashboard">

    <QueueAnim type="bottom" className="ui-animate">
      {this.dashboardForms.map((v,idx) => (<TimeStats key={idx} type={v} stats={this.props.timeStats} />))}
    </QueueAnim>

  </div>
    );
  }
}

export default Dashboard
