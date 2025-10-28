// display all spacecraft

import React, { useContext, useEffect, useState } from 'react';
import SpaceTravelApi from '../services/SpaceTravelApi';
import Loading, { showLoading, hideLoading } from '../components/Loading';
import { Link } from 'react-router-dom';
import { SpaceTravelContext } from '../context/SpaceTravelContext';

export default function Spacecrafts()
{
    // const [spacecrafts, setSpacecrafts] = useState([]);
    const spacecrafts = useContext(SpaceTravelContext).crafts;

    // async function getSpacecrafts()
    // {
    //     showLoading(); // change to loading message
    //     let res = await SpaceTravelApi.getSpacecrafts();
    //     if (res.isError)
    //     {
    //         console.error("Couldn't fetch list of spacecraft");
    //     }
    //     else
    //     {
    //         setSpacecrafts(res.data);
    //     }
    //     hideLoading();
    // }

    // useEffect(() => { getSpacecrafts(); }, []);
    // TODO: do spacecraft update automatically because they're stateful, or do they need to be in the dependency list here?

    // TODO: add onclick event to take user to specific spacecraft's page by id
    return (
        <div>
            Spacecrafts
            {
                spacecrafts.map((spacecraft, index) => (
                    <Link key={index} to={`/ships/${spacecraft.id}`}>{spacecraft.name}</Link>
                ))
            }
        </div>
    );
}
