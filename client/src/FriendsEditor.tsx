// TODO: Implement FriendsEditor
import React, { Component } from "react";
import { Schedule, jsonifySchedule } from "./schedule";
import { Friends, jsonifyFriends } from "./friends";
import { USERS } from "./users";

type FriendsProps = {
    user: string;
    schedule?: Schedule;
    friends?: Friends;
    setSchedule: (s: Schedule) => void;
    setFriends: (f: Friends) => void;
};

export class FriendsEditor extends Component<FriendsProps> {
    constructor(props: FriendsProps) {
        super(props);
        this.state = {newFriend: ""};
    }

    render = (): JSX.Element => {
        return <div>
            <h2>Check those users who are your friends:</h2>
            <ul>{this.renderUsersList()}</ul>
            <p>Those users will see some information about your schedule.</p>
        </div>
    }

    renderUsersList = (): Array<JSX.Element> => {
        const list: Array<JSX.Element> = [];
        for (const user of USERS) {
            if (user === this.props.user) {
                continue;
            }
            list.push(
                <li>
                    {user + " "}
                    <button value={user} onClick={this.doToggleFriendClick}>
                        {this.doIsFriendClick(user) ? "Unfriend" : "Friend"}
                    </button>
                </li>
            )
        }

        return list;
    }

    doIsFriendClick = (name: string): boolean => {
        if (this.props.friends === undefined) {
            return false;
        }

        for (const user of this.props.friends) {
            if (user === name) {
                return true;
            }
        }

        return false;
    }

    doToggleFriendClick = (evt: React.MouseEvent<HTMLButtonElement>): void => {
        const user = evt.currentTarget.value;
        const cur = this.props.friends === undefined ? [] : this.props.friends;
        const savedSchedule = this.props.schedule === undefined ? [] : this.props.schedule;
        const newFriends = this.doIsFriendClick(user) ? cur.filter((f) => f !== user) : cur.concat([user]);

        this.props.setFriends(newFriends);
        const body ={
            user: this.props.user,
            schedule: jsonifySchedule(savedSchedule),
            friends: jsonifyFriends(newFriends)
        };

        fetch("/api.setUserData", {
            method: "POST",
            headers: {"Content-Type" : "application/json"},
            body: JSON.stringify(body)
        }).catch(() => console.error("failed to load user data"))
    }
}