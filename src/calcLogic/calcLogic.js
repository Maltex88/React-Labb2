import React from 'react';
import './calcLogic.css'
import InputField from './Input/Input'


class CalcLogic extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      currentValue: null,
      displayValue: 0,
      savedValue: null,
      firstselectedOperand: "",
      secondselectedOperand: "",
      numberOfCalculations: 0,
      listOfCalculations: [

      ],
      completedCalculations: [

      ],


    }
  }
  handleChanges = (event) => {
    this.setState({
      displayValue: event.target.value,
    })
  }

  operandSelected = (e) => {
    let value
    let addCalculationsList = [...this.state.listOfCalculations];

    if (this.state.currentValue !== null) {

      if (this.state.firstselectedOperand !== "") {
        if (this.state.firstselectedOperand === "+") {
           value = +this.state.currentValue + +this.state.displayValue
        }
        if (this.state.firstselectedOperand === "-") {
           value = +this.state.currentValue - +this.state.displayValue
        }
        addCalculationsList.push([this.state.displayValue, " ", e.target.value, " ",])
        this.setState({
          listOfCalculations: addCalculationsList,
          currentValue: value,
          firstselectedOperand: e.target.value,
          displayValue: 0,
        })
      }

    } else {
      addCalculationsList.push([this.state.displayValue, " ", e.target.value, " "])
      this.setState({
        listOfCalculations: addCalculationsList,
        currentValue: this.state.displayValue,
        firstselectedOperand: e.target.value,
        displayValue: 0,
      })
    }


  }

  calculateValues = () => {
    let currentValue = +this.state.currentValue;
    let displayValue = +this.state.displayValue;
    let firstselectedOperand = this.state.firstselectedOperand;
    let addCalculationsList = [...this.state.listOfCalculations];
    let completedCalculations = [...this.state.completedCalculations];
    let value;
    if (this.state.currentValue !== null) {

      if (firstselectedOperand === "+") {
        value = currentValue + displayValue
      }
      if (firstselectedOperand === "-") {
        value = currentValue - displayValue
      }

      addCalculationsList.push([displayValue, " = ", value])
      completedCalculations.push(<li key={this.state.numberOfCalculations}>{addCalculationsList}</li>)
      this.setState(prevState => ({
        numberOfCalculations:  prevState.numberOfCalculations  +1,
        currentValue: null,
        displayValue: 0,
        listOfCalculations: [],
        completedCalculations: completedCalculations,
        firstselectedOperand: ""
       }))



      console.log('push', this.state.completedCalculations)
    }

  }

  saveState = (e) => {
    if (e.target.value === 'M+') {
      this.setState({

        savedValue: this.state.currentValue,

      })
    } else {
      this.setState({

        displayValue: this.state.savedValue,
      })
    }
  }
  resetValue = () => {
    this.setState({
      displayValue: 0,
      listOfCalculations: [],
      currentValue: null,
      firstselectedOperand: "",

    })
  }

  render() {
    let savedValue;
    let displayValue

    if(this.state.savedValue) {
      savedValue = <p>Your saved value is: {this.state.savedValue}</p>
    } else {
      savedValue = <p>You dont have a saved value, use M+ to save your current value</p>
    }

    if (this.state.displayValue === 0){
      displayValue = ""
    } else {
      displayValue = this.state.displayValue
    }

    return (
      <div className="mainCalculator">
        <InputField
          className="calcDisplay"
          value={this.state.displayValue}
          onChange={this.handleChanges}/>

        <div className="listOfButtons">
          <button onClick={this.operandSelected} value={'+'}>+</button>
          <button onClick={this.operandSelected} value={'-'}>-</button>
          <button onClick={this.calculateValues}value={'='}>=</button>
          <button onClick={this.resetValue} value={'CE'}>CE</button>
          <button  onClick={this.saveState} value={'M+'} >M+</button>
          <button  onClick={this.saveState} value={'M-'} >M-</button>
        </div>
          <p>Current Value: {this.state.currentValue} {this.state.firstselectedOperand} {displayValue}</p>
          <p> Completed Calculations: {this.state.completedCalculations}</p>
          {savedValue}
          <p>Ongoing Calculation: {this.state.listOfCalculations} </p>
      </div>
    )
  }
}

export default CalcLogic;


// {showResults}
// {savedValue}
//









//
// let operandSelected = e.target.value;
// let currentValue = this.state.displayValue;
//
// if (operandSelected === "+") {
//   if (currentValue !== null) {
//     this.setState(prevState => ({
//       currentValue: prevState.currentValue + +currentValue,
//       displayValue: 0,
//       numberOfCalculations: prevState.numberOfCalculations + +1
//     }))
//
//   }
// } else {
//
//   if (currentValue !== null) {
//     if (this.state.numberOfCalculations === 0) {
//       this.setState(prevState => ({
//         currentValue: +currentValue,
//         displayValue: 0,
//         numberOfCalculations: prevState.numberOfCalculations + +1
//       }))
//
//     }
//     else {
//       this.setState(prevState => ({
//         currentValue: prevState.currentValue - +currentValue,
//         displayValue: 0,
//         numberOfCalculations: prevState.numberOfCalculations + +1
//       }))
//     }
//   }
// }
//
// this.setState({
//   selectedOperand: operandSelected,
// })


// // if (currentValue !== 0) {
// //   if (selectedOperand === '-') {
// //     newValue = this.state.currentValue - this.state.displayValue ;
// //   }
// //   if (selectedOperand === '+') {
// //     newValue = +this.state.displayValue + +this.state.currentValue;
// //   }
// let addCalculationsList = [...this.state.completedCalculations];
// let currentValue = this.state.displayValue;
// let newValue;
// let selectedOperand = this.state.selectedOperand;
//
//
// /*this.setState({
// currentValue:  newValue,
// })*/
// addCalculationsList.push([newValue, " "])
//
// } else {
//   addCalculationsList.push([this.state.currentValue, " "])
// }
// this.setState({
//   completedCalculations: addCalculationsList,
//   selectedOperand: "",
//   currentValue: null,
//   displayValue: 0,
//   numberOfCalculations: 0,
// })
// }
//
// resetValue = () => {
//   this.setState({
//     displayValue: 0,
//     currentValue: 0,
//     numberOfCalculations: 0,
//   })
