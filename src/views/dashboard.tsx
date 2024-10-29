import React, { useState, useEffect, useCallback } from 'react';
import Box from "@mui/material/Box";
import { MultipleSelectChip } from '../components/MultipleSelect';
import { DashboardBox } from "../components/dashboardBox";
import Grid from '@mui/material/Grid2';
import { CardPrimary } from "../components/CardPrimary";
import { Button } from '@mui/material';
import { useTheme } from '@mui/material';
import { fetchMonths, MonthOption } from '../api/monthFilter';
import { fetchCategory, CategoryOption } from '../api/categoryFilter';
import { fetchAction, ActionOption } from '../api/actionFilter';
import { fetchEventsArea, EventsAreaData } from '../api/eventsAreaData';
import { fetchEventsRegionEJ, EventsRegionEJData } from '../api/eventsRegionEJData';
import { fetchEventsRegionCJ, EventsRegionCJData } from '../api/eventsRegionCJData';
import { fetchEventsRegionBN, EventsRegionBNData } from '../api/eventsRegionBNData';

export const DashboardPage = () => {
    const [selectedMonths, setSelectedMonths] = useState<string[]>([]);
    const handleMonthChange = (selectedMonths: string[]) => {
        setSelectedMonths(selectedMonths);
    }
    const [selectedCategory, setSelectedCategory] = useState<string[]>([]);
    const handleCategoryChange = (selectedCategory: string[]) => {
        setSelectedCategory(selectedCategory);
    }
    const [selectedAction, setSelectedAction] = useState<string[]>([]);
    const handleActionChange = (selectedAction: string[]) => {
        setSelectedAction(selectedAction);
    }
    const [month, setMonth] = useState('');
    const [categoryOptions, setCategoryOptions] = useState<CategoryOption[]>([]);
    const [category, setCategory] = useState('');
    const [action, setAction] = useState('');
    const [monthOptions, setMonthOptions] = useState<MonthOption[]>([]);
    const [categoryOptions, setCategoryOptions] = useState<CategoryOption[]>([]);
    const [actionOptions, setActionOptions] = useState<ActionOption[]>([]);
    const [eventsData, setEventsData] = useState<EventsAreaData | null>(null);
    const [eventsEJData, setEventsEJData] = useState<EventsRegionEJData | null>(null);
    const [eventsCJData, setEventsCJData] = useState<EventsRegionCJData | null>(null);
    const [eventsBNData, setEventsBNData] = useState<EventsRegionBNData | null>(null);

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

    // Function to build query params and update states
    const paramsBuilder = useCallback(() => {
        const monthParam = selectedMonths.join(','); // Comma-separated months
        const categoryParam = selectedCategory.join(','); // Comma-separated categories
        const actionParam = selectedAction.join(','); // Comma-separated actions
        setMonth(monthParam);  // Update month state with selected months
        setCategory(categoryParam);  // Update category state with selected categories
        setAction(actionParam);  // Update action state with selected actions
    }, [selectedMonths, selectedCategory, selectedAction]);

    // Fetch the events data when the month, category, or action changes
    const loadEventsData = useCallback(async () => {
        const startTime = performance.now();  // Record start time
        try {
            // Fetch all event data in parallel
            const [data, dataEJ, dataCJ, dataBN] = await Promise.all([
                fetchEventsArea(month, category, action),
                fetchEventsRegionEJ(month, category, action),
                fetchEventsRegionCJ(month, category, action),
                fetchEventsRegionBN(month, category, action)
            ]);
            setEventsData(data); // Update event data
            setEventsEJData(dataEJ); // Update EJ event data
            setEventsCJData(dataCJ); // Update CJ event data
            setEventsBNData(dataBN); // Update BN event data
        } catch (error) {
            console.error('Failed to fetch event data:', error);
        } finally {
            const endTime = performance.now();  // Record end time
            const duration = endTime - startTime;  // Calculate the difference
            console.log(`API request completed in ${duration.toFixed(2)}ms`);
        }
    }, [month, category, action]);

    useEffect(() => {
        paramsBuilder();  // Call the function to build query params
        loadEventsData();  // Call the API when the component loads or filters change
        console.log('api called');
    }, [selectedMonths, selectedCategory, selectedAction, paramsBuilder, loadEventsData]);  // Dependency array: re-fetch data whenever these change

    const clearFilters = () => {
        setMonth('');       // Reset month to empty
        setCategory('');    // Reset category to empty
        setAction('');      // Reset action to empty
        setSelectedMonths([]); // Reset selected months
        setSelectedCategory([]); // Reset selected categories
        setSelectedAction([]); // Reset selected actions
        loadEventsData();   // Optionally reload data without filters
    };

    const theme = useTheme();
    const backgroundColor = theme.palette.mode === 'light' ? 'white' : '#1a2232';
    const textColor = theme.palette.mode === 'light' ? 'grey.900' : 'white';

    type OverviewItem = {
        desc: string;
        value: string;
      };
      
    // Function to create the overview array with customizable unit
    const createOverview = (descriptions: string[], values: string[], unit: string): OverviewItem[] => {
        return descriptions.map((desc, index) => ({
          desc,
          value: `${values[index]} ${unit}`, // Append the unit to the value
        }));
      };

    const formatNumber = (num: number): string =>
    new Intl.NumberFormat('de-DE', {
        minimumFractionDigits: 0,
        maximumFractionDigits: 1,
    }).format(num);

    const countArea = formatNumber(eventsData?.data.eventCounts || 0);
    const revenueArea = createOverview(['Revenue', 'Profitability', 'OPEX'], [formatNumber((eventsData?.data.totals.revenue || 0)/1_000_000_000),formatNumber((eventsData?.data.totals.profitability || 0) / 1_000_000_000),formatNumber((eventsData?.data.totals.opex || 0)/1_000_000_000)], 'Bio');
    const payloadArea = createOverview([''], [formatNumber((eventsData?.data.totals.payload || 0) / 1_000)], 'PB');
    const userArea = createOverview([''], [formatNumber((eventsData?.data.totals.user || 0))], '');
    const countEJ = formatNumber(eventsEJData?.data.eventCounts || 0);
    const revenueEJ = createOverview(['Revenue', 'Profitability', 'OPEX'], [formatNumber((eventsEJData?.data.totals.revenue || 0)/1_000_000_000), formatNumber((eventsEJData?.data.totals.profitability || 0) / 1_000_000_000), formatNumber((eventsEJData?.data.totals.opex || 0)/1_000_000_000)], 'Bio');
    const payloadEJ = createOverview([''], [formatNumber((eventsEJData?.data.totals.payload || 0)/1_000)], 'PB');
    const userEJ = createOverview([''], [formatNumber((eventsEJData?.data.totals.user || 0))], '');
    const countCJ = formatNumber(eventsCJData?.data.eventCounts || 0);
    const revenueCJ = createOverview(['Revenue', 'Profitability', 'OPEX'], [formatNumber((eventsCJData?.data.totals.revenue || 0)/1_000_000_000), formatNumber((eventsCJData?.data.totals.profitability || 0) / 1_000_000_000), formatNumber((eventsCJData?.data.totals.opex || 0)/1_000_000_000)], 'Bio');
    const payloadCJ = createOverview([''], [formatNumber((eventsCJData?.data.totals.payload || 0)/1_000)], 'PB');
    const userCJ = createOverview([''], [formatNumber((eventsCJData?.data.totals.user || 0))], '');
    const countBN = formatNumber(eventsBNData?.data.eventCounts || 0);
    const revenueBN = createOverview(['Revenue', 'Profitability', 'OPEX'], [formatNumber((eventsBNData?.data.totals.revenue || 0)/1_000_000_000), formatNumber((eventsBNData?.data.totals.profitability || 0) / 1_000_000_000), formatNumber((eventsBNData?.data.totals.opex || 0)/1_000_000_000)], 'Bio');
    const payloadBN = createOverview([''], [formatNumber((eventsBNData?.data.totals.payload || 0)/1_000)], 'PB');
    const userBN = createOverview([''], [formatNumber((eventsBNData?.data.totals.user || 0))], '');

    return (
        <Box sx={{ p: 3 }}>
            {/* Top Filters */}
            <Grid container spacing={2} mb={4}>
                <Grid>
                    <MultipleSelectChip
                        label="Month"
                        value={selectedMonths}
                        options={monthOptions.map(option => option.label)}
                        onChange={handleMonthChange}
                    />
                </Grid>
                <Grid>
                    <MultipleSelectChip
                        label="Category"
                        value={selectedCategory}
                        options={categoryOptions.map(option => option.label)}
                        onChange={handleCategoryChange}
                    />
                </Grid>
                <Grid>
                    <MultipleSelectChip
                        label="Action"
                        value={selectedAction}
                        options={actionOptions.map(option => option.label)}
                        onChange={handleActionChange}
                    />
                </Grid>

                <Grid container spacing={3}>
                    <Button variant="contained" sx={{ height: '55px', color: textColor, backgroundColor: backgroundColor, borderRadius: 2, boxShadow: 1, textTransform: 'none', fontWeight: 'bold', fontSize:16,
                        transition: 'transform 0.1s ease-in-out',  // Smooth transition effect
                        '&:hover': {
                          transform: 'scale(1.1)'
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
                    <DashboardBox count={countEJ} loc="Region Jawa Timur" color={['#8A2BE2', '#4B0082']} />
                </Grid>
                <Grid size={{xs:12, sm:12, md:6, lg:3}} sx={{ maxWidth: 400 }}>
                    <DashboardBox count={countCJ} loc="Region Jawa Tengah & DIY" color={['#228B22', '#014421']} />
                </Grid>
                <Grid size={{xs:12, sm:12, md:6, lg:3}} sx={{ maxWidth: 400 }}>
                    <DashboardBox count={countBN} loc="Region Bali Nusra" color={['#595959', '#2C2C2C']} />
                </Grid>
            </Grid>
            
            <Grid container spacing={3} mt={4} justifyContent={'center'}>
                <Grid size={{xs:12, sm:12, md:6, lg:3}} sx={{ maxWidth: 400 }}>
                    <CardPrimary title="Revenue Overview" loc="Area Jawa Bali" descValues={revenueArea} color={['#005082', '#001F3F']} />
                </Grid>
                <Grid size={{xs:12, sm:12, md:6, lg:3}} sx={{ maxWidth: 400 }}>
                    <CardPrimary title="Revenue Overview" loc="Region Jawa Timur" descValues={revenueEJ} color={['#005082', '#001F3F']} />
                </Grid>
                <Grid size={{xs:12, sm:12, md:6, lg:3}} sx={{ maxWidth: 400 }}>
                    <CardPrimary title="Revenue Overview" loc="Region Jawa Tengah & DIY" descValues={revenueCJ} color={['#005082', '#001F3F']} />
                </Grid>
                <Grid size={{xs:12, sm:12, md:6, lg:3}} sx={{ maxWidth: 400 }}>
                    <CardPrimary title="Revenue Overview" loc="Region Bali Nusra" descValues={revenueBN} color={['#005082', '#001F3F']} />
                </Grid>
            </Grid>
            <Grid container spacing={3} mt={4} justifyContent={'center'}>
                <Grid size={{xs:12, sm:12, md:6, lg:3}} sx={{ maxWidth: 400 }}>
                    <CardPrimary title="Payload Overview" loc="Area Jawa Bali" descValues={payloadArea} color={['#005082', '#001F3F']} />
                </Grid>
                <Grid size={{xs:12, sm:12, md:6, lg:3}} sx={{ maxWidth: 400 }}>
                    <CardPrimary title="Payload Overview" loc="Region Jawa Timur" descValues={payloadEJ} color={['#005082', '#001F3F']} />
                </Grid>
                <Grid size={{xs:12, sm:12, md:6, lg:3}} sx={{ maxWidth: 400 }}>
                    <CardPrimary title="Payload Overview" loc="Region Jawa Tengah & DIY" descValues={payloadCJ} color={['#005082', '#001F3F']} />
                </Grid>
                <Grid size={{xs:12, sm:12, md:6, lg:3}} sx={{ maxWidth: 400 }}>
                    <CardPrimary title="Payload Overview" loc="Region Bali Nusra" descValues={payloadBN} color={['#005082', '#001F3F']} />
                </Grid>
            </Grid>
            <Grid container spacing={3} mt={4} justifyContent={'center'}>
                <Grid size={{xs:12, sm:12, md:6, lg:3}} sx={{ maxWidth: 400 }}>
                    <CardPrimary title="User Overview" loc="Area Jawa Bali" descValues={userArea} color={['#005082', '#001F3F']} />
                </Grid>
                <Grid size={{xs:12, sm:12, md:6, lg:3}} sx={{ maxWidth: 400 }}>
                    <CardPrimary title="User Overview" loc="Region Jawa Timur" descValues={userEJ} color={['#005082', '#001F3F']} />
                </Grid>
                <Grid size={{xs:12, sm:12, md:6, lg:3}} sx={{ maxWidth: 400 }}>
                    <CardPrimary title="User Overview" loc="Region Jawa Tengah & DIY" descValues={userCJ} color={['#005082', '#001F3F']} />
                </Grid>
                <Grid size={{xs:12, sm:12, md:6, lg:3}} sx={{ maxWidth: 400 }}>
                    <CardPrimary title="User Overview" loc="Region Bali Nusra" descValues={userBN} color={['#005082', '#001F3F']} />
                </Grid>
            </Grid>
        </Box>
    );
};