import React from 'react'

export default function Alert(props) {
  const capitalize = (word) => {
    if(word==="danger"){
        word="Error";
    }
    return word.charAt(0).toUpperCase() + word.slice(1);
  }
  return (
    <div style={{ height: '30px' }}>
      {props.alert && <div >
        <div className={`alert alert-${props.alert.type} alert-dismissible fade show`} role="alert">
          <strong>{capitalize(props.alert.type)}</strong>:{props.alert.message}
          <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        </div>
      </div>}
    </div>
    //cannot read properties of the null is the error ...

  )
}
