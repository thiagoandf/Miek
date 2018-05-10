import React from 'react';
import PropTypes from 'prop-types';
import { GridList, GridTile } from 'material-ui/GridList';
import IconButton from 'material-ui/IconButton';
import ThumbUp from 'material-ui/svg-icons/action/thumb-up';
import { AppBar, FlatButton } from 'material-ui';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import TokaidoImage from 'images/tokaido.jpg';
import PowerSettingsNew from 'material-ui/svg-icons/action/power-settings-new';

const muiTheme = getMuiTheme({
  appBar: {
    color: '#263238',
    textColor: 'rgba(255, 255, 255, 0.87)',
    maxWidth: 500,
  },
  flatButton: {
    fontWeight: 600,
  },
});

const styles = {
  buttonStyle: {
    backgroundColor: 'transparent',
    color: 'white',
    fontWeight: 50,
    paddingTop: 12,
    height: 40,
  },
  notShownButton: {
    display: 'none',
  },
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  gameStyle: {
    margin: '20px',
    maxWidth: '300px',
    textAlign: 'center',
    align: 'center',
  },
};

class GameList extends React.Component {
  componentDidMount() {
    this.props.requestGameList();
  }

  render() {
    return (
      <MuiThemeProvider muiTheme={muiTheme}>
        <div style={styles.container}>
          <div style={{ maxWidth: '100%', minWidth: '100%' }}>
            <AppBar title="GameGuide" showMenuIconButton={false}>
              <FlatButton label="Recommendations" onClick={this.props.goToRecommendations} style={styles.buttonStyle} />
              <FlatButton icon={<PowerSettingsNew />} onClick={this.props.logout} style={styles.buttonStyle} />
            </AppBar>
            <GridList
              cellHeight={180}
              style={{ alignItems: 'center' }}
            >
              {this.props.gameList.map((game) => (
                <GridTile
                  key={game.id}
                  title={game.name}
                  actionIcon={<IconButton><ThumbUp color="white" onClick={() => this.props.likeGame(game.id)} /></IconButton>}
                  style={styles.gameStyle}
                  onClick={() => this.props.goToGameDetail(game.id)}
                >
                  <img src={TokaidoImage} alt="cool game" />
                </GridTile>
              ))}
            </GridList>
          </div>
        </div>
      </MuiThemeProvider>
    );
  }
}

GameList.propTypes = {
  gameList: PropTypes.arrayOf(PropTypes.object),
  requestGameList: PropTypes.func.isRequired,
  goToRecommendations: PropTypes.func.isRequired,
  logout: PropTypes.func.isRequired,
  likeGame: PropTypes.func.isRequired, // eslint-disable-line
  goToGameDetail: PropTypes.func.isRequired, // eslint-disable-line
};

export default GameList;
