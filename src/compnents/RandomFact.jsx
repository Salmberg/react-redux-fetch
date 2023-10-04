import { useDispatch, useSelector } from "react-redux";
import { STATUS, actions } from "../features/randomFact";   

const RandomFact = () => {
    const factObject = useSelector(state=> state.randomFact);

    const dispatch = useDispatch();

    let content = null;
    if ( factObject.status == STATUS.NORMAL) {
        content = 'Redo att hämta?';
    } else if ( factObject.status == STATUS.FETCHING) {
        content = 'Hämtar...';
    } else if ( factObject.status == STATUS.SUCCES) {
        content = factObject.fact;
    } else if ( factObject.status == STATUS.FAILURE) {  
        content = 'Något gick fel...';
    }

    

    return (
        <div>
            <button onClick={() => fethcFact(dispatch)}> Get Fact!</button>
          <p>
            {content}
          </p>
        </div>
    )
}

async  function fethcFact(dispatch) {
    dispatch(actions.isFetching());

    const URL = 'https://uselessfacts.jsph.pl/random.json?language=en';

    try {
    let response = await fetch(URL);
    let json = await response.json();
    let fact = json.text;
    //simulera ett delay
    setTimeout(() => {
    dispatch(actions.succes(fact));
    }, 2000);
    } catch {
        dispatch(actions.failure());
    }


}

export default RandomFact;