import { Component } from '@angular/core';

import { AboutPage } from '../about/about';
import { ContactPage } from '../contact/contact';
import { HomePage } from '../home/home';
import { DashboardPage } from '../dashboard/dashboard';
import { AuthProvierProvider } from '../../providers/auth-provier/auth-provier';
import { UserProvider } from '../../providers/user/user';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = HomePage;
  tab2Root = AboutPage;
  tab3Root = ContactPage;
  tab4Root = DashboardPage;

  user = {};

  constructor(
    private _authProvider: AuthProvierProvider,
    private _userProvider: UserProvider
    ) {
    this._userProvider.userLogged(this._authProvider.user.uid)
                .subscribe( user => {
                  this.user = user[0];
                  console.log(this.user);
                })
  }
}
