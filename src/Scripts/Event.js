export function Event(props){

    return (<>
      <div className="event">
        <div className="event__title">
          <h2>{props.value}</h2>
        </div>
      </div>
    </>)
  }