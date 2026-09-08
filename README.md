# Ecosistema de Analítica Institucional | Sede Bogotá
### Oficina de Planeación y Estadística (OPE) - Universidad Nacional de Colombia

Aplicación web interactiva que presenta de forma ejecutiva y visual el Ecosistema de Analítica Institucional de la Universidad Nacional de Colombia - Sede Bogotá. Permite navegar a través de una presentación interactiva (formato 16:9 con galerías y simulador) o explorar el catálogo de herramientas mediante un **Executive Hub**.

---

## 🚀 Características Principales

1. **Modo Presentación (16:9)**:
   - 9 diapositivas ejecutivas con diseño institucional UNAL.
   - Carruseles dinámicos con capturas de pantalla reales, barra de progreso y temporizador.
   - Simulador interactivo del agente inteligente **Databot**.
   - Navegación por teclado (Flechas `←` / `→`, `Espacio`, `Inicio`, `Fin`) y soporte de pantalla completa (`F`).
   - Modal lightbox para ampliación y zoom de capturas.

2. **Modo Executive Hub**:
   - Tablero integral de visualización con tarjetas de acceso directo para las 6 herramientas analíticas:
     - *La Sede en Cifras*
     - *Indicadores Estratégicos*
     - *OPEData*
     - *PRIG (Plataforma de Rendición de Cuentas e Información de Gestión)*
     - *La Sede en Contexto*
     - *Databot (Agente Analítico Inteligente con IA)*

---

## 📂 Estructura del Repositorio

```text
├── index.html               # Estructura principal y maquetación de vistas
├── styles.css               # Sistema de diseño, diseño adaptativo y estilos UNAL
├── app.js                   # Lógica de carruseles, simulador Databot y navegación
├── logo_unal_circle.png     # Escudo oficial de la Universidad Nacional de Colombia
├── Logo_OPE_Negro_01.png    # Logotipo oficial de la Oficina de Planeación y Estadística
├── candidatos.json          # Banco de preguntas para validación de candidatos
├── texto_completo.txt       # Transcripción y datos de referencia del ecosistema
├── Imágenes/                # Capturas de pantalla de las herramientas analíticas
│   ├── 01 Sede en Cifras/
│   ├── 02 Indicadores estratégicos/
│   ├── 03 OPEData/
│   ├── 04 PRIG/
│   ├── 05 La Sede en Contexto/
│   └── 06 Databot/
└── .gitignore               # Exclusión de archivos temporales y kits de diseño
```

> **Nota sobre `kitAppUnal`**:
> La carpeta `kitAppUnal` corresponde a la suite de referencia y ejemplos de plantillas institucionales de la UNAL. Para optimizar el tamaño del repositorio y asegurar su portabilidad en GitHub y GitHub Pages, dicha carpeta se encuentra excluida mediante `.gitignore`. Todos los elementos requeridos (cabecera oficial, logotipo institucional y reglas de estilo) se encuentran integrados de forma 100% autónoma en `index.html`, `styles.css` y `logo_unal_circle.png`.

---

## 🌐 Publicación en GitHub Pages

Para publicar este proyecto directamente en la web mediante GitHub Pages:

1. Ve a los **Settings** de tu repositorio en GitHub.
2. En la sección lateral izquierda, selecciona **Pages**.
3. En **Build and deployment > Source**, elige **Deploy from a branch**.
4. Selecciona la rama principal (`main` o `master`) y el directorio `/ (root)`.
5. Haz clic en **Save**. En unos instantes tu sitio estará disponible en `https://<usuario>.github.io/<repositorio>/`.
