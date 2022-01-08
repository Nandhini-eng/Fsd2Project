import React from 'react';

//Functional Component for displaying Loading Icon while data is fetching from server.
export const Loading = () => {
    return (
        <div className="col-12">
            <span className="fa fa-spinner fa-pulse fa-3x fa-fw text-primary"></span>
            <p>Loading . . .</p>
        </div>
    );
};