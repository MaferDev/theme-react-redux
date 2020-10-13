import React from 'react';

import Viewer,{ 
  Worker,
 /* defaultLayout,
  RenderToolbar,
  Slot ,
  RenderViewerProps, 
  ScrollMode, 
  SpecialZoomLevel, 
  SelectionMode */
} from '@phuocng/react-pdf-viewer';

import '@phuocng/react-pdf-viewer/cjs/react-pdf-viewer.css';
import { makeStyles } from '@material-ui/core/styles';
import {
  Paper ,
  IconButton
}from '@material-ui/core';
import {LinearProgress} from '@material-ui/core';
import CloudDownloadIcon from '@material-ui/icons/CloudDownload';
import PrintIcon from '@material-ui/icons/Print';
import RotateRightIcon from '@material-ui/icons/RotateRight';
import RotateLeftIcon from '@material-ui/icons/RotateLeft';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    height:'700px',
    position:'relative'
  },
}));
const layout = (
  //isSidebarOpened,
  container,
  main,
  //toolbar,
  //sidebar,
) => {
  return (
      <div
          {...container.attrs}
          style={Object.assign({}, {
              border: '1px solid rgba(0, 0, 0, .3)',
              height: '100%',
              overflow: 'hidden',
              width: '100%',
          }, container.attrs.style)}
      >
          {container.children}
          <div
              {...main.attrs}
              style={Object.assign({}, {
                  height: '100%',
                  overflow: 'scroll',
              }, main.attrs.style)}
          >
              {main.children}
          </div>
      </div>
  );
};
const render = props => {
  
  return (
    <React.Fragment>
      <Paper style={{ textAlign: 'end'}}>
        <IconButton aria-label="Rotate" color="secondary" onClick={(e) =>{ props.rotate(90); e.preventDefault()}}>
          <RotateRightIcon />
        </IconButton>
        <IconButton aria-label="Rotate" color="secondary" onClick={(e) =>{ props.rotate(-90); e.preventDefault()}}>
          <RotateLeftIcon />
        </IconButton>          
        <IconButton aria-label="print" color="secondary" onClick={(e) =>{ props.print(); e.preventDefault()}}>
          <PrintIcon />
        </IconButton>
        <IconButton aria-label="download" color="secondary" onClick={(e) =>{ props.download(); e.preventDefault()}}>
          <CloudDownloadIcon />
        </IconButton>          
      </Paper>
      <div style={{ height: '750px', border:'none' }}>
        {props.viewer}
      </div>
    </React.Fragment>
  );
};
const base64toBlob = (data) => {
  // Cut the prefix `data:application/pdf;base64` from the raw base 64
  const base64WithoutPrefix = data.substr('data:application/pdf;base64,'.length);
  
  const bytes = atob(base64WithoutPrefix);
  let length = bytes.length;
  let out = new Uint8Array(length);
  
  while (length--) {
    out[length] = bytes.charCodeAt(length);
  }
  return new Blob([out], { type: 'application/pdf' });
}

const PdfViewer = ({file,type}) => {
  const classes = useStyles();
  //const blob = base64toBlob(base64String);
    //const url = URL.createObjectURL(blob);
  const [progress, setProgress] = React.useState(0);
  const [buffer, setBuffer] = React.useState(10);
  const [showPdf,setShowPdf]= React.useState(false)
  const url = type==="pdf"?file:base64toBlob(file)

  const onDocumentLoad = (e) => {
    setShowPdf(!showPdf)
  }

  const progressRef = React.useRef(() => {});
  React.useEffect(() => {
    progressRef.current = () => {
      if (progress > 100) {
        setProgress(0);
        setBuffer(10);
      } 
      else 
      {
        const diff = Math.random() * 10;
        const diff2 = Math.random() * 10;
        setProgress(progress + diff);
        setBuffer(progress + diff + diff2);
      }
    };
  })

  React.useEffect(() => {
    const timer = setInterval(() => {
      progressRef.current();
    }, 1000)

    return () => {
      clearInterval(timer);
    };
  }, [])

  return (
    <div className={classes.root}>
        <Worker workerUrl="https://unpkg.com/pdfjs-dist@2.4.456/build/pdf.worker.min.js">
        {
          !showPdf&&
          <LinearProgress variant="buffer" value={progress} valueBuffer={buffer}  />
        }
          <Viewer 
            fileUrl={url} 
            //onDocumentLoad={onDocumentLoad} 
            //layout={layout}
            //render={render}
          />
        </Worker>  
    </div>
  )
}

export default PdfViewer
