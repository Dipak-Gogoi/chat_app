import React from 'react';
import { Header, Icon, Input } from '../../../node_modules/semantic-ui-react';


class MessagesHeader extends React.Component {
    render() {
        const { channelName, numUniqueUsers, handleSearchChange, searchLoading, isPrivateChannel, handleStar, isChannelStarred } = this.props;
        return (
            <>
                <div className="message_header">
                    <Header fluid="ture" as="h2" floated="left" style={{ marginBottom: 0 }}>
                        <span>
                            {channelName}
                            {
                                !isPrivateChannel && (
                                    <Icon
                                        onClick={handleStar}
                                        name={isChannelStarred ? 'star' : 'star outline'}
                                        color={isChannelStarred ? 'yellow' : 'black'}
                                        style={{marginLeft: '0.5em'}}
                                    />
                                )
                            }
                        </span>
                        <Header.Subheader>{numUniqueUsers}</Header.Subheader>
                    </Header>
                    <Header floated="right">
                        <Input
                            loading={searchLoading}
                            onChange={handleSearchChange}
                            size="mini"
                            icon="search"
                            name="searchTerm"
                            placeholder="Search Messages"
                        />
                    </Header>
                </div>
            </>
        )
    }
}


export default MessagesHeader;