import { connect } from 'react-redux';
import App from '../components/App';
import * as auth from '../actions/auth';
import * as quiz from '../actions/quiz';

const mapStateToProps = state => ({
  auth: state.auth,
  quiz: state.quiz,
});

const mapDispatchToProps = dispatch => ({
  validateToken: () => dispatch(auth.validateToken()),
  fetchQuizList: () => dispatch(quiz.fetchQuizList()),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
