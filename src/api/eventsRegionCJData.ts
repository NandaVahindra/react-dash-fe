
// api/monthsService.ts
import axios from 'axios';
import { API_BASE_URL } from './config';

export interface EventsRegionCJData {
    status: string;
    data: {
        eventCounts: number;
        totals: {
            opex: number;
            revenue: number;
            profitability: number;
            payload: number;
            user: number;
        };
    };
}

export const fetchEventsRegionCJ = async (month: string, category: string, action: string): Promise<EventsRegionCJData> => {
    const token = process.env.REACT_APP_API_TOKEN;
    try {
        const response = await axios.get<EventsRegionCJData>(`${API_BASE_URL}/eventsCJRegion`, {
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
        console.error('Error fetching events regoin center java data:', error);
        throw error;
    }
};
