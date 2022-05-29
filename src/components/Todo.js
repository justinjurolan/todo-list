import React from 'react';
import { ACTIONS } from '../App.js';

export default function Todo({ todo, dispatch }) {
  return (
    <div>
      <div className="pending-list">
        <label>{todo.taskName}</label>
        <div className="img-button">
          {todo.complete === false && (
            <img
              src="https://cdn-icons-png.flaticon.com/512/463/463574.png"
              width="30"
              alt="Check Button"
              onClick={() =>
                dispatch({
                  type: ACTIONS.TOGGLE_TODO,
                  payload: { id: todo.id },
                })
              }
            />
          )}
          {todo.complete === true && (
            <img
              src="https://cdn-icons-png.flaticon.com/512/32/32216.png"
              width="30"
              alt="Undo Button"
              onClick={() =>
                dispatch({
                  type: ACTIONS.TOGGLE_TODO,
                  payload: { id: todo.id },
                })
              }
            />
          )}
          <img
            src="https://cdn-icons-png.flaticon.com/512/2602/2602735.png"
            width="30"
            alt="Delete Button"
            onClick={() =>
              dispatch({ type: ACTIONS.DELETE_TODO, payload: { id: todo.id } })
            }
          ></img>
        </div>
      </div>
    </div>
  );
}
