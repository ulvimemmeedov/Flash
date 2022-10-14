import React from 'react';

interface propsType {
    message: string;
}

function Index(props: propsType) {
    return (
        <div>
            <h1>Hello {props.message}</h1>
        </div>
    );
}
export default Index;
