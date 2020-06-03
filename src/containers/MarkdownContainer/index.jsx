import React, { useState, useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import { FirebaseAuth } from 'src/providers/Auth';
import { GithubService } from 'src/services/github';
import Markdown from 'src/components/Markdown';
import ErrorMessage from 'src/components/ErrorMessage';
import Loading from 'src/components/Loading';

const MarkdownContainer = ({ pathname }) => {
  const { token } = useContext(FirebaseAuth);
  const [readme, setReadme] = useState('');
  const [readmeURL, setReadmeURL] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState({
    error: false,
  });

  useEffect(() => {
    const getReadme = async () => {
      const data = await GithubService.getReadmeData(pathname, token);
      if (data.status === 'ok') {
        setReadme(data.file);
        setReadmeURL(data.readmeURL);
        setLoading(false);
      } else {
        setError({
          error: true,
          duration: data.duration,
        });
        setLoading(false);
      }
    };
    setLoading(true);
    getReadme();
  }, []);

  if (loading) {
    return <Loading />;
  }

  if (error.error) {
    return (
      <ErrorMessage error={'no-readme'} duration={error.duration} />
    );
  }

  return <Markdown markdownFile={readme} readmeURL={readmeURL} />;
};

MarkdownContainer.propTypes = {
  pathname: PropTypes.string.isRequired,
};

export default MarkdownContainer;
