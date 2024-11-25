import { Box } from '@mui/material';
import { styled } from '@mui/material/styles';

// Styled Components
export const ParentContainerStyled = styled(Box)(({ theme }) => ({
  position: 'relative',
  width: '100%',
  marginTop: 0,
  paddingTop: 0,
  zIndex: 0,
  paddingBottom: 30,
}));

export const BannerContainerStyled = styled(Box)(({ theme }) => ({
  position: 'relative',
  width: '93%',

  margin: '1% auto',
  marginTop: 0,
  paddingTop: 0,
  zIndex: 1,
}));

export const HeaderSectionStyled = styled(Box)(({ theme }) => ({
  width: '100%',
  height: '15%',
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between',
  marginBottom: theme.spacing(2),
}));

export const HeroSectionStyled = styled(Box)(({ theme }) => ({
  width: '100%',
  height: '15%',
}));

export const TestimonialSectionStyled = styled(Box)(({ theme }) => ({
  width: '93%',
  height: '15%',
  margin: '1% auto',
}));

export const PreviewSectionStyled = styled(Box)(({ theme }) => ({
  flexDirection: 'column',
  alignItems: 'center',
  display: 'flex',
  marginTop: '5%',
}));
