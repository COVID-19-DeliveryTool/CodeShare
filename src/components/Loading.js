import React from 'react'

export default function Loading(){
    return (
        <div className="text-center my-4 loading">
            <h5>Loading...</h5>
            <div className="spinner-border" role="status">
                <span className="sr-only">Loading...</span>
            </div>
        </div>
    )
}