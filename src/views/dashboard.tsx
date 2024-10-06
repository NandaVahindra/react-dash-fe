import React, { useState } from 'react';
import Box from "@mui/material/Box";
import { MuiSelect } from "../components/MuiSelect";
import { DashboardBox } from "../components/dashboardBox";
import Grid from '@mui/material/Grid2';
import { CardPrimary } from "../components/CardPrimary";
import { Button } from '@mui/material';
import { useTheme } from '@mui/material';

export const DashboardPage = () => {
    const [month, setMonth] = useState('');
    const [category, setCategory] = useState('');
    const [action, setAction] = useState('');

    // Options for Category, Month, and Action
    const categoryOptions = [
        { value: 10, label: 'Ten' },
        { value: 20, label: 'Twenty' },
        { value: 30, label: 'Thirty' },
    ];
    
    const monthOptions = [
        { value: 1, label: 'January' },
        { value: 2, label: 'February' },
        { value: 3, label: 'March' },
    ];

    const actionOptions = [
        { value: 1, label: 'January' },
        { value: 2, label: 'February' },
        { value: 3, label: 'March' },
    ];

    const theme = useTheme();
    const backgroundColor = theme.palette.mode === 'light' ? 'white' : '#1a2232';
    const textColor = theme.palette.mode === 'light' ? 'grey.900' : 'white';
    const revenue = [
        { desc: 'Revenue', value: '6.7 Bio' },
        { desc: 'Profitability', value: '4.9 Bio' },
        { desc: 'OPEX', value: '2.2 Bio'}
    ];
    const payload = [
        { desc: '', value: '2.304 PB' },
    ];

    return (
        <Box sx={{ p: 3 }}>
            {/* Top Filters */}
            <Grid container spacing={2} mb={4}>
                <Grid>
                    <MuiSelect
                        label="Month"
                        value={month}
                        options={monthOptions}
                        onChange={(event) => setMonth(event.target.value)}
                        helperText=""
                    />
                </Grid>
                <Grid>
                    <MuiSelect
                        label="Event Category"
                        value={category}
                        options={categoryOptions}
                        onChange={(event) => setCategory(event.target.value)}
                        helperText=""
                    />
                </Grid>
                <Grid>
                    <MuiSelect
                        label="Action"
                        value={action}
                        options={actionOptions}
                        onChange={(event) => setAction(event.target.value)}
                        helperText=""
                    />
                </Grid>
                <Grid container spacing={3}>
                    <Button variant="contained" sx={{ height: '100%', color: textColor, backgroundColor: backgroundColor, borderRadius: 2, boxShadow: 3, textTransform: 'none', fontWeight: 'bold', fontSize:16,
                        transition: 'transform 0.1s ease-in-out',  // Smooth transition effect
                        '&:hover': {
                          transform: 'scale(1.1)',
                          boxShadow: 6,     
                        }
                    }}>Apply</Button>
                    <Button variant="contained" sx={{ height: '100%', color: textColor, backgroundColor: backgroundColor, borderRadius: 2, boxShadow: 3, textTransform: 'none', fontWeight: 'bold', fontSize:16,
                        transition: 'transform 0.1s ease-in-out',  // Smooth transition effect
                        '&:hover': {
                          transform: 'scale(1.1)',
                          boxShadow: 6,     
                        }
                    }}>Clear</Button>
                </Grid>
            </Grid>

            {/* Dashboard Cards */}
            <Grid container spacing={3}>
                <Grid size={{xs:12, sm:12, md:6, lg:3}}>
                    <DashboardBox count={10} loc="Area Jawa Bali" color={['#005082', '#001F3F']} />
                </Grid>
                <Grid size={{xs:12, sm:12, md:6, lg:3}}>
                    <DashboardBox count={20} loc="Region Jawa Timur" color={['#8A2BE2', '#4B0082']} />
                </Grid>
                <Grid size={{xs:12, sm:12, md:6, lg:3}}>
                    <DashboardBox count={5} loc="Region Jawa Tengah & DIY" color={['#228B22', '#014421']} />
                </Grid>
                <Grid size={{xs:12, sm:12, md:6, lg:3}}>
                    <DashboardBox count={15} loc="Region Bali Nusra" color={['#595959', '#2C2C2C']} />
                </Grid>
            </Grid>
            
            <Grid container spacing={3} mt={4}>
                <Grid size={{xs:12, sm:12, md:6, lg:3}}>
                    <CardPrimary title="Revenue Overview" loc="Area Jawa Bali" descValues={revenue} color={['#005082', '#001F3F']} />
                </Grid>
                <Grid size={{xs:12, sm:12, md:6, lg:3}}>
                    <CardPrimary title="Revenue Overview" loc="Region Jawa Timur" descValues={revenue} color={['#005082', '#001F3F']} />
                </Grid>
                <Grid size={{xs:12, sm:12, md:6, lg:3}}>
                    <CardPrimary title="Revenue Overview" loc="Region Jawa Tengah & DIY" descValues={revenue} color={['#005082', '#001F3F']} />
                </Grid>
                <Grid size={{xs:12, sm:12, md:6, lg:3}}>
                    <CardPrimary title="Revenue Overview" loc="Region Bali Nusra" descValues={revenue} color={['#005082', '#001F3F']} />
                </Grid>
            </Grid>
            <Grid container spacing={3} mt={4}>
                <Grid size={{xs:12, sm:12, md:6, lg:3}}>
                    <CardPrimary title="Payload Overview" loc="Area Jawa Bali" descValues={payload} color={['#005082', '#001F3F']} />
                </Grid>
                <Grid size={{xs:12, sm:12, md:6, lg:3}}>
                    <CardPrimary title="Payload Overview" loc="Region Jawa Timur" descValues={payload} color={['#005082', '#001F3F']} />
                </Grid>
                <Grid size={{xs:12, sm:12, md:6, lg:3}}>
                    <CardPrimary title="Payload Overview" loc="Region Jawa Tengah & DIY" descValues={payload} color={['#005082', '#001F3F']} />
                </Grid>
                <Grid size={{xs:12, sm:12, md:6, lg:3}}>
                    <CardPrimary title="Payload Overview" loc="Region Bali Nusra" descValues={payload} color={['#005082', '#001F3F']} />
                </Grid>
            </Grid>
        </Box>
    );
};