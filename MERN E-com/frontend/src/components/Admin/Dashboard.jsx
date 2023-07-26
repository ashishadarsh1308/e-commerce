import React from 'react';
import Sidebar from './Sidebar.jsx';
import './Dashboard.css';
import { Link } from 'react-router-dom';
import ReactApexCharts from 'react-apexcharts';

const Dashboard = () => {
    const lineState = {
        options: {
            chart: {
                id: 'line-chart',
            },
            xaxis: {
                categories: ['Initial Amount', 'Amount Earned'],
            },
            colors: ['#f23d56'],
            dataLabels: {
                enabled: true,
            },
        },
        series: [
            {
                name: 'TOTAL AMOUNT',
                data: [0, 3455],
            },
        ],
    };

    const donutChartData = {
        options: {
            labels: ['Out of Stock', 'In Stock'],
            colors: ['#f23d56', '#00A6B4'],
        },
        series: [75, 235],
    };

    return (
        <div className='dashboard'>
            <Sidebar />
            <div className='dashboardContainer'>
                <h1>Dashboard</h1>
                <div className='dashboardSummary'>
                    <div>
                        <p>
                            Total Amount <br /> ₹1233
                        </p>
                    </div>
                    <div className='dashboardSummaryBox2'>
                        <Link to='/admin/products'>
                            <p>Product</p>
                            <p>2343</p>
                            {/* <p>{products && products.length}</p> */}
                        </Link>
                        <Link to='/admin/orders'>
                            <p>Orders</p>
                            <p>43212</p>
                            {/* <p>{orders && orders.length}</p> */}
                        </Link>
                        <Link to='/admin/users'>
                            <p>Users</p>
                            <p>123</p>
                            {/* <p>{users && users.length}</p> */}
                        </Link>
                    </div>
                </div>

                <div className='lineChart'>
                    <ReactApexCharts
                        options={lineState.options}
                        series={lineState.series}
                        type='line'
                        height={350}
                    />
                </div>

                <div className="donutChart">
                    <ReactApexCharts
                        options={donutChartData.options}
                        series={donutChartData.series}
                        type="donut"
                        height={350}
                    />
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
