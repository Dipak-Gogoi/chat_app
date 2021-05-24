import React from 'react';
import { connect } from 'react-redux';
import firebase from '../../Firebase';
import { setCurrentChannel, setPrivateChannel } from '../../actions';
import { Menu, Icon } from '../../../node_modules/semantic-ui-react';

class Starred extends React.Component {

    state = {
        user: this.props.currentUser,
        usersRef: firebase.database().ref('users'),
        activeChannel: '',
        starredChannels: []
    };

    componentDidMount() {
        if (this.state.user) {
            this.addListeners(this.state.user.uid);
        }
    };

    componentWillUnmount() {
        this.removeListener();
    };

    removeListener = () => {
        this.state.usersRef.child(`${this.state.user.uid}/starred`).off();
    };

    addListeners = userId => {
        this.state.usersRef
            .child(userId)
            .child('starred')
            .on('child_added', snap => {
                const starredChannel = { id: snap.key, ...snap.val() };
                this.setState({
                    starredChannels: [...this.state.starredChannels, starredChannel]
                });
            });
        this.state.usersRef
            .child(userId)
            .child('starred')
            .on('child_removed', snap => {
                const channelToRemove = { id: snap.key, ...snap.val() };
                const filteredChannels = this.state.starredChannels.filter(channel => {
                    return channel.id !== channelToRemove.id;
                });
                this.setState({ starredChannels: filteredChannels });
            });
    }

    setActiveChannel = channel => {
        this.setState({ activeChannel: channel.id });
    };

    changeChannel = channel => {
        this.setActiveChannel(channel);
        this.props.setCurrentChannel(channel);
        this.props.setPrivateChannel(false);
    };

    displayChannels = starredChannels =>
        starredChannels.length > 0 && starredChannels.map(channel => {
            return (
                <Menu.Item
                    key={channel.id}
                    onClick={() => this.changeChannel(channel)}
                    name={channel.name}
                    style={{ fontWeight: 999, color: '#fff' }}
                    active={channel.id === this.state.activeChannel}
                >
                    # {channel.name}
                </Menu.Item>
            )
        });

    render() {

        const { starredChannels } = this.state;

        return (
            <Menu.Menu className="menu" >
                <Menu.Item style={{ fontSize: "1.1rem" }}  >
                    <span className="text">
                        <Icon name="star" />STARRED
              </span>{" "}
                    ({
                        starredChannels.length
                    })
            </Menu.Item>
                {this.displayChannels(starredChannels)}
            </Menu.Menu>
        )
    }
}


export default connect(null, { setCurrentChannel, setPrivateChannel })(Starred);