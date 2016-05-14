import { bootstrap }    from '@angular/platform-browser-dynamic';
import { AppComponent } from './app.component';
import { FirebaseService } from './common/firebase.service';

bootstrap(AppComponent, [
FirebaseService
  ]);