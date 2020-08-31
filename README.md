# Send webhooks from Github Actions

This is a minimal depencies webhook action. The only dependency is Github's
`@actions` library to support inputs/ouputs. It's done in JavaScript as Github
documentation says this is faster than Docker.


## Example

```yml
jobs:
  example:
  steps:
  - name: notify slack
    uses: piranha/webhook-action@1.0.0
    with:
      url: ${{secrets.SLACK_WEBHOOK}}
      body: '{"text": "hello everyone"}'
```

## Parameters

- **url** (required) - destination. Put it in your [secrets](https://docs.github.com/en/actions/configuring-and-managing-workflows/creating-and-storing-encrypted-secrets), please
- **method** - HTTP method to use, default: `POST`
- **body** - HTTP body to send, empty by default
- **headers** - HTTP headers, if `Content-Type` is not specified, `application/json` will be used

If you can't understand an error from the API, [debug logging](https://docs.github.com/en/actions/configuring-and-managing-workflows/managing-a-workflow-run#enabling-step-debug-logging) is supported.
