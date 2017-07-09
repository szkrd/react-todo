import { pick } from 'lodash'
import {
  ADD_TODO,
  FINISH_TODO,
  FLUSH_FINISHED_TODOS
} from '../actions/types'

const LS_KEY = 'react-todo-store--todos'
const offlineStore = JSON.parse(localStorage.getItem(LS_KEY) || 0)

// the default state of the todos section
const initialState = offlineStore || []

let lastId = 0;

export default function (state = initialState, action) {
  const { type } = action
  let ret;

  // add
  if (type === ADD_TODO) {
    ret = [
      {
        ...pick(action, ['text', 'priority']),
        id: lastId++
      },
      ...state
    ]
  }

  // finish
  if (type === FINISH_TODO) {
    let { id } = action;
    ret = state.map(
      item => item.id === id ? Object.assign(item, {done: true}) : item // do we need an extra {} in assign?
    )
  }

  // flush
  if (type === FLUSH_FINISHED_TODOS) {
    ret = state.filter(item => !item.done)
  }

  if (ret) {
    localStorage.setItem(LS_KEY, JSON.stringify(ret))
  }

  return ret || state;
}
