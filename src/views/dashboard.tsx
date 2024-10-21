import React, { useState, useEffect, useCallback } from 'react';
import Box from "@mui/material/Box";
import { MuiSelect } from "../components/MuiSelect";
import { DashboardBox } from "../components/dashboardBox";
import Grid from '@mui/material/Grid2';
import { CardPrimary } from "../components/CardPrimary";
import { Button } from '@mui/material';
import { useTheme } from '@mui/material';
import { fetchMonths, MonthOption } from '../api/monthFilter';
import { fetchCategory, CategoryOption } from '../api/categoryFilter';
import { fetchAction, ActionOption } from '../api/actionFilter';
import { fetchEventsArea, EventsAreaData } from '../api/eventsAreaData';

export const DashboardPage = () => {
    const [monthOptions, setMonthOptions] = useState<MonthOption[]>([]);
    const [month, setMonth] = useState('');
    const [categoryOptions, setCategoryOptions] = useState<CategoryOption[]>([]);
    const [category, setCategory] = useState('');
    const [action, setAction] = useState('');
    const [actionOptions, setActionOptions] = useState<ActionOption[]>([]);
    const [eventsData, setEventsData] = useState<EventsAreaData | null>(null);

    // Fetch the months data on component mount
    useEffect(() => {
        const loadFilter = async () => {
            try {
                // Fetch all filters in parallel
                const [months, categories, actions] = await Promise.all([
                    fetchMonths(),
                    fetchCategory(),
                    fetchAction()
                ]);
                setMonthOptions(months); // Set the fetched months
                setCategoryOptions(categories); // Set the fetched categories
                setActionOptions(actions); // Set the fetched actions
            } catch (error) {
                console.error('Failed to load filters:', error);
            }
        };
        loadFilter(); // Call the function to fetch months, categories, and actions
    }, []);

    // Fetch the events data when the month, category, or action changes

    const loadEventsData = useCallback(async () => {
        try {
            // Fetch all event data in parallel
            const [data] = await Promise.all([
                fetchEventsArea(month, category, action)
            ]);
            setEventsData(data); // Update event data
        } catch (error) {
            console.error('Failed to fetch event data:', error);
        }
    }, [month, category, action]);

    useEffect(() => {
        loadEventsData();  // Call the API when the component loads or filters change
    }, [loadEventsData]);  // Dependency array: re-fetch data whenever these change

    const clearFilters = () => {
        setMonth('');       // Reset month to empty
        setCategory('');    // Reset category to empty
        setAction('');      // Reset action to empty
        loadEventsData();   // Optionally reload data without filters
    };

    const theme = useTheme();
    const backgroundColor = theme.palette.mode === 'light' ? 'white' : '#1a2232';
    const textColor = theme.palette.mode === 'light' ? 'grey.900' : 'white';

    const countArea = eventsData?.data.eventCounts || 0;

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
                    }} onClick={clearFilters}>Clear</Button>
                </Grid>
            </Grid>

            {/* Dashboard Cards */}
            <Grid container spacing={3} justifyContent={'center'}>
                <Grid size={{xs:12, sm:12, md:6, lg:3}} sx={{ maxWidth: 400 }}>
                    <DashboardBox count={countArea} loc="Area Jawa Bali" color={['#005082', '#001F3F']} />
                </Grid>
                <Grid size={{xs:12, sm:12, md:6, lg:3}} sx={{ maxWidth: 400 }}>
                    <DashboardBox count={20} loc="Region Jawa Timur" color={['#8A2BE2', '#4B0082']} />
                </Grid>
                <Grid size={{xs:12, sm:12, md:6, lg:3}} sx={{ maxWidth: 400 }}>
                    <DashboardBox count={5} loc="Region Jawa Tengah & DIY" color={['#228B22', '#014421']} />
                </Grid>
                <Grid size={{xs:12, sm:12, md:6, lg:3}} sx={{ maxWidth: 400 }}>
                    <DashboardBox count={15} loc="Region Bali Nusra" color={['#595959', '#2C2C2C']} />
                </Grid>
            </Grid>
            
            <Grid container spacing={3} mt={4} justifyContent={'center'}>
                <Grid size={{xs:12, sm:12, md:6, lg:3}} sx={{ maxWidth: 400 }}>
                    <CardPrimary title="Revenue Overview" loc="Area Jawa Bali" descValues={revenue} color={['#005082', '#001F3F']} />
                </Grid>
                <Grid size={{xs:12, sm:12, md:6, lg:3}} sx={{ maxWidth: 400 }}>
                    <CardPrimary title="Revenue Overview" loc="Region Jawa Timur" descValues={revenue} color={['#005082', '#001F3F']} />
                </Grid>
                <Grid size={{xs:12, sm:12, md:6, lg:3}} sx={{ maxWidth: 400 }}>
                    <CardPrimary title="Revenue Overview" loc="Region Jawa Tengah & DIY" descValues={revenue} color={['#005082', '#001F3F']} />
                </Grid>
                <Grid size={{xs:12, sm:12, md:6, lg:3}} sx={{ maxWidth: 400 }}>
                    <CardPrimary title="Revenue Overview" loc="Region Bali Nusra" descValues={revenue} color={['#005082', '#001F3F']} />
                </Grid>
            </Grid>
            <Grid container spacing={3} mt={4} justifyContent={'center'}>
                <Grid size={{xs:12, sm:12, md:6, lg:3}} sx={{ maxWidth: 400 }}>
                    <CardPrimary title="Payload Overview" loc="Area Jawa Bali" descValues={payload} color={['#005082', '#001F3F']} />
                </Grid>
                <Grid size={{xs:12, sm:12, md:6, lg:3}} sx={{ maxWidth: 400 }}>
                    <CardPrimary title="Payload Overview" loc="Region Jawa Timur" descValues={payload} color={['#005082', '#001F3F']} />
                </Grid>
                <Grid size={{xs:12, sm:12, md:6, lg:3}} sx={{ maxWidth: 400 }}>
                    <CardPrimary title="Payload Overview" loc="Region Jawa Tengah & DIY" descValues={payload} color={['#005082', '#001F3F']} />
                </Grid>
                <Grid size={{xs:12, sm:12, md:6, lg:3}} sx={{ maxWidth: 400 }}>
                    <CardPrimary title="Payload Overview" loc="Region Bali Nusra" descValues={payload} color={['#005082', '#001F3F']} />
                </Grid>
            </Grid>
        </Box>
    );
};