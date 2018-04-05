import React, { Component, Fragment } from 'react'
import {
	//BrowserRouter as Router,
	Router,
	Switch,
	Route,
	Redirect,
	withRouter
} from 'react-router-dom'
import { Header } from './components'
import {
	Import,
	Notifications,
	Users,
	SingleAd,
	Login,
	Logout,
	Callback,
	HomeScreen
} from './screens'

import Auth from './components/auth/auth.js'
import history from './components/auth/history'

// Import the minified css
import './Assets/css/default.min.css'

const auth = new Auth()

const AuthButton = withRouter(
	({ history }) => (auth.isAuthenticated() ? <Header auth={auth} /> : null)
)

const PrivateRoute = ({ component: Component, ...rest }) => (
	<Route
		{...rest}
		render={props =>
			auth.isAuthenticated() ? (
				<Component auth={auth} {...props} />
			) : (
				<Redirect
					to={{
						pathname: '/',
						state: { from: props.location }
					}}
				/>
			)
		}
	/>
)

class App extends Component {
	render() {
		return (
			<Router history={history}>
				<Fragment>
					<AuthButton />
					<Switch>
						<PrivateRoute path="/import" component={Import} />
						<PrivateRoute
							path="/notifications"
							component={Notifications}
						/>
						<PrivateRoute path="/users" component={Users} />
						<PrivateRoute path="/ad/:id" component={SingleAd} />
						<Route
							exact
							path="/login"
							render={props => <Login auth={auth} {...props} />}
						/>
						<Route
							exact
							path="/logout"
							render={props => <Logout auth={auth} {...props} />}
						/>
						<Route
							exact
							path="/callback"
							render={props => {
								return (
									<Callback
										auth={auth}
										changeLogin={this.changeLogin}
										{...props}
									/>
								)
							}}
						/>
						<Route
							path="/"
							render={props => (
								<HomeScreen auth={auth} {...props} />
							)}
						/>
					</Switch>
				</Fragment>
			</Router>
		)
	}
}

export default App
