import React from 'react';
import { Link } from 'react-router';

import APPCONFIG from 'constants/Config';

import Converter from 'utils/converter'

import QueueAnim from 'rc-queue-anim';
import PrefecturesChart from './PrefecturesChart';
import AquisitionChart from './AquisitionChart';
import StatBoxes from './StatBoxes';
import EngagementStats from './EngagementStats';
import BenchmarkChart from './BenchmarkChart';

const SelectionChart = (props) => (
  <div className="row">
    <div className="col-xl-10">
      <div className="box box-default">
        <div className="box-header">{props.title}</div>
        <div className="box-body">
          <PrefecturesChart stats={props.stats} />
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

export class DataGraph extends React.Component {
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

    this.dashboardForms.forEach((v) => this.props.getSelectionStats(v, 'almtJpProv', 'prefecture'))


    // this.props.getSelectionStats('LaporDiri', 'almtJpProv', 'prefecture')
    
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

      // <div key="1"><SelectionChart title="Lapor Diri per Provinsi" stats={this.props.selectionStats.get('LaporDiri')} /></div>
      // <div key="2"><SelectionChart title="Permohonan Paspor per Provinsi" /></div>

  render() {
    return (
  <div className="container-fluid no-breadcrumbs with-maxwidth chapter">
    <article className="article">
      <h2 className="article-title">Data Grafik</h2>

    <QueueAnim type="bottom" className="ui-animate">
      {this.dashboardForms.map((v,idx) => (<SelectionChart key={idx} title={Converter.camelCasetoTitle(v)} stats={this.props.selectionStats.get(v)} />))}
    </QueueAnim>
    </article>

  </div>
    );
  }
}

export default DataGraph
