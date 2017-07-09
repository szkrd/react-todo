import {
  ADD_TODO,
  FINISH_TODO,
  FLUSH_FINISHED_TODOS
} from './types'

export const addNow = (text, priority) => ({ type: ADD_TODO, text, priority })

export const add = (text, priority) =>
  (dispatch, getState) => {
    // const { todos } = getState();
    setTimeout(() => {
      dispatch(addNow(text, priority));
    }, 1500);
  }

export const finish = id => ({ type: FINISH_TODO, id })

export const flushFinished = () => ({ type: FLUSH_FINISHED_TODOS })
