// Before all: Import web server app

// Serves up the SPA
// - App responds to get / (stub fs/static files)
// Server renders the SPA to support non-JS clients
// - RenderToString is called and content lands inside react root (stub everything)
// Saves user inputed data to the server as they switch between form fields
// - Method to upsert in DB works (partial update)
// - Handles POST /update (upserts to db)
// Saves completed form data on user submission
// - Method of insert in DB works (full update)
// - Handles POST /submit (inserts to db)
// On page reload, populates the form fields with the values previous saved
// - Injects data for inflating with magic string (based on cookie)
// Is stateless, to support auto-scaling
// – spin up multiple app instances to check data