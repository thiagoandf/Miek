import { connect } from 'react-redux';
import { goBack, push } from 'react-router-redux';
import { compose } from 'redux';
import ackbar from '../../api/ackbar';
import makeDomainActions from '../../state/domain/actions';
import {
  makeSelectGame,
  selectPlayerLikedGames,
} from '../../state/domain/selectors';
import GameDetail from '../../ui/pages/GameDetail';

const domainActions = makeDomainActions(ackbar);

const mapStateToProps = (state, ownProps) => ({
  game: makeSelectGame(ownProps.match.params.id)(state),
  playerLikedGames: selectPlayerLikedGames,
});

const mapDispatchToProps = dispatch => ({
  goToRecommendations: () => dispatch(push('/recommendations')),
  goToGameList: () => dispatch(push('/games')),
  logout: () => dispatch(push('/')),
  requestGameList: () => dispatch(domainActions.requestGameList()),
  likeGame: id => dispatch(domainActions.likeGame(id)),
  goBack: () => dispatch(goBack()),
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(GameDetail);
