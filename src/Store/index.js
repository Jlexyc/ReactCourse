import { createStore } from 'redux';
import reducer from './Reducers';

const store = createStore(reducer);

const headers = {
    'content-type': 'application/json'
}

// const body = JSON.stringify({ description: "Hello World 3", title: "New Item 3", category:"BEST Category", weight: '99' })


// console.log('body to send: ', body)
//"14270b11-cf3f-4795-94a0-52898e8e85d0"
//"14270b11-cf3f-4795-94a0-52898e8e85d0"

// fetch("http://localhost:8080/goods/14270b11-cf3f-4795-94a0-52898e8e85d0", { method: 'PUT', headers, body }).then((res) => {
//         console.log(res) });

// fetch("http://localhost:8080/goods").then((res) => res.json()).then(res => console.log('res', res));

// fetch("http://localhost:8080/goods").then((res) => res.json()).then(res => {
//     console.log(res)
//     fetch("http://localhost:8080/goods", { method: 'POST', body }).then((res) => {
//         console.log(res)
//         fetch("http://localhost:8080/goods").then((res) => res.json()).then(res => console.log('NEW:', res))
//     })
// })




//"8d784a11-7c8d-4ff5-b30d-c7325846c9d2"

export { store };
