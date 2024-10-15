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
import { useSpring, animated } from '@react-spring/web';
import { fetchEventsRegionEJ, EventsRegionEJData } from '../api/eventsRegionEJData';
import { fetchEventsRegionCJ, EventsRegionCJData } from '../api/eventsRegionCJData';
import { fetchEventsRegionBN, EventsRegionBNData } from '../api/eventsRegionBNData';

export const DashboardPage = () => {
    const [monthOptions, setMonthOptions] = useState<MonthOption[]>([]);
    const [month, setMonth] = useState('');
    const [categoryOptions, setCategoryOptions] = useState<CategoryOption[]>([]);
    const [category, setCategory] = useState('');
    const [action, setAction] = useState('');
    const [actionOptions, setActionOptions] = useState<ActionOption[]>([]);
    const [eventsData, setEventsData] = useState<EventsAreaData | null>(null);
    const [eventsEJData, setEventsEJData] = useState<EventsRegionEJData | null>(null);
    const [eventsCJData, setEventsCJData] = useState<EventsRegionCJData | null>(null);
    const [eventsBNData, setEventsBNData] = useState<EventsRegionBNData | null>(null);

    // Fetch the months data on component mount
    useEffect(() => {
        const loadFilter = async () => {
            try {
                const months = await fetchMonths();
                setMonthOptions(months); // Set the fetched months
                const categories = await fetchCategory();
                setCategoryOptions(categories); // Set the fetched categories
                const actions = await fetchAction();
                setActionOptions(actions); // Set the fetched actions
            } catch (error) {
                console.error('Failed to load filters:', error);
            }
        };
        loadFilter(); // Call the function to fetch months
    }, []);

    // Function to fetch event data from `/eventsArea` endpoint
    const loadEventsData = useCallback( async () => {
        try {
            const data = await fetchEventsArea(month, category, action);
            const dataEJ = await fetchEventsRegionEJ(month, category, action);
            const dataCJ = await fetchEventsRegionCJ(month, category, action);
            const dataBN = await fetchEventsRegionBN(month, category, action);
            setEventsData(data); // Update event data
            setEventsEJData(dataEJ); // Update event data
            setEventsCJData(dataCJ); // Update event data
            setEventsBNData(dataBN); // Update event data
        } catch (error) {
            console.error('Failed to fetch event data:', error);
        }
    }, [month, category, action]);

    // Fetch events data on first load and when filters (month, category, action) change
    useEffect(() => {
        loadEventsData();  // Call the API when the component loads or filters change
    }, [loadEventsData]);  // Dependency array: re-fetch data whenever these change

    const clearFilters = () => {
        setMonth('');       // Reset month to empty
        setCategory('');    // Reset category to empty
        setAction('');      // Reset action to empty
        loadEventsData();   // Optionally reload data without filters
    };

    const useAnimatedNumber = (toValue: number, divisor: number, unit: string, duration: number) => {
        const spring = useSpring({
            from: { number: 0 },
            to: { number: toValue },
            config: { duration: duration },
        });

        if (divisor === 1) {
            return <animated.span>{spring.number.to((n) => `${n.toFixed(0)} ${unit}`)}</animated.span>;
        }   

        return (
            <animated.span>
                {spring.number.to((n) => `${(n / divisor).toFixed(1)} ${unit}`)}
            </animated.span>
        )
    };

    const createOverview = (description: string[], animatedValues: React.ReactNode[]) => {
        return description.map((desc, index) => ({
            desc: desc,
            value: animatedValues[index],
        }))};


    const theme = useTheme();
    const backgroundColor = theme.palette.mode === 'light' ? 'white' : '#1a2232';
    const textColor = theme.palette.mode === 'light' ? 'grey.900' : 'white';

    // Fallback values if data is not yet fetched
    const eventCountsArea = useAnimatedNumber((eventsData?.data.eventCounts || 0), 1, '', 300); 
    const revenueArea = useAnimatedNumber((eventsData?.data.totals.revenue || 0), 1_000_000_000, 'Bio', 300);
    const profitabilityArea = useAnimatedNumber((eventsData?.data.totals.profitability || 0), 1_000_000_000, 'Bio', 300); 
    const opexArea = useAnimatedNumber((eventsData?.data.totals.opex || 0), 1_000_000_000, 'Bio', 300); 
    const payloadArea = useAnimatedNumber((eventsData?.data.totals.payload || 0), 1_000, 'PB', 300); 

    const eventCountsEJ = useAnimatedNumber((eventsEJData?.data.eventCounts || 0), 1, '', 300);
    const revenueEJ = useAnimatedNumber((eventsEJData?.data.totals.revenue || 0), 1_000_000_000, 'Bio', 300);
    const profitabilityEJ = useAnimatedNumber((eventsEJData?.data.totals.profitability || 0), 1_000_000_000, 'Bio', 300);
    const opexEJ = useAnimatedNumber((eventsEJData?.data.totals.opex || 0), 1_000_000_000, 'Bio', 300);
    const payloadEJ = useAnimatedNumber((eventsEJData?.data.totals.payload || 0), 1_000, 'PB', 300);

    const eventCountsCJ = useAnimatedNumber((eventsCJData?.data.eventCounts || 0), 1, '', 300);
    const revenueCJ = useAnimatedNumber((eventsCJData?.data.totals.revenue || 0), 1_000_000_000, 'Bio', 300);
    const profitabilityCJ = useAnimatedNumber((eventsCJData?.data.totals.profitability || 0), 1_000_000_000, 'Bio', 300);
    const opexCJ = useAnimatedNumber((eventsCJData?.data.totals.opex || 0), 1_000_000_000, 'Bio', 300);
    const payloadCJ = useAnimatedNumber((eventsCJData?.data.totals.payload || 0), 1_000, 'PB', 300);

    const eventCountsBN = useAnimatedNumber((eventsBNData?.data.eventCounts || 0), 1, '', 300);
    const revenueBN = useAnimatedNumber((eventsBNData?.data.totals.revenue || 0), 1_000_000_000, 'Bio', 300);
    const profitabilityBN = useAnimatedNumber((eventsBNData?.data.totals.profitability || 0), 1_000_000_000, 'Bio', 300);
    const opexBN = useAnimatedNumber((eventsBNData?.data.totals.opex || 0), 1_000_000_000, 'Bio', 300);
    const payloadBN = useAnimatedNumber((eventsBNData?.data.totals.payload || 0), 1_000, 'PB', 300);

    // Define the overview with animated values
    const revenueOverviewArea = createOverview(['Revenue', 'Profitability', 'OPEX'], [revenueArea, profitabilityArea, opexArea]);
    const payloadOverviewArea = createOverview([''], [payloadArea]);

    const revenueOverviewEJ = createOverview(['Revenue', 'Profitability', 'OPEX'], [revenueEJ, profitabilityEJ, opexEJ]);
    const payloadOverviewEJ = createOverview([''], [payloadEJ]);

    const revenueOverviewCJ = createOverview(['Revenue', 'Profitability', 'OPEX'], [revenueCJ, profitabilityCJ, opexCJ]);
    const payloadOverviewCJ = createOverview([''], [payloadCJ]);

    const revenueOverviewBN = createOverview(['Revenue', 'Profitability', 'OPEX'], [revenueBN, profitabilityBN, opexBN]);
    const payloadOverviewBN = createOverview([''], [payloadBN]);

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
                    <Button variant="contained" sx={{ height: '80%', color: textColor, backgroundColor: backgroundColor, borderRadius: 2, boxShadow: 3, textTransform: 'none', fontWeight: 'bold', fontSize:16,
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
                    <DashboardBox count={eventCountsArea} loc="Area Jawa Bali" color={['#005082', '#001F3F']} />
                </Grid>
                <Grid size={{xs:12, sm:12, md:6, lg:3}} sx={{ maxWidth: 400 }}>
                    <DashboardBox count={eventCountsEJ} loc="Region Jawa Timur" color={['#8A2BE2', '#4B0082']} />
                </Grid>
                <Grid size={{xs:12, sm:12, md:6, lg:3}} sx={{ maxWidth: 400 }}>
                    <DashboardBox count={eventCountsCJ} loc="Region Jawa Tengah & DIY" color={['#228B22', '#014421']} />
                </Grid>
                <Grid size={{xs:12, sm:12, md:6, lg:3}} sx={{ maxWidth: 400 }}>
                    <DashboardBox count={eventCountsBN} loc="Region Bali Nusra" color={['#595959', '#2C2C2C']} />
                </Grid>
            </Grid>
            
            <Grid container spacing={3} mt={4} justifyContent={'center'}>
                <Grid size={{xs:12, sm:12, md:6, lg:3}} sx={{ maxWidth: 400 }}>
                    <CardPrimary title="Revenue Overview" loc="Area Jawa Bali" descValues={revenueOverviewArea} color={['#005082', '#001F3F']} />
                </Grid>
                <Grid size={{xs:12, sm:12, md:6, lg:3}} sx={{ maxWidth: 400 }}>
                    <CardPrimary title="Revenue Overview" loc="Region Jawa Timur" descValues={revenueOverviewEJ} color={['#005082', '#001F3F']} />
                </Grid>
                <Grid size={{xs:12, sm:12, md:6, lg:3}} sx={{ maxWidth: 400 }}>
                    <CardPrimary title="Revenue Overview" loc="Region Jawa Tengah & DIY" descValues={revenueOverviewCJ} color={['#005082', '#001F3F']} />
                </Grid>
                <Grid size={{xs:12, sm:12, md:6, lg:3}} sx={{ maxWidth: 400 }}>
                    <CardPrimary title="Revenue Overview" loc="Region Bali Nusra" descValues={revenueOverviewBN} color={['#005082', '#001F3F']} />
                </Grid>
            </Grid>
            <Grid container spacing={3} mt={4} justifyContent={'center'}>
                <Grid size={{xs:12, sm:12, md:6, lg:3}} sx={{ maxWidth: 400 }}>
                    <CardPrimary title="Payload Overview" loc="Area Jawa Bali" descValues={payloadOverviewArea} color={['#005082', '#001F3F']} />
                </Grid>
                <Grid size={{xs:12, sm:12, md:6, lg:3}} sx={{ maxWidth: 400 }}>
                    <CardPrimary title="Payload Overview" loc="Region Jawa Timur" descValues={payloadOverviewEJ} color={['#005082', '#001F3F']} />
                </Grid>
                <Grid size={{xs:12, sm:12, md:6, lg:3}} sx={{ maxWidth: 400 }}>
                    <CardPrimary title="Payload Overview" loc="Region Jawa Tengah & DIY" descValues={payloadOverviewCJ} color={['#005082', '#001F3F']} />
                </Grid>
                <Grid size={{xs:12, sm:12, md:6, lg:3}} sx={{ maxWidth: 400 }}>
                    <CardPrimary title="Payload Overview" loc="Region Bali Nusra" descValues={payloadOverviewBN} color={['#005082', '#001F3F']} />
                </Grid>
            </Grid>
        </Box>
    );
};