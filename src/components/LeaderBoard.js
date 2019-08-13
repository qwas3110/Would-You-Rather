import React, {Component} from 'react';
import { connect } from 'react-redux';
import {
    Label,
    Image,
    Header,
    Container,
    Table
} from "semantic-ui-react";


class LeaderBoard extends Component {


    render() {

        const { leaderBoard } = this.props;

        return (
            <Container>
                <Table celled>
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell>Users</Table.HeaderCell>
                            <Table.HeaderCell>Score</Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>

                    <Table.Body>
                        {
                            leaderBoard.map((user,idx) => (
                                <Table.Row key={idx}>
                                    <Table.Cell>
                                        <Header as='h4' image>
                                            <Image rounded
                                                   size='medium'
                                                   src={user.avatarURL}
                                                   avatar
                                            />
                                            <Header.Content>
                                                {user.name}
                                                <Header.Subheader>
                                                    <span><b>Answered questions:</b></span>
                                                    <Label circular color="red" size="small">
                                                        {user.answerNum}
                                                    </Label>
                                                </Header.Subheader>

                                                <Header.Subheader>
                                                    <span><b>Created questions:</b></span>
                                                    <Label circular color="red" size="small">
                                                        {user.questionNum}
                                                    </Label>
                                                </Header.Subheader>
                                            </Header.Content>
                                        </Header>
                                    </Table.Cell>
                                    <Table.Cell>
                                        <Label circular color="red" size="big">
                                            {user.total}
                                        </Label>
                                    </Table.Cell>
                                </Table.Row>
                            ))
                        }
                    </Table.Body>
                </Table>
            </Container>
        );
    }

}


function mapstartToProps ({ users }) {
    const leaderBoard = Object.values(users)
        .map((user) => ({
            id: user.id,
            name: user.name,
            avatarURL: user.avatarURL,
            answerNum : Object.values(user.answers).length,
            questionNum : user.questions.length,
            total: Object.values(user.answers).length + user.questions.length        }))
        .sort((a,b) => a.total - b.total)
        .reverse()
        .slice(0,3);

    return {
        leaderBoard
    }
}




export default connect(
    mapstartToProps
)(LeaderBoard);