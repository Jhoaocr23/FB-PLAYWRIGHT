import { Given, Then, When } from '@cucumber/cucumber';
import { Actor, actorInTheSpotlight } from '@serenity-js/core';
import { Navigate } from '@serenity-js/web';

import { AleatoryNotification, FacebookLogin, NotificationFb, PostA } from '../../test/facebooklogin/FacebookLogin';
import { VerifyFacebookLogin } from '../../test/facebooklogin/VerifyFacebookLogin';

// import { PickExample } from '../../test/examples';

Given('{actor} inicia la prueba de la {string} ejemplo',async  (actor: Actor, s: string) => {
    await actor.attemptsTo(
        Navigate.to('/'),
    );
});

When('{pronoun} va insertar al login {string} y {string}', async (actor: Actor, username: string, password: string) => {
    await actor.attemptsTo(
        FacebookLogin.using(username, password),
    );
});

Then('{pronoun} debe ver un mensaje de error {string}', async (pronoun: string, expectedOutcome: string) => {
    await actorInTheSpotlight().attemptsTo(
        VerifyFacebookLogin[expectedOutcome](),
    )
});

Then(/.* debe ver la autenticacion (success|failed)/, async (expectedOutcome: string) => {
    await actorInTheSpotlight().attemptsTo(
        VerifyFacebookLogin[expectedOutcome](),
    )
});

When('{pronoun} navega a la sección de notificaciones', async (actor: Actor) => {
    await actor.attemptsTo(
        NotificationFb.using()
    );

});

When('{pronoun} selecciona una notificación aleatoria', async (actor: Actor) => {
    await actor.attemptsTo(
        await AleatoryNotification.using() 
    );
});

Then('{pronoun} da "Me gusta" al post', async (actor: Actor) => {
    await actor.attemptsTo(
        PostA.using() 
    );

});

