// api/monthsService.ts
import axios from 'axios';
import { API_BASE_URL } from './config';

export interface EventsRegionEJData {
    status: string;
    data: {
        eventCounts: number;
        totals: {
            opex: number;
            revenue: number;
            profitability: number;
            payload: number;
        };
    };
}

export const fetchEventsRegionEJ = async (month: string, category: string, action: string): Promise<EventsRegionEJData> => {
    const token = process.env.REACT_APP_API_TOKEN;
    try {
        const response = await axios.get<EventsRegionEJData>(`${API_BASE_URL}/eventsEJRegion`, {
            headers: {
                'Authorization': `Bearer ${token}`,
            },
            params: {
                month: month || undefined,
                category: category || undefined,
                action: action || undefined,
            },
        });

        return response.data;
    } catch (error) {
        console.error('Error fetching events regoin east java data:', error);
        throw error;
    }
};