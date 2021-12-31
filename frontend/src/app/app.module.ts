import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'

import { AppRoutingModule } from './app-routing.module'
import { AppComponent } from './app.component'
import { NgbModule } from '@ng-bootstrap/ng-bootstrap'
import { StoreModule } from '@ngrx/store'
import { StoreDevtoolsModule } from '@ngrx/store-devtools'
import { EffectsModule } from '@ngrx/effects'
import { AuthReducer } from './core/state/reducers/auth.reducer'
import { AuthEffects } from './core/state/effects/auth.effects'
import { HttpClientModule } from '@angular/common/http'
@NgModule({
    declarations: [AppComponent],
    imports: [
        HttpClientModule,
        BrowserModule,
        AppRoutingModule,
        NgbModule,
        StoreModule.forRoot({ app: AuthReducer }),
        EffectsModule.forRoot([AuthEffects]),
        StoreDevtoolsModule.instrument({
            maxAge: 25, // Retains last 25 states
            autoPause: true, // Pauses recording actions and state changes when the extension window is not open
        }),
    ],
    providers: [],
    bootstrap: [AppComponent],
})
export class AppModule {}
