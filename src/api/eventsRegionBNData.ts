// api/monthsService.ts
import axios from 'axios';
import { API_BASE_URL } from './config';

export interface EventsRegionBNData {
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

export const fetchEventsRegionBN = async (month: string, category: string, action: string): Promise<EventsRegionBNData> => {
    const token = process.env.REACT_APP_API_TOKEN;
    try {
        const response = await axios.get<EventsRegionBNData>(`${API_BASE_URL}/eventsBNRegion`, {
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
        console.error('Error fetching events regoin bali nusra data:', error);
        throw error;
    }
};