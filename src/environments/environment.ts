// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  adhesion: 30,
  production: false,
  stripeKey: 'pk_test_rEdOkXSnUj5YrTZjR4aZWJUV',
  apiUrl: 'http://localhost:8761',
  newsFeedUrl: 'https://wattforall.wordpress.com/blog/feed',
  rest2json: 'https://public-api.wordpress.com/rest/v1.1/sites/wattforall.wordpress.com/posts?pretty=true&fields=title,excerpt,attachments,content,author,date'
};

