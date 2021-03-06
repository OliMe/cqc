import React, { Component } from 'react'
import Autocomplete from 'react-autocomplete'

/**
 * Компонент выбора города в заголовке блока с доставками.
 */
class SettlementForm extends Component {
  /** @inheritDoc */
  constructor(props) {
    super(props)
    this.state = {
      isField: false,
      value: props.name,
      oldValue: props.name,
    }
  }

  /**
   * Возвращает компонент поля для ввода списка.
   * @returns {ReactElement} Компонент поля для ввода списка
   */
  renderField() {
    return (
      <div className='container'>
        <label>Your city:</label>&nbsp;
        <Autocomplete
          inputProps={{
            autoComplete: 'nope',
            onBlur: () => this.setState({ isField: false }),
          }}
          renderMenu={items => (
            <ul className='b-popup' children={items} />
          )}
          renderItem={({ name, type, region }, isHighlighted) => (
            <li className={`link link_no-underline${isHighlighted ? ' link_active' : ''}`}>
              {type === 'village' && 'д.'} {name} ({region})
            </li>
          )}
          getItemValue={settlement => settlement.name}
          selectOnBlur
          items={(this.props.settlement && this.props.settlement.list) ? this.props.settlement.list : []}
          value={this.state.value}
          open={this.props.settlement && this.props.settlement.list && Boolean(this.props.settlement.list.length)}
          ref={node => { this.fieldNode = node }}
          onChange={({ target: { value } }) => {
            this.setState({ value })
            if (value.length > 1) {
              this.props.getSettlementList(value)
            }
          }}
          onSelect={(val, settlement) => {
            if (settlement.id !== this.props.currentSettlementId) {
              this.props.setSettlement(settlement)
            }
            this.setState({ value: settlement.name, isField: false })
          }}
        />
      </div>
    )
  }

  /**
   * Обновление названия населенного пункта в поле.
   * @inheritDoc
   */
  componentWillReceiveProps(nextProps) {
    if (nextProps.name && nextProps.name !== this.props.name) {
      this.setState({ value: nextProps.name })
    }
  }

  /** @inheritDoc */
  render() {
    return (
      <div className='b-section_title'>
        {Boolean(this.state.isField) ? this.renderField() : (<div className='container'>
          <span>Your city:</span>&nbsp;
          <span
            className='link link_pseudo'
            onClick={async () => {
              this.props.clearList()
              await this.setState({ isField: true, value: '' })
              await this.fieldNode.focus()
            }}
            children={`${this.props.settlement.current.name || ''}${(this.props.settlement.current.region && ` (${this.props.settlement.current.region})`) || ''}`}
          />
        </div>)}
      </div>
    )
  }
}

export default SettlementForm