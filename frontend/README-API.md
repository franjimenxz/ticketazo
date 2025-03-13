# API de Ticketazo - Documentación

Esta documentación describe la API de Ticketazo que deberás implementar en el backend con FastAPI.

## Estructura General

La API sigue una estructura RESTful con los siguientes recursos principales:

- **Auth**: Endpoints para registro, inicio de sesión y gestión de autenticación
- **Users**: Gestión de perfiles de usuario y configuraciones
- **Tickets**: CRUD de tickets (recibos) y procesamiento de imágenes
- **Analytics**: Endpoints para obtener datos analíticos y estadísticas
- **Categories**: Gestión de categorías de gastos
- **Subscriptions**: Gestión de planes y suscripciones

## Autenticación

La API utiliza autenticación basada en tokens JWT (JSON Web Tokens). Todos los endpoints, excepto los de autenticación pública, requieren un token válido en el encabezado de la solicitud:

