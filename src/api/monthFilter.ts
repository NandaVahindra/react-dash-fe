// api/monthsService.ts
import axios from 'axios';
import { API_BASE_URL } from './config';

export interface MonthOption {
    value: string;
    label: string;
}

export const fetchMonths = async (): Promise<MonthOption[]> => {
    const token = process.env.REACT_APP_API_TOKEN;
    try {
        const response = await axios.get<{ data: string[] }>(`${API_BASE_URL}/months`, {
            headers: {
                'Authorization': `Bearer ${token}`,  // Include the token in the Authorization header
            },
        });
        // Map the months to the { value, label } structure
        return response.data.data.map((monthName: string) => {
            return {
                value: monthName,
                label: monthName,
            };
        });
    } catch (error) {
        console.error('Error fetching months:', error);
        throw error;
    }
};
