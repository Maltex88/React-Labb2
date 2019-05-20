import React from 'react';
import './calcLogic.css'
import InputField from './Input/Input'
import Button from './Button/Button'

class CalcLogic extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      currentValue: null,
      displayValue: 0,
      savedValue: null,
      selectedOperand: "",
      numberOfCalculations: 0,
      listOfCalculations: [

      ],
      completedCalculations: [

      ],
      operandbuttons: [
        <button value={'+'} >+</button>,
        <button value={'-'} >-</button>,
      ],

    }
  }
  handleChanges = (event) => {
    this.setState({
      displayValue: event.target.value,
    })
  }

  operandSelected = (e) => {
    let operandSelected = e.target.value;
    let currentValue = this.state.displayValue;

    if (operandSelected === "+") {
      if (currentValue !== null) {
        this.setState(prevState => ({
          currentValue: prevState.currentValue + +currentValue,
          displayValue: 0,
          numberOfCalculations: prevState.numberOfCalculations + +1
        }))
      }
    } else {
      this.setState(prevState => ({
        currentValue: prevState.currentValue - +currentValue,
        displayValue: 0,
        numberOfCalculations: prevState.numberOfCalculations + +1
      }))
    }
    this.setState({
      selectedOperand: operandSelected,
    })
    console.log(this.state.numberOfCalculations)
  }

  calculateValues = () => {
    let addCalculationsList = [...this.state.completedCalculations];
    let currentValue = this.state.displayValue;
    let newValue;
    let selectedOperand = this.state.selectedOperand;

    if (currentValue !== 0) {
      newValue = +this.state.displayValue + +this.state.currentValue;

      this.setState({
        currentValue:  newValue,
      })
      addCalculationsList.push([newValue, " "])

      this.setState({
        completedCalculations: addCalculationsList,
        selectedOperand: "",
        currentValue: null,
        displayValue: 0,
        numberOfCalculations: 0,
      })
    } else {
      addCalculationsList.push([this.state.currentValue, " "])
      this.setState({
        completedCalculations: addCalculationsList,
        selectedOperand: "",
        currentValue: null,
        displayValue: 0,
        numberOfCalculations: 0,
      })
    }
  }

  resetValue = () => {
    this.setState({
      displayValue: 0,
      currentValue: 0,
      numberOfCalculations: 0,
    })
  }

  saveState = (e) => {
    if (e.target.value === 'M+') {
      this.setState({
        savedValue: this.state.currentValue
      })
    } else {
      this.setState({
        displayValue: this.state.savedValue
      })
    }
  }

  render() {
    const btnlist = this.state.operandbuttons;
    let calcList = this.state.listOfCalculations;
    let showResults;
    let savedValue;
    //create list of buttons
    const listitem = btnlist.map((btn, index) =>
    <li
    key={btn.key + index}
    value={btn.value}
    onClick={e => this.operandSelected(e, btn.value)}
    >{btn}</li>
    )
    //render based on situation
    if (this.state.numberOfCalculations > 1) {
      showResults = <p> OnGoing Calculation value:{this.state.currentValue}</p>
    } else {
      showResults = <p> OnGoing Calculation value: </p>
    }
    if(this.state.savedValue) {
      savedValue = <p>Your saved value is: {this.state.savedValue}</p>
    } else {
      savedValue = <p>You dont have a saved value, use M+ to save your current value</p>
    }

    return (
      <div>
        <InputField
          value={this.state.displayValue}
          onChange={this.handleChanges}/>

        <div className="listOfButtons">
          <Button value={listitem}/>
          <button onClick={this.calculateValues}value={'='}>=</button>
          <button onClick={this.resetValue} value={'CE'}>CE</button>
          <button  onClick={this.saveState} value={'M+'} >M+</button>
          <button  onClick={this.saveState} value={'M-'} >M-</button>
        </div>
        {showResults}
        {savedValue}
        <p>list of complete calculations: {this.state.completedCalculations} </p>
      </div>
    )
  }
}

export default CalcLogic;
