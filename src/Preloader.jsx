import React, { useState, useEffect } from 'react';

function Preloader() {
    const [loading, setLoading] = useState(false); // Initialize loading to false

    useEffect(() => {
        const hasLoggedIn = sessionStorage.getItem('hasLoggedIn');

        if (!hasLoggedIn) {
            setLoading(true); // Show preloader only if not logged in before
            setTimeout(() => {
                setLoading(false);
                sessionStorage.setItem('hasLoggedIn', 'true');
            }, 5000); // Set duration to 3 seconds
        }
    }, []); // Run only once on component mount

    if (!loading) {
        return null;
    }

    return (
        <div className="fixed top-0 left-0 right-0 bottom-0 bg-black z-50 flex justify-center items-center">
            <div className="flex justify-center items-center">
                <img
                    src="/images/preload.gif" // Ensure this path is correct!
                    alt="Loading..."
                    className="max-w-full max-h-full"
                    style={{ maxWidth: '240px', maxHeight: '135px' }} // Adjust size as needed
                />
            </div>
        </div>
    );
}

export default Preloader;