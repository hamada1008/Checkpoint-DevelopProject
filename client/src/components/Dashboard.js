import React from 'react';
import Navbar from './Navbar'
import ServiceCard from './ServiceCard';
import Reservation from './Reservation';



const Dashboard = () => {
    return (
        <div>
            <Navbar button1="Edit profile" button2="Logout" />
            <div>
                <Reservation />
            </div>
            <ServiceCard nannyType="Nanny In" />
            <ServiceCard nannyType="Nanny Out" />

        </div>
    )
}

export default Dashboard
