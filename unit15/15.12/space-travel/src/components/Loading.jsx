// loading bar to show while fetching data

import React from 'react';

export default function Loading()
{
    return (
        <div id='loading'>Loading...</div>
    );
}

export function showLoading()
{
    // doesn't add element to DOM; just shows it
    let loading = document.getElementById("loading");
    if (loading)
    {
        loading.style.display = "block";
    }
}

export function hideLoading()
{
    let loading = document.getElementById("loading");
    if (loading)
    {
        loading.style.display = "none";
    }
}
