import './styles/Loading.css'
class Loading extends React.Component {
  render(){
    return (
      // style={{color: "red", position: "absolute", top: "300px"}}
      <div>
        <div className="spinner"></div>
      </div>
    )
  }
}

export default Loading


// TODO make this into a VS code JSX template