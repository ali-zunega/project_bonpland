# 🏠 Inmobiliaria Bonpland - Frontend

Frontend del proyecto **Inmobiliaria Bonpland**, una plataforma web para explorar, filtrar y visualizar propiedades disponibles para **compra o alquiler en Latinoamérica**.

El objetivo del proyecto es permitir que los usuarios encuentren fácilmente inmuebles según diferentes criterios y puedan contactar a la inmobiliaria con la referencia específica de la propiedad.

---

# 📌 Descripción del Proyecto

Inmobiliaria Bonpland es una aplicación web que muestra un listado de propiedades inmobiliarias con información detallada.

Los usuarios podrán:

* Explorar propiedades destacadas
* Buscar propiedades utilizando filtros
* Visualizar detalles completos de cada inmueble
* Contactar a la inmobiliaria con la referencia del inmueble seleccionado

El sistema también contará con un **panel privado de administración** para que la inmobiliaria pueda gestionar las propiedades.

---

# 🚀 Funcionalidades del Frontend

El frontend deberá implementar las siguientes secciones:

## 🏡 Home / Bienvenida

* Presentación del sitio
* Visualización de **inmuebles destacados**

## 👥 Quiénes Somos

* Información sobre la inmobiliaria
* Trayectoria y experiencia

## 📬 Contacto

* Información de contacto de la empresa
* Medios para comunicarse con la inmobiliaria

## 📋 Listado de Inmuebles

Vista general de todas las propiedades disponibles con filtros de búsqueda.

### Filtros disponibles

* Cantidad de ambientes
* País
* Ciudad
* Metros cuadrados (mínimo y máximo)
* Rango de precio
* Tipo de contratación:

  * Alquiler
  * Compra

## 🏠 Detalle de Inmueble

Cada propiedad tendrá una página con información detallada:

* Descripción del inmueble
* Ubicación
* Precio
* Metros cuadrados
* Cantidad de ambientes
* Estado del inmueble:

  * Disponible
  * Reservado
  * Alquilado
  * Vendido

Además, se podrá acceder a un **link de contacto que incluirá el código de referencia del inmueble**.

## 🔐 Panel de Administración (Privado)

Sección utilizada por la inmobiliaria para gestionar propiedades:

* Crear inmuebles
* Editar inmuebles
* Eliminar inmuebles
* Cambiar estado del inmueble

---

# 🧩 Estructura del Proyecto (Frontend)

Ejemplo de estructura sugerida:

```
frontend/
│
├── public/
│
├── src/
│   ├── assets/
│   ├── components/
│   ├── pages/
│   │   ├── Home
│   │   ├── Properties
│   │   ├── PropertyDetail
│   │   ├── About
│   │   ├── Contact
│   │   └── Admin
│   │
│   ├── services/
│   ├── hooks/
│   ├── styles/
│   └── utils/
│
└── README.md
```

---

# 🧑‍💻 Roles del Proyecto

El proyecto está dividido en distintos roles:

### UX

* Research de usuarios
* Prototipado de la experiencia

### UI / Diseño

* Diseño visual de las páginas
* Definición del sistema de diseño

### Frontend

* Maquetación e implementación de las interfaces
* Integración con la API

### Backend

* Creación de la base de datos
* Desarrollo de la lógica del sistema
* Creación de la API

### QA / Testing

* Creación de tests
* Validación del correcto funcionamiento

### DevOps

* Configuración de infraestructura
* Deploy en entornos:

  * Development
  * Staging
  * Production

---

# ⚙️ Instalación y ejecución

```bash
# Clonar el repositorio
git clone <repo-url>

# Entrar al proyecto
cd frontend

# Instalar dependencias
npm install

# Ejecutar en modo desarrollo
npm run dev
```

---

# 🌎 Ambientes

El proyecto contará con tres entornos:

* **Development**
* **Staging**
* **Production**

---

# 📬 Contacto

Si tienes preguntas sobre el proyecto puedes comunicarte con el equipo de desarrollo o abrir un **issue** en el repositorio.

---

## Para información general del proyecto ver:

👉 [README principal](../README.md)