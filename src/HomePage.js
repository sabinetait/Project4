import { Link } from 'react-router-dom';
import { useState } from 'react/cjs/react.development';

const HomePage = (props) => {
    // let [cityChoice, setCityChoice] = useState("");
    const handleSubmit = (event) => {
        event.preventDefault();
    }
    // let passedProps = props.passedProps
    // function optionPush(props) {
    //     props.passedProps = document.querySelector("#citySelect option:checked").value;
    //     console.log(props.passedProps);
    // }

    // const handleClick = () => {
    //     console.log("it's working!");

    // }
        
    return (
        <div className='wrapper'>
            <h1>Bite-Size Traveling</h1>
            <div>

                <form onSubmit={handleSubmit}>
                    <select id="citySelect">
                        <option disabled>Choose a city</option>
                        <option value="toronto">Toronto</option>
                        {/* <option value="newYork">New York</option> */}
                        <option value="Vancouver">Vancouver</option>
                    </select>
                    <Link to="/restaurant-search"><button onClick={props.changeState}>Click Here</button></Link >
                </form>

                {/* <Link to="/restaurant-search"><button>Create a new trip</button></Link>
                <button>Choose an existing trip</button> */}
            </div>
        </div>
    );
};

export default HomePage;