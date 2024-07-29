import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { config } from './app/app-routing.module';

const bootstrap = () => bootstrapApplication(AppComponent);

console.log(config.apiUrl);

export default bootstrap;