import React, { useState } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import {
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Divider,
  Grid,
  Button,  
  Typography
} from '@material-ui/core';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import {PdfViewer} from '../../../../components'
const useStyles = makeStyles(() => ({
  root: {
    width: '100%',
  },
  viewer:{
    overflow:'hidden'
  }
}));

const AtencionResultado = props => {
  const { className, ...rest } = props;
  const classes = useStyles();
  const [atencion] = useState(10);


  return (
    <Card
      {...rest}
      className={clsx(classes.root, className)}
    >
        <CardHeader
          //subheader="Laboratorio"
          title="Resultado de Exámenes"
        />
        <Divider />
        <CardContent>
          <Grid
            container
            spacing={3}
          >
            <Grid
              item
              xs={12}
            >
            {
              atencion===0 ?
              <Typography
                color="textSecondary"
                variant="body1"
              >
                Sin Resultado...
              </Typography>
              :
              <div className={classes.viewer}>
                <PdfViewer file={"images/test.pdf"} type="pdf" />
              </div>
            }
              
            </Grid>
          </Grid>
        </CardContent>
        <Divider />
        <CardActions>
          <Button
            color="secondary"
            variant="contained"
            startIcon={<ArrowBackIosIcon />}
          >
            Atras
          </Button>
        </CardActions>
    </Card>
  );
};

AtencionResultado.propTypes = {
  className: PropTypes.string
};

export default AtencionResultado;
