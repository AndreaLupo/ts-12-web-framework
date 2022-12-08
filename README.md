# ts-12-web-framework

## Technologies

This project uses:

- Parcel
- JSON server

### JSON server

To use `json-server`:

1. Install globally

```bash
npm install -g json-server
```

2. create the file `db.json` in the root folder, containing a JSON object with an array of key `"users"` (so: `{"users": []}`)
3. execute

```bash
json-server -w db.json
```

## Topics

### Model definition

- Optional properties in interfaces
- generic type extending interface (`Sync.ts`)
- getter with generic return type (`Attributes.ts`)
- generic `Model` class to be used as anchestor from all the classes that represents a Model entity (used inheritance).
- generic managament of collections through a dedicated class `Collection`

### View definition

- Class that manages the instantiation of dynamic html within the DOM
- Reacting to custom events
- Update of the template when data changes (re-rendering the whole content)

## Run

To run the application, run:

```bash
npx parcel index.html
```
