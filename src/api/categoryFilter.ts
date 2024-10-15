// api/monthsService.ts
import axios from 'axios';
import { API_BASE_URL } from './config';

export interface CategoryOption {
    value: string;
    label: string;
}

export const fetchCategory = async (): Promise<CategoryOption[]> => {
    const token = process.env.REACT_APP_API_TOKEN;
    try {
        const response = await axios.get<{ data: string[] }>(`${API_BASE_URL}/categories`, {
            headers: {
                'Authorization': `Bearer ${token}`,  // Include the token in the Authorization header
            },
        });
        
        return response.data.data.map((categoryName: string) => {
            return {
                value: categoryName,
                label: categoryName,
            };
        });
    } catch (error) {
        console.error('Error fetching category:', error);
        throw error;
    }
};
