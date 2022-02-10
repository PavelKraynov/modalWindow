import React, { useState, useRef } from "react";
import Button from "../UI/Button";
import ErrorModal from '../UI/ErrorModal'
import Card from "../UI/Card";

import classes from './AddUser.module.css'

function AddUser(props) {
  const [error, setError] = useState('')

 const nameInputRef = useRef()
 const ageInputRef = useRef()

  const addSubmitHendelr = (e) => {
    e.preventDefault();
    const enteredNameRef = nameInputRef.current.value
    const enteredAgeRef = ageInputRef.current.value
    if (
      enteredNameRef.trim().length === 0 ||
      enteredAgeRef.trim().length === 0
    ) {
      return setError({
        title: "Invalid input name",
        message: "Please enter a valid name.",
      });
    }
    if (+enteredAgeRef < 5 || +enteredAgeRef > 150) {
      return setError({
        title: "Invalid age",
        message: "Please enter a valid age.",
      });
    }
    props.onUserHundler(enteredNameRef, enteredAgeRef);
     nameInputRef.current.value = ''
     ageInputRef.current.value = ''
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
          <input id="username" type="text" ref={nameInputRef} />
          <label htmlFor="userage">Age</label>
          <input id="userage" type="number" ref={ageInputRef} />
          <Button type="submit">Add user</Button>
        </form>
      </Card>
    </div>
  );
}

export default AddUser;
