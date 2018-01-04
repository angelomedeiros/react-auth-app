import React from 'react';

import Dashboard from 'components/views/Dashboard';
import Profile from 'components/views/Profile';
import 'isomorphic-fetch';
import {
    createRequestOptions
  } from 'utils/helperFuncs';
import cookie from 'utils/cookies';
class ProfilePage extends React.Component {

    static async getInitialProps({ req }) {
        
        const isServer = typeof window === 'undefined';
        if(isServer) {
            const baseUrl = req ? `${req.protocol}://${req.get('Host')}` : '';
            const token = req.cookies.token;
            const requestURL = `${baseUrl}/api/profile`;
            const options = createRequestOptions('GET', null, { Authorization: `Bearer ${token}` });
            const requestObject = await fetch(requestURL, options);
            const user = await requestObject.json();

            return { user, isServer };
        } else {
            return { isServer }
        }
    }
    constructor(props){
        super(props);
        this.state = {
            user: props.user
        }
    }
    async componentWillMount() {
        if(!this.props.isServer){
            const token = cookie.load('token');
            const requestURL = `/api/profile`;
            const options = createRequestOptions('GET', null, { Authorization: `Bearer ${token}` });
            const requestObject = await fetch(requestURL, options);
            const user = await requestObject.json();
            this.setState({ user });
        }
    }
	render() {
        if(!this.state.user) return null;
        return (
            <Dashboard>
                <Profile 
                    user={this.state.user}
                />
            </Dashboard>
		);
	}
}

export default ProfilePage;