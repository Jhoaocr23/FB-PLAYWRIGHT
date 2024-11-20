Feature: Automatización de Facebook
  Como usuario de Facebook
  Quiero automatizar un flujo básico de inicio de sesión y navegación
  Para validar que los posts se muestran correctamente

  Background:
    Given Joao inicia la prueba de la "Interaccion con Facebook" ejemplo

  Scenario Outline: Validar errores en el inicio de sesión con credenciales incorrectas
    When el va insertar al login "<username>" y "<password>"
    Then el debe ver un mensaje de error "<outcome>"

    Examples:
      | username       | password | outcome |
      | test@gmail.com | blablab  | failed  |

  Scenario Outline: Flujo Completo: Inicio de Sesión y Dar "Me gusta" a un Post
    When el va insertar al login "<username>" y "<password>"
    Then el debe ver la autenticacion <outcome>
    When el navega a la sección de notificaciones
    And el selecciona una notificación aleatoria
    Then el da "Me gusta" al post

    Examples:
      | username            | password | outcome |
      | jhoaocr23@gmail.com | Gian4321 | success |
