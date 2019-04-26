import React from 'react';

// hook 更新粒度更细，代码更清晰
export const AppState = () => {
  const [count, setCount] = React.useState(0);
  return (
    <div>
      <h1>{count}</h1>
      <button onClick={() => setCount(count + 1)}>add count</button>
    </div>
  )
}

const FormState = () => {
  const [formData, setFormData] = React.useState({
    firstName: '',
    lastName: '',
    password: ''
  });
  const updateValue = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }
  const submit = (e) => {
    e.preventDefault();
    console.log(formData)
  }
  const { firstName, lastName, password } = formData;
  return (
    <form>
      <input value={firstName} name='firstName' onChange={e => updateValue(e)} placeholder='first name' />
      <input value={lastName} name='lastName' onChange={e => updateValue(e)} placeholder='lastName' />
      <input type="password" name='password' value={password} onChange={e => updateValue(e)} placeholder='password' />
      <button type="submit" onClick={e => submit(e)}>submit</button>
    </form>
  )
}

export const UserState = () => {
  return (
    <FormState />
  )
}