import { useEffect } from "react";
import { Card, CardContent, Typography, Box, IconButton } from '@mui/material';
import EventIcon from '@mui/icons-material/Event';

interface DashboardBoxProps {
    count: number;
    loc: string;
    color: Array<string>;
}

export const DashboardBox: React.FC<DashboardBoxProps> = ({ count, loc, color }) => {
    return (
        <Card sx={{ position: 'relative', background: `linear-gradient(45deg, ${color[0]}, ${color[1]})`, color: '#fff', borderRadius: 4, width: '100%', height: '100%', boxShadow: 3,
        transition: 'transform 0.1s ease-in-out',  // Smooth transition effect
                        '&:hover': {
                          transform: 'scale(1.1)',
                          boxShadow: 6,     
                        }
        }}>
            <CardContent sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', padding: '20px' }}>
                {/* First Section: Icon and Events Supported Text */}
                <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: 1 }}>
                    <IconButton sx={{ color: '#fff', backgroundColor: 'rgba(255, 255, 255, 0.1)', marginRight: 1 }}>
                        <EventIcon />
                    </IconButton>
                    <Typography variant="h6" component="div" zIndex={2}>
                        Events Supported
                    </Typography>
                </Box>

                {/* Second Section: Area */}
                <Typography variant="h6" color="inherit" marginLeft={1} zIndex={2}>
                    {loc}
                </Typography>
                {/* Third Section: Count */}
                <Typography variant="h3" component="div" marginLeft={1} fontWeight={'bold'}>
                    {count}
                </Typography>
            </CardContent>
        <Box
          sx={{
            position: 'absolute',
            top: -100,
            right: -100,
            background: `${color[0]}`,
            width: '200px',
            height: '200px',
            borderRadius: '50%',
            zIndex: 1,
            opacity: 1,
          }}
        />
        <Box
          sx={{
            position: 'absolute',
            top: -130,
            right: -20,
            background: `${color[0]}`,
            width: '200px',
            height: '200px',
            borderRadius: '50%',
            zIndex: 1,
            opacity: 0.5,
          }}
        />
        </Card>
    );
};