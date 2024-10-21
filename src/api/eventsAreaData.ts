// api/monthsService.ts
import axios from 'axios';
import { API_BASE_URL } from './config';

export interface EventsAreaData {
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

export const fetchEventsArea = async (month: string, category: string, action: string): Promise<EventsAreaData> => {
    const token = process.env.REACT_APP_API_TOKEN;
    try {
        const response = await axios.get<EventsAreaData>(`${API_BASE_URL}/eventsArea`, {
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
        console.error('Error fetching events area data:', error);
        throw error;
    }
};