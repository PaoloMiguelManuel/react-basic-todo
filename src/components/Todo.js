import React from 'react'

function Todo({ todo }) {
    return (
        <div>
            <label>
            <input type="checkbox" checked={todo.complete}></input>
            {todo.name}


            </label>
        </div>
    )
}

export default Todo
