import { createAction } from '@reduxjs/toolkit';
import { createReducer } from '@reduxjs/toolkit';



const isFetching = createAction('is fetching');
const succes = createAction('succes');
const error = createAction('error');

const actions = { isFetching, succes, error };

const STATUS = {
    NORMAL : 'normal',
    FETCHING : 'is fetching',
    SUCCES : 'succes',
    FAILURE : 'failure'
}

const initialState = {
    status : STATUS.NORMAL,
    fact : null
};

const reducer = createReducer(initialState, builder => {
    builder
     .addCase(isFetching, (state, action) => {
         let newState = {
            status : STATUS.FETCHING,
            fact : state.fact
         }
         return newState;
     })

        .addCase(succes, (state, action) => (
             {
                status : STATUS.SUCCES,
                fact : action.payload
            }
        ))
        .addCase(error, (state, action) => (
            {
                status : STATUS.FAILURE,
                fact : null
            }
        ))

    })



export { actions, reducer, STATUS};