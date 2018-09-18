import { connect } from 'react-redux';
import View from './components/View';

const mapStateToProps = ({ authentication }) => ({
    authentication
});

const mapDispatchToProps = (dispatch) => ({
  onLogin: (authentication) => dispatch({type: 'LOGIN', authentication})
});

export default connect(mapStateToProps, mapDispatchToProps)(View);