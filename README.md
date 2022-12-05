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

- Optional properties in interfaces

## Run

To run the application, run:

```bash
npx parcel index.html
```
