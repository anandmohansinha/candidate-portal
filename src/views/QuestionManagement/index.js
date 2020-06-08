import React, { Component } from 'react'
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Table from "components/Table/Table.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import Button from '@material-ui/core/Button';
import { Typography } from '@material-ui/core';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';

export default function QuestionManagement () {
    const [value, setValue] = React.useState('female');

    const handleChange = (event) => {
        setValue(event.target.value);
    };
    return (
        <GridContainer>
            <GridItem xs={12} sm={12} md={12}>
                <Card>
                    <CardHeader color="primary">
                        <Typography variant="h6">
                            Technology - JAVA
                        </Typography>
                        {/* <p className={classes.cardCategoryWhite}>
              Here is a subtitle for this table
            </p> */}

                    </CardHeader>
                    <CardBody>
                        <div>
                            <Typography variant="h6" mt={8}>
                                Sample question relevant to technology?
                            </Typography>
                            <FormControl component="fieldset">
                                <FormLabel component="legend">Gender</FormLabel>
                                <RadioGroup aria-label="gender" name="gender1" value={value} onChange={handleChange}>
                                    <FormControlLabel value="female" control={<Radio />} label="Female" />
                                    <FormControlLabel value="male" control={<Radio />} label="Male" />
                                    <FormControlLabel value="other" control={<Radio />} label="Other" />
                                    <FormControlLabel value="disabled" disabled control={<Radio />} label="(Disabled option)" />
                                </RadioGroup>
                            </FormControl>
                        </div>
                    </CardBody>

                    <Button
                        type="button"
                        variant="contained"
                        color="primary"
                        size="large"
                    >
                        Modify 
                  </Button>
                </Card>
                <div>
                    <Button
                        type="button"
                        variant="contained"
                        color="secondary"
                        size="large"
                    >
                        + ADD
                  </Button>
                </div>
            </GridItem>
        </GridContainer>
    )
};