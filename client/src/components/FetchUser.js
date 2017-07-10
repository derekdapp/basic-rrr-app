import React from 'react';
import { connect } from 'react-redux';
import { clearFlash } from '../actions/flash';
import axios from 'axios';
import { validateToken } from '../utils/auth';

class FetchUser extends React.Component {
  state = { loaded: false }

  componentDidUpdate() {
    this.props.dispatch(clearFlash());
  }

  componentDidMount() {
    let { isAuthenticated, dispatch } = this.props;
    if (isAuthenticated)
      this.loaded();
    else {
      const user = validateToken();
      if(user) {
        dispatch({ type: 'LOGIN', user });
        this.loaded();
      } else {
        this.loaded();
      }
    }
  }

  loaded = () => {
    this.setState({ loaded: true });
  }

  render() {
    let { loaded } = this.state;
    return loaded ? this.props.children : null
  }
}

const mapStateToProps = (state) => {
  return { isAuthenticated: state.user.id }
}

export default connect(mapStateToProps)(FetchUser);
