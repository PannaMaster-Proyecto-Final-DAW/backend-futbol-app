# Informe de Integración: Estandarización de APIs (Backend -> Frontend)

Este documento detalla la nueva estructura de los datos devueltos por el backend tras la implementación de la capa de Mappers. Estos cambios eliminan la necesidad de procesar objetos anidados en el frontend.

---

## 1. Entidad: PLAYER (Jugador)
**Endpoint:** `/api/players`

| Atributo | Tipo | Descripción |
| :--- | :--- | :--- |
| `id` | UUID | Identificador único |
| `name` | String | Nombre completo |
| `age` | Number | Edad |
| `tier` | Number | Nivel de dificultad (1, 2, 3) |
| `team` | String | **Nombre plano** del equipo |
| `league` | String | **Nombre plano** de la liga |
| `nationality` | String | **Nombre plano** del país |
| `position` | Array<String> | Lista de posiciones (ej. `["LW", "ST"]`) |
| `generalPosition` | Enum | `GOALKEEPER`, `DEFENDER`, `MIDFIELDER`, `FORWARD` |
| `pictureUrl` | String \| null | URL de la foto del jugador |
| `gender` | Enum | `male` o `female` |

**Ejemplo:**
```json
{
  "id": "550e8400-e29b-41d4-a716-446655440000",
  "name": "Kylian Mbappé",
  "age": 25,
  "tier": 1,
  "team": "Real Madrid",
  "league": "La Liga",
  "nationality": "France",
  "position": ["LW", "ST"],
  "generalPosition": "GOALKEEPER",
  "pictureUrl": "https://...",
  "gender": "male"
}
```

---

## 2. Entidad: TEAM (Equipo)
**Endpoint:** `/api/teams`

| Atributo | Tipo | Descripción |
| :--- | :--- | :--- |
| `id` | UUID | Identificador único |
| `name` | String | Nombre del equipo |
| `tier` | Number | Nivel (1, 2, 3) |
| `pictureUrl` | String \| null | URL del escudo |
| `league` | String | **Nombre plano** de la liga |
| `country` | String | **Nombre plano** del país (vía liga) |

**Ejemplo:**
```json
{
  "id": "...",
  "name": "Manchester City",
  "tier": 1,
  "pictureUrl": "https://...",
  "league": "Premier League",
  "country": "England"
}
```

---

## 3. Entidad: COUNTRY (País)
**Endpoint:** `/api/countries`

| Atributo | Tipo | Descripción |
| :--- | :--- | :--- |
| `id` | UUID | Identificador único |
| `name` | String | Nombre del país |
| `tierMale` | Number | Nivel competitividad masculina |
| `tierFemale` | Number | Nivel competitividad femenina |
| `pictureUrl` | String \| null | URL de la bandera |

---

## 4. Entidad: LEAGUE (Liga Real)
**Endpoint:** `/api/leagues`

| Atributo | Tipo | Descripción |
| :--- | :--- | :--- |
| `id` | UUID | Identificador único |
| `name` | String | Nombre de la liga |
| `category` | Enum | `male` o `female` |
| `country` | String | **Nombre plano** del país |
| `pictureUrl` | String \| null | URL del logo de la liga |

---

## 5. Entidad: FORMATION (Alineación)
**Endpoint:** `/api/formations`

| Atributo | Tipo | Descripción |
| :--- | :--- | :--- |
| `id` | UUID | Identificador único |
| `name` | String | Nombre táctico (ej. "4-3-3") |
| `goalkeeper` | String | Posición del portero (ej. "GK") |
| `defenders` | Array<String> | Lista de posiciones defensivas |
| `midfielders` | Array<String> | Lista de posiciones de mediocampo |
| `forwards` | Array<String> | Lista de posiciones de ataque |

---

## Notas para el Frontend
1.  **Valores Nulos:** Los campos de imagen (`pictureUrl`) o relaciones opcionales devolverán `null` si no hay datos. Ya no es necesario comprobar `undefined`.
2.  **Manejo de Errores:** Si se solicita un recurso por ID o nombre que no existe, el API devolverá un código `404 Not Found` con un cuerpo descriptivo: `{ "error": "Entity not found" }`.
3.  **No Anidamiento:** Se ha eliminado la necesidad de acceder a propiedades como `player.team.name`. Ahora se accede directamente mediante `player.team`.
