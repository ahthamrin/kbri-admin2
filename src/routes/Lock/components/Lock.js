import React from 'react'

export const Lock = (props) => (
  <div style={{ margin: '0 auto' }} >
    <h2>Lock: {props.lock}</h2>
    <button className='btn btn-default' onClick={props.increment}>
      Increment
    </button>
    {' '}
    <button className='btn btn-default' onClick={props.doubleAsync}>
      Double (Async)
    </button>
  </div>
)

Lock.propTypes = {
  lock     : React.PropTypes.number.isRequired,
  doubleAsync : React.PropTypes.func.isRequired,
  increment   : React.PropTypes.func.isRequired
}

export default Lock
