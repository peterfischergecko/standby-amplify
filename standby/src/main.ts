import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import PubSub from '@aws-amplify/pubsub';
import API from '@aws-amplify/api';
import AUTH from '@aws-amplify/auth';
import awsconfig from './aws-exports';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

API.configure(awsconfig);
PubSub.configure(awsconfig);
AUTH.configure(awsconfig);

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
