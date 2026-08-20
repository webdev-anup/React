import React from 'react';
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import './index.css'
import App from './App.jsx'

function MyApp() {
    return (
        <div>
            <h1>Custom App | Chai</h1>
        </div>
    )
}

// const ReactElement = {
//     type: 'a',
//     props: {
//         href: 'https://google.com',
//         target: '_blank'
//     },
//     children: 'Click me to visit Google'
// };

const anotherElement = (
    <a href="https://google.com" target="_blank">
     visit Google
    </a>
);

const anotherUser = "chai aur react"

const reactElement = React.createElement(
    'a',
    { href: 'https://google.com', target: '_blank' },
    'click me to  Google',
    anotherUser
);

createRoot(document.getElementById('root')).render(

    reactElement
);


