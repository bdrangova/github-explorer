import React from 'react';
import { useIntl, defineMessages } from 'react-intl';
import PropTypes from 'prop-types';
import {
  Box,
  Grid,
  Button,
  Container,
  Typography,
  ButtonGroup,
} from '@material-ui/core';
import { Apps, List, HourglassFull } from '@material-ui/icons';
import { RepositoryProps, PagerProps } from 'src/services/proptypes';
import Loading from 'src/components/Loading';
import Pagination from 'src/components/Pagination';
import Card from './card';
import style from './style.module.css';

const messages = defineMessages({
  seconds: {
    id: 'seconds',
  },
});

const RepositoryList = ({
  repos,
  grid,
  pager,
  loading,
  duration,
  setLayout,
  handlePageChange,
}) => {
  const columnNumber = grid ? 4 : 12;
  const intl = useIntl();
  const loadingComponent = (
    <Grid
      item
      xs={12}
      sm={12}
      md={12}
      lg={12}
      className={style.loader}
    >
      <Loading />
    </Grid>
  );

  return (
    <Container className={style.container}>
      <Box className={style.box}>
        {repos.length > 0 && (
          <>
            <Box className={style.box}>
              <HourglassFull color="primary" fontSize="small" />
              <Typography variant="caption">
                {duration} {intl.formatMessage(messages.seconds)}
              </Typography>
            </Box>
            <ButtonGroup
              variant="contained"
              aria-label="contained primary button group"
            >
              <Button
                onClick={() => setLayout('grid')}
                disabled={grid}
                data-testid="set-grid-btn"
              >
                <Apps />
              </Button>
              <Button
                onClick={() => setLayout('list')}
                disabled={!grid}
                data-testid="set-list-btn"
              >
                <List />
              </Button>
            </ButtonGroup>
          </>
        )}
      </Box>
      <Grid
        className={style.grid}
        alignItems="stretch"
        justify="space-between"
        container
        spacing={grid ? 3 : 1}
        data-testid="results-display"
      >
        {!loading
          ? repos &&
            repos.map((repo) => (
              <Grid
                item
                xs={12}
                sm={columnNumber}
                md={columnNumber}
                key={repo.id}
              >
                <Card item={repo} />
              </Grid>
            ))
          : loadingComponent}
      </Grid>
      {repos.length > 0 && (
        <Pagination
          pager={pager}
          handleChange={handlePageChange}
          disabled={loading}
        />
      )}
    </Container>
  );
};

RepositoryList.propTypes = {
  repos: PropTypes.arrayOf(RepositoryProps).isRequired,
  grid: PropTypes.bool.isRequired,
  pager: PagerProps.isRequired,
  loading: PropTypes.bool.isRequired,
  duration: PropTypes.number.isRequired,
  setLayout: PropTypes.func.isRequired,
  handlePageChange: PropTypes.func.isRequired,
};

export default RepositoryList;
