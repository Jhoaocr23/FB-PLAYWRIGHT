import { Ensure, includes } from '@serenity-js/assertions';
import { Task } from '@serenity-js/core';
import { By, isVisible, PageElement, Text } from '@serenity-js/web';

export class VerifyFacebookLogin {
    private static hasMessageError = ()=>
        Task.where('#actor verifica que el mensaje este presente',
            Ensure.that(MessageError.messageAlert(), isVisible()),
        )

    static success = () => 
        Task.where('#actor verifica que el login sea correcto',
            Ensure.that(Text.of(LoginSucces.messageAlert()), includes('Te damos la bienvenida a Facebook, Juan'))
        )
            
    static failed = () =>
        Task.where('#actor verifica que el login sea incorrecto',
            VerifyFacebookLogin.hasMessageError(),
            Ensure.that(Text.of(MessageError.messageAlert()), includes('La contraseña que ingresaste es incorrecta.'))
        )
}
const LoginSucces = {
    messageAlert: () =>
        PageElement.located(By.xpath('/html/body/div[1]/div/div[1]/div/div[3]/div/div/div[1]/div[1]/div/div[2]/div/div/div[1]/span')).describedAs('Te damos la bienvenida a Facebook, Juan')
}
const MessageError = {
    messageAlert: () =>
        PageElement.located(By.xpath('/html/body/div[1]/div[1]/div[1]/div/div[2]/div[2]/form/div/div[2]/div[2]')).describedAs('La contraseña que ingresaste es incorrecta.')
}
