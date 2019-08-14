import React, {PureComponent} from  'react';
import { BrowserRouter as Router, Route, Switch, Redirect, Link, matchPath } from 'react-router-dom';
import  { connect } from  'react-redux';
import Navigation from '../main/navigation'
import Home from '../main/components/Home';
import Update from '../main/components/Update';
import Result from '../main/components/Result';
import { getNavigationItems } from  '../actions';

// require('../global.scss');


const NoMatch =({location})=>(
  <div>
  <h1>Nomatch for
   <code>{location.pathname}</code>
   </h1>
  </div>
)


class Routes extends PureComponent{
  // state = { }
  getPath = (path)=>{
      const urls = ["/result","/upload","/"];
      const stringUrlTexts = ["result", "upload","home"];
      let removeIndex=0;
       const navUrl=  urls.filter( (url,idx) =>{
                        if(url !== path) return true;
                        removeIndex = idx;
                        return false;
                      });
      const pathText =  stringUrlTexts.slice(removeIndex,removeIndex+1)[0];
      const navName= stringUrlTexts.filter( name => name !== pathText );

      this.props.getNavigationItems(navUrl, navName);
}

  render(){
    return(
        <Router >
          <Navigation/>
          <Switch>
            <Route exact path='/'
             render={(props) => <Home {...props} getPath={this.getPath}/>}/>
            <Route exact path='/result'
             render={(props) => <Result {...props} getPath={this.getPath}/>}/>
            <Route exact path='/upload'
              render={(props) => <Update {...props} getPath={this.getPath}/>}/>
            <Route component={NoMatch} />
          </Switch>
        </Router>
      )
    };

}

// export default Routes;
export default connect(null,{getNavigationItems})(Routes);
