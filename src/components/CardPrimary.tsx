import { useEffect } from "react";
import { Card, CardContent, Typography, Box, useTheme } from '@mui/material';

interface CardPrimaryProps {
    count: number;
    title: string;
    desc: string;
    color: Array<string>;
}

export const CardPrimary: React.FC<CardPrimaryProps> = ({ count, title, desc, color }) => {
    const theme = useTheme();
    const backgroundColor = theme.palette.mode === 'light' ? '{color[0]}' : '{color[1]}';
    const textColor = theme.palette.mode === 'light' ? 'grey.900' : 'white';
    
    return (
        <Card sx={{ backgroundColor: backgroundColor, boxShadow: 5, borderRadius: 4 }}>
            <CardContent>
                <Box>
                    <Typography variant="h4" component="div" sx={{ color: textColor }}>
                    {count}
                    </Typography>
                    <Typography variant="body1" sx={{ color: textColor }}>
                    Total Earning
                    </Typography>
                </Box>
            </CardContent>
        </Card>
    );
}
