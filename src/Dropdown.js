import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import classNames from 'classnames'

const PLACEHOLDER_STRING = 'Select an option'

class Dropdown extends Component {
  constructor (props) {
    super(props)

    this.state = {
      selected: props.value || { label: props.placeholder || PLACEHOLDER_STRING, value: '' },
      isOpen: false
    }
    
    this.mounted = true
    this.handleDocumentClick = this.handleDocumentClick.bind(this)
    this.fireChangeEvent = this.fireChangeEvent.bind(this)
  }

  componentWillReceiveProps (newProps) {
    if (newProps.value && newProps.value !== this.state.selected) {
      this.setState({selected: newProps.value})
    } else if (!newProps.value) {
      this.setState({selected: {
        label: newProps.placeholder || PLACEHOLDER_STRING,
        value: ''
      }})
    }
  }

  componentDidMount () {
    document.addEventListener('click', this.handleDocumentClick, false)
    document.addEventListener('touchend', this.handleDocumentClick, false)
  }

  componentWillUnmount () {
    this.mounted = false
    document.removeEventListener('click', this.handleDocumentClick, false)
    document.removeEventListener('touchend', this.handleDocumentClick, false)
  }

  handleMouseDown (event) {
    if (this.props.onFocus && typeof this.props.onFocus === 'function') {
      this.props.onFocus(this.state.isOpen)
    }
    if (event.type === 'mousedown' && event.button !== 0) return
    event.stopPropagation()
    event.preventDefault()

    if (!this.props.disabled) {
      this.setState({
        isOpen: !this.state.isOpen
      })
    }
  }

  setValue (value, label, icon) {
    let newState = {
      selected: {
        value,
        label,
        icon
      },
      isOpen: false
    }
    this.fireChangeEvent(newState)
    this.setState(newState)
  }

  fireChangeEvent (newState) {
    if (newState.selected !== this.state.selected && this.props.onChange) {
      this.props.onChange(newState.selected)
    }
  }

  renderOption (option) {
    let optionClass = classNames({
      [`${this.props.baseClassName}-option`]: true,
      'is-selected': option === this.state.selected
    })

    let value = option.value || option.label || option
    let label = option.label || option.value || option
    let icon = option.icon

    return (
      <div
        key={value}
        className={optionClass}
        onMouseDown={this.setValue.bind(this, value, label, icon)}
        onClick={this.setValue.bind(this, value, label, icon)}>
        {(() => {
          if (option.icon) {
            return <img src={option.icon} />
          }
        })()}
        {label}
      </div>
    )
  }

  renderGroup(option) {
    return (
      <div className={`${this.props.baseClassName}-title`}>
        <img src={'briefcase.png'} />
        <span>{option.name}</span>
      </div>
    );
  }

  buildMenu () {
    let { options, baseClassName } = this.props
    let ops = options.map((option) => {
      if (option.type === 'group') {
        let _group = this.renderGroup(option)
        let _options = option.items.map((item) => this.renderOption(item))

        return (
          <div className={`${baseClassName}-group`} key={option.name}>
            {_group}
            {_options}
          </div>
        )
      } else {
        return this.renderOption(option)
      }
    })

    return ops.length ? ops : <div className={`${baseClassName}-noresults`}>No options found</div>
  }

  handleDocumentClick (event) {
    if (this.mounted) {
      if (!ReactDOM.findDOMNode(this).contains(event.target)) {
        if (this.state.isOpen) {
          this.setState({ isOpen: false })
        }
      }
    }
  }

  renderSelected() {
    const placeHolderValue = typeof this.state.selected === 'string' ? this.state.selected : this.state.selected.label
    if (this.state.selected !== 'string' && this.state.selected.icon) {
      return (
        <div className={`${this.props.baseClassName}-placeholder`}>
          <img src={this.state.selected.icon} />
          {placeHolderValue}
        </div>
      )
    } else {
      return (
        <div className={`${this.props.baseClassName}-placeholder`}>{placeHolderValue}</div>
      )
    }
  }

  render () {
    const { baseClassName, className } = this.props
    const disabledClass = this.props.disabled ? 'Dropdown-disabled' : ''
    let menu = this.state.isOpen ? <div className={`${baseClassName}-menu`}>{this.buildMenu()}</div> : null

    let dropdownClass = classNames({
      [className]: true,
      [`${baseClassName}-root`]: true,
      'is-open': this.state.isOpen
    })

    return (
      <div className={dropdownClass}>
        <div className={`${baseClassName}-control ${disabledClass}`} onMouseDown={this.handleMouseDown.bind(this)} onTouchEnd={this.handleMouseDown.bind(this)}>
          {this.renderSelected()}
          <span className={`${baseClassName}-arrow`} />
        </div>
        {menu}
      </div>
    )
  }
}

Dropdown.defaultProps = { baseClassName: 'Dropdown' }
export default Dropdown
