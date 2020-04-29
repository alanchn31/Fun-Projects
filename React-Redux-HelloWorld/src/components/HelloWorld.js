import React from 'react';

function displayHelloWorld(pressedTrueFalse){
    console.log(pressedTrueFalse)
    if (pressedTrueFalse) { return <div>Hello World!</div> }
}

function click(props){
    props.fetchHello()
    console.log(props.pressbutton.buttonPressed)
}

class HelloWorld extends React.Component{
    

    componentDidMount(){
        console.log(this.props)
    }

    render(){
        return(
            <div>
            <button type="button" onClick = {() => {click(this.props)}}>Press Me</button>
            {displayHelloWorld(this.props.pressbutton.buttonPressed)}
            </div>
        );
    }
}

export default HelloWorld;