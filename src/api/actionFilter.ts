// api/monthsService.ts
import axios from 'axios';
import { API_BASE_URL } from './config';

export interface ActionOption {
    value: string;
    label: string;
}

export const fetchAction = async (): Promise<ActionOption[]> => {
    const token = process.env.REACT_APP_API_TOKEN;
    try {
        const response = await axios.get<{ data: string[] }>(`${API_BASE_URL}/actions`, {
            headers: {
                'Authorization': `Bearer ${token}`,  // Include the token in the Authorization header
            },
        });
        
        return response.data.data.map((actionName: string) => {
            return {
                value: actionName,
                label: actionName,
            };
        });
    } catch (error) {
        console.error('Error fetching action:', error);
        throw error;
    }
};
