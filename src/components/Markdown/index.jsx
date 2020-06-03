import React from 'react';
import PropTypes from 'prop-types';
import { Link, Paper, Divider } from '@material-ui/core';
import ReactMarkdown from 'react-markdown';
import style from './style.module.css';

const Markdown = ({ markdownFile, readmeURL }) => {
  return (
    <Paper className={style.readmeWrapper}>
      <Link
        href={readmeURL}
        variant="body1"
        target="_blank"
        rel="noopener noreferrer"
        className={style.link}
      >
        README.md
      </Link>
      <Divider />
      <ReactMarkdown className={style.readme} escapeHtml={false}>
        {markdownFile}
      </ReactMarkdown>
      ...
    </Paper>
  );
};

Markdown.propTypes = {
  markdownFile: PropTypes.string.isRequired,
  readmeURL: PropTypes.string.isRequired,
};

export default Markdown;
