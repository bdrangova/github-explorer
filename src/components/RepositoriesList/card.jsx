import React from 'react';
import { useIntl, defineMessages } from 'react-intl';
import { Link } from 'react-router-dom';
import {
  Card,
  Typography,
  CardContent,
  CardActionArea,
} from '@material-ui/core';
import { Star, Code, Public, Home } from '@material-ui/icons';
import { RepositoryProps } from 'src/services/proptypes';
import { formatNumber } from 'src/services/helpers';
import style from './style.module.css';

const messages = defineMessages({
  updated: {
    id: 'updated.on',
  },
});

const CardItem = ({ item }) => {
  const {
    id,
    name,
    full_name,
    description,
    stargazers_count,
    language,
    updated_at,
    owner,
    private: priv,
  } = item;
  const linkTo = {
    pathname: `/repos/${full_name}`,
    repoId: id,
  };

  const intl = useIntl();
  const updatedAt = new Date(updated_at);

  return (
    <Card className={style.card}>
      <CardActionArea className={style.card}>
        <Link
          to={linkTo}
          style={{
            textDecoration: 'none',
            color: 'inherit',
          }}
        >
          <CardContent>
            <div className={style.stats}>
              <Typography
                variant="subtitle1"
                className={style.owner}
                color="textSecondary"
                data-testid="owner-name"
              >
                {owner.login}
              </Typography>
              {!priv ? (
                <Public color="primary" />
              ) : (
                <Home color="secondary" />
              )}
            </div>
            <Typography
              variant="h6"
              component="h2"
              noWrap
              className={style.title}
              data-testid="repo-name"
            >
              {name}
            </Typography>
            <Typography
              variant="body2"
              component="p"
              gutterBottom
              noWrap
            >
              {description}
            </Typography>
            <div className={style.stats}>
              <Typography
                variant="subtitle1"
                className={style.typography}
                color="textSecondary"
              >
                <Star color="primary" />
                {formatNumber(stargazers_count)}
              </Typography>
              <Typography
                variant="subtitle1"
                className={style.typography}
                color="textSecondary"
              >
                <Code color="primary" />
                {language}
              </Typography>
            </div>
            <Typography
              variant="subtitle1"
              className={style.pos}
              color="textSecondary"
            >
              {intl.formatMessage(messages.updated, {
                date: updatedAt.toLocaleDateString(),
                time: updatedAt.toLocaleTimeString(),
              })}
            </Typography>
          </CardContent>
        </Link>
      </CardActionArea>
    </Card>
  );
};

CardItem.propTypes = {
  item: RepositoryProps.isRequired,
};

export default CardItem;
