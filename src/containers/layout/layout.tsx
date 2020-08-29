import React, { Component } from 'react'
import { RouteComponentProps, Switch, withRouter } from 'react-router-dom'
import { bindActionCreators, Dispatch } from 'redux'
import { connect } from 'react-redux'
import { IApplicationState } from '../../store'
import NavBar from '../../components/navbar/navbar'
import { MenuRoutes } from '../../routes/routes'

import * as LayoutActions from '../../store/ducks/layout/actions'

interface IState {
    readonly username: string
}

interface IDispatchProps extends RouteComponentProps<any> {
    changeUsername(data: string): void
}

interface IOwnProps extends RouteComponentProps<any> {
    routes: []
}

type Props = IDispatchProps & IOwnProps & IState

class Layout extends Component<Props> {

    public render() {

        const {
            username,
            changeUsername,
            history,
            match,
            location
        } = this.props

        return (
            <React.Fragment>
                <NavBar
                    username={username}
                    changeUsername={changeUsername}
                    history={history}
                    location={location}
                    match={match}
                />

                <Switch>
                    {
                        this.props.routes?.map((route: any, i: number) => (
                            <MenuRoutes key={i} {...route} />
                        ))
                    }
                </Switch>
            </React.Fragment>
        )
    }
}

const mapStateToProps = (state: IApplicationState) => ({
    username: state.layout.username
})


const mapDispatchToProps = (dispatch: Dispatch) => bindActionCreators(LayoutActions, dispatch)

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Layout))