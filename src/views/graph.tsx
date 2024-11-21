// InfoContent.js
import React, { useState } from 'react';
import Box from '@mui/material/Box';
import { LineChart } from '@mui/x-charts/LineChart';
import { Card, CardHeader, CardContent, Typography, Grid2, Button, ButtonGroup } from '@mui/material';
import { LineGraph } from '../components/Line';

export const GraphPage = () => {
    const xLabels = [
        'JAN',
        'FEB',
        'MAR',
        'APR',
        'MAY',
        'JUN',
        'JUL',
        'AUG',
        'SEP',
        'OCT',
        'NOV',
        'DEC',
    ];

    const getRandomData = () => Array.from({ length: 12 }, () => Math.floor(Math.random() * (5000 - 1000 + 1)) + 1000);

    const database = {
        data1: {
            regionEJ: getRandomData(),
            regionCJ: getRandomData(),
            regionBN: getRandomData(),
        },
        data2: {
            regionEJ: getRandomData(),
            regionCJ: getRandomData(),
            regionBN: getRandomData(),
        },
        data3: {
            regionEJ: getRandomData(),
            regionCJ: getRandomData(),
            regionBN: getRandomData(),
        },
    };

    const [activeDataKey, setActiveDataKey] = useState<string>('data1');
    const [data, setData] = useState(database.data1); // Set the default data
      
    const handleDataChange = (key: string) => {
      setActiveDataKey(key);
      setData(database[key as keyof typeof database]); // Set the selected data
    };
    const options = {}

    return (
        <div>
        <Card className='card-chart' sx={{margin: 2, boxShadow: 5}}>
            <CardContent>
                <Grid2 container alignItems={"center"} justifyContent={"space-between"}>
                    <Grid2 size={{xs:6}}>
                        <Typography variant='subtitle1'>Total Revenue</Typography>
                        <Typography variant='h5'>Performance</Typography>
                    </Grid2>
                    <Grid2 textAlign={"right"}>
                        <ButtonGroup>
                            <Button
                                variant={activeDataKey === 'data1' ? "contained" : "outlined"}
                                onClick={() => handleDataChange('data1')}
                                color="primary"
                                size="small"
                            >
                                <Typography>Revenue</Typography>
                            </Button>
                            <Button
                                variant={activeDataKey === 'data2' ? "contained" : "outlined"}
                                onClick={() => handleDataChange('data2')}
                                color="primary"
                                size="small"
                            >
                                <Typography>Profitability</Typography>
                            </Button>
                            <Button
                                variant={activeDataKey === 'data3' ? "contained" : "outlined"}
                                onClick={() => handleDataChange('data3')}
                                color="primary"
                                size="small"
                            >
                                
                                <Typography>OPEX</Typography>
                            </Button>
                        </ButtonGroup>
                    </Grid2>
                </Grid2>
                <LineChart
                    height={300}
                    series={[
                    { data: data.regionEJ, label: 'East Java' },
                    { data: data.regionCJ, label: 'Central Java' },
                    { data: data.regionBN, label: 'Bali Nusra' },
                    ]}
                    xAxis={[{ scaleType: 'point', data: xLabels }]}
                />
                {/* <LineGraph options={options}/> */}
            </CardContent>
        </Card>
        <Grid2 container >
            <Grid2 size={{xs:12, sm:12, md:6, lg:6}}>
                <Card className='card-chart' sx={{margin: 2, boxShadow: 5}}>
                    <CardHeader title="Payload Performance" />
                    <CardContent>
                        <Typography>LINE GRAPH FOR PAYLOAD</Typography>
                    </CardContent>
                </Card>
            </Grid2>
            <Grid2 size={{xs:12, sm:12, md:6, lg:6}}>
                <Card className='card-chart' sx={{margin: 2, boxShadow: 5}}>
                    <CardHeader title="User Performance" />
                    <CardContent>
                        <Typography>LINE GRAPH FOR USER</Typography>
                    </CardContent>
                </Card>
            </Grid2>
        </Grid2>
        </div>
    );
};
