/*
 * HomePage
 *
 * This is the first thing users see of our App, at the '/' route
 */

import React from 'react';
import PropTypes from 'prop-types';
import {Helmet} from 'react-helmet';
import {FormattedMessage} from 'react-intl';
import {connect} from 'react-redux';
import {compose} from 'redux';
import {createStructuredSelector} from 'reselect';

import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';
import {makeSelectRepos, makeSelectLoading, makeSelectError} from 'containers/App/selectors';
import H2 from 'components/H2';
import ReposList from 'components/ReposList';
import AtPrefix from './AtPrefix';
import CenteredSection from './CenteredSection';
import Form from './Form';
import Input from './Input';
import Section from './Section';
import messages from './messages';
import {loadRepos} from '../App/actions';
import {changeUsername} from './actions';
import {makeSelectUsername} from './selectors';
import reducer from './reducer';
import saga from './saga';
import Dropzone from 'react-dropzone'
export class HomePage extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  /**
   * when initial state username is not null, submit the form to load repos
   */
  constructor() {
    super()
    this.state = {
      files: []
    }
  }

  componentDidMount() {
    if (this.props.username && this.props.username.trim().length > 0) {
      this
        .props
        .onSubmitForm();
    }
  }
  onDrop(files) {
    this.setState({files});
  }

  render() {
    const {loading, error, repos} = this.props;
    const reposListProps = {
      loading,
      error,
      repos
    };

    return (
      <article>
        <Helmet>
          <title>Home Page</title>
          <meta name="description" content="A React.js Boilerplate application homepage"/>
        </Helmet>
        <div className="dropzone">
          <Dropzone onDrop={this
            .onDrop
            .bind(this)}>
            <p>Try dropping some files here, or click to select files to upload.</p>
          </Dropzone>
        </div>
        <aside>
          <h2>Dropped files</h2>
          <ul>
            {this
              .state
              .files
              .map(f => <li key={f.name}>{f.name}
                - {f.size}
                bytes</li>)
}
          </ul>
        </aside>
      </article>
    );
  }
}

HomePage.propTypes = {
  loading: PropTypes.bool,
  error: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  repos: PropTypes.oneOfType([PropTypes.array, PropTypes.bool]),
  onSubmitForm: PropTypes.func,
  username: PropTypes.string,
  onChangeUsername: PropTypes.func
};

export function mapDispatchToProps(dispatch) {
  return {
    onChangeUsername: (evt) => dispatch(changeUsername(evt.target.value)),
    onSubmitForm: (evt) => {
      if (evt !== undefined && evt.preventDefault) 
        evt.preventDefault();
      dispatch(loadRepos());
    }
  };
}

const mapStateToProps = createStructuredSelector({repos: makeSelectRepos(), username: makeSelectUsername(), loading: makeSelectLoading(), error: makeSelectError()});

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({key: 'home', reducer});
const withSaga = injectSaga({key: 'home', saga});

export default compose(withReducer, withSaga, withConnect,)(HomePage);
