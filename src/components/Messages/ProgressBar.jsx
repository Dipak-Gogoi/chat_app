import React from 'react';
import { Progress } from '../../../node_modules/semantic-ui-react';


const ProgressBar = ({uploadState, percentUploaded}) => (

    uploadState === 'uploading' && (
        <Progress 
            className="progress_bar"
            percent={percentUploaded}
            progress
            indicating
            size="medium"
            inverted
        />
    )
);

export default ProgressBar;