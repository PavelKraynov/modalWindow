import React, { useState } from "react";
import Button from "../UI/Button";
import ErrorModal from '../UI/ErrorModal'
import Card from "../UI/Card";

import classes from './AddUser.module.css'

function AddUser(props) {
  const [enteredName, setEnteredName] = useState('')
  const [enteredAge, setEnteredAge] = useState('')
  const [error, setError] = useState('')

  const addSubmitHendelr = (e) => {
    e.preventDefault();
    if (enteredName.trim().length === 0 || enteredAge.trim().length === 0){
      return setError({
        title: 'Invalid input name',
        message: 'Please enter a valid name.'
      })
    }
    if (+enteredAge < 5 || +enteredAge > 150) {
      return setError({
        title: "Invalid age",
        message: "Please enter a valid age.",
      });
    }
    props.onUserHundler(enteredName, enteredAge);
    setEnteredName('')
    setEnteredAge('')
  };

  const onClickEnteredName = (e) => {
    setEnteredName(e.target.value)
  }
  const onClickEnteredAge = (e) => {
    setEnteredAge(e.target.value);
  };

  const deleteHandlerMessage = () => {
    setError(null)
  }
  return (
    <div>
      {error && (
        <ErrorModal
          title={error.title}
          message={error.message}
          deleteHandlerMessage={deleteHandlerMessage}
        />
      )}
      <Card className={classes.input}>
        <form onSubmit={addSubmitHendelr}>
          <label htmlFor="username">Username</label>
          <input
            id="username"
            type="text"
            onChange={onClickEnteredName}
            value={enteredName}
          />
          <label htmlFor="userage">Age</label>
          <input
            id="userage"
            type="number"
            onChange={onClickEnteredAge}
            value={enteredAge}
          />
          <Button type="submit">Add user</Button>
        </form>
      </Card>
    </div>
  );
}

export default AddUser;
