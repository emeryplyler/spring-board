import React from 'react';

export default function Homepage()
{
    const info = [
        {
            title: "Journey into the Future",
            desc: "In a world where the impossible has become reality, where the stars are no longer out of reach, welcome to the future of humanity's survival and exploration. Witness the evolution of technology as it terraforms barren planets into living havens, all made possible by the wonders of innovation adn human determination."
        },
        {
            title: "From Neglect to Innovation",
            desc: "Once the cradle of civilization, Earth now stands as a solemn reminder of the consequences of neglect and environmental decline. But fear not, for the ingenuity of mankind has soared to new heights. With our relentless persuit of advancement, we have not only healed our scars but extended our reach across the cosmos."
        },
        {
            title: "Enter Space Travel: Where Dreams Take Flight",
            desc: "Embark on an extraordinary journey with our groundbreaking web application, aptly named \"Space Travel.\" As a commander engineer, the fate of humanity's exodus rests in your capable hands. Prepare to face the ultimate challenge: evacuating humankind from their birthplace and guiding them towards a future among the stars."
        },
        {
            title: "Engineer, Explorer, Leader",
            desc: "Space Travel empowers you to engineer, design, and even dismantle spacecraft. Craft vessels that defy the boundaries of imagination, envisioning a future where life flourishes beyond the stars. But remember, your role extends beyond construction - you are a leader, an explorer, a commander steering humanity's destiny."
        }
    ];
    // list?
    return (
        <div>
            {
                info.map((item, index) => (
                    <div key={index}>
                        <h4>{item.title}</h4>
                        <p>{item.desc}</p>
                    </div>
                ))
            }
        </div>
    );
}
