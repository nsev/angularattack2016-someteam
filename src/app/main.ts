import { bootstrap }    from '@angular/platform-browser-dynamic';
import { AppComponent } from './app.component';
import { ROUTER_PROVIDERS } from '@angular/router';
// import { FirebaseService } from './common/firebase.service';
import { FIREBASE_PROVIDERS, 
  defaultFirebase, 
  firebaseAuthConfig, 
  AuthProviders, 
  AuthMethods} from 'angularfire2';

bootstrap(AppComponent, [
  ROUTER_PROVIDERS,
  FIREBASE_PROVIDERS,
  defaultFirebase('https://reviewhub.firebaseio.com'),
  firebaseAuthConfig({
    provider: AuthProviders.Github,
    method: AuthMethods.Redirect
  })
 ]);