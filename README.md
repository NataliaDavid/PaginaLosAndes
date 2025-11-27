# PaginaLosAndes

## Configuración del contador de visitas

El front consulta los registros en `/api/visits` del backend. En despliegues donde API y front viven en dominios diferentes, define el endpoint con cualquiera de estas opciones:

- Variable de entorno: crea un archivo `.env` con `VITE_COUNTER_API_ENDPOINT=https://api.losandes-soacha.com/api/visits` (o la URL que necesites) antes de construir o iniciar Vite.
- Variable global en el navegador: antes de cargar el bundle expón `window.__LOS_ANDES_COUNTER_API__ = 'https://api.losandes-soacha.com/api/visits';` dentro del HTML.

Si no configuras nada, en producción el front usará por defecto `https://api.losandes-soacha.com/api/visits`. En desarrollo (`localhost`) seguirá apuntando al backend local usando la ruta relativa `/api/visits`.
