// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  maxFilePerUploadLimit: 50,
  fileSizeLimit: 51200,
  fileNameValidation: /^[\w@\-_.*'() ]+$/,
  local_url: "../assets/jsons",
  // api_url: "https://ewvfsxykb1.execute-api.us-east-1.amazonaws.com/staging", // Cuelogic account
  api_url: "http://localhost:4200/staging", // Cuelogic account
  app_URL: "https://d226prfqpgwfb4.cloudfront.net",
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
