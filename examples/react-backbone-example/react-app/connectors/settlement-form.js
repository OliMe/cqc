import React, { Component } from 'react'
import SettlementForm from '../components/settlement-form'
import { connect } from 'react-redux'
import { Creators as SettlementAction } from '../redux/settlement'

export class SettlementFormConnector extends Component {
    /** @inheritDoc */
    componentWillMount () {
      this.init()
    }
  
    /** @inheritDoc */
    init () {
      this.props.getSettlementList()
    }
  
    /** @inheritDoc */
    render () {
      return (<SettlementForm {...this.props} />)
    }
  }
  /** @inheritDoc */
  const mapDispatchToProps = dispatch => {
    return {
      getSettlementList: (name, id) => dispatch(SettlementAction.request(name, id)),
      setSettlement: (settlement) => dispatch(SettlementAction.setCurrent(settlement)),
    }
  }
  /**
   * Search settlement by ID in list 
   * @param {Array} list List of settlements 
   * @param {number} id Settlement ID
   */
  const getSettlement = (list, id = 0) => {
    let result = list[id]
    if (id) {
      result = list.find(value => value.id = id)
    }
    return result
  }
  /** @inheritDoc */
  const mapStateToProps = state => ({
    ...state,
    ...{ 
      current: state.current || getSettlement(state.list),
    },
  })
  
  export default connect(mapStateToProps, mapDispatchToProps)(SettlementFormConnector)