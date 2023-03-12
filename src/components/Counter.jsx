import React, { useState } from 'react'
import { useSelector, selectCount, useDispatch } from 'react-redux'
import './Counter.css'

import {
  increment,
  decrement,
  incrementByAmount,
  decrementByAmount,
} from '../redux/counter/counterSlice'

const Counter = () => {
  const dispatch = useDispatch()
  const [amount, setAmount] = useState(0)

  const count = useSelector((state) => state.counter.value)
  // const { count } = useSelector((state) => state.counter) // same as above
  // const count = useSelector(selectCount) // same as above but using selector function

  const handleAdd = () => {
    dispatch(increment())
  }

  const handleSubtract = () => {
    // dispatches an action to the store without payload
    dispatch(decrement())
  }

  const handleAddByAmount = () => {
    // dispatches an action to the store with the payload of amount
    dispatch(incrementByAmount(amount))
  }

  const handleSubtractByAmount = () => {
    // dispatches an action to the store with the payload of amount
    dispatch(decrementByAmount(amount))
  }

  const handleChange = (e) => {
    setAmount(e.target.value === '' ? 0 : parseInt(e.target.value))
  }

  return (
    <div>
      <h1>Counter</h1>
      <p>
        Counter: <span>{count}</span>
      </p>
      <input type="number" min={0} value={amount} onChange={handleChange} />
      <div className="counter__actions">
        <button onClick={handleAdd}>+</button>
        <button onClick={handleSubtract}>-</button>
        <button onClick={handleAddByAmount}>Add {amount}</button>
        <button onClick={handleSubtractByAmount}>Subtract {amount}</button>
      </div>
    </div>
  )
}

export default Counter
