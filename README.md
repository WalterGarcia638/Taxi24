# Taxi24
Api para la StartupTaxi24

# Taxi24 Backend

Este proyecto es una API para gestionar un sistema de taxis. Está desarrollado en **NestJS** con una arquitectura limpia y utiliza **PostgreSQL** como base de datos.

---

## **Requisitos previos**

Asegúrate de tener las siguientes herramientas instaladas en tu máquina:

- **Node.js** (v18 o superior)
- **npm** (v8 o superior) o **yarn**
- **PostgreSQL** (v14 o superior)
- **Git**

---

## **Instalación**

1. Clona este repositorio:
   ```bash
   git clone https://github.com/tu-usuario/taxi24.git
    ```
2. Ve al directorio del proyecto:
  ```
   cd taxi24
```

4. Instala las dependencias:
   ```
   npm install
   ```

6. Configura el archivo de entorno .env: Crea un archivo .env en la raíz del proyecto con las siguientes variables:
```
   DATABASE_HOST=localhost
   DATABASE_PORT=5432
   DATABASE_USERNAME=postgres
   DATABASE_PASSWORD=tu-contraseña
   DATABASE_NAME=taxi24
```

5. Iniciar el servidor en desarrollo
  ```
    npm run start:dev
    Accede a la API en: http://localhost:3000
    Swagger está habilitado en: http://localhost:3000/api
```

6. Ejecutar pruebas unitarias
   ```
   npm test
   ```

7. Estructura del proyecto
  ```
   src/
   ├── adapters/
   │   ├── controllers/         # Controladores de la API
   │   ├── dto/                 # Data Transfer Objects (DTOs)
   ├── application/
   │   ├── use-cases/           # Casos de uso
   │   ├── ports/               # Interfaces de repositorios
   ├── domain/
   │   ├── entities/            # Entidades del dominio
   ├── infrastructure/
   │   ├── repositories/        # Implementaciones de los repositorios
   ├── main.ts                  # Punto de entrada de la aplicación
   test/                        # Pruebas unitarias
```
