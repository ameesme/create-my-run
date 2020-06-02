import React, { ChangeEvent } from 'react';

import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import Drawer from '@material-ui/core/Drawer';
import Grid from '@material-ui/core/Grid';
import InputAdornment from '@material-ui/core/InputAdornment';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import Slider from '@material-ui/core/Slider';
import Typography from '@material-ui/core/Typography';

import { makeStyles } from '@material-ui/core/styles';

function distanceValueText(value: number): string {
  return `${value} km`;
}

const useStyles = makeStyles(() => ({
  wrapper: {
    position: 'relative',
  },
  buttonProgress: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginTop: -12,
    marginLeft: -12,
  },
  distanceIput: {
    width: 75,
  },
}));

interface ConfigureProps {
  isDrawerOpen: boolean;
  onCloseDrawer(): void;
  distance: number;
  setDistance(distance: number): void;
  routeTypes: RouteType[];
  routeType: RouteType['id'];
  setRouteType(type: RouteType['id']): void;
  isGenerating: boolean;
  onGenerateRun(): void;
}

const Configure: React.FC<ConfigureProps> = ({
  isDrawerOpen,
  onCloseDrawer,
  distance,
  setDistance,
  routeTypes,
  routeType,
  setRouteType,
  isGenerating,
  onGenerateRun,
}) => {
  const classes = useStyles();

  const min = 1;
  const max = 50;
  const defaultDistance = 10;

  const handleDistanceInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setDistance(event.target.value === '' ? defaultDistance : Number(event.target.value));
  };

  const handleDistanceBlur = () => {
    if (distance < min) {
      setDistance(min);
    } else if (distance > max) {
      setDistance(max);
    }
  };

  return (
    <Drawer
      anchor="left"
      open={isDrawerOpen}
      onClose={onCloseDrawer}
    >
      <Box width={400}>
        <Box margin={3}>
          <Typography variant="h6" style={{ flexGrow: 1 }}>
            Configure Run
          </Typography>
        </Box>
        <Box margin={3}>
          <InputLabel id="distance-slider" shrink>
            Distance (KM)
          </InputLabel>
          <Grid container alignItems="flex-start" spacing={3}>
            <Grid item xs>
              <Slider
                min={min}
                max={max}
                color="secondary"
                value={distance}
                onChange={(event, value) => setDistance(Array.isArray(value) ? value[0] : value)}
                getAriaValueText={distanceValueText}
                aria-labelledby="distance-slider"
                step={0.5}
                marks={[10, 20, 30, 40, 50].map(v => ({ value: v, label: v }))}
                valueLabelDisplay="auto"
              />
            </Grid>
            <Grid item>
              <Input
                value={distance}
                margin="dense"
                className={classes.distanceIput}
                onChange={handleDistanceInputChange}
                onBlur={handleDistanceBlur}
                inputProps={{
                  step: 0.5,
                  min: 0,
                  max: 50,
                  type: 'number',
                  'aria-labelledby': 'distance-slider',
                }}
                endAdornment={<InputAdornment position="end">km</InputAdornment>}
              />
            </Grid>
          </Grid>
        </Box>

        <Box margin={3}>
          <InputLabel shrink id="demo-simple-select-placeholder-label-label">
            Route type
          </InputLabel>
          <Select
            fullWidth
            labelId="demo-simple-select-placeholder-label-label"
            id="demo-simple-select-placeholder-label"
            value={routeType}
            onChange={(event) => setRouteType(event.target.value as number)}
          >
            {routeTypes.map((rt) => (
              <MenuItem key={rt.id} value={rt.id}>{rt.name}</MenuItem>
            ))}
          </Select>
        </Box>
      </Box>

      <Box margin={3} display="flex">
        <div className={classes.wrapper}>
          <Button
            color="primary"
            variant="contained"
            disabled={isGenerating}
            onClick={onGenerateRun}
          >
            Create my Run
          </Button>
          {isGenerating && <CircularProgress color="secondary" size={24} className={classes.buttonProgress} />}
        </div>
      </Box>
    </Drawer>
  );
}

export default Configure;