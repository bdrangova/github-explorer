import React, { Suspense } from 'react';
import PropTypes from 'prop-types';
import { useIntl, defineMessages } from 'react-intl';
import { Link, Grid, Container, Typography } from '@material-ui/core';
import {
  Star,
  Visibility,
  MergeType,
  InfoOutlined,
} from '@material-ui/icons';
import { RepositoryProps } from 'src/services/proptypes';
import { formatNumber, getRelativeTime } from 'src/services/helpers';
import Loading from 'src/components/Loading';
import style from './style.module.css';
const ImageComp = React.lazy(() => import('src/components/Image'));

const messages = defineMessages({
  updated: {
    id: 'updated.on',
  },
});

const RepositoryDetails = ({ repository, children }) => {
  const {
    full_name,
    description,
    stargazers_count,
    watchers_count,
    open_issues,
    forks,
    owner,
    html_url,
    updated_at,
  } = repository;
  const { avatar_url } = owner;
  const intl = useIntl();
  const updatedAt = new Date(updated_at);
  return (
    <Suspense fallback={<Loading />}>
      <Container className={style.container}>
        <Grid container spacing={1}>
          <Grid item xs={12} sm={9} md={9} container spacing={2}>
            <Grid item sm={12} md={8}>
              <Link
                href={html_url}
                variant="h4"
                target="_blank"
                rel="noopener noreferrer"
              >
                {full_name}
              </Link>
            </Grid>
            <Grid item sm={12} md={8}>
              <Typography variant="body1" component="p" gutterBottom>
                {description}
              </Typography>
            </Grid>
            <Grid container spacing={2} item sm={12} md={8}>
              <Grid item xs={6} md={3} lg={3} xl={3}>
                <Typography
                  variant="subtitle1"
                  className={style.typography}
                  color="textSecondary"
                >
                  <Visibility color="primary" />
                  {formatNumber(watchers_count)}
                </Typography>
              </Grid>
              <Grid item xs={6} md={3} lg={3} xl={3}>
                <Typography
                  variant="subtitle1"
                  className={style.typography}
                  color="textSecondary"
                >
                  <Star color="primary" />
                  {formatNumber(stargazers_count)}
                </Typography>
              </Grid>
              <Grid item xs={6} md={3} lg={3} xl={3}>
                <Typography
                  variant="subtitle1"
                  className={style.typography}
                  color="textSecondary"
                >
                  <MergeType color="primary" />
                  {formatNumber(forks)}
                </Typography>
              </Grid>
              <Grid item xs={6} md={3} lg={3} xl={3}>
                <Typography
                  variant="subtitle1"
                  className={style.typography}
                  color="textSecondary"
                >
                  <InfoOutlined color="primary" />
                  {formatNumber(open_issues)}
                </Typography>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12} sm={3} md={3} className={style.image}>
            <ImageComp source={avatar_url} />
          </Grid>
          <Grid item xs={12} sm={12} lg={12} md={12}>
            <Typography
              variant="subtitle1"
              className={style.typography}
              color="textSecondary"
            >
              {intl.formatMessage(messages.updated, {
                date: updatedAt.toLocaleDateString(),
                time: updatedAt.toLocaleTimeString(),
              })}
            </Typography>
          </Grid>
          <Grid item xs={12} sm={12} lg={12} md={12}>
            {children}
          </Grid>
        </Grid>
      </Container>
    </Suspense>
  );
};

RepositoryDetails.propTypes = {
  repository: RepositoryProps.isRequired,
  children: PropTypes.node.isRequired,
};

export default RepositoryDetails;
