import React from 'react';
import { Card, CardContent, Typography, Button, Box } from '@mui/material';
import { styled } from '@mui/system';

interface BannerProps {
  title: string;
  installment: string;
  oldPrice: string;
  newPrice: string;
  imageUrl: string;
}

const PriceContainer = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  gap: '8px',
});

const OldPrice = styled(Typography)({
  textDecoration: 'line-through',
  color: '#888',
});

const NewPrice = styled(Typography)({
  fontWeight: 'bold',
  fontSize: '2em',
  color: '#000',
});

const ImageContainer = styled(Box)({
  flex: 1,
  display: 'flex',
  justifyContent: 'flex-end',
  alignItems: 'center',
});

const Banner: React.FC<BannerProps> = ({
  title,
  installment,
  oldPrice,
  newPrice,
  imageUrl,
}) => {
  return (
    <Card sx={{ display: 'flex', borderRadius: '16px', padding: '16px', backgroundColor: '#f9f9f9' }}>
      <CardContent sx={{ flex: 1 }}>
        <Typography variant="h5" gutterBottom>{title}</Typography>
        <Typography variant="body1" color="text.secondary">{installment}</Typography>
        <PriceContainer>
          <OldPrice variant="body2">{oldPrice}</OldPrice>
          <NewPrice>{newPrice}</NewPrice>
        </PriceContainer>
        <Button variant="contained" color="primary">Купить</Button>
      </CardContent>
      <ImageContainer>
        <img src={imageUrl} alt={title} style={{ maxWidth: '150px', borderRadius: '8px' }} />
      </ImageContainer>
    </Card>
  );
};

export default Banner;

